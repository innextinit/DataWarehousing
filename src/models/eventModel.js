const mongoose = require("mongoose");

const fields = {};
for (let i = 0; i < 24; i++) {
  fields[i.toString()] = { type: Number, required: true };
}

const DataSchema = new mongoose.Schema({
  Convo: { type: String, required: true },
  User: { type: String, required: true },
  eventCount: [{
    type: Number,
    default: 0
  }],
  // ...fields, // Spread the dynamically created fields
  Total: { type: Number, required: true },
});

module.exports = mongoose.model("EventModel", DataSchema);
