const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: String,
  level: Number
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  githubUsername: String,
  skills: [skillSchema],
  githubScore: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", userSchema);
