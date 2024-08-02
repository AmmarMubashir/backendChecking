const EmployeeModel = require("../Model/EmployeeModel");

exports.createEmployeeInfo = async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);

    res.status(201).json(employee);
  } catch (error) {
    console.log("Error in create Employee Controller", error.message);
    res.status(500).json("Error in creating employee controller");
  }
};

exports.getEmployeeInfo = async (req, res) => {
  try {
    const employee = await EmployeeModel.find({});

    res.status(201).json(employee[0].positions);
  } catch (error) {
    console.log("Error in create Employee Controller", error.message);
    res.status(500).json("Error in creating employee controller");
  }
};

exports.updateEmployeeInfo = async (req, res) => {
  try {
    // console.log(req.body);

    const employee = await EmployeeModel.findOneAndUpdate(
      {},
      { positions: req.body },
      { new: true }
    );
    res.status(201).json(employee);
  } catch (error) {
    console.log("Error in create Employee Controller", error.message);
    res.status(500).json("Error in creating employee controller");
  }
};
