const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("Database connection succcessfull"))
  .catch((error) => {
    console.log(error.message);
  });

app.listen("7000", () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
