const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventModel",
  },
  user: {
    type: String,
    required: true,
  },
  Date: { type: Date, default: new Date() },
  HH_MM_SS: { type: String, default: "00:00:00" },
  EventType: {
    type: String,
    enum: [
      "PushEvent",
      "IssueCommentEvent",
      "PullRequestEvent",
      "CreateEvent",
      "PullRequestReviewCommentEvent",
      "WatchEvent",
      "IssuesEvent",
      "ForkEvent",
      "DeleteEvent",
      "GollumEvent",
      "CommitCommentEvent",
      "PublicEvent",
    ],
  },
  repo: {
    id: { type: String },
    status: { type: String, enum: ["closed", "opened"] },
    state: { type: Boolean },
  },
});

module.exports = mongoose.model("DailyModel", DataSchema);
