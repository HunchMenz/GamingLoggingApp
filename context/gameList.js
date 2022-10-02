import { data } from "autoprefixer";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const GameListContext = createContext();

export function GameListProvider({ children }) {
  const [gameList, setGameList] = useState([]);
  const [IGDB_IDList, setIGDB_IDList] = useState([]);
  const [SG_IDList, setSG_IDList] = useState([]);

  // Boolean condition for retrieving user list
  const [retrieveList, setRetrieveList] = useState(true);

  const { data: session, status } = useSession();

  const getUserGameList = async () => {
    const res = await fetch("/api/list/" + session?.user.id, {
      method: "GET",
    }).then((response) => response.json());

    return res;
  };

  const getSteamGridID = async (gameSlugs) => {
    const steamGridSearchEndpoint = `search/autocomplete/`;
    const steamGridSearchBody = {
      method: "GET",
      dataList: gameSlugs,
    };

    const steamGridSearchResponse = await fetch(
      `/api/steamGridDB?endpoint=${encodeURIComponent(
        steamGridSearchEndpoint
      )}`,
      {
        method: "POST",
        body: JSON.stringify(steamGridSearchBody),
      }
    )
      .then((res) => res.json())
      .then((data) => ({ ...data }));

    return steamGridSearchResponse;
  };

  useEffect(() => {
    // Check if there is any data that needs to be retrieved
    if (retrieveList) {
      if (status === "authenticated") {
        // Get User List
        getUserGameList().then((response) => {
          setGameList(response.data);

          // Flatten IGDB ID's
          const flatArrayOfGameIDs = response.data
            .map((list) => list.games.map((game) => game.IGDB_id))
            .flat();
          setIGDB_IDList(flatArrayOfGameIDs);

          // Flatten game slugs
          const flatArrayOfGameSlugs = response.data
            .map((list) => list.games.map((game) => game.slug))
            .flat();

          if (flatArrayOfGameSlugs?.length > 0) {
            // Get Steam Grid Game ID's
            getSteamGridID(flatArrayOfGameSlugs).then((responseSG) => {
              const idData = responseSG.data.map((res) => res.data?.[0].id);
              setSG_IDList(idData);
            });

            // Set Retrieve List to false
            setRetrieveList(false);
          }
        });
      }
    }
  }, [retrieveList, status]);

  function updateGameList() {
    setRetrieveList(true);
  }

  let sharedState = {
    /* whatever you want */
    allGameList: gameList,
    IGDB_IDList: IGDB_IDList,
    SG_IDList: SG_IDList,
    updateGameList: updateGameList,
  };

  return (
    <GameListContext.Provider value={sharedState}>
      {children}
    </GameListContext.Provider>
  );
}

export function useGameListContext() {
  return useContext(GameListContext);
}
