require("dotenv").config();
const mongodb = require("./src/config/database");
mongodb.run();

const express = require("express");

const app = express();

const PORT = process.env.PORT;

//routing path
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
