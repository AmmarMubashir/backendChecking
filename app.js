const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

// imports
const user = require("./routes/userRoutes");
const startup = require("./routes/startupRoutes");
const income = require("./routes/IncomeRoutes");
const admin = require("./routes/adminRoute");
const quarter1 = require("./routes/quarter1Route");
const quarter2 = require("./routes/quarter2Route");
const quarter3 = require("./routes/quarter3Routes");
const quarter4 = require("./routes/quarter4Routes");
const employee = require("./routes/employeeRoute");
const quarter1EmpInfo = require("./routes/quarter1EmployeeRoutes");
const quarter2EmpInfo = require("./routes/quarter2EmployeeRoutes");
const quarter3EmpInfo = require("./routes/quarter3EmployeeRoutes");
const quarter4EmpInfo = require("./routes/quarter4EmployeeRoutes");

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/health", (req, res) => {
  res.status(200).json("Health checking");
});

app.use("/api/v1", user);
app.use("/api/v1", startup);
app.use("/api/v1/quarter1", quarter1);
app.use("/api/v1/quarter2", quarter2);
app.use("/api/v1/quarter3", quarter3);
app.use("/api/v1/quarter4", quarter4);
app.use("/api/v1", income);
app.use("/api/v1", admin);
app.use("/api/v1/employee", employee);
app.use("/api/v1/quarter1Emp", quarter1EmpInfo);
app.use("/api/v1/quarter2Emp", quarter2EmpInfo);
app.use("/api/v1/quarter3Emp", quarter3EmpInfo);
app.use("/api/v1/quarter4Emp", quarter4EmpInfo);
module.exports = app;
