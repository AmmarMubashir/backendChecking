const express = require("express");
const {
  getQuarter1,
  createQuarter1ForUser,
  getQuarter1ForUser,
  getQuarter1ForUserById,
} = require("../controller/quarter1Controller");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getQuarter1);
router.route("/").post(isAuthenticatedUser, createQuarter1ForUser);
router.route("/quarter1Details").get(isAuthenticatedUser, getQuarter1ForUser);
router
  .route("/quarter1Details/:id")
  .get(isAuthenticatedUser, getQuarter1ForUserById);

module.exports = router;
