const uri = process.env.MONGODB_URI;
const mongoose = require("mongoose");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));
