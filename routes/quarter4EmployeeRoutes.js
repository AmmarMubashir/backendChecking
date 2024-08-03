const express = require("express");
const {
  createQuarter4EmployeeInfo,
  getQuarter4EmployeeInfo,
} = require("../controller/quarter4EmployeeController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, createQuarter4EmployeeInfo);
router.route("/").get(isAuthenticatedUser, getQuarter4EmployeeInfo);
module.exports = router;
