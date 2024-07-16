const express = require("express");
const {
  createIncomeStatement,
  getIncomeStatement,
} = require("../controller/incomeController");

const router = express.Router();

router.route("/incomeStatement").post(createIncomeStatement);
router.route("/incomeStatement").get(getIncomeStatement);

module.exports = router;
