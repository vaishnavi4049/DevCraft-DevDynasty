const User = require("../models/User");
const { analyzeGithubProfile } = require("../services/githubAnalyzer");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { name, email, githubUsername } = req.body;

    if (!name || !email || !githubUsername) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const { verifiedSkills, githubScore } =
      await analyzeGithubProfile(githubUsername);

    let user = await User.findOne({ email });

    if (user) {
      user.name = name;
      user.githubUsername = githubUsername;
      user.verifiedSkills = verifiedSkills;
      user.githubScore = githubScore;
      await user.save();
    } else {
      user = new User({
        name,
        email,
        githubUsername,
        verifiedSkills,
        githubScore
      });
      await user.save();
    }

    res.json({
      message: "Profile verified successfully",
      verifiedSkills,
      githubScore
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
