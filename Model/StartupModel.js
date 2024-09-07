const mongoose = require("mongoose");

const StartupSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please Enter your team name"],
  },
  members: {
    type: Number,
    required: [true, "Please provide no. of members"],
  },
  location: {
    type: String,
    required: [true, "Please Enter your  location"],
  },

  "No of Clients per day": {
    type: Number,
    default: 20,
  },
  "Average Price": {
    type: Number,
    default: 4,
  },
});

module.exports = mongoose.model("Startup", StartupSchema);
