// src/context/state.js
import { getSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
// import dbConnect from "../utils/lib/dbConnect";
// import Games from "../database/user_data/model/Games";
// import buildRequest from "../utils/buildRequest";

// export const getUserGameList = async (userID) => {
//   // await dbConnect("user_data");
//   // Status Translation:
//   const statusTranslation = ["Backlog", "In Progress", "Finished", "Retired"];

//   // Retrieve user list by user id
//   // ** the lean function returns the query result as a POJ object
//   let userList = await Games.find(
//     { userID: userID },
//     "gameID status dateAdded dateRemoved"
//   )
//     .sort({ dateAdded: 1 })
//     .lean();

//   // Translate status
//   userList.forEach((game) => {
//     game["status"] = statusTranslation[game["status"]];
//   });

//   const idArray = userList.map((listItem) => listItem.gameID);

//   // Get game info based on userList gameID's
//   const fields = [
//     "name",
//     "slug",
//     "cover.url",
//     "platforms.abbreviation",
//     "platforms.platform_logo.url",
//     "total_rating",
//     "release_dates.date",
//     "aggregated_rating_count",
//   ];
//   const filter = `where id = (${idArray});`;

//   const query = "fields " + fields.join(",") + ";" + filter;

//   const response = await buildRequest("igdb", "games", query);

//   return response.sort((a, b) => idArray.indexOf(a.id) - idArray.indexOf(b.id));
// };

const GameListContext = createContext();
const updateGameListContext = createContext();

export const getCurrUser = async () => {
  const sess = await getSession();
  return sess.user;
};

export function GameListProvider({ children }) {
  const [user, setUser] = useState([]);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    getCurrUser().then((user) => {
      setUser(user);
    });

    // if (user) {
    //   getUserGameList(user.id).then((list) => {
    //     setGameList(list);
    //   });
    // }
  }, []);

  let sharedState = {
    /* whatever you want */
    user: user,
    test: "",
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
