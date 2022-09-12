import bcrypt from "bcrypt";
import { MD5 } from "crypto-js";
import User from "../../../model/User";
import GameList from "../../../model/GameList";
import dbConnect from "../../../utils/lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect("user_data");
  // Register
  if (req.method === "POST") {
    const body = req.body;

    for (const key in body) {
      if (body[key] === "") {
        return res
          .status(400)
          .json({ message: "Must fill out all required fields to register." });
      }
    }

    const query = {
      email: body.email,
    };
    const userExist = await User.findOne(query);

    if (userExist) {
      return res
        .status(200)
        .json({ message: "User already exists with submitted email." });
    }

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hashedPass = await bcrypt.hash(body.password, salt);

    const newUser = {
      username: body.username,
      email: body.email,
      password: hashedPass,
      image: `http://www.gravatar.com/avatar/${MD5(body.email)}?d=identicon`,
      provider: "credential",
    };
    const user = new User(newUser);
    const userDoc = await user.save();

    //** Create Blank Gamelist for User */=
    const newGameList = {
      userID: userDoc._id,
      gameList: [
        { name: "Backlog", theme: "default", games: [] },
        { name: "In Progress", theme: "default", games: [] },
        { name: "Finished", theme: "default", games: [] },
        { name: "Retired", theme: "default", games: [] },
      ],
    };

    const gamelist = new GameList(newGameList);
    await gamelist.save();

    return res.status(200).json({ message: "Registered Successfully" });
  }
  // Get user info
  else if (req.method === "GET") {
    const params = req.query;
    const user = await User.findOne({ email: params.email });
    res.status(200).json({
      message: "Retrieved user info",
      data: user,
    });

    return;
  }
  return res.status(401).json({
    message: "Error in completing request: invalid request method.",
  });
}
