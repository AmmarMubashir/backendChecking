const mongoose = require("mongoose");

const IncomeStatementModel = mongoose.Schema({
  income: [
    {
      Income: {
        "Sales from Home": {
          type: Number,
          required: [true, "Please provide sales from home"],
        },
        "Additional income": {
          type: Number,
          required: [true, "Please provide additional income"],
        },
        "Grants and donations": {
          type: Number,
          required: [true, "Please provide grants and donations"],
        },
        Loans: {
          type: Number,
          required: [true, "Please provide loans"],
        },
        "Income from opportunities": {
          type: Number,
          default: 0,
        },
        "Income from activities": {
          type: Number,
          default: 0,
        },
        "Total Income": {
          type: Number,
          required: [true, "Please provide total income"],
        },
      },
      Expenditure: {
        Purchases: {
          type: Number,
          required: [true, "Please provide purchases"],
        },
        Marketing: {
          type: Number,
          required: [true, "Please provide marketing"],
        },
        "Salaries and wages": {
          type: Number,
          required: [true, "Please provide salaries and wages"],
        },
        Training: {
          type: Number,
          required: [true, "Please provide training"],
        },
        "Expenses from opportunities": {
          type: Number,
          required: [true, "Please provide expenses from opportunities"],
        },
        "Costs from activities": {
          type: Number,
          default: 0,
        },
        "Expenses from other sources": {
          type: Number,
          required: [true, "Please provide expenses from other sources"],
        },
        "Travel cost": {
          type: Number,
          required: [true, "Please provide travel cost"],
        },
        Telephone: {
          type: Number,
          required: [true, "Please provide telephone"],
        },
        Utilities: {
          type: Number,
          required: [true, "Please provide utilities"],
        },
        "Loan repayment": {
          type: Number,
          required: [true, "Please provide loan repayment"],
        },
        "Rent and rates": {
          type: Number,
          required: [true, "Please provide loan rent and rates"],
        },
        "Professional fees": {
          type: Number,
          required: [true, "Please provide professional fees"],
        },
        "Sundry costs": {
          type: Number,
          required: [true, "Please provide sundry cost"],
        },
        "Additional cost": {
          type: Number,
          required: [true, "Please provide additional costs"],
        },
        Depreciation: {
          type: Number,
          require: [true, "Please provide depreciation"],
        },
        Interest: {
          type: Number,
          required: [true, "Please provide Interest"],
        },
        "Total Expenditure": {
          type: Number,
          required: [true, "Please provide total expenditure"],
        },
      },
      EBITIDA: {
        type: Number,
        required: [true, "Please provide EBITIDA"],
      },

      EBIT: {
        type: Number,
        required: [true, "Please provide EBIT"],
      },
      "PRETAX PROFIT": {
        type: Number,
        required: [true, "Please provide pre-tax income"],
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
