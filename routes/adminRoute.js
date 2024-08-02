const express = require("express");
const {
  editIncomeStatement,
  getAllUsers,
  getIndividualQuarter1Admin,
  getIndividualQuarter2Admin,
  createQuarter1,
  getAllIncomeStatements,
  updateQuarter1,
  createQuarter2,
  updateQuarter2,
  getUserIncomeStatementAdmin,
  UpdateUserIncomeStatementAdmin,
  getIndividualStartupAdmin,
} = require("../controller/adminController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/editIncomeStatement").put(editIncomeStatement);
router.route("/getAllUser").get(getAllUsers);
router.route("/admin/getIndividualStartup/:id").get(getIndividualStartupAdmin);
router
  .route("/admin/getIndividualQuarter1/:id")
  .get(getIndividualQuarter1Admin);
router
  .route("/admin/getIndividualQuarter2/:id")
  .get(getIndividualQuarter2Admin);
router.route("/admin/createQuarter1").post(createQuarter1);
router.route("/admin/createQuarter2").post(createQuarter2);
router.route("/admin/updateQuarter1").put(updateQuarter1);
router.route("/admin/updateQuarter2").put(updateQuarter2);

router
  .route("/admin/IncomeStatement")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllIncomeStatements);

router
  .route("/admin/user/incomeStatement/:id")
  .get(isAuthenticatedUser, getUserIncomeStatementAdmin);
router
  .route("/admin/user/incomeStatement/:id")
  .put(isAuthenticatedUser, UpdateUserIncomeStatementAdmin);

module.exports = router;

// authorizedRole("admin"),
