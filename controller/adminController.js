const Quarter1 = require("../Model/QuarterModel");
const IncomeStatement = require("../Model/IncomeStatementModel");
const User = require("../Model/userModel");
const Quarter2 = require("../Model/Quarter2Model");
const Quarter3 = require("../Model/Quarter3Model");
const userIncome = require("../Model/userIncomeModel");
const userModel = require("../Model/userModel");
const userQuarter2Model = require("../Model/userQuarter2Model");
const userQuarter3 = require("../Model/userQuarter3Model");

exports.editIncomeStatement = async (req, res) => {
  try {
    // console.log(req.body);
    const incomeStatement = await IncomeStatement.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
      }
    );

    console.log(incomeStatement);

    res.status(201).json(incomeStatement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getIndividualQuarter1Admin = async (req, res) => {
  try {
    const quarter1 = await Quarter1.findOne({ id: req.params.id });

    // if (!quarter1) {
    //   return res.status(404).json({ message: "Quarter1 not found" });
    // }

    return res.status(201).json({
      data: quarter1,
      message: "Quarter1 data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting quarter1", error.message);
    res.status(500).json({ message: "Error in getting the quarter1 data" });
  }
};
exports.getIndividualQuarter2Admin = async (req, res) => {
  try {
    const quarter2 = await userQuarter2Model.findOne({ id: req.params.id });

    // if (!quarter2) {
    //   return res.status(404).json({ message: "Quarter2 not found" });
    // }

    return res.status(200).json({
      data: quarter2,
      message: "Quarter2 data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting quarter1", error.message);
    res.status(500).json({ message: "Error in getting the quarter1 data" });
  }
};

exports.getIndividualQuarter3Admin = async (req, res) => {
  try {
    const quarter3 = await userQuarter3.findOne({ id: req.params.id });

    // if (!quarter3) {
    //   return res.status(404).json({ message: "Quarter3 not found" });
    // }

    return res.status(200).json({
      data: quarter3,
      message: "Quarter3 data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting quarter3", error.message);
    res.status(500).json({ message: "Error in getting the quarter3 data" });
  }
};

exports.createQuarter2 = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data.option1.description);
    let quarter2Data = {
      option1: {
        description: data.option1.description,
        cost: data.option1.cost,
        otherCost: data.option1.otherCost,
        income: data.option1.income,
        netProfit:
          data.option1.income - (data.option1.cost + data.option1.otherCost),
      },
      option2: {
        description: data.option2.description,
        cost: data.option2.cost,
        otherCost: data.option2.otherCost,
        income: data.option2.income,
        netProfit:
          data.option2.income - (data.option2.cost + data.option2.otherCost),
      },
      option3: {
        description: data.option3.description,
        cost: data.option3.cost,
        otherCost: data.option3.otherCost,
        income: data.option3.income,
        netProfit:
          data.option3.income - (data.option3.cost + data.option3.otherCost),
      },
      event: data.event,
    };

    const quarter2 = await Quarter2.create(quarter2Data);

    res.status(201).json(quarter2);
  } catch (error) {
    console.log("Error in creating quarter2", error.message);
    res.status(500).json({ message: "Error in creating the quarter2 data" });
  }
};

exports.createQuarter3 = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data.option1.description);
    let quarter3Data = {
      option1: {
        description: data.option1.description,
        cost: data.option1.cost,
        otherCost: data.option1.otherCost,
        income: data.option1.income,
        netProfit:
          data.option1.income - (data.option1.cost + data.option1.otherCost),
      },
      option2: {
        description: data.option2.description,
        cost: data.option2.cost,
        otherCost: data.option2.otherCost,
        income: data.option2.income,
        netProfit:
          data.option2.income - (data.option2.cost + data.option2.otherCost),
      },
      option3: {
        description: data.option3.description,
        cost: data.option3.cost,
        otherCost: data.option3.otherCost,
        income: data.option3.income,
        netProfit:
          data.option3.income - (data.option3.cost + data.option3.otherCost),
      },
      event: data.event,
    };

    const quarter3 = await Quarter3.create(quarter3Data);

    res.status(201).json(quarter3);
  } catch (error) {
    console.log("Error in creating quarter3", error.message);
    res.status(500).json({ message: "Error in creating the quarter3 data" });
  }
};

