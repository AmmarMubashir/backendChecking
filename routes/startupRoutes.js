const express = require("express");
const {
  uploadStartup,
  getStartup,
  getIndividualStartup,
} = require("../controller/startupController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/startup").post(isAuthenticatedUser, uploadStartup);
router.route("/startup/:id").get(getStartup);
router.route("/startup").get(isAuthenticatedUser, getIndividualStartup);

module.exports = router;
