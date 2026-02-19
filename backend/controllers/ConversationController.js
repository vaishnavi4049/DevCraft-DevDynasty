const Conversation = require("../models/Conversation");
const Project = require("../models/Project");
const User = require("../models/User");

const createConversation = async (req, res) => {
  try {
    const { projectId, developerId } = req.body;

    if (!projectId || !developerId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Prevent duplicate conversation
    const existingConversation = await Conversation.findOne({
      project: projectId,
      participants: { $all: [req.user.id, developerId] },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const conversation = await Conversation.create({
      project: projectId,
      participants: [req.user.id, developerId],
    });

    res.status(201).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const sendOffer = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    conversation.status = "offer-sent";
    await conversation.save();

    res.json({ message: "Offer Sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const acceptOffer = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    if (conversation.status === "accepted") {
      return res.status(400).json({ message: "Already accepted" });
    }

    const project = await Project.findById(conversation.project);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    if (!conversation.participants.includes(req.user.id)) {
  return res.status(403).json({ message: "Not allowed" });
}
    const developerId = req.user.id;

    // Add developer safely
    if (!project.teamMembers.includes(developerId)) {
      project.teamMembers.push(developerId);
    }

    project.status = "in-progress";
    await project.save();

    // Update conversation
    conversation.status = "accepted";
    await conversation.save();

    // Add project to developer profile
    await User.findByIdAndUpdate(developerId, {
      $addToSet: { projects: project._id },
    });
   

    res.json({
      message: "Offer Accepted",
      projectId: project._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createConversation,
  sendOffer,
  acceptOffer,
};
