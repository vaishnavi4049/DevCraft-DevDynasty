const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET all messages for a project room
router.get("/:projectId", async (req, res) => {
  try {
    const messages = await Message.find({
      roomId: req.params.projectId
    })
    .populate("sender", "fullname")
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;