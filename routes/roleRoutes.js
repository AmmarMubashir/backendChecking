const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  createRoles,
  getRoles,
  getRolesById,
  getRolesAdmin,
} = require("../controller/roleController");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, createRoles);
router.route("/").get(isAuthenticatedUser, getRoles);
router.route("/:id").get(isAuthenticatedUser, getRolesById);
router.route("/admin/:id").get(isAuthenticatedUser, getRolesAdmin);

module.exports = router;
