const express = require("express");
const {
  createQuarter3EmployeeInfo,
  getQuarter3EmployeeInfo,
} = require("../controller/quarter3EmployeeController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, createQuarter3EmployeeInfo);
router.route("/").get(isAuthenticatedUser, getQuarter3EmployeeInfo);
module.exports = router;
