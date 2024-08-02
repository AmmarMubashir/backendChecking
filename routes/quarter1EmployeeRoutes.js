const express = require("express");
const {
  createQuarter1EmployeeInfo,
  getQuarter1EmployeeInfo,
} = require("../controller/quarter1EmployeeController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, createQuarter1EmployeeInfo);
router.route("/").get(isAuthenticatedUser, getQuarter1EmployeeInfo);
module.exports = router;