exports.updateQuarter2 = async (req, res) => {
  try {
    const data = req.body;

    // console.log("QUARTER2", data);

    let quarter2Data = {
      option1: {
        description: data.option1.description,
        cost: data.option1.cost,
        otherCost: data.option1.otherCost,
        income: data.option1.income,
        netProfit:
          data.option1.income - (data.option1.cost + data.option1.otherCost),
      },
      option2: {
        description: data.option2.description,
        cost: data.option2.cost,
        otherCost: data.option2.otherCost,
        income: data.option2.income,
        netProfit:
          data.option2.income - (data.option2.cost + data.option2.otherCost),
      },
      option3: {
        description: data.option3.description,
        cost: data.option3.cost,
        otherCost: data.option3.otherCost,
        income: data.option3.income,
        netProfit:
          data.option3.income - (data.option3.cost + data.option3.otherCost),
      },
      "No of Clients per day": data["No of Clients per day"],
      "Average Price": data["Average Price"],
      event: data.event,
    };

    const quarter2 = await Quarter2.findOneAndUpdate({}, quarter2Data, {
      new: true,
    });

    res.status(201).json(quarter2);
  } catch (error) {
    console.log("Error in Updating quarter2", error.message);
    res.status(500).json({ message: "Error in Updatind the quarter2 data" });
  }
};

exports.updateQuarter3 = async (req, res) => {
  try {
    const data = req.body;

    // console.log("QUARTER3", data);

    let quarter3Data = {
      option1: {
        description: data.option1.description,
        cost: data.option1.cost,
        otherCost: data.option1.otherCost,
        income: data.option1.income,
        netProfit:
          data.option1.income - (data.option1.cost + data.option1.otherCost),
      },
      option2: {
        description: data.option2.description,
        cost: data.option2.cost,
        otherCost: data.option2.otherCost,
        income: data.option2.income,
        netProfit:
          data.option2.income - (data.option2.cost + data.option2.otherCost),
      },
      option3: {
        description: data.option3.description,
        cost: data.option3.cost,
        otherCost: data.option3.otherCost,
        income: data.option3.income,
        netProfit:
          data.option3.income - (data.option3.cost + data.option3.otherCost),
      },
      "No of Clients per day": data["No of Clients per day"],
      "Average Price": data["Average Price"],
      event: data.event,
    };

    const quarter3 = await Quarter3.findOneAndUpdate({}, quarter3Data, {
      new: true,
    });

    res.status(201).json(quarter3);
  } catch (error) {
    console.log("Error in Updating quarter3", error.message);
    res.status(500).json({ message: "Error in Updatind the quarter3 data" });
  }
};

