const User = require("../models/User");

exports.matchUsers = async (req, res) => {
  try {
    const { requiredSkills } = req.body;

    const users = await User.find();

    const rankedUsers = users.map(user => {

      const userSkillNames = user.skills.map(skill => skill.name);

      const matchedSkills = requiredSkills.filter(skill =>
        userSkillNames.includes(skill)
      );

      const skillMatchRatio =
        matchedSkills.length / requiredSkills.length;

      const skillScore = skillMatchRatio * 100;

      const finalScore =
        (skillScore * 0.7) +
        (user.githubScore * 0.3);

      return {
        name: user.name,
        skills: user.skills,
        githubScore: user.githubScore,
        skillMatchPercent: skillScore.toFixed(0),
        finalScore: finalScore.toFixed(2)
      };
    })
    .filter(user => user.skillMatchPercent > 0)
    .sort((a, b) => b.finalScore - a.finalScore);

    res.json(rankedUsers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
