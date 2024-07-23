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

    console.log("QUARTER2", data);

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
