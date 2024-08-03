const Quarter3EmployeeModel = require("../Model/quarter3EmployeeModel");

exports.createQuarter3EmployeeInfo = async (req, res) => {
  try {
    const quarter3Employee = await Quarter3EmployeeModel.create({
      id: req.user._id,
      positions: req.body,
    });

    res.status(201).json(quarter3Employee);
  } catch (error) {
    console.log("Error in create Quarter3 Employee Controller", error.message);
    res.status(500).json("Error in creating Quarter3 Employee controller");
  }
};

exports.getQuarter3EmployeeInfo = async (req, res) => {
  try {
    const quarter3Employee = await Quarter3EmployeeModel.findOne({
      id: req.user._id,
    });

    res.status(201).json(quarter3Employee);
  } catch (error) {
    console.log("Error in create Quarter3 Employee Controller", error.message);
    res.status(500).json("Error in creating Quarter3 Employee controller");
  }
};