exports.getAllIncomeStatements = async (req, res) => {
  try {
    const incomeStatements = await userIncome.find();

    // console.log(incomeStatements);

    const promises = incomeStatements.map(async (item) => {
      const team = await User.findById(item.id);
      let name = team.name;
      let email = team.email;
      let revenue = item.income.reduce(
        (acc, current) => acc + current["Revenues"]["Total Revenue"],
        0
      );
      let cost = item.income.reduce(
        (acc, current) =>
          acc + current["Expenses And Costs"]["Total Cost And Expenses"],
        0
      );

      // let revenue = item.income[0]["Revenues"]["Total Revenue"];
      // let cost =
      //   item.income[0]["Expenses And Costs"]["Total Cost And Expenses"];

      return { name, email, revenue, cost }; // Return an object with data
    });

    Promise.all(promises)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });

    // console.log(GraphData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserIncomeStatementAdmin = async (req, res) => {
  try {
    const incomeStatement = await userIncome.findOne({ id: req.params.id });

    res.status(201).json(incomeStatement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.UpdateUserIncomeStatementAdmin = async (req, res) => {
  try {
    const data = req.body;
    const incomeStatement = await userIncome.findOne({ id: req.params.id });
    incomeStatement.income.forEach((item, index) => {
      item.Revenues["Total Revenue"] -= item["Revenues"]["Additional Income"];
      item.Revenues["Total Revenue"] +=
        data[index]["Revenues"]["Additional Income"];
      item.Revenues["Additional Income"] =
        data[index]["Revenues"]["Additional Income"];
      item["Expenses And Costs"]["Total Cost And Expenses"] -=
        item["Expenses And Costs"]["Additional Cost"];
      item["Expenses And Costs"]["Total Cost And Expenses"] +=
        data[index]["Expenses And Costs"]["Additional Cost"];
      item["Expenses And Costs"]["Additional Cost"] =
        data[index]["Expenses And Costs"]["Additional Cost"];
    });

    // let newData = incomeStatement.income;
    // newData.forEach((item, index) => {
    //   item = {
    //     ...item,
    //     EBITIDA:
    //       item.Revenues["Total Revenue"] -
    //       item["Expenses And Costs"]["Total Cost And Expenses"],
    //     Depreciation: newData[index]["Depreciation"],
    //     EBIT:
    //       item.Revenues["Total Revenue"] -
    //       item["Expenses And Costs"]["Total Cost And Expenses"] +
    //       newData[index]["Depreciation"],
    //     Interest: newData[index]["Interest"],
    //     "PRETAX INCOME":
    //       item.Revenues["Total Revenue"] -
    //       item["Expenses And Costs"]["Total Cost And Expenses"] +
    //       newData[index]["Depreciation"] -
    //       newData[index]["Interest"],
    //     "Net Operating Loss":
    //       item.Revenues["Total Revenue"] -
    //         item["Expenses And Costs"]["Total Cost And Expenses"] +
    //         newData[index]["Depreciation"] -
    //         newData[index]["Interest"] <
    //       0
    //         ? item.Revenues["Total Revenue"] -
    //           item["Expenses And Costs"]["Total Cost And Expenses"] +
    //           newData[index]["Depreciation"] -
    //           newData[index]["Interest"] +
    //           0
    //         : 0,
    //   };

    //   // console.log("ITEM", item["PRETAX INCOME"]);

    //   item = {
    //     ...item,
    //     "Use Of Net Operating Loss":
    //       item["Net Operating Loss"] < 0
    //         ? 0
    //         : Math.min(item["PRETAX INCOME"], item["Net Operating Loss"]),
    //   };
    //   item = {
    //     ...item,
    //     "Taxable Income":
    //       item["PRETAX INCOME"] - item["Use Of Net Operating Loss"] < 0
    //         ? 0
    //         : item["PRETAX INCOME"] - item["Use Of Net Operating Loss"],
    //     "Income Tax Expense": newData[index]["Income Tax Expense"],
    //   };

    //   item = {
    //     ...item,
    //     "NET INCOME": item["PRETAX INCOME"] - item["Income Tax Expense"],
    //   };
    // });

    incomeStatement.income.forEach((item, index) => {
      item.EBITIDA =
        item.Revenues["Total Revenue"] -
        item["Expenses And Costs"]["Total Cost And Expenses"];
      item.Depreciation = data[index].Depreciation;
      item.EBIT = item.EBITIDA + item.Depreciation;
      item.Interest = data[index].Interest;
      item["PRETAX INCOME"] = item.EBIT - item.Interest;
      item["Net Operating Loss"] =
        item["PRETAX INCOME"] < 0 ? item["PRETAX INCOME"] : 0;
      item["Use Of Net Operating Loss"] =
        item["Net Operating Loss"] < 0
          ? 0
          : Math.min(item["PRETAX INCOME"], item["Net Operating Loss"]);
      item["Taxable Income"] =
        item["PRETAX INCOME"] - item["Use Of Net Operating Loss"] < 0
          ? 0
          : item["PRETAX INCOME"] - item["Use Of Net Operating Loss"];
      item["Income Tax Expense"] = data[index]["Income Tax Expense"];
      item["NET INCOME"] = item["PRETAX INCOME"] - item["Income Tax Expense"];
    });

    await incomeStatement.save();
    // console.log(incomeStatement.income[0]);
    // console.log(req.params.id);
    // const incomeStatement = await userIncome.findOne({ id: req.params.id });

    res.status(201).json(incomeStatement);
  } catch (error) {
    console.log("Error in updating user income by admin", error.message);
    res.status(400).json({ message: error.message });
  }
};
