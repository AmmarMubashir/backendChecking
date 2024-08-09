const express = require("express");
const {
  signupUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");
const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
