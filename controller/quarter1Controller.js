const Quarter1 = require("../Model/Quarter1Model");
const Startup = require("../Model/StartupModel");
const userQuarter1 = require("../Model/userQuarter1Model");

exports.getQuarter1 = async (req, res) => {
  try {
    const quarter1 = await Quarter1.find();
    res.status(200).json(quarter1);
  } catch (error) {
    console.log("Error in getting quarter1", error.message);
    res.status(500).json({ message: "Error in getting the quarter1 data" });
  }
};

exports.createQuarter1ForUser = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data.option1.description);
    // const startup = await Startup.findOne({ id: req.user._id });

    // console.log(startup.budjet);
    let totalAmount = data.budget;

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

    let quarter1Data = {
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

    const quarter1 = await userQuarter1.create(quarter1Data);

    res.status(201).json(quarter1);
  } catch (error) {
    console.log("Error in creating quarter1", error.message);
    res.status(500).json({ message: "Error in creating the quarter1 data" });
  }
};

exports.getQuarter1ForUser = async (req, res) => {
  try {
    const quarter1 = await userQuarter1.findOne({ id: req.user._id });
    res.status(200).json(quarter1);
  } catch (error) {
    console.log("Error in getting quarter1", error.message);
    res.status(500).json({ message: "Error in getting the quarter1 data" });
  }
};

exports.getQuarter1ForUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const quarter1 = await userQuarter1.findById(id);
    res.status(200).json(quarter1);
  } catch (error) {
    console.log("Error in getting quarter1", error.message);
    res.status(500).json({ message: "Error in getting the quarter1 data" });
  }
};
