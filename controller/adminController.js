const IncomeStatement = require("../Model/IncomeStatementModel");

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
