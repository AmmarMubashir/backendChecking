const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);

const connectToMongodb = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in connecting to Mongodb", error.message);
  }
};

app.listen("7000", () => {
  connectToMongodb();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
