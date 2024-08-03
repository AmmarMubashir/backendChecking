const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  Position: {
    type: String,
    required: [true, "Please provide Positon"],
  },
  "Salaries per quarter": {
    type: Number,
    required: [true, "Please provde Salaries per quarter"],
  },
});

const Quarter3EmployeeSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  positions: [positionSchema],
});

module.exports = mongoose.model("Quarter3Employee", Quarter3EmployeeSchema);
