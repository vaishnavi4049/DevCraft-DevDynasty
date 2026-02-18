
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const isAuthenticated = require("../middleware/isAuthenticated").isAuthenticated;

// Analyze GitHub profile to get verified skills and GitHub score
const analyzeGithubProfile = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repos = response.data;

    if (!Array.isArray(repos)) return { verifiedSkills: [], githubScore: 0 };

    let languageMap = {};
    let totalStars = 0;

    repos.forEach(repo => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count || 0;
    });

    const totalRepos = repos.length || 1;

    const verifiedSkills = Object.keys(languageMap).map(lang => ({
      name: lang,
      repoCount: languageMap[lang],
      confidenceScore: Math.round((languageMap[lang] / totalRepos) * 100)
    }));

    const githubScore = (totalRepos * 5) + (totalStars * 3);

    return { verifiedSkills, githubScore };
  } catch (err) {
    console.log("GitHub Analysis Error:", err.message);
    return { verifiedSkills: [], githubScore: 0 };
  }
};

// Complete Profile route
router.post("/complete-profile", isAuthenticated, async (req, res) => {
  try {
    const { skills, bio, availability, githubUsername } = req.body;

    if (!skills || skills.length === 0 || !githubUsername) {
      return res.status(400).json({ message: "Skills and GitHub username are required" });
    }

    // Fetch verified skills & GitHub score dynamically from GitHub
    const { verifiedSkills, githubScore } = await analyzeGithubProfile(githubUsername);

    const user = await User.findById(req.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Save skills and verifiedSkills
    user.skills = skills.map(skill => ({ name: skill }));
    user.verifiedSkills = verifiedSkills; // From GitHub analysis

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
