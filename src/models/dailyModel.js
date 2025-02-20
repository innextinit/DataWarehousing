const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
  Date: { type: String, required: true },
  HH_MM_SS: { type: String, required: true },
  EventType: { type: String, required: true },
  UserID: { type: String, required: true },
  RepoID: { type: String, required: true },
  Status1: { type: String, required: false },
  Status2: { type: String, required: false },
});

module.exports = mongoose.model("DailyModel", DataSchema);
