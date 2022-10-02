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
     *     slug: selected game slug. Should come from IGDB.
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
      slug: gameData.slug,
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
  }
  // Delete game from list
  else if (req.method === "DELETE") {
    const gameData = req.body;
    /** Request Body is expected to look like this:
     * {
     *     userID: ID of current user
     *     gameID: selected game ID
     * }
     */

    // Find game list
    const gameListExist = await GameList.findOne({
      userID: gameData.userID,
      "gameList.games.IGDB_id": gameData.gameID,
    });

    // If the game doesn't exist in a list...
    if (!gameListExist) {
      res.status(422).json({
        message: `Cannot remove game from game list, because game is not in contained in any list.`,
      });
      return;
    }

    for (let i = 0; i < gameListExist.gameList.length; i++) {
      const list = gameListExist.gameList[i];
      // Find game object index given the game ID
      const gameIdx = list.games.findIndex(
        (game) => game.IGDB_id === gameData.gameID
      );

      // If we find an instance of the game object...
      if (gameIdx > -1) {
        // Subtract 1 from all game objects greater than the deleted position
        list.games.forEach((game) => {
          if (game.position > gameObject.position) game.position--;
        });

        // Delete element at gameIdx index (splice is faster than filter)
        list.games.splice(gameIdx, 1);
        break;
      }
    }

    // Save updated game list
    try {
      gameListExist.save();
      res.status(200).json({
        message: "Success!",
        data: gameListExist,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error in completing request: unable to process deletion.",
      });
    }

    return;
  } else {
    res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
    return;
  }
}
