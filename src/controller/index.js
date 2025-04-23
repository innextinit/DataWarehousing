const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

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
  const eventResults = [];

  try {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => {
        const repoId = data.RepoID || data.Convo; // Depending on your CSV header
        const user = data.User;

        // Extract only hour keys (0-23)
        const hours = [];
        for (let key in data) {
          if (!isNaN(key) && Number(key) >= 0 && Number(key) <= 23) {
            hours.push(Number(key));
          }
        }

        const convoEntry = {
          id: repoId,
          hr_of_the_day: hours,
          total_of_the_day: parseInt(data.Total),
        };

        if (repoId && user) {
          eventResults.push({
            user: user,
            convo: [convoEntry],
          });
        }
      })
      .on("end", async () => {
        try {
          for (let record of eventResults) {
            await EventModel.findOneAndUpdate(
              { user: record.user },
              { $push: { convo: { $each: record.convo } } },
              { upsert: true }
            );
          }
          res.send("EventCounts CSV data uploaded to MongoDB");
        } catch (error) {
          console.error(error);
          res.status(500).send("Error inserting EventCounts data");
        }
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error processing EventCounts CSV");
  }
}

async function createDailyModel(req, res) {
  const { file } = req;
  const dailyResults = [];

  // Define headers manually since CSV lacks them
  const headers = [
    "Date",
    "HH_MM_SS",
    "EventType",
    "UserID",
    "RepoID",
    "Status1",
    "Status2",
  ];

  try {
    fs.createReadStream(file.path)
      .pipe(csv({ headers: headers, skipLines: 0 }))
      .on("data", (data) => {
        const user = data.UserID;
        const dateRaw = data.Date;
        const time = data.HH_MM_SS;

        const parsedDate = dayjs(dateRaw, "YYYY-MM-DD", true);
        if (!parsedDate.isValid() || !user) {
          console.warn(`Skipping invalid row: Date=${dateRaw}, User=${user}`);
          return;
        }

        dailyResults.push({
          user: user,
          Date: parsedDate.toDate(),
          HH_MM_SS: time,
          EventType: data.EventType,
          repo: {
            id: data.RepoID,
            status: data.Status1 === "1" ? "opened" : "closed",
            state: data.Status2 === "1",
          },
        });
      })
      .on("end", async () => {
        try {
          await DailyModel.insertMany(dailyResults);
          res.send(
            `${dailyResults.length} Daily Network records uploaded to MongoDB`
          );
        } catch (error) {
          console.error(error);
          res.status(500).send("Error inserting Daily Network data");
        }
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error processing Daily Network CSV");
  }
}

// if user exists, update event count, if not, insert new user
async function upsertEventCount(req, res) {
  const { file } = req;

  if (!file) {
    return res
      .status(400)
      .send(
        "No file uploaded. Please upload a CSV file with key 'EventCounts'."
      );
  }

  const eventResults = [];

  try {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (data) => {
        const repoId = data.Convo;
        const user = data.User;

        const hours = [];
        for (let i = 0; i < 24; i++) {
          if (parseInt(data[i]) > 0) {
            hours.push(i);
          }
        }

        const total = parseInt(data.Total);

        if (repoId && user) {
          eventResults.push({
            user: user,
            convo: {
              id: repoId,
              hr_of_the_day: hours,
              total_of_the_day: total,
            },
          });
        }
      })
      .on("end", async () => {
        try {
          for (let record of eventResults) {
            await EventModel.findOneAndUpdate(
              { user: record.user },
              { $push: { convo: record.convo } },
              { upsert: true, new: true }
            );
          }
          res.send(
            `${eventResults.length} records processed and upserted successfully`
          );
        } catch (error) {
          console.error(error);
          res.status(500).send("Error during upsert operation");
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to process EventCounts file");
  }
}

// get all  users
async function getAllUsers(req, res) {
  try {
    const users = await EventModel.find({}, "user");
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
}

// get a user by id with events for that user
async function getUserById(req, res) {
  try {
    const user = await EventModel.findOne({ user: req.params.id });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
}

// search event by network name e.g PushEvent
async function searchEventByType(req, res) {
  const { type } = req.query;

  if (!type) {
    return res
      .status(400)
      .send("Please provide an 'eventType' query parameter.");
  }

  try {
    const events = await DailyModel.find({ EventType: type });
    res.json(events);
  } catch (error) {
    res.status(500).send("Error searching events");
  }
}

// search network by hour to get all users within that hour
async function searchByHour(req, res) {
  const { hour } = req.query;

  if (!hour) {
    return res.status(400).send("Please provide an 'hour' query parameter.");
  }

  try {
    const users = await EventModel.find({
      "convo.hr_of_the_day": parseInt(hour),
    });
    res.json(users);
  } catch (error) {
    res.status(500).send("Error searching by hour");
  }
}

// get all users with opened, closed
async function getUsersByRepoStatus(req, res) {
  const { status } = req.query; // 'opened' or 'closed'

  if (!status) {
    return res.status(400).send("Please provide an 'status' query parameter.");
  }
  try {
    const users = await DailyModel.find({ "repo.status": status });
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users by repo status");
  }
}

// leaderboard of all event (e.g PushEvent with a count of 100)
async function eventLeaderboard(req, res) {
  try {
    const leaderboard = await DailyModel.aggregate([
      { $group: { _id: "$EventType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).send("Error generating leaderboard");
  }
}

// delete a user by id
async function deleteUserById(req, res) {
  try {
    const result = await EventModel.deleteOne({ user: req.params.id });
    if (result.deletedCount === 0)
      return res.status(404).send("User not found");
    res.send("User deleted");
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
}

// find the relationship between users and conversation
async function userConvoRelationship(req, res) {
  try {
    const data = await EventModel.find({}, "user convo");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching relationships");
  }
}

module.exports = {
  helloController,
  uploadDailyNetwork,
  uploadEventCount,
  createEvent,
  createDailyModel,
  //
  upsertEventCount,
  getAllUsers,
  getUserById,
  searchEventByType,
  searchByHour,
  getUsersByRepoStatus,
  eventLeaderboard,
  deleteUserById,
  userConvoRelationship,
};
