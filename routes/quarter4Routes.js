const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getQuarter4,
  createQuarter4ForUser,
  getQuarter4ForUser,
  getQuarter4ForUserById,
} = require("../controller/quarter4Controller");
const router = express.Router();

router.route("/").get(isAuthenticatedUser, getQuarter4);
router.route("/").post(isAuthenticatedUser, createQuarter4ForUser);
router.route("/quarter4Details").get(isAuthenticatedUser, getQuarter4ForUser);
router
  .route("/quarter4Details/:id")
  .get(isAuthenticatedUser, getQuarter4ForUserById);

module.exports = router;
