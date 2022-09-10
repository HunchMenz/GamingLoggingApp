// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Games from "../../../model/Games";

export default async function handler(req, res) {
  // Update Translation:
  const updateTranslation = ["remove", "status"];

  // Status Translation:
  const statusTranslation = ["Backlog", "In Progress", "Finished", "Retired"];

  const gameData = req.body;
  /** Request Body is expected to look like this:
   * {
   *     userID: ID of current user
   *     gameID: selected game ID
   *     updateAction: what kind of update we want to perform
   *     statusChangeTo: <OPTIONAL> If the update action is a status change, then the status is updated to this value.
   * }
   */

  // Verify user session
  if (!gameData.userID) {
    return res
      .status(400)
      .json({ message: "Error in request to update game on user list." });
  }

  return new Promise((resolve) => {
    // If POST request...
    if (req.method === "POST") {
      // Verify req body
      if (!gameData) {
        return res
          .status(400)
          .json({ message: "Error in request to add game to user list." });
      }

      let gameEntry;
      switch (gameData.updateAction) {
        case 0:
          //** remove */
          // Find entry and update
          gameEntry = Games.findOneAndUpdate(
            {
              userID: gameData.userID,
              gameID: gameData.gameID,
              dateRemoved: { $exists: false },
            },
            { dateRemoved: new Date() },
            null,
            function (err, docs) {
              if (err) {
                res.status(200).json({
                  message: "Game not added to user list.",
                  error: err,
                });
                res.end();
                resolve();
              } else {
                res.status(200).json({
                  message: `Game ID ${gameData.gameID} successfully removed from user list.`,
                  doc: docs,
                });
                res.end();
                resolve();
              }
            }
          );
          break;
        case 1:
          // status change
          gameEntry = Games.findOneAndUpdate(
            {
              userID: gameData.userID,
              gameID: gameData.gameID,
              dateRemoved: { $exists: false },
            },
            { status: gameData.newStatus },
            null,
            function (err, docs) {
              if (err) {
                res.status(200).json({
                  message: "Game not added to user list.",
                  error: err,
                });
                res.end();
                resolve();
              } else {
                res.status(200).json({
                  message: `Game ID ${gameData.gameID} status successfully updated from user list.`,
                  doc: docs,
                });
                res.end();
                resolve();
              }
            }
          );

          res.status(200).json({
            message: `Game ID ${gameData.gameID} status successfully updated from user list.`,
            doc: {},
          });
          res.end();
          resolve();
          break;
        default:
          res.status(401).json({
            message: "Error in completing request: invalid update action.",
          });
          res.end();
          resolve();
      }
    } else {
      res.status(401).json({
        message: "Error in completing request: invalid request method.",
      });
      res.end();
      resolve();
    }
  });
}
