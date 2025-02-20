const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const EventModel = require("../models/eventModel");
const DailyModel = require("../models/dailyModel");
const dailyResults = [];
const eventResults = [];

const helloController = (req, res) => {
  res.send("Hello World!");
};

const daily_path = path.join(__dirname, process.env.DAILY_PATH);
async function uploadDailyNetwork(req, res) {
  fs.createReadStream(daily_path)
    .pipe(csv())
    .on("data", (data) => dailyResults.push(data))
    .on("end", async () => {
      // console.log(dailyResults);
      try {
        await DailyModel.insertMany(dailyResults); // Save to MongoDB
        res.send("CSV data uploaded to MongoDB");
      } catch (error) {
        // console.log(error);
        // console.log(DailyModel.insertMany(results));
        res.status(500).send("Error inserting data");
      }
    });
}

const event_path = path.join(__dirname, process.env.EVENT_PATH);
async function uploadEventCount(req, res) {
  fs.createReadStream(event_path)
    .pipe(csv())
    .on("data", (data) => eventResults.push(data))
    .on("end", async () => {
      // console.log(results);
      try {
        await EventModel.insertMany(eventResults); // Save to MongoDB
        res.send("CSV data uploaded to MongoDB");
      } catch (error) {
        // console.log(EventModel.insertMany(results);
        res.status(500).send("Error inserting data");
      }
    });
}

module.exports = { helloController, uploadDailyNetwork, uploadEventCount };
