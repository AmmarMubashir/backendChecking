const express = require("express");
const { editIncomeStatement } = require("../controller/adminController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/editIncomeStatement").put(editIncomeStatement);

module.exports = router;

// authorizedRole("admin"),
