import { getSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export const getUserGameList = async (userID) => {
  const res = await fetch("/api/list/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID: userID }),
  });
  const returned = await res.json();
  console.log(returned);
  return returned.gameList;
};

const GameListContext = createContext();
// const updateGameListContext = createContext();

export const getCurrUser = async () => {
  const sess = await getSession();
  return sess?.user;
};

export function GameListProvider({ children }) {
  const [user, setUser] = useState([]);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    getCurrUser().then((user) => {
      setUser(user);
    });

    if (user) {
      getUserGameList(user.id).then((id) => {
        setGameList(id);
      });
    }
  }, []);

  let sharedState = {
    /* whatever you want */
    user: user,
    test: gameList,
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
