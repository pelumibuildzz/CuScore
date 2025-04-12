const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const dropAllData = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log("Connected to the database");

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.drop();
      console.log(`Dropped collection: ${collection.name}`);
    }

    console.log("All data dropped successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error dropping data:", error);
    mongoose.connection.close();
  }
};

dropAllData();
