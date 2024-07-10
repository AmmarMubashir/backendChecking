const express = require("express");
const { signupUser } = require("../controller/userController");
const router = express.Router();

router.route("/signup").post(signupUser);

module.exports = router;
