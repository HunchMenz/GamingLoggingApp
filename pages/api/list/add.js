// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import GameList from "../../../database/user_data/model/GameList";

// TODO: Write API that adds a game to a users game list */
export default function handler(req, res) {
  // Add to end of array to allow for "undo" through array.POP

  const gameData = req.body;

  // Verify req body
  if (!gameData && isNaN(gameData.status)) {
    return res
      .status(400)
      .json({ message: "Error in request to add game to user list." });
  }

  GameList.insert();
  res.status(200).json({ name: "John Doe" });
}
