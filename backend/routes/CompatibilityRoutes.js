const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");

// GET compatibility between two users
router.get("/:userAId/:userBId", async (req, res) => {
  try {
    const { userAId, userBId } = req.params;

    const userA = await User.findById(userAId);
    const userB = await User.findById(userBId);

    if (!userA || !userB) {
      return res.status(404).json({ message: "User not found" });
    }

    // -----------------------------
    // 1️⃣ Skill Overlap Score (30)
    // -----------------------------

    const skillsA = userA.skills.map(s => s.name.toLowerCase());
    const skillsB = userB.skills.map(s => s.name.toLowerCase());

    const overlap = skillsA.filter(skill => skillsB.includes(skill));

    const maxSkills = Math.max(skillsA.length, skillsB.length) || 1;

    const skillScore = (overlap.length / maxSkills) * 30;

    // -----------------------------
    // 2️⃣ GitHub Strength Balance (20)
    // -----------------------------

    const diff = Math.abs(userA.githubScore - userB.githubScore);
    const maxScore = Math.max(userA.githubScore, userB.githubScore) || 1;

    const githubBalanceScore = (1 - diff / maxScore) * 20;

    // -----------------------------
    // 3️⃣ Past Collaboration (30)
    // -----------------------------

    const commonProjects = await Project.find({
      team: { $all: [userAId, userBId] }
    });

    const collaborationScore = commonProjects.length > 0 ? 30 : 0;

    // -----------------------------
    // 4️⃣ Completion Reliability (20)
    // -----------------------------

    const completionRateA =
      userA.totalProjects > 0
        ? userA.completedProjects / userA.totalProjects
        : 0;

    const completionRateB =
      userB.totalProjects > 0
        ? userB.completedProjects / userB.totalProjects
        : 0;

    const avgCompletion = (completionRateA + completionRateB) / 2;

    const reliabilityScore = avgCompletion * 20;


    const compatibility =
      skillScore +
      githubBalanceScore +
      collaborationScore +
      reliabilityScore;

    res.json({
      compatibility: Math.round(compatibility),
      breakdown: {
        skillScore: Math.round(skillScore),
        githubBalanceScore: Math.round(githubBalanceScore),
        collaborationScore,
        reliabilityScore: Math.round(reliabilityScore)
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
