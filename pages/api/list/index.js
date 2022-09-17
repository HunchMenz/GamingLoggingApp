import GameList from "../../../model/GameList";
import dbConnect from "../../../utils/lib/dbConnect";

export default async function handler(req, res) {
  // Connect to DB
  await dbConnect("user_data");

  // Create new game list document
  if (req.method === "POST") {
    const listData = req.body;
    /** Request Body is expected to look like this:
     * {
     *     userID: The ID of the user we want to create the document for
     * }
     */

    // Find game list
    const gameListExist = await GameList.findOne({
      userID: listData.userID,
    });

    // Does the document exist? No?...
    if (!gameListExist) {
      // Create Blank Gamelist for User
      const newGameList = {
        userID: listData.userID,
        gameList: [
          { name: "Backlog", theme: "default", games: [] },
          { name: "In Progress", theme: "default", games: [] },
          { name: "Finished", theme: "default", games: [] },
          { name: "Retired", theme: "default", games: [] },
        ],
      };

      const gamelist = new GameList(newGameList);
      await gamelist.save();
    }

    res.status(422).json({
      message: "Game List already created for specified user",
    });
    return;
  }
  // Update list settings
  else if (req.method === "PUT") {
    const listData = req.body;
    /** Request Body is expected to look like this:
     * {
     *     userID: ID of current user
     *     name: list we want to add game to
     *     newName: new name for list
     *     theme: theme we want to update to
     * }
     */

    // Get User ID from User collection
    const userInfo = await fetch(
      `${process.env.NEXTAUTH_URL}/api/user?` +
        new URLSearchParams({
          email: listData.userEmail,
        }),
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((resJson) => resJson.data);

    // Find game list
    const gameListExist = await GameList.findOne({
      userID: userInfo._id,
      "gameList.name": listData.name,
      "gameList.name": { $ne: listData.newName },
    });

    // If the game list doesn't exist or the new name is already in use...
    if (!gameListExist) {
      res.status(422).json({
        message: `Cannot update game list settings, because either game list [${listData.name}] does not exist or [${listData.newName}] does exist.`,
      });
      return;
    }

    // Update settings
    const listIdx = gameListExist.gameList
      .map((elem) => elem.name)
      .indexOf(listData.name);

    // Update theme (if sent)
    if (listData.theme) gameListExist.gameList[listIdx].theme = listData.theme;

    // Update name (if sent)
    if (listData.newName)
      gameListExist.gameList[listIdx].name = listData.newName;

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

// TODO: TEST THE ABOVE. Also make sure to update places where game is being used with game list
