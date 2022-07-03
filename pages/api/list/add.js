// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useSession } from "next-auth/react";
import Games from "../../../database/user_data/model/Games";
import getCurrentDate from "../../../utils/getCurrentDate"

// TODO: Write API that adds a game to a users game list */
export default function handler(req, res) {
  // Add to end of array to allow for "undo" through array.POP
  // get user session
  const { data: session } = useSession();

  // Verify user session
  if (!session.user) {
    return res
      .status(400)
      .json({ message: "Error in request to add game to user list." });
  }

  // If POST request...
  if (req.method === "POST") {
    const gameData = req.body;

    // Verify req body
    if (!gameData) {
      return res
        .status(400)
        .json({ message: "Error in request to add game to user list." });
    }

    const gameEntryExist = await Games.findOne({userID: gameData.userID, gameID: gameData.gameID});

    if(gameEntryExist) {
        return res.status(200).json({ message: "Game already added to user list." });
    }

    const gameEntry = {
        userID: gameData.userID,
        gameID: gameData.gameID,
        status: gameData.status,
        dateAdded: getCurrentDate(),
        dateRemoved: null,
    }

    Games.insert(gameEntry);

    res.status(200).json({ message: `Game ID ${gameData.gameID} successfully added to user's ${gameData.status} list.` });
    return gameEntry;
  } else
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
}
