const express = require("express");
const {
  uploadQuarter1,
  getQuarter1,
} = require("../controller/quarterController");

const router = express.Router();

router.route("/quarter1").post(uploadQuarter1);
router.route("/quarter1/:id").get(getQuarter1);

module.exports = router;
