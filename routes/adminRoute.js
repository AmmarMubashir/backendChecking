const express = require("express");
const { editSetting } = require("../controller/adminController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router
  .route("/edit")
  .get(isAuthenticatedUser, authorizedRole("admin"), editSetting);

module.exports = router;
