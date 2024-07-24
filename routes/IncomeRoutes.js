const express = require("express");
const {
  createIncomeStatement,
  getIncomeStatement,
  createIncomeStatementForUser,
  getUserIncomeStatement,
  updateIncomeStatementForUser,
} = require("../controller/incomeController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/incomeStatement").post(createIncomeStatement);
router.route("/incomeStatement").get(getIncomeStatement);
router
  .route("/user/incomeStatement")
  .post(isAuthenticatedUser, createIncomeStatementForUser);
router
  .route("/user/updateincomeStatement")
  .put(isAuthenticatedUser, updateIncomeStatementForUser);
router
  .route("/user/incomeStatement")
  .get(isAuthenticatedUser, getUserIncomeStatement);

module.exports = router;
