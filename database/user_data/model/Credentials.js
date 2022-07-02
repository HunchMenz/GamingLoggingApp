import mongoose from "mongoose";

const CredentialsSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports =
  mongoose.models.Credentials ||
  mongoose.model("Credentials", CredentialsSchema);
