const mongoose = require("mongoose");

const IncomeStatementModel = mongoose.Schema({
  income: [
    {
      Revenues: {
        "Sales From Home": {
          type: Number,
          required: [true, "Please provide sales from home"],
        },
        "Sales From Opportunities": {
          type: Number,
          default: 0,
        },
        "Additional Income": {
          type: Number,
          required: [true, "Please provide additional income"],
        },
        "Total Revenue": {
          type: Number,
          required: [true, "Please provide total revenue"],
        },
      },
      "Expenses And Costs": {
        "Cost Of Goods Sold": {
          type: Number,
          required: [true, "Please provide cost of goods sold"],
        },
        Lease: {
          type: Number,
          required: [true, "Please provide lease"],
        },
        Marketing: {
          type: Number,
          required: [true, "Please provide marketing"],
        },
        "Budjeted Salaries": {
          type: Number,
          required: [true, "Please provide budgeted salaries"],
        },
        "Extra Expenditure": {
          type: Number,
          required: [true, "Please provide data expenditure"],
        },
        "Delivery Van Expenses": {
          type: Number,
          required: [true, "Please provide delivery van expenses"],
        },
        "Initial Expenditure": {
          type: Number,
          required: [true, "Please provide initial expenditure"],
        },
        "Total Cost And Expenses": {
          type: Number,
          required: [true, "Please provide total cost and expenses"],
        },
      },
      EBITIDA: {
        type: Number,
        required: [true, "Please provide EBITIDA"],
      },
      Depreciation: {
        type: Number,
        require: [true, "Please provide depreciation"],
      },
      EBIT: {
        type: Number,
        required: [true, "Please provide EBIT"],
      },
      Interest: {
        type: Number,
        required: [true, "Please provide Interest"],
      },
      "PRETAX INCOME": {
        type: Number,
        required: [true, "Please provide pre-tax income"],
      },
      "Net Operating Loss": {
        type: Number,
        required: [true, "Please provide net operating loss"],
      },
      "Use Of Net Operating Loss": {
        type: Number,
        required: [true, "Please provide use of net operating loss"],
      },
      "Taxable Income": {
        type: Number,
        required: [true, "Please provide taxable income"],
      },
      "Income Tax Expense": {
        type: Number,
        required: [true, "Please provide income tax expense"],
      },
      "NET INCOME": {
        type: Number,
        required: [true, "Please provide net income"],
      },
    },
  ],
});

module.exports = mongoose.model("IncomeStatement", IncomeStatementModel);
