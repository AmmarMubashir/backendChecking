const Startup = require("../Model/StartupModel");
const IncomeStatement = require("../Model/IncomeStatementModel");
const User = require("../Model/userModel");
const Quarter1 = require("../Model/Quarter1Model");
const Quarter2 = require("../Model/Quarter2Model");
const Quarter3 = require("../Model/Quarter3Model");
const Quarter4 = require("../Model/Quarter4Model");
const userIncome = require("../Model/userIncomeModel");
const userQuarter1Model = require("../Model/userQuarter1Model");
const userQuarter2 = require("../Model/userQuarter2Model");
const userQuarter3 = require("../Model/userQuarter3Model");
const userQuarter4 = require("../Model/userQuarter4Model");

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

    // console.log(incomeStatement);

    res.status(201).json(incomeStatement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const teams = await Startup.find();

    // const promises = users.map(async (item) => {
    //   console.log(item);
    //   const team = await Quarter1.findOne({ id: item._id });
    //   let teanName = team.name;
    //   let email = item.email;
    //   let userId = item.id;

    //   return { teanName, email, userId };
    // });

    // Promise.all(promises)
    //   .then((data) => {
    //     console.log(data);
    //     res.status(200).json(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getIndividualStartupAdmin = async (req, res) => {
  try {
    const startup = await Startup.findOne({ id: req.params.id });

    // if (!startup) {
    //   return res.status(404).json({ message: "Startup not found" });
    // }

    return res.status(201).json({
      data: startup,
      message: "Startup data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting startup", error.message);
    res.status(500).json({ message: "Error in getting the startup data" });
  }
};
exports.getIndividualQuarter1Admin = async (req, res) => {
  try {
    const quarter1 = await userQuarter1Model.findOne({ id: req.params.id });

    // if (!quarter1) {
    //   return res.status(404).json({ message: "Quarter1 not found" });
    // }

    return res.status(200).json({
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
    const quarter2 = await userQuarter2.findOne({ id: req.params.id });

    // if (!quarter2) {
    //   return res.status(404).json({ message: "Quarter2 not found" });
    // }

    return res.status(200).json({
      data: quarter2,
      message: "Quarter2 data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting quarter2", error.message);
    res.status(500).json({ message: "Error in getting the quarter2 data" });
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

exports.getIndividualQuarter4Admin = async (req, res) => {
  try {
    const quarter4 = await userQuarter4.findOne({ id: req.params.id });
    // if (!quarter4) {
    //   console.log("quarter4");
    // }

    // if (!quarter4) {
    //   return res.status(404).json({ message: "Quarter4 not found" });
    // }

    return res.status(200).json({
      data: quarter4,
      message: "Quarter4 data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting quarter4", error.message);
    res.status(500).json({ message: "Error in getting the quarter4 data" });
  }
};

exports.createQuarter1 = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data.option1.description);
    let quarter1Data = {
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

    const quarter1 = await Quarter1.create(quarter1Data);

    res.status(201).json(quarter1);
  } catch (error) {
    console.log("Error in creating quarter1", error.message);
    res.status(500).json({ message: "Error in creating the quarter1 data" });
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
      "No of Clients per day": data["No of Clients per day"],
      "Average Price": data["Average Price"],
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
      "No of Clients per day": data["No of Clients per day"],
      "Average Price": data["Average Price"],
      event: data.event,
    };

    const quarter3 = await Quarter3.create(quarter3Data);

    res.status(201).json(quarter3);
  } catch (error) {
    console.log("Error in creating quarter3", error.message);
    res.status(500).json({ message: "Error in creating the quarter3 data" });
  }
};

exports.createQuarter4 = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data.option1.description);
    let quarter4Data = {
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

    const quarter4 = await Quarter4.create(quarter4Data);

    res.status(201).json(quarter4);
  } catch (error) {
    console.log("Error in creating quarter4", error.message);
    res.status(500).json({ message: "Error in creating the quarter4 data" });
  }
};

exports.updateQuarter1 = async (req, res) => {
  try {
    const data = req.body;

    // console.log("QUARTER1", data);

    let quarter1Data = {
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

    const quarter1 = await Quarter1.findOneAndUpdate({}, quarter1Data, {
      new: true,
    });

    res.status(201).json(quarter1);
  } catch (error) {
    console.log("Error in Updating quarter1", error.message);
    res.status(500).json({ message: "Error in Updatind the quarter1 data" });
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

    // console.log("QUARTER2", data);

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

exports.updateQuarter4 = async (req, res) => {
  try {
    const data = req.body;

    // console.log("QUARTER2", data);

    let quarter4Data = {
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

    const quarter4 = await Quarter4.findOneAndUpdate({}, quarter4Data, {
      new: true,
    });

    res.status(201).json(quarter4);
  } catch (error) {
    console.log("Error in Updating quarter4", error.message);
    res.status(500).json({ message: "Error in Updatind the quarter4 data" });
  }
};

exports.getAllIncomeStatements = async (req, res) => {
  try {
    const incomeStatements = await userIncome.find();

    // console.log(incomeStatements);

    const promises = incomeStatements.map(async (item) => {
      const user = await User.findById(item.id);
      const team = await Startup.findOne({ id: item.id });
      let name = team.name;
      let email = user.email;
      let Income = item.income.reduce(
        (acc, current) => acc + current["Income"]["Total Income"],
        0
      );
      let Expenditure = item.income.reduce(
        (acc, current) => acc + current["Expenditure"]["Total Expenditure"],
        0
      );

      return { name, email, Income, Expenditure }; // Return an object with data
    });

    Promise.all(promises)
      .then((data) => {
        // console.log(data);
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
      item.Income["Total Income"] -= item["Income"]["Additional income"];
      item.Income["Total Income"] += data[index]["Income"]["Additional income"];
      item.Income["Additional income"] =
        data[index]["Income"]["Additional income"];
      item["Expenditure"]["Total Expenditure"] -=
        item["Expenditure"]["Additional cost"];
      item["Expenditure"]["Total Expenditure"] +=
        data[index]["Expenditure"]["Additional cost"];
      item["Expenditure"]["Additional cost"] =
        data[index]["Expenditure"]["Additional cost"];
    });

    // let newData = incomeStatement.income;
    // newData.forEach((item, index) => {
    //   item = {
    //     ...item,
    //     EBITIDA:
    //       item.Income["Total Income"] -
    //       item["Expenditure"]["Total Expenditure"],
    //     Depreciation: newData[index]["Depreciation"],
    //     EBIT:
    //       item.Income["Total Income"] -
    //       item["Expenditure"]["Total Expenditure"] +
    //       newData[index]["Depreciation"],
    //     Interest: newData[index]["Interest"],
    //     "PRETAX INCOME":
    //       item.Income["Total Income"] -
    //       item["Expenditure"]["Total Expenditure"] +
    //       newData[index]["Depreciation"] -
    //       newData[index]["Interest"],
    //     "Net Operating Loss":
    //       item.Income["Total Income"] -
    //         item["Expenditure"]["Total Expenditure"] +
    //         newData[index]["Depreciation"] -
    //         newData[index]["Interest"] <
    //       0
    //         ? item.Income["Total Income"] -
    //           item["Expenditure"]["Total Expenditure"] +
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
        item.Income["Total Income"] - item["Expenditure"]["Total Expenditure"];
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
