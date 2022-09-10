import mongoose from "mongoose";

const GamesSchema = new mongoose.Schema({
  userID: String,
  gameID: Number,
  status: Number,
  dateAdded: Date,
  dateRemoved: Date,
  dateModified: Date,
});

module.exports = mongoose.models.Games || mongoose.model("Games", GamesSchema);

/** Status Translations:
 * 0 = backlog (NOTE: is default when adding game to user list)
 * 1 = in progress
 * 2 = finished
 * 3 = retired
 */
