const Quarter1Model = require("../Model/Quarter1Model");
const Quarter4 = require("../Model/Quarter4Model");
const userQuarter1Model = require("../Model/userQuarter1Model");
const userQuarter4 = require("../Model/userQuarter4Model");

exports.getQuarter4 = async (req, res) => {
  try {
    const quarter4 = await Quarter4.find();
    res.status(200).json(quarter4);
  } catch (error) {
    console.log("Error in getting quarter4", error.message);
    res.status(500).json({ message: "Error in getting the quarter4 data" });
  }
};

exports.createQuarter4ForUser = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data.option1.description);
    const quarter1 = await userQuarter1Model.findOne({ id: req.user._id });

    // console.log(quarter1.budjet);
    let totalAmount = quarter1.totalProfit;

    if (data.option1.selected) {
      totalAmount += data.option1.netProfit;
    }
    if (data.option2.selected) {
      totalAmount += data.option2.netProfit;
    }
    if (data.option3.selected) {
      totalAmount += data.option3.netProfit;
    }
    console.log(totalAmount);

    let quarter4Data = {
      id: req.user._id,
      option1: {
        selected: data.option1.selected,
        description: data.option1.description,
        cost: data.option1.cost,
        otherCost: data.option1.otherCost,
        income: data.option1.income,
        netProfit:
          data.option1.income - (data.option1.cost + data.option1.otherCost),
      },
      option2: {
        selected: data.option2.selected,
        description: data.option2.description,
        cost: data.option2.cost,
        otherCost: data.option2.otherCost,
        income: data.option2.income,
        netProfit:
          data.option2.income - (data.option2.cost + data.option2.otherCost),
      },
      option3: {
        selected: data.option3.selected,
        description: data.option3.description,
        cost: data.option3.cost,
        otherCost: data.option3.otherCost,
        income: data.option3.income,
        netProfit:
          data.option3.income - (data.option3.cost + data.option3.otherCost),
      },
      totalProfit: totalAmount,
      "No of Clients per day": data["No of Clients per day"],
      "Average Price": data["Average Price"],
      event: data.event,
    };

    const quarter4 = await userQuarter4.create(quarter4Data);

    res.status(201).json(quarter4);
  } catch (error) {
    console.log("Error in creating quarter4", error.message);
    res.status(500).json({ message: "Error in creating the quarter4 data" });
  }
};

exports.getQuarter4ForUser = async (req, res) => {
  try {
    const quarter4 = await userQuarter4.findOne({ id: req.user._id });
    res.status(200).json(quarter4);
  } catch (error) {
    console.log("Error in getting quarter4", error.message);
    res.status(500).json({ message: "Error in getting the quarter4 data" });
  }
};

exports.getQuarter4ForUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const quarter4 = await userQuarter4.findById(id);
    res.status(200).json(quarter4);
  } catch (error) {
    console.log("Error in getting quarter4", error.message);
    res.status(500).json({ message: "Error in getting the quarter4 data" });
  }
};
