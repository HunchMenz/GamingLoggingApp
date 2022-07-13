import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  username: String,
  password: String,
  provider: String,
  emailVerified: Boolean,
});

module.exports = mongoose.models.Users || mongoose.model("Users", UsersSchema);
