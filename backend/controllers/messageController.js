const TeamRequest = require("../models/TeamRequest");
const Project = require("../models/Project");
const Message = require ("../models/Message");
exports.getMessages = async (req, res) => {
  try {
    const { projectId } = req.params;

    const messages = await Message.find({ project: projectId })
      .populate("sender", "name")   
      .sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};