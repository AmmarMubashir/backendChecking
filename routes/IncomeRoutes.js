const express = require("express");
const {
  createIncomeStatement,
  getIncomeStatement,
  createIncomeStatementForUser,
  getUserIncomeStatement,
  updateIncomeStatementForUser,
  updateIncomeStatementForQuarter3,
  updateIncomeStatementForQuarter4,
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
  .route("/user/updateincomeStatementQuarter3")
  .put(isAuthenticatedUser, updateIncomeStatementForQuarter3);
router
  .route("/user/updateincomeStatementQuarter4")
  .put(isAuthenticatedUser, updateIncomeStatementForQuarter4);
router
  .route("/user/incomeStatement")
  .get(isAuthenticatedUser, getUserIncomeStatement);

module.exports = router;
