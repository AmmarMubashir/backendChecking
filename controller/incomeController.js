const IncomeStatement = require("../Model/IncomeStatementModel");
const userQuarter2 = require("../Model/userQuarter2Model");
const UserIncomeStatement = require("../Model/userIncomeModel");

// Create income statement

exports.createIncomeStatement = async (req, res) => {
  try {
    console.log(req.body);
    // console.log("HEllo");
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

exports.createIncomeStatement = async (req, res) => {
  try {
    console.log(req.body);
    // console.log("HEllo");
    const incomeStatement = await IncomeStatement.create(req.body);

    res.status(201).json({ incomeStatement });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createIncomeStatementForUser = async (req, res) => {
  try {
    let quarter2 = await userQuarter2.findOne({ id: req.user._id });
    let incomeData = await IncomeStatement.find({});
    incomeData = incomeData[0].income;
    // let quarter3 = false;
    // let quarter4 = false;
    // let quarters = {
    //   incomeData,
    //   quarter3: false,
    //   quarter4: false,
    //   quarter5: false,
    // };

    let quarters = [];

    if (quarter2) {
      quarters.push(quarter2);
    }

    // console.log(incomeData[0]["Expenses And Costs"]);

    // let opportunities = 0;
    // if (quarter2) {
    //   if (quarter2.option1.selected) {
    //     opportunities += quarter2.option1.income;
    //   }
    //   if (quarter2.option2.selected) {
    //     opportunities += quarter2.option2.income;
    //   }
    //   if (quarter2.option3.selected) {
    //     opportunities += quarter2.option3.income;
    //   }
    // }

    // let arr1 = true;
    // let arr2 = true;
    // let arr3 = false;

    // let arr = [];
    // if (arr1) {
    //   arr.push("arr1");
    // }
    // if (arr2) {
    //   arr.push("arr2");
    // }
    // if (arr3) {
    //   arr.push("arr3");
    // }

    // for (let i = 0; i < 2; i++) {
    //   if (arr[i]) {
    //     console.log(arr[i]);
    //   }
    // }

    let incomes = [];
    for (let index = 0; index < 3; index++) {
      if (quarters[index]) {
        let opportunities = 0;

        if (quarters[index].option1.selected) {
          opportunities += quarters[index].option1.income;
        }
        if (quarters[index].option2.selected) {
          opportunities += quarters[index].option2.income;
        }
        if (quarters[index].option3.selected) {
          opportunities += quarters[index].option3.income;
        }

        // console.log(opportunities);

        // console.log(incomeData[index].Revenues["Sales From Home"]);

        let data;
        data = {
          Revenues: {
            "Sales From Home": incomeData[index]["Revenues"]["Sales From Home"],
            "Additional Income":
              incomeData[index]["Revenues"]["Additional Income"],
            Opportunities: opportunities,
            Grants: incomeData[index]["Revenues"]["Grants"],
            Loans: incomeData[index]["Revenues"]["Loans"],
            "Other Income": incomeData[index]["Revenues"]["Other Income"],
            "Total Revenue": 0,
          },
        };

        // console.log(data);

        let totalRevenue = 0,
          totalExpensesAndCosts = 0;
        for (let key in data.Revenues) {
          totalRevenue += data.Revenues[key];
        }

        let CostAndExpenses = {
          "Cost Of Goods Sold":
            incomeData[index]["Expenses And Costs"]["Cost Of Goods Sold"],
          Lease: incomeData[index]["Expenses And Costs"].Lease,
          Marketing: incomeData[index]["Expenses And Costs"].Marketing,
          "Budjeted Salaries":
            incomeData[index]["Expenses And Costs"]["Budjeted Salaries"],
          "Extra Expenditure":
            incomeData[index]["Expenses And Costs"]["Extra Expenditure"],
          "Delivery Van Expenses":
            incomeData[index]["Expenses And Costs"]["Delivery Van Expenses"],
          "Initial Expenditure":
            incomeData[index]["Expenses And Costs"]["Initial Expenditure"],
          "Opportunity Costs":
            incomeData[index]["Expenses And Costs"]["Opportunity Costs"],
          Travel: incomeData[index]["Expenses And Costs"]["Travel"],
          Training: incomeData[index]["Expenses And Costs"]["Training"],
          "Loan Repayment":
            incomeData[index]["Expenses And Costs"]["Loan Repayment"],
          "Professional Fees":
            incomeData[index]["Expenses And Costs"]["Professional Fees"],
          "Sundry Expenses":
            incomeData[index]["Expenses And Costs"]["Sundry Expenses"],
        };

        for (let key1 in CostAndExpenses) {
          totalExpensesAndCosts += CostAndExpenses[key1];
        }

        CostAndExpenses = {
          ...CostAndExpenses,
          "Total Cost And Expenses": totalExpensesAndCosts,
        };

        // // console.log(totalRevenue);
        data.Revenues = {
          ...data.Revenues,
          "Total Revenue": totalRevenue,
        };

        data["Expenses And Costs"] = CostAndExpenses;
        // console.log(data);

        data = {
          ...data,
          EBITIDA:
            data.Revenues["Total Revenue"] -
            data["Expenses And Costs"]["Total Cost And Expenses"],
          Depreciation: incomeData[index]["Depreciation"],
          EBIT:
            data.Revenues["Total Revenue"] -
            data["Expenses And Costs"]["Total Cost And Expenses"] +
            incomeData[index]["Depreciation"],
          Interest: incomeData[index]["Interest"],
          "PRETAX INCOME":
            data.Revenues["Total Revenue"] -
            data["Expenses And Costs"]["Total Cost And Expenses"] +
            incomeData[index]["Depreciation"] -
            incomeData[index]["Interest"],
          "Net Operating Loss":
            data.Revenues["Total Revenue"] -
              data["Expenses And Costs"]["Total Cost And Expenses"] +
              incomeData[index]["Depreciation"] -
              incomeData[index]["Interest"] <
            0
              ? data.Revenues["Total Revenue"] -
                data["Expenses And Costs"]["Total Cost And Expenses"] +
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
