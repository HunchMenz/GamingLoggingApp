import dbConnect from "../../../utils/lib/dbConnect";
import Games from "../../../database/user_data/model/Games";
import buildRequest from "../../../utils/buildRequest";

export default async function handler(req, res) {
  const body = req.body;

  if (req.method === "POST") {
    await dbConnect("user_data");
    // Status Translation:
    const statusTranslation = ["Backlog", "In Progress", "Finished", "Retired"];

    // Retrieve user list by user id
    // ** the lean function returns the query result as a POJ object
    let userList = await Games.find(
      { userID: body.userID },
      "gameID status dateAdded dateRemoved"
    )
      .sort({ dateAdded: 1 })
      .lean();

    // If the user does not have a list
    if (!userList) {
      return res.status(200).json({
        message: "User does not have games added to their list.",
        gameList: [],
      });
    }

    // Translate status
    userList.forEach((game) => {
      game["status"] = statusTranslation[game["status"]];
    });

    const idArray = userList.map((listItem) => listItem.gameID);

    // Get game info based on userList gameID's
    const fields = [
      "name",
      "slug",
      "cover.url",
      "platforms.abbreviation",
      "platforms.platform_logo.url",
      "total_rating",
      "release_dates.date",
      "aggregated_rating_count",
    ];
    const filter = `where id = (${idArray});`;

    const query = "fields " + fields.join(",") + ";" + filter;

    const gamedata = await buildRequest("igdb", "games", query);

    // Sort gamedata list according to dateadded and add game status
    const sortedList = gamedata
      ?.sort((a, b) => idArray.indexOf(a.id) - idArray.indexOf(b.id))
      .map((game, idx) => {
        // Can be buggy, but shouldn't be. So long as gameID never changes, this should work
        if (game.id === userList[idx].gameID)
          game.status = userList[idx].status;
        return game;
      });

    // Sort game list into "status bins"
    let statusBins = [];
    statusTranslation.forEach((statusType, idx) => {
      statusBins.push(sortedList.filter((game) => game.status === statusType));
    });

    return res.status(200).json({
      message: "User list retrieved!",
      gameList: statusBins,
    });
  } else {
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
  }
}
