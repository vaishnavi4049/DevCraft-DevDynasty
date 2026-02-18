const User = require("../models/User");

exports.matchUsers = async (req, res) => {
  try {
    const { requiredSkills } = req.body;

    if (!Array.isArray(requiredSkills)) {
      return res.status(400).json({
        message: "requiredSkills must be an array"
      });
    }

    const users = await User.find();

    const rankedUsers = users.map(user => {

      const verifiedSkills = user.verifiedSkills || [];

      const userSkillNames = verifiedSkills.map(
        skill => skill.name
      );

      const matchedSkills = requiredSkills.filter(skill =>
        userSkillNames.includes(skill)
      );

      const skillMatchRatio =
        requiredSkills.length > 0
          ? matchedSkills.length / requiredSkills.length
          : 0;

      const skillScore = skillMatchRatio * 100;

      // Normalize GitHub score to avoid huge numbers dominating
      const normalizedGithubScore =
        Math.log(user.githubScore + 1);

      const finalScore =
        (skillScore * 0.8) +
        (normalizedGithubScore * 0.2);

      return {
        name: user.name,
        matchedSkills,
        skillMatchPercent: skillScore.toFixed(0),
        githubScore: user.githubScore,
        finalScore: finalScore.toFixed(2)
      };
    })
    .filter(user => Number(user.skillMatchPercent) > 0)
    .sort((a, b) => b.finalScore - a.finalScore);

    res.json(rankedUsers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
