const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getQuarter3,
  createQuarter3ForUser,
  getQuarter3ForUser,
  getQuarter3ForUserById,
} = require("../controller/quarter3Controller");
const router = express.Router();

router.route("/").get(isAuthenticatedUser, getQuarter3);
router.route("/").post(isAuthenticatedUser, createQuarter3ForUser);
router.route("/quarter3Details").get(isAuthenticatedUser, getQuarter3ForUser);
router
  .route("/quarter3Details/:id")
  .get(isAuthenticatedUser, getQuarter3ForUserById);

module.exports = router;
