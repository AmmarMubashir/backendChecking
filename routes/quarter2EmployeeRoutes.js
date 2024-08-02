const express = require("express");
const {
  createQuarter2EmployeeInfo,
  getQuarter2EmployeeInfo,
} = require("../controller/quarter2EmployeeController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, createQuarter2EmployeeInfo);
router.route("/").get(isAuthenticatedUser, getQuarter2EmployeeInfo);
module.exports = router;
