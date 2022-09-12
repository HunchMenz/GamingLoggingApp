import GameList from "../../../model/GameList";
import dbConnect from "../../../utils/lib/dbConnect";

export default async function handler(req, res) {
  // Connect to DB
  await dbConnect("user_data");

  // Create new game list
  if (req.method === "POST") {
    const gameData = req.body;
    /** Request Body is expected to look like this:
     * {
     *     userEmail: The email of the user we are working with
     *     list: List we want to create
     * }
     */

    // Get User ID from User collection
    const userInfo = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user?` +
        new URLSearchParams({
          email: gameData.userEmail,
        }),
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((resJson) => resJson.data);

    // Find game list
    const gameListExist = await GameList.findOne({
      userID: userInfo._id,
    });

    // Did we find the game list document?
    if (!gameListExist) {
      res.status(422).json({
        message: `Cannot create list [${gameData.list}] because user does not have a list entry! Should have been created on registration.`,
      });
      return;
    }

    console.log(
      gameListExist.gameList.map((elem) => elem.name).indexOf(gameData.list) !==
        -1
    );

    // Those the game list already exist?
    if (
      gameListExist.gameList.map((elem) => elem.name).indexOf(gameData.list) ===
      -1
    ) {
      gameListExist.gameList.push({
        name: gameData.list,
        theme: "default",
        games: [],
      });

      // Save document to db
      await gameListExist.save();

      res.status(200).json({
        message: `Successfully created new list [${gameData.list}]!`,
        data: gameListExist,
      });
    } else {
      res.status(422).json({
        message: `Cannot create list [${gameData.list}] because it already exists!`,
      });
    }
    return;
  }
  // Add to list
  else if (req.method === "PUT") {
    const gameData = req.body;
    /** Request Body is expected to look like this:
     * {
     *     userID: ID of current user
     *     gameID: selected game ID
     *     list: list we want to add game to
     * }
     */

    // Get User ID from User collection
    const userInfo = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user?` +
        new URLSearchParams({
          email: gameData.userEmail,
        }),
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((resJson) => resJson.data);

    // Find game list
    const gameListExist = await GameList.findOne({
      userID: userInfo._id,
      "gameList.name": gameData.list,
    });

    //   const gameListExist = await GameList.aggregate([
    //     { $match: { userID: gameData.userID } },
    //     {
    //       $match: { "gameList.name": gameData.list },
    //     },
    //   ]);

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
  } else {
    res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
    return;
  }
}
