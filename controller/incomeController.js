const IncomeStatement = require("../Model/IncomeStatementModel");
const userQuarter1 = require("../Model/userQuarter1Model");
const userQuarter2 = require("../Model/userQuarter2Model");
const userQuarter3 = require("../Model/userQuarter3Model");
const userQuarter4 = require("../Model/userQuarter4Model");
const UserIncomeStatement = require("../Model/userIncomeModel");
const Quarter1Emp = require("../Model/quarter1EmployeeModel");
const Quarter2Emp = require("../Model/quarter2EmployeeModel");
const Quarter3Emp = require("../Model/quarter3EmployeeModel");
const Quarter4Emp = require("../Model/quarter4EmployeeModel");

// Create income statement

exports.createIncomeStatement = async (req, res) => {
  try {
    console.log(req.body);
    // console.log("HEllo");
    // console.log("Check")
    const incomeStatement = await IncomeStatement.create(req.body);

    res.status(201).json({ incomeStatement });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getIncomeStatement = async (req, res) => {
  try {
    const incomeStatement = await IncomeStatement.find();

    res.status(201).json(incomeStatement[0].income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createIncomeStatementForUser = async (req, res) => {
  try {
    let quarter1 = await userQuarter1.findOne({ id: req.user._id });
    const quarter1Emp = await Quarter1Emp.findOne({ id: req.user._id });

    let total = quarter1Emp.positions.reduce(
      (acc, curr) => acc + curr["Salaries per quarter"],
      0
    );
    // console.log(quarter2);

    let incomeData = await IncomeStatement.find({});
    incomeData = incomeData[0].income;

    let quarters = [];

    if (quarter1) {
      quarters.push(quarter1);
    }

    let incomes = [];
    for (let index = 0; index < 3; index++) {
      if (quarters[index]) {
        let opportunities = 0;
        let opportunityCost = 0;
        let OtherCost = 0;

        if (quarters[index].option1.selected) {
          opportunities += quarters[index].option1.income;
          opportunityCost += quarters[index].option1.cost;
          OtherCost += quarters[index].option1.otherCost;
        }
        if (quarters[index].option2.selected) {
          opportunities += quarters[index].option2.income;
          opportunityCost += quarters[index].option2.cost;
          OtherCost += quarters[index].option2.otherCost;
        }
        if (quarters[index].option3.selected) {
          opportunities += quarters[index].option3.income;
          opportunityCost += quarters[index].option3.cost;
          OtherCost += quarters[index].option3.otherCost;
        }

        console.log("OTHERCOST", OtherCost);

        // console.log(incomeData[index].Income["Sales From Home"]);

        let data;
        data = {
          Income: {
            "Sales from Home":
              quarters[index]["No of Clients per day"] *
              24 *
              3 *
              quarters[index]["Average Price"],
            "Additional income":
              incomeData[index]["Income"]["Additional income"],
            "Grants and donations":
              incomeData[index]["Income"]["Grants and donations"],
            Loans: incomeData[index]["Income"]["Loans"],
            "Income from opportunities": opportunities,
            "Income from activities":
              incomeData[index]["Income"]["Income from activities"],
            "Total Income": 0,
          },
        };

        // console.log(data);

        let totalRevenue = 0,
          totalExpensesAndCosts = 0;
        for (let key in data.Income) {
          totalRevenue += data.Income[key];
        }

        let CostAndExpenses = {
          Purchases: incomeData[index]["Income"]["Sales from Home"] / 2,
          Marketing: incomeData[index]["Expenditure"].Marketing,
          "Salaries and wages": total,
          Training: incomeData[index]["Expenditure"]["Training"],
          "Expenses from opportunities": opportunityCost,
          "Costs from activities":
            incomeData[index]["Expenditure"]["Costs from activities"],
          "Expenses from other sources": OtherCost,
          "Travel cost": incomeData[index]["Expenditure"]["Travel cost"],
          Telephone: incomeData[index]["Expenditure"]["Telephone"],
          Utilities: incomeData[index]["Expenditure"]["Utilities"],
          "Loan repayment": incomeData[index]["Expenditure"]["Loan repayment"],
          "Rent and rates": incomeData[index]["Expenditure"]["Rent and rates"],
          "Professional fees":
            incomeData[index]["Expenditure"]["Professional fees"],
          "Sundry costs": incomeData[index]["Expenditure"]["Sundry costs"],
          "Additional cost":
            incomeData[index]["Expenditure"]["Additional cost"],
        };

        for (let key1 in CostAndExpenses) {
          totalExpensesAndCosts += CostAndExpenses[key1];
        }

        CostAndExpenses = {
          ...CostAndExpenses,
          "Total Expenditure": totalExpensesAndCosts,
        };

        // // console.log(totalRevenue);
        data.Income = {
          ...data.Income,
          "Total Income": totalRevenue,
        };

        data["Expenditure"] = CostAndExpenses;
        // console.log(data);

        data = {
          ...data,
          EBITIDA:
            data.Income["Total Income"] -
            data["Expenditure"]["Total Expenditure"],
          Depreciation: incomeData[index]["Depreciation"],
          EBIT:
            data.Income["Total Income"] -
            data["Expenditure"]["Total Expenditure"] +
            incomeData[index]["Depreciation"],
          Interest: incomeData[index]["Interest"],
          "PRETAX INCOME":
            data.Income["Total Income"] -
            data["Expenditure"]["Total Expenditure"] +
            incomeData[index]["Depreciation"] -
            incomeData[index]["Interest"],
          "Net Operating Loss":
            data.Income["Total Income"] -
              data["Expenditure"]["Total Expenditure"] +
              incomeData[index]["Depreciation"] -
              incomeData[index]["Interest"] <
            0
              ? data.Income["Total Income"] -
                data["Expenditure"]["Total Expenditure"] +
                incomeData[index]["Depreciation"] -
                incomeData[index]["Interest"] +
                0
              : 0,
        };

        data = {
          ...data,
          "Use Of Net Operating Loss":
            data["Net Operating Loss"] < 0
              ? 0
              : Math.min(data["PRETAX INCOME"], data["Net Operating Loss"]),
        };
        data = {
          ...data,
          "Taxable Income":
            data["PRETAX INCOME"] - data["Use Of Net Operating Loss"] < 0
              ? 0
              : data["PRETAX INCOME"] - data["Use Of Net Operating Loss"],
          "Income Tax Expense": incomeData[index]["Income Tax Expense"],
        };

        data = {
          ...data,
          "NET INCOME": data["PRETAX INCOME"] - data["Income Tax Expense"],
        };

        incomes.push(data);
      }
    }
    if (incomes.length > 0) {
      let incomeDetails = {
        id: req.user._id,
        income: incomes,
      };
      const incomeStatement = await UserIncomeStatement.create(incomeDetails);

      res.status(201).json({ incomeStatement });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getUserIncomeStatement = async (req, res) => {
  try {
    const incomeStatement = await UserIncomeStatement.findOne({
      id: req.user._id,
    });

    res.status(201).json(incomeStatement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateIncomeStatementForUser = async (req, res) => {
  try {
    console.log("HIII");
    // res.send("HII");
    let quarter2 = await userQuarter2.findOne({ id: req.user._id });
    const quarter2Emp = await Quarter2Emp.findOne({ id: req.user._id });

    let total = quarter2Emp.positions.reduce(
      (acc, curr) => acc + curr["Salaries per quarter"],
      0
    );
    let userIncome = await UserIncomeStatement.findOne({ id: req.user._id });

    userIncome = userIncome.income;

    let incomeData = await IncomeStatement.find({});
    incomeData = incomeData[0].income;

    // console.log(userIncome);

    // let quarters = [];

    // if (quarter2) {
    //   quarters.push(quarter2);
    // }

    let incomes;
    if (quarter2) {
      let opportunities = 0;
      let opportunityCost = 0;
      let OtherCost = 0;

      if (quarter2.option1.selected) {
        opportunities += quarter2.option1.income;
        opportunityCost += quarter2.option1.cost;
        OtherCost += quarter2.option1.otherCost;
      }
      if (quarter2.option2.selected) {
        opportunities += quarter2.option2.income;
        opportunityCost += quarter2.option2.cost;
        OtherCost += quarter2.option2.otherCost;
      }
      if (quarter2.option3.selected) {
        opportunities += quarter2.option3.income;
        opportunityCost += quarter2.option3.cost;
        OtherCost += quarter2.option3.otherCost;
      }

      console.log("OTHERCOST", OtherCost);

      let data;
      data = {
        Income: {
          "Sales from Home":
            quarter2["No of Clients per day"] *
            24 *
            3 *
            quarter2["Average Price"],
          "Additional income": incomeData[1]["Income"]["Additional income"],
          "Grants and donations":
            incomeData[1]["Income"]["Grants and donations"],
          Loans: incomeData[1]["Income"]["Loans"],
          "Income from opportunities": opportunities,
          "Income from activities":
            incomeData[1]["Income"]["Income from activities"],
          "Total Income": 0,
        },
      };

      let totalRevenue = 0,
        totalExpensesAndCosts = 0;
      for (let key in data.Income) {
        totalRevenue += data.Income[key];
      }

      let CostAndExpenses = {
        Purchases: incomeData[1]["Income"]["Sales from Home"] / 2,
        Marketing: incomeData[1]["Expenditure"].Marketing,
        "Salaries and wages": total,
        Training: incomeData[1]["Expenditure"]["Training"],
        "Expenses from opportunities": opportunityCost,
        "Costs from activities":
          incomeData[1]["Expenditure"]["Costs from activities"],
        "Expenses from other sources": OtherCost,
        "Travel cost": incomeData[1]["Expenditure"]["Travel cost"],
        Telephone: incomeData[1]["Expenditure"]["Telephone"],
        Utilities: incomeData[1]["Expenditure"]["Utilities"],
        "Loan repayment": incomeData[1]["Expenditure"]["Loan repayment"],
        "Rent and rates": incomeData[1]["Expenditure"]["Rent and rates"],
        "Professional fees": incomeData[1]["Expenditure"]["Professional fees"],
        "Sundry costs": incomeData[1]["Expenditure"]["Sundry costs"],
        "Additional cost": incomeData[1]["Expenditure"]["Additional cost"],
      };

      for (let key1 in CostAndExpenses) {
        totalExpensesAndCosts += CostAndExpenses[key1];
      }

      CostAndExpenses = {
        ...CostAndExpenses,
        "Total Expenditure": totalExpensesAndCosts,
      };

      data.Income = {
        ...data.Income,
        "Total Income": totalRevenue,
      };

      data["Expenditure"] = CostAndExpenses;

      data = {
        ...data,
        EBITIDA:
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"],
        Depreciation: incomeData[1]["Depreciation"],
        EBIT:
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"] +
          incomeData[1]["Depreciation"],
        Interest: incomeData[1]["Interest"],
        "PRETAX INCOME":
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"] +
          incomeData[1]["Depreciation"] -
          incomeData[1]["Interest"],
        "Net Operating Loss":
          data.Income["Total Income"] -
            data["Expenditure"]["Total Expenditure"] +
            incomeData[1]["Depreciation"] -
            incomeData[1]["Interest"] <
          0
            ? data.Income["Total Income"] -
              data["Expenditure"]["Total Expenditure"] +
              incomeData[1]["Depreciation"] -
              incomeData[1]["Interest"] +
              0
            : 0,
      };

      data = {
        ...data,
        "Use Of Net Operating Loss":
          data["Net Operating Loss"] < 0
            ? 0
            : Math.min(data["PRETAX INCOME"], data["Net Operating Loss"]),
      };
      data = {
        ...data,
        "Taxable Income":
          data["PRETAX INCOME"] - data["Use Of Net Operating Loss"] < 0
            ? 0
            : data["PRETAX INCOME"] - data["Use Of Net Operating Loss"],
        "Income Tax Expense": incomeData[1]["Income Tax Expense"],
      };

      data = {
        ...data,
        "NET INCOME": data["PRETAX INCOME"] - data["Income Tax Expense"],
      };

      incomes = data;
    }
    // }

    // console.log(incomes);
    let incomeDetails;
    if (incomes) {
      // incomes = [...userIncome, { ...incomes }];
      incomeDetails = {
        id: req.user._id,
        income: [...userIncome, incomes],
      };

      console.log(incomes);

      const updatedIncomeStatement = await UserIncomeStatement.updateOne(
        { id: req.user._id },
        incomeDetails,
        { new: true }
      );

      res.status(201).json({ updatedIncomeStatement });
    }
  } catch (error) {
    console.log("Error in update user income statement", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.updateIncomeStatementForQuarter3 = async (req, res) => {
  try {
    console.log("HIII");
    // res.send("HII");
    let quarter3 = await userQuarter3.findOne({ id: req.user._id });
    const quarter3Emp = await Quarter3Emp.findOne({ id: req.user._id });

    let total = quarter3Emp.positions.reduce(
      (acc, curr) => acc + curr["Salaries per quarter"],
      0
    );
    let userIncome = await UserIncomeStatement.findOne({ id: req.user._id });

    userIncome = userIncome.income;

    let incomeData = await IncomeStatement.find({});
    incomeData = incomeData[0].income;

    // console.log(userIncome);

    // let quarters = [];

    // if (quarter3) {
    //   quarters.push(quarter3);
    // }

    let incomes;
    if (quarter3) {
      let opportunities = 0;
      let opportunityCost = 0;
      let OtherCost = 0;

      if (quarter3.option1.selected) {
        opportunities += quarter3.option1.income;
        opportunityCost += quarter3.option1.cost;
        OtherCost += quarter3.option1.otherCost;
      }
      if (quarter3.option2.selected) {
        opportunities += quarter3.option2.income;
        opportunityCost += quarter3.option2.cost;
        OtherCost += quarter3.option2.otherCost;
      }
      if (quarter3.option3.selected) {
        opportunities += quarter3.option3.income;
        opportunityCost += quarter3.option3.cost;
        OtherCost += quarter3.option3.otherCost;
      }

      console.log("OTHERCOST", OtherCost);

      let data;
      data = {
        Income: {
          "Sales from Home":
            quarter3["No of Clients per day"] *
            24 *
            3 *
            quarter3["Average Price"],
          "Additional income": incomeData[2]["Income"]["Additional income"],
          "Grants and donations":
            incomeData[2]["Income"]["Grants and donations"],
          Loans: incomeData[2]["Income"]["Loans"],
          "Income from opportunities": opportunities,
          "Income from activities":
            incomeData[2]["Income"]["Income from activities"],
          "Total Income": 0,
        },
      };

      let totalRevenue = 0,
        totalExpensesAndCosts = 0;
      for (let key in data.Income) {
        totalRevenue += data.Income[key];
      }

      let CostAndExpenses = {
        Purchases: incomeData[2]["Income"]["Sales from Home"] / 2,

        Marketing: incomeData[2]["Expenditure"].Marketing,
        "Salaries and wages": total,
        Training: incomeData[2]["Expenditure"]["Training"],
        "Expenses from opportunities": opportunityCost,
        "Costs from activities":
          incomeData[2]["Expenditure"]["Costs from activities"],
        "Expenses from other sources": OtherCost,
        "Travel cost": incomeData[2]["Expenditure"]["Travel cost"],
        Telephone: incomeData[2]["Expenditure"]["Telephone"],
        Utilities: incomeData[2]["Expenditure"]["Utilities"],
        "Loan repayment": incomeData[2]["Expenditure"]["Loan repayment"],
        "Rent and rates": incomeData[2]["Expenditure"]["Rent and rates"],
        "Professional fees": incomeData[2]["Expenditure"]["Professional fees"],
        "Sundry costs": incomeData[2]["Expenditure"]["Sundry costs"],
        "Additional cost": incomeData[2]["Expenditure"]["Additional cost"],
      };

      for (let key1 in CostAndExpenses) {
        totalExpensesAndCosts += CostAndExpenses[key1];
      }

      CostAndExpenses = {
        ...CostAndExpenses,
        "Total Expenditure": totalExpensesAndCosts,
      };

      data.Income = {
        ...data.Income,
        "Total Income": totalRevenue,
      };

      data["Expenditure"] = CostAndExpenses;

      data = {
        ...data,
        EBITIDA:
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"],
        Depreciation: incomeData[2]["Depreciation"],
        EBIT:
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"] +
          incomeData[2]["Depreciation"],
        Interest: incomeData[2]["Interest"],
        "PRETAX INCOME":
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"] +
          incomeData[2]["Depreciation"] -
          incomeData[2]["Interest"],
        "Net Operating Loss":
          data.Income["Total Income"] -
            data["Expenditure"]["Total Expenditure"] +
            incomeData[2]["Depreciation"] -
            incomeData[2]["Interest"] <
          0
            ? data.Income["Total Income"] -
              data["Expenditure"]["Total Expenditure"] +
              incomeData[2]["Depreciation"] -
              incomeData[2]["Interest"] +
              0
            : 0,
      };

      data = {
        ...data,
        "Use Of Net Operating Loss":
          data["Net Operating Loss"] < 0
            ? 0
            : Math.min(data["PRETAX INCOME"], data["Net Operating Loss"]),
      };
      data = {
        ...data,
        "Taxable Income":
          data["PRETAX INCOME"] - data["Use Of Net Operating Loss"] < 0
            ? 0
            : data["PRETAX INCOME"] - data["Use Of Net Operating Loss"],
        "Income Tax Expense": incomeData[2]["Income Tax Expense"],
      };

      data = {
        ...data,
        "NET INCOME": data["PRETAX INCOME"] - data["Income Tax Expense"],
      };

      incomes = data;
    }
    // }

    // console.log(incomes);
    let incomeDetails;
    if (incomes) {
      // incomes = [...userIncome, { ...incomes }];
      incomeDetails = {
        id: req.user._id,
        income: [...userIncome, incomes],
      };

      console.log(incomes);

      const updatedIncomeStatement = await UserIncomeStatement.updateOne(
        { id: req.user._id },
        incomeDetails,
        { new: true }
      );

      res.status(201).json({ updatedIncomeStatement });
    }
  } catch (error) {
    console.log("Error in update user income statement", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.updateIncomeStatementForQuarter4 = async (req, res) => {
  try {
    console.log("HIII");
    // res.send("HII");
    let quarter4 = await userQuarter4.findOne({ id: req.user._id });
    const quarter4Emp = await Quarter4Emp.findOne({ id: req.user._id });

    let total = quarter4Emp.positions.reduce(
      (acc, curr) => acc + curr["Salaries per quarter"],
      0
    );
    let userIncome = await UserIncomeStatement.findOne({ id: req.user._id });

    userIncome = userIncome.income;

    let incomeData = await IncomeStatement.find({});
    incomeData = incomeData[0].income;

    // console.log(userIncome);

    // let quarters = [];

    // if (quarter4) {
    //   quarters.push(quarter4);
    // }

    let incomes;
    if (quarter4) {
      let opportunities = 0;
      let opportunityCost = 0;
      let OtherCost = 0;

      if (quarter4.option1.selected) {
        opportunities += quarter4.option1.income;
        opportunityCost += quarter4.option1.cost;
        OtherCost += quarter4.option1.otherCost;
      }
      if (quarter4.option2.selected) {
        opportunities += quarter4.option2.income;
        opportunityCost += quarter4.option2.cost;
        OtherCost += quarter4.option2.otherCost;
      }
      if (quarter4.option3.selected) {
        opportunities += quarter4.option3.income;
        opportunityCost += quarter4.option3.cost;
        OtherCost += quarter4.option3.otherCost;
      }

      console.log("OTHERCOST", OtherCost);

      let data;
      data = {
        Income: {
          "Sales from Home":
            quarter4["No of Clients per day"] *
            24 *
            3 *
            quarter4["Average Price"],
          "Additional income": incomeData[3]["Income"]["Additional income"],
          "Grants and donations":
            incomeData[3]["Income"]["Grants and donations"],
          Loans: incomeData[3]["Income"]["Loans"],
          "Income from opportunities": opportunities,
          "Income from activities":
            incomeData[3]["Income"]["Income from activities"],
          "Total Income": 0,
        },
      };

      let totalRevenue = 0,
        totalExpensesAndCosts = 0;
      for (let key in data.Income) {
        totalRevenue += data.Income[key];
      }

      let CostAndExpenses = {
        Purchases: incomeData[3]["Income"]["Sales from Home"] / 2,
        Marketing: incomeData[3]["Expenditure"].Marketing,
        "Salaries and wages": total,
        Training: incomeData[3]["Expenditure"]["Training"],
        "Expenses from opportunities": opportunityCost,
        "Costs from activities":
          incomeData[3]["Expenditure"]["Costs from activities"],
        "Expenses from other sources": OtherCost,
        "Travel cost": incomeData[3]["Expenditure"]["Travel cost"],
        Telephone: incomeData[3]["Expenditure"]["Telephone"],
        Utilities: incomeData[3]["Expenditure"]["Utilities"],
        "Loan repayment": incomeData[3]["Expenditure"]["Loan repayment"],
        "Rent and rates": incomeData[3]["Expenditure"]["Rent and rates"],
        "Professional fees": incomeData[3]["Expenditure"]["Professional fees"],
        "Sundry costs": incomeData[3]["Expenditure"]["Sundry costs"],
        "Additional cost": incomeData[3]["Expenditure"]["Additional cost"],
      };

      for (let key1 in CostAndExpenses) {
        totalExpensesAndCosts += CostAndExpenses[key1];
      }

      CostAndExpenses = {
        ...CostAndExpenses,
        "Total Expenditure": totalExpensesAndCosts,
      };

      data.Income = {
        ...data.Income,
        "Total Income": totalRevenue,
      };

      data["Expenditure"] = CostAndExpenses;

      data = {
        ...data,
        EBITIDA:
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"],
        Depreciation: incomeData[3]["Depreciation"],
        EBIT:
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"] +
          incomeData[3]["Depreciation"],
        Interest: incomeData[3]["Interest"],
        "PRETAX INCOME":
          data.Income["Total Income"] -
          data["Expenditure"]["Total Expenditure"] +
          incomeData[3]["Depreciation"] -
          incomeData[3]["Interest"],
        "Net Operating Loss":
          data.Income["Total Income"] -
            data["Expenditure"]["Total Expenditure"] +
            incomeData[3]["Depreciation"] -
            incomeData[3]["Interest"] <
          0
            ? data.Income["Total Income"] -
              data["Expenditure"]["Total Expenditure"] +
              incomeData[3]["Depreciation"] -
              incomeData[3]["Interest"] +
              0
            : 0,
      };

      data = {
        ...data,
        "Use Of Net Operating Loss":
          data["Net Operating Loss"] < 0
            ? 0
            : Math.min(data["PRETAX INCOME"], data["Net Operating Loss"]),
      };
      data = {
        ...data,
        "Taxable Income":
          data["PRETAX INCOME"] - data["Use Of Net Operating Loss"] < 0
            ? 0
            : data["PRETAX INCOME"] - data["Use Of Net Operating Loss"],
        "Income Tax Expense": incomeData[3]["Income Tax Expense"],
      };

      data = {
        ...data,
        "NET INCOME": data["PRETAX INCOME"] - data["Income Tax Expense"],
      };

      incomes = data;
    }
    // }

    // console.log(incomes);
    let incomeDetails;
    if (incomes) {
      // incomes = [...userIncome, { ...incomes }];
      incomeDetails = {
        id: req.user._id,
        income: [...userIncome, incomes],
      };

      console.log(incomes);

      const updatedIncomeStatement = await UserIncomeStatement.updateOne(
        { id: req.user._id },
        incomeDetails,
        { new: true }
      );

      res.status(201).json({ updatedIncomeStatement });
    }
  } catch (error) {
    console.log("Error in update user income statement", error.message);
    res.status(400).json({ message: error.message });
  }
};
