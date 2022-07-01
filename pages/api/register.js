import bcrypt from "bcrypt";
import clientPromise from "./auth/lib/mongodb";

export default async function handler(req, res) {
  const body = req.body;
  const connection = await clientPromise;
  const db_user = await connection.db("user_data");
  const query = {
    email: body.email,
  };
  const user = await db_user.collection("credentials").findOne(query);

  if (user) {
    res
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
  await db_user.collection("credentials").insertOne(newUser);

  res.status(200).json({ message: "Registered Successfully" });
}
