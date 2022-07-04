// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useSession } from "next-auth/react";

// TODO: Write API that retrieve's a users game list
export default async function handler(req, res) {
  // get user session
  const { data: session } = useSession();

  // Status Translation:
  const status = ["Backlog", "In Progress", "Finished", "Retired"];

  // Verify user session
  if (!session.user) {
    return res
      .status(400)
      .json({ message: "Error in request to add game to user list." });
  }

  // If POST request...
  if (req.method === "POST") {
    const userData = req.body;
    console.log(userData);

    // Verify req body
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Error in request to retrieve user list." });
    }

    let userList = await Games.find({ userID: userData.userID });

    console.log(userList);

    // userList = [
    //   userList.map((element) => {
    //     element.status = status[element.status];
    //     return element;
    //   }),
    // ];

    return userList;
  } else
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
}
