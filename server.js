require("dotenv").config();
require("./src/config/database");

const express = require("express");
const home = require("./src/router/index");

const app = express();

app.use("/", home);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
