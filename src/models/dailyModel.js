const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const DataSchema = new mongoose.Schema({
  User: { type: ObjectId, ref: "User" },
  Date: { type: String, required: true },
  HH_MM_SS: { type: String, required: true },
  EventType: { type: String, required: true },
  UserID: { type: String, required: true },
  RepoID: { type: String, required: true },
  Status1: { type: String, required: false },
  Status2: { type: String, required: false },
});

module.exports = mongoose.model("DailyModel", DataSchema);
