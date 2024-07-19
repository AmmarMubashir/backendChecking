const Quarter1 = require("../Model/QuarterModel");
const IncomeStatement = require("../Model/IncomeStatementModel");
const User = require("../Model/userModel");
const Quarter2 = require("../Model/Quarter2Model");

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

    if (!quarter1) {
      return res.status(404).json({ message: "Quarter1 not found" });
    }

    return res.status(201).json({
      data: quarter1,
      message: "Quarter1 data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting quarter1", error.message);
    res.status(500).json({ message: "Error in getting the quarter1 data" });
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
