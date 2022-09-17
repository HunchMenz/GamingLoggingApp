import { getSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export const getUserGameList = async () => {
  const sess = await getSession();

  const res = await fetch("/api/list/" + sess.user.id, {
    method: "GET",
  }).then((response) => response.json());

  return res;
};

const GameListContext = createContext();

export function GameListProvider({ children }) {
  const [gameList, setGameList] = useState([]);
  const [idList, setIDList] = useState([]);

  // Boolean condition for retrieving user list
  const [retrieveList, setRetrieveList] = useState(true);

  useEffect(() => {
    // Check if there is any data that needs to be retrieved
    if (retrieveList) {
      getUserGameList().then((response) => {
        setGameList(response.data);
        const flatArrayOfGameIDs = response.data
          .map((list) => list.games.map((game) => game.IGDB_id))
          .flat();
        setIDList(flatArrayOfGameIDs);
        setRetrieveList(false);
      });
    }
  }, [retrieveList]);

  function updateGameList() {
    setRetrieveList(true);
  }

  let sharedState = {
    /* whatever you want */
    allGameList: gameList,
    idList: idList,
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
