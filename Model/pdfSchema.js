const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema({
  title: String,
  pdf: String,
});

module.exports = mongoose.model("Pdf", pdfSchema);
