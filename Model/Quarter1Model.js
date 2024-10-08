const mongoose = require("mongoose");

const Quarter1Model = mongoose.Schema({
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
  budget: {
    type: Number,
    default: 350,
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

module.exports = mongoose.model("Quarter1", Quarter1Model);
