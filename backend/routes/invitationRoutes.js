const express = require("express");
const router = express.Router();
const Invitation = require("../models/Invitation");
const Conversation = require("../models/Conversation");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const Project = require("../models/Project");

// 🔥 Send Invitation
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { projectId, developerId } = req.body;

    const existing = await Invitation.findOne({
      projectId,
      developerId,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({ message: "Already invited" });
    }

    const invitation = await Invitation.create({
      projectId,
      recruiterId: req.user.id,
      developerId,
    });

    res.status(201).json(invitation);
  } catch (err) {
    res.status(500).json({ message: "Error sending invitation" });
  }
});

// // 🔥 Get Developer Invitations
// router.get("/developer", isAuthenticated, async (req, res) => {
//   try {
//     const invites = await Invitation.find({
//       developerId: req.user.id,
//       status: "pending",
//     }).populate("projectId recruiterId");

//     res.json(invites);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching invitations" });
//   }
// });
router.get("/developer", isAuthenticated, async (req, res) => {
  try {
    console.log("Logged in user:", req.user.id);

    const invites = await Invitation.find({
      developerId: req.user.id,
    }).populate("projectId recruiterId");

    console.log(invites);

    res.json(invites);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching invitations" });
  }
});
// 🔥 Accept Invitation
router.patch("/:id/accept", isAuthenticated, async (req, res) => {
  try {
    const invite = await Invitation.findById(req.params.id);

    if (!invite) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    const project = await Project.findById(invite.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // update team safely
    await Project.findByIdAndUpdate(invite.projectId, {
      $addToSet: { team: invite.developerId }
    });

    // now update invite
    invite.status = "accepted";
    await invite.save();

    res.json({
      success: true,
      projectId: project._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
// 🔥 Reject Invitation
router.patch("/:id/reject", isAuthenticated, async (req, res) => {
  try {
    const invite = await Invitation.findById(req.params.id);

    invite.status = "rejected";
    await invite.save();

    res.json({ message: "Rejected" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting invitation" });
  }
});

module.exports = router;
