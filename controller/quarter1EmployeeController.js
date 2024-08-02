const Quarter1EmployeeModel = require("../Model/quarter1EmployeeModel");

exports.createQuarter1EmployeeInfo = async (req, res) => {
  try {
    const quarter1Employee = await Quarter1EmployeeModel.create({
      id: req.user._id,
      positions: req.body,
    });

    res.status(201).json(quarter1Employee);
  } catch (error) {
    console.log("Error in create Quarter1 Employee Controller", error.message);
    res.status(500).json("Error in creating Quarter1 Employee controller");
  }
};

exports.getQuarter1EmployeeInfo = async (req, res) => {
  try {
    const quarter1Employee = await Quarter1EmployeeModel.findOne({
      id: req.user._id,
    });

    res.status(201).json(quarter1Employee);
  } catch (error) {
    console.log("Error in create Quarter1 Employee Controller", error.message);
    res.status(500).json("Error in creating Quarter1 Employee controller");
  }
};
