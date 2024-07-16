const IncomeStatement = require("../Model/IncomeStatementModel");

// Create income statement

exports.createIncomeStatement = async (req, res) => {
  try {
    const incomeStatement = await IncomeStatement.create(req.body);

    res.status(201).json(incomeStatement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getIncomeStatement = async (req, res) => {
  try {
    const incomeStatement = await IncomeStatement.find();

    res.status(201).json(incomeStatement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
