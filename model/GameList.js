import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    IGDB_id: Number,
    position: Number,
  },
  { timestamps: true }
);

const listSchema = new mongoose.Schema({
  name: String,
  theme: String,
  games: [GameSchema],
});

const GameListSchema = new mongoose.Schema({
  userID: mongoose.ObjectId,
  gameList: [listSchema],
});

module.exports =
  mongoose.models.GameList || mongoose.model("GameList", GameListSchema);
