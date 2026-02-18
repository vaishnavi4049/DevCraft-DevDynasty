const mongoose = require("mongoose");

const verifiedSkillSchema = new mongoose.Schema({
  name: String,
  repoCount: Number,
  confidenceScore: Number,
});

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "creator"],
      default: "user",
    },
     
    skills: [{ name: String }],
    bio: { type: String, default: "" },
    availability: { type: Number, default: 0 },
    profileCompleted: { type: Boolean, default: false },
    githubVerified: { type: Boolean, default: false },
    githubUsername: String,
    verifiedSkills: [verifiedSkillSchema],
    githubScore: {
      type: Number,
      default: 0,
    },
    
    completedProjects: {
  type: Number,
  default: 0
},

totalProjects: {
  type: Number,
  default: 0
}
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
