import bcrypt from "bcrypt";
import Credentials from "../../database/user_data/model/Credentials";

export default async function handler(req, res) {
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
  const userExist = await Credentials.findOne({ query });

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
  };
  const user = new Credentials(newUser);
  await user.save();

  return res.status(200).json({ message: "Registered Successfully" });
}
