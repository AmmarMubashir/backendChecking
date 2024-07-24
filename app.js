const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
};

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/files", express.static("files"));

// ********** multer

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

exports.upload = multer({ storage });

// app.post("/upload-files", upload.single("file"), async (req, res) => {
//   console.log(req.file);
// });

// imports
const user = require("./routes/userRoutes");
const quarter = require("./routes/quarterRoutes");
const income = require("./routes/IncomeRoutes");
const admin = require("./routes/adminRoute");
const quarter2 = require("./routes/quarter2Route");
const quarter3 = require("./routes/quarter3Route");
const pdf = require("./routes/pdfRoute");

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/health", (req, res) => {
  res.status(200).json("Health checking");
});

app.use("/api/v1", user);
app.use("/api/v1", quarter);
app.use("/api/v1/quarter2", quarter2);
app.use("/api/v1/quarter3", quarter3);
app.use("/api/v1", income);
app.use("/api/v1", admin);
app.use("/api/v1", pdf);

module.exports = app;
