const mongoose = require("mongoose");

const teamRequestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["project_join", "direct_invite"],
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("TeamRequest", teamRequestSchema);
