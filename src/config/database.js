const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const mongoose = require("mongoose");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

const run = async () => {
  try {
    const database = await client.db("dev");
    const daily_networks_collection = database.collection("daily_networks");

    const daily_networks = await daily_networks_collection.findOne({
      _id: new ObjectId("67ae6a80a746f572cb610db3"),
    });

    console.log(daily_networks);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

module.exports = { run };
