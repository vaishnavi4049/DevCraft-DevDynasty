const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");

const isAuthenticated = require("../middleware/isAuthenticated").isAuthenticated;
// Function to fetch GitHub score
const fetchGithubScore = async (githubUsername) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${githubUsername}`);
    const { public_repos, followers, following } = res.data;
    // Simple scoring formula
    return Math.round(public_repos * 2 + followers * 1.5 + following * 0.5);
  } catch (err) {
    throw new Error("GitHub username not found");
  }
};

// Complete Profile route
router.post("/complete-profile", isAuthenticated, async (req, res) => {
  try {
    const { skills, bio, availability, githubUsername } = req.body;

    if (!skills || skills.length === 0 || !githubUsername) {
      return res.status(400).json({ message: "Skills and GitHub username are required" });
    }

    const githubScore = await fetchGithubScore(githubUsername);

    const user = await User.findById(req.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.skills = skills.map((skill) => ({ name: skill }));
    user.bio = bio || "";
    user.availability = availability || 0;
    user.githubUsername = githubUsername;
    user.githubScore = githubScore;
    user.githubVerified = true;
    user.profileCompleted = true;

    await user.save();

    res.status(200).json({ message: "Profile completed successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
