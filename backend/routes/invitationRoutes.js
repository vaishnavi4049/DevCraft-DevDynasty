const express = require("express");
const router = express.Router();
const Invitation = require("../models/Invitation");
const Conversation = require("../models/Conversation");
const { isAuthenticated } = require("../middleware/isAuthenticated");

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

// 🔥 Get Developer Invitations
router.get("/developer", isAuthenticated, async (req, res) => {
  try {
    const invites = await Invitation.find({
      developerId: req.user.id,
      status: "pending",
    }).populate("projectId recruiterId");

    res.json(invites);
  } catch (err) {
    res.status(500).json({ message: "Error fetching invitations" });
  }
});

// 🔥 Accept Invitation
router.patch("/:id/accept", isAuthenticated, async (req, res) => {
  try {
    const invite = await Invitation.findById(req.params.id);

    if (!invite) return res.status(404).json({ message: "Not found" });

    invite.status = "accepted";
    await invite.save();

    // Create Conversation
    const conversation = await Conversation.create({
      projectId: invite.projectId,
      recruiterId: invite.recruiterId,
      developerId: invite.developerId,
    });

    res.json({ message: "Accepted", conversation });
  } catch (err) {
    res.status(500).json({ message: "Error accepting invitation" });
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
