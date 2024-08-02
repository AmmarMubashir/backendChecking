const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getQuarter2,
  createQuarter2ForUser,
  getQuarter2ForUser,
  getQuarter2ForUserById,
} = require("../controller/quarter2Controller");
const router = express.Router();

router.route("/").get(isAuthenticatedUser, getQuarter2);
router.route("/").post(isAuthenticatedUser, createQuarter2ForUser);
router.route("/quarter2Details").get(isAuthenticatedUser, getQuarter2ForUser);
router
  .route("/quarter2Details/:id")
  .get(isAuthenticatedUser, getQuarter2ForUserById);

module.exports = router;
