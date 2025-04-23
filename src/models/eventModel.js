const mongoose = require("mongoose");

const fields = {};
for (let i = 0; i < 24; i++) {
  fields[i.toString()] = { type: Number, required: true };
}

const DataSchema = new mongoose.Schema({
  convo: [
    {
      id: { type: String },
      hr_of_the_day: [{ type: Number }],
      total_of_the_day: { type: Number, default: 0 },
    },
  ],
  user: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("EventModel", DataSchema);
