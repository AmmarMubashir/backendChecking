const express = require("express");

const app = express();

app.use(express.json());
// imports
const user = require("./routes/userRoutes");

app.get("/", () => {
  res.status(200).json("Welcome");
});
app.get("/health", (req, res) => {
  res.status(200).json("Health checking");
});

app.use("/api/v1", user);

module.exports = app;
