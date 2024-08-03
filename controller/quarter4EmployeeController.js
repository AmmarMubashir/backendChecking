const Quarter4EmployeeModel = require("../Model/quarter4EmployeeModel");

exports.createQuarter4EmployeeInfo = async (req, res) => {
  try {
    const quarter4Employee = await Quarter4EmployeeModel.create({
      id: req.user._id,
      positions: req.body,
    });

    res.status(201).json(quarter4Employee);
  } catch (error) {
    console.log("Error in create Quarter4 Employee Controller", error.message);
    res.status(500).json("Error in creating Quarter4 Employee controller");
  }
};

exports.getQuarter4EmployeeInfo = async (req, res) => {
  try {
    const quarter4Employee = await Quarter4EmployeeModel.findOne({
      id: req.user._id,
    });

    res.status(201).json(quarter4Employee);
  } catch (error) {
    console.log("Error in create Quarter4 Employee Controller", error.message);
    res.status(500).json("Error in creating Quarter4 Employee controller");
  }
};
