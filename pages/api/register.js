import bcrypt from "bcrypt";
import { MD5 } from "crypto-js";
import Users from "../../database/user_data/model/Users";

export default async function handler(req, res) {
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
    const userExist = await Users.findOne(query);

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
    const user = new Users(newUser);
    await user.save();

    return res.status(200).json({ message: "Registered Successfully" });
  } else
    return res.status(401).json({
      message: "Error in completing request: invalid request method.",
    });
}
