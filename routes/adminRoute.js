const express = require("express");
const {
  editIncomeStatement,
  getAllUsers,
  getIndividualQuarter1Admin,
  createQuarter2,
} = require("../controller/adminController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/editIncomeStatement").put(editIncomeStatement);
router.route("/getAllUser").get(getAllUsers);
router
  .route("/admin/getIndividualQuarter1/:id")
  .get(getIndividualQuarter1Admin);
router.route("/admin/createQuarter2").post(createQuarter2);

module.exports = router;

// authorizedRole("admin"),
