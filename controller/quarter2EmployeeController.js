const Quarter2EmployeeModel = require("../Model/quarter2EmployeeModel");

exports.createQuarter2EmployeeInfo = async (req, res) => {
  try {
    const quarter2Employee = await Quarter2EmployeeModel.create({
      id: req.user._id,
      positions: req.body,
    });

    res.status(201).json(quarter2Employee);
  } catch (error) {
    console.log("Error in create Quarter2 Employee Controller", error.message);
    res.status(500).json("Error in creating Quarter2 Employee controller");
  }
};

exports.getQuarter2EmployeeInfo = async (req, res) => {
  try {
    const quarter2Employee = await Quarter2EmployeeModel.findOne({
      id: req.user._id,
    });

    res.status(201).json(quarter2Employee);
  } catch (error) {
    console.log("Error in create Quarter2 Employee Controller", error.message);
    res.status(500).json("Error in creating Quarter2 Employee controller");
  }
};
