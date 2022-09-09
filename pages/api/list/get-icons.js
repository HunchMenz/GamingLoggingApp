import buildRequest from "../../../utils/buildRequest";

export default async function handler(req, res) {
  const reqData = req.body;
  /** Request Body is expected to look like this:
   * {
   *    gameList: List of games to pull icons for
   * }
   */
  // If GET request...
  if (req.method === "POST") {
    // SteamGridDB \\
    // Get game id by searching using slug field
    const steamGridGamePromises = await reqData.gameList.map((game) => {
      const steamAppID = game.external_games.find(
        (ex) => ex.category === "steam"
      )?.uid;

      return steamAppID
        ? buildRequest("steamgrid", `games/steam/${steamAppID}`, "", {
            method: "GET",
          }).then((result) => {
            return {
              success: result.success,
              data: result.data,
              IGDB_ID: game.id,
            };
          })
        : buildRequest("steamgrid", `search/autocomplete/${game.slug}`, "", {
            method: "GET",
          }).then((result) => {
            return {
              success: result.success,
              data: result.data,
              IGDB_ID: game.id,
            };
          });
    });

    let steamGridGameResponse = await Promise.all(steamGridGamePromises);

    // Use game ID to grab game Icons
    const steamGridIconPromises = steamGridGameResponse.map((game) => {
      return game.success
        ? buildRequest(
            "steamgrid",
            `icons/game/${game.data?.[0]?.id ?? game.data.id}`,
            "",
            {
              method: "GET",
            }
          ).then((result) => {
            return {
              success: result.success,
              data: result.data,
              IGDB_ID: game.IGDB_ID,
            };
          })
        : "";
    });

    // Use game ID to grab game Logos
    const steamGridLogoPromises = steamGridGameResponse.map((game) => {
      return game.success
        ? buildRequest(
            "steamgrid",
            `logos/game/${game.data?.[0]?.id ?? game.data.id}`,
            "",
            {
              method: "GET",
            }
          ).then((result) => {
            return {
              success: result.success,
              data: result.data,
              IGDB_ID: game.IGDB_ID,
            };
          })
        : "";
    });

    let steamGridIconResponse = await Promise.all(steamGridIconPromises);
    let steamGridLogoResponse = await Promise.all(steamGridLogoPromises);

    return res.status(200).json({
      message: "Game Icons retrieved!",
      iconList: steamGridIconResponse,
      logoList: steamGridLogoResponse,
    });
  } else {
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
  }
}
