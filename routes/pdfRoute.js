const express = require("express");
const { upload } = require("../app");
const { uploadPdf, getPdf } = require("../controller/pdfController");

const router = express.Router();

router.route("/upload-files").post(upload.single("file"), uploadPdf);
router.route("/getPdf").get(getPdf);

module.exports = router;
