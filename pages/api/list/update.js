// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Games from "../../../database/user_data/model/Games";

// TODO: Write API that updates a users game list. NOTE: Not delete or add. More like status updates on games (i.e. in progress, completed, backlog, etc.)
export default function handler(req, res) {
  // Status Translation:
  const status = ["Backlog", "In Progress", "Finished", "Retired"];

  const gameData = req.body;
  /** Request Body is expected to look like this:
   * {
   *     userID: ID of current user
   *     gameID: selected game ID
   *     action: update action to take
   * }
   */

  // Verify user session
  if (!gameData.userID) {
    return res
      .status(400)
      .json({ message: "Error in request to add game to user list." });
  }

  // If POST request...
  if (req.method === "POST") {
    // Verify req body
    if (!gameData) {
      return res
        .status(400)
        .json({ message: "Error in request to add game to user list." });
    }

    if (gameData.action === "remove") {
      // Find entry and update
      const gameEntry = Games.findOneAndUpdate(
        {
          userID: gameData.userID,
          gameID: gameData.gameID,
          dateRemoved: null,
        },
        { dateRemoved: new Date() },
        null,
        function (err, docs) {
          if (err) {
            return res
              .status(200)
              .json({ message: "Game not added to user list.", error: err });
          } else {
            return res.status(200).json({
              message: `Game ID ${gameData.gameID} successfully removed from user list.`,
              doc: docs,
            });
          }
        }
      );

      return res.status(200).json({
        message: `Game ID ${gameData.gameID} successfully removed from user list.`,
        doc: {},
      });
    } else
      return res.status(401).json({
        message:
          "Unrecognized update action. Please try again with a valid update action.",
      });
  } else {
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
  }
}
