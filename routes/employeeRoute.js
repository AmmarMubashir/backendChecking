const express = require("express");
const {
  createEmployeeInfo,
  getEmployeeInfo,
  updateEmployeeInfo,
} = require("../controller/employeeController");

const router = express.Router();

router.route("/").post(createEmployeeInfo);
router.route("/").get(getEmployeeInfo);
router.route("/").put(updateEmployeeInfo);

module.exports = router;
