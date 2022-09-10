import dbConnect from "../../../utils/lib/dbConnect";
import Games from "../../../model/Games";
import buildRequest from "../../../utils/buildRequest";

export default async function handler(req, res) {
  const body = req.body;

  if (req.method === "POST") {
    await dbConnect("user_data");
    // Status Translation:
    const statusTranslation = ["Backlog", "In Progress", "Finished", "Retired"];

    // External Games Translation:
    const externalTranslation = [
      { id: 1, name: "steam" },
      { id: 5, name: "GOG" },
      { id: 10, name: "Youtube" },
      { id: 11, name: "microsoft" },
      { id: 13, name: "apple" },
      { id: 14, name: "twitch" },
      { id: 15, name: "android" },
      { id: 20, name: "amazon_asin" },
      { id: 22, name: "amazon_luna" },
      { id: 23, name: "amazon_adg" },
      { id: 26, name: "epic_game_store" },
      { id: 28, name: "oculus" },
      { id: 29, name: "utomik" },
      { id: 30, name: "itch_io" },
      { id: 31, name: "xbox_marketplace" },
      { id: 32, name: "kartridge" },
      { id: 36, name: "playstation_store_us" },
      { id: 37, name: "focus_entertainment" },
    ];

    // Retrieve user list by user id
    // ** the lean function returns the query result as a POJ object
    let userList = await Games.find(
      { userID: body.userID, dateRemoved: { $exists: false } },
      "gameID status"
    )
      .sort({ dateAdded: 1 })
      .lean();

    // If the user does not have a list
    if (!userList) {
      return res.status(200).json({
        message: "User does not have games added to their list.",
        gameList: [],
        idList: [],
        statusList: [],
      });
    }

    // Translate status
    userList.forEach((game) => {
      game["status"] = statusTranslation[game["status"]];

      // Remove Mongo id object, so we can return without revealing db stuff
      delete game["_id"];
    });

    const idArray = userList.map((listItem) => listItem.gameID);
    let resultGameList = [];

    if (idArray.length > 0) {
      // TODO: Make it possible to retrieve more than the query limit (500). Possibly need multiquery or space out requests.
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
        "external_games.category",
        "external_games.uid",
        "external_games.platform",
      ];
      const filter = `where id = (${idArray}); limit 499;`; // Max limit is 499

      const query = "fields " + fields.join(",") + ";" + filter;

      const response = await buildRequest("igdb", "games", query);

      // Translate Category
      response.forEach((game) => {
        game.external_games.forEach((ex) => {
          ex.category = externalTranslation.filter(
            (catTran) => catTran.id === ex.category
          )[0]?.name;
        });
      });

      resultGameList = response?.sort(
        (a, b) => idArray.indexOf(a.id) - idArray.indexOf(b.id)
      );

      resultGameList = resultGameList?.map((game) => {
        game.status = userList.find((item) => item.gameID === game.id)?.status;
        return game;
      });
    }

    return res.status(200).json({
      message: "User list retrieved!",
      gameList: resultGameList,
      idList: idArray,
      statusList: userList,
    });
  } else {
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
  }
}
