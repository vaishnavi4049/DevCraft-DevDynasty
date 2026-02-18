const mongoose = require("mongoose");

const verifiedSkillSchema = new mongoose.Schema({
  name: String,
  repoCount: Number,
  confidenceScore: Number
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  githubUsername: String,
  verifiedSkills: [verifiedSkillSchema],
  githubScore: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", userSchema);
