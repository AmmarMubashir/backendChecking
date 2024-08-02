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
  Income: {
    type: Number,
    required: [true, "Please provide income"],
  },
});

const EmployeeSchema = new mongoose.Schema({
  positions: [positionSchema],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
