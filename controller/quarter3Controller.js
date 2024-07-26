const Quarter2Model = require("../Model/Quarter2Model");
const Quarter3 = require("../Model/Quarter3Model");
const userQuarter2Model = require("../Model/userQuarter2Model");
const userQuarter3 = require("../Model/userQuarter3Model");

exports.getQuarter3 = async (req, res) => {
  try {
    const quarter3 = await Quarter3.find();
    res.status(200).json(quarter3);
  } catch (error) {
    console.log("Error in getting quarter3", error.message);
    res.status(500).json({ message: "Error in getting the quarter3 data" });
  }
};

exports.createQuarter3ForUser = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data.option1.description);
    const quarter2 = await userQuarter2Model.findOne({ id: req.user._id });

    // console.log(quarter1.budjet);
    let totalAmount = quarter2.totalProfit;

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

    let quarter3Data = {
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

    const quarter3 = await userQuarter3.create(quarter3Data);

    res.status(201).json(quarter3);
  } catch (error) {
    console.log("Error in creating quarter2", error.message);
    res.status(500).json({ message: "Error in creating the quarter2 data" });
  }
};

exports.getQuarter3ForUser = async (req, res) => {
  try {
    const quarter3 = await userQuarter3.findOne({ id: req.user._id });
    res.status(200).json(quarter3);
  } catch (error) {
    console.log("Error in getting quarter3", error.message);
    res.status(500).json({ message: "Error in getting the quarter3 data" });
  }
};

exports.getQuarter3ForUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const quarter3 = await userQuarter3.findById(id);
    res.status(200).json(quarter3);
  } catch (error) {
    console.log("Error in getting quarter3", error.message);
    res.status(500).json({ message: "Error in getting the quarter3 data" });
  }
};
