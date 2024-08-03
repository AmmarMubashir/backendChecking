const mongoose = require("mongoose");

const Quarter3Model = mongoose.Schema({
  option1: {
    selected: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    otherCost: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    netProfit: {
      type: Number,
      required: true,
    },
  },
  option2: {
    selected: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    otherCost: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    netProfit: {
      type: Number,
      required: true,
    },
  },
  option3: {
    selected: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    otherCost: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    netProfit: {
      type: Number,
      required: true,
    },
  },
  "No of Clients per day": {
    type: Number,
    required: true,
  },
  "Average Price": {
    type: Number,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quarter3", Quarter3Model);
