const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: String,
  level: Number
});

const userSchema = new mongoose.Schema({
    fullname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "creator"],
    default: "user"
  },

  githubUsername: String,
  skills: [skillSchema],
  githubScore: {
    type: Number,
    default: 0
  }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
