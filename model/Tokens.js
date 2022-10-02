import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accessToken: { type: String, required: true },
  expiresOn: { type: Date, required: true },
});

module.exports =
  mongoose.models?.Tokens || mongoose.model("Tokens", TokenSchema);
