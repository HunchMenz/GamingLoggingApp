import GameList from "../../../model/GameList";
import { connectToDatabase } from "../../../utils/lib/db";

export default async function handler(req, res) {
  // Connect to DB
  await connectToDatabase();

  // Add game to specified list
  if (req.method === "POST") {
    const gameData = req.body;
    /** Request Body is expected to look like this:
     * {
     *     userID: ID of current user
     *     gameID: selected game ID
     *     list: list we want to add game to
     * }
     */

    // Find game list
    const gameListExist = await GameList.findOne({
      userID: gameData.userID, //userInfo._id,
      "gameList.name": gameData.list,
    });

    // If the game list doesn't exist...
    if (!gameListExist) {
      res.status(422).json({
        message: `Cannot add game to game list, because game list [${gameData.list}] does not exist.`,
      });
      return;
    }

    // If the game exists in the game list
    const listIdx = gameListExist.gameList
      .map((elem) => elem.name)
      .indexOf(gameData.list);

    if (
      gameListExist.gameList[listIdx].games.find(
        (game) => game.IGDB_id === gameData.gameID
      )
    ) {
      res.status(422).json({
        message: `Cannot add game to game list, because game already exists in selected list.`,
      });
      return;
    }

    // Get the max position and add 1 for the new game entry
    const newPosition =
      gameListExist.gameList[listIdx].games.length > 0
        ? Math.max(
            ...gameListExist.gameList[listIdx].games.map(
              (game) => game.position
            )
          ) + 1
        : 1;

    // Push new game data to list
    gameListExist.gameList[listIdx].games.push({
      IGDB_id: gameData.gameID,
      position: newPosition,
    });

    // Save document to db
    await gameListExist.save();

    res.status(200).json({
      message: "Success!",
      data: gameListExist,
    });
    return;
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
