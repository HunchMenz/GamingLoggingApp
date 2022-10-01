import Users from "../../../model/Users";
import { connectToDatabase } from "../../../utils/lib/db";

export default async function handler(req, res) {
  await connectToDatabase();
  // Register
  if (req.method === "GET") {
    const { username } = req.query;

    try {
      const userSearch = await Users.find({
        username: {
          $regex: new RegExp(username, "i"),
        },
      });

      res.status(200).json({
        message: "Performed user search",
        data: userSearch,
      });
    } catch (err) {
      throw new Error(
        "Error communicating with database. Please try again or contact support if issue persists."
      );
    }
    return;
  }
  return res.status(401).json({
    message: "Error in completing request: invalid request method.",
  });
}
