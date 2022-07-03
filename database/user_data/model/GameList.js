import mongoose from "mongoose";

const GameListSchema = new mongoose.Schema({
  userID: Number,
  listByStatus: {
    0: Array,
    1: Array,
    2: Array,
    3: Array,
  },
});

module.exports =
  mongoose.models.GameList || mongoose.model("GameList", GameListSchema);

/** Status Translations:
 * 0 = backlog (NOTE: is default when adding game to user list)
 * 1 = in progress
 * 2 = finished
 * 3 = retired
 */
