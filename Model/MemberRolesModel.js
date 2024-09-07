const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
  },
});

const MemberRoleSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  positions: [roleSchema],
});

module.exports = mongoose.model("MemberRole", MemberRoleSchema);
