import bcrypt from "bcrypt";
import { MD5 } from "crypto-js";
import Users from "../../../model/Users";
import { connectToDatabase } from "../../../utils/lib/db";

export default async function handler(req, res) {
  await connectToDatabase();
  // Register
  if (req.method === "POST") {
    const body = req.body;

    for (const key in body) {
      if (body[key] === "") {
        res
          .status(400)
          .json({ message: "Must fill out all required fields to register." });
        return;
      }
    }

    const query = {
      email: body.email,
    };
    const userExist = await User.findOne(query);

    if (userExist) {
      res.status(200).json({
        message: "User already exists with submitted email.",
        data: userExist,
      });
      return;
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
    await user.save();

    res.status(200).json({ message: "Registered Successfully", data: user });
    return;
  }
  // Get user info by username
  else if (req.method === "GET") {
    const params = req.query;
    try {
      const user = await Users.findOne({
        username: {
          $regex: new RegExp(params.username, "i"),
        },
      });
      if (!user) {
        res.status(422).json({
          message: "Failed: Unable to find user info.",
        });
      } else {
        res.status(200).json({
          message: "Retrieved user info",
          data: user,
        });
      }
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
