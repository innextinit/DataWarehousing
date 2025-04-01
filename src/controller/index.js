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
      try {
        await DailyModel.insertMany(dailyResults); // Save to MongoDB
        res.send("CSV data uploaded to MongoDB");
      } catch (error) {
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
      try {
        await EventModel.insertMany(eventResults); // Save to MongoDB
        res.send("CSV data uploaded to MongoDB");
      } catch (error) {
        res.status(500).send("Error inserting data");
      }
    });
}

// create unique user from event count
async function createEvent(req, res) {
  const { file } = req;

  try {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => eventResults.push(data))
      .on("end", async () => {
        try {
          console.log(eventResults);
          res.send("CSV data uploaded to MongoDB");
        } catch (error) {
          res.status(500).send("Error inserting data");
        }
      });
    return res.status(200);
  } catch (error) {
    return res.status(500).send("Error creating event");
  }
}

async function createDailyModel(req, res) {
  const { file } = req;

  try {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => eventResults.push(data))
      .on("end", async () => {
        try {
          console.log(eventResults);
          res.send("CSV data uploaded to MongoDB");
        } catch (error) {
          res.status(500).send("Error inserting data");
        }
      });
    return res.status(200);
  } catch (error) {
    return res.status(500).send("Error creating daily model");
  }
}

// if user exists, update event count, if not, insert new user

// get all  users

// get a user by id with events for that user

// search event by network name e.g PushEvent

// search network by hour to get all users within that hour

// get all users with opened, closed

// leaderboard of all event (e.g PushEvent with a count of 100)

// delete a user by id

// find the relationship between users and conversation

module.exports = {
  helloController,
  uploadDailyNetwork,
  uploadEventCount,
  createEvent,
  createDailyModel,
};
