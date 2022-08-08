import { getSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export const getUserGameList = async (userID) => {
  const res = await fetch("/api/list/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID }),
  });
  const pulledList = await res.json();
  return pulledList;
};

const GameListContext = createContext();

export const getCurrUser = async () => {
  const sess = await getSession();
  return sess?.user;
};

export function GameListProvider({ children }) {
  const [user, setUser] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [idList, setIDList] = useState([]);
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    getCurrUser().then((user) => {
      setUser(user);

      getUserGameList(user?.id).then((response) => {
        setGameList(response.gameList || []);
        setIDList(response.idList || []);
        setStatusList(response.statusList || []);
      });
    });
  }, []);

  let sharedState = {
    /* whatever you want */
    user: user,
    gameList: gameList,
    idList: idList,
    statusList: statusList,
  };

  const updateFns = {
    // if we need to modify the gameList, register those functions here
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
