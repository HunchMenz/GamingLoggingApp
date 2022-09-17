import { ObjectId } from "mongodb";
import GameList from "../../../model/GameList";
import dbConnect from "../../../utils/lib/dbConnect";

export default async function handler(req, res) {
  // Connect to DB
  await dbConnect("user_data");

  // Create New List for User
  if (req.method === "POST") {
    const { userID } = req.query;
    const listData = req.body;
    /** Request Body is expected to look like this:
     * {
     *     list: List we want to create
     * }
     */

    // Find game list
    const gameListExist = await GameList.findOne({
      userID: userID,
    });

    // Did we find the game list document?
    if (!gameListExist) {
      res.status(422).json({
        message: `Cannot create list [${listData.list}] because user does not have a list entry! Should have been created on registration...`,
      });
      return;
    }

    // Does the game list already exist?
    if (
      gameListExist.gameList.map((elem) => elem.name).indexOf(listData.list) ===
      -1
    ) {
      gameListExist.gameList.push({
        name: listData.list,
        theme: "default",
        games: [],
      });

      // Save document to db
      await gameListExist.save();

      res.status(200).json({
        message: `Successfully created new list [${listData.list}]!`,
        data: gameListExist,
      });
    } else {
      res.status(422).json({
        message: `Cannot create list [${listData.list}] because it already exists!`,
      });
    }
    return;
  }
  // Get user game list
  else if (req.method === "GET") {
    // Grab query parameters
    const dataQuery = req.query;
    /** Expecting the following:
     *  - userID: ID of user
     *  - listName: name of list we want to retrieve
     *      * If the listName is not passed, then we return all lists!
     */

    const userGameList = await GameList.findOne({
      userID: ObjectId(dataQuery.userID),
    });

    if (!userGameList) {
      res.status(422).json({
        message: "Error in completing request: could not find user.",
      });
      return;
    }

    // Select specfic list or ALL lists
    const selectedGameList = dataQuery.listName
      ? userGameList.gameList.find((list) => list.name === dataQuery.listName)
      : userGameList.gameList;

    if (!selectedGameList) {
      res.status(422).json({
        message: `Error in completing request: could not find user game list [${dataQuery.listName}].`,
      });
      return;
    } else {
      res.status(200).json({
        message: `Retrieved user game list [${dataQuery.listName}]!`,
        data: selectedGameList,
      });
      return;
    }
  }
  // Update game settings
  else if (req.method === "PUT") {
  } else {
    res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
    return;
  }
}
