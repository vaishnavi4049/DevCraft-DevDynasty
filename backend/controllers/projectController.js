const Project = require("../models/Project");
const User = require("../models/User");


exports.createProject = async (req, res) => {
  try {
    if (req.role !== "creator") {
      return res.status(403).json({
        success: false,
        message: "Only creators can post projects"
      });
    }

    const { title, description, openRole, requiredSkills, duration } = req.body;

    const project = await Project.create({
      title,
      description,
      openRole,
      requiredSkills,
      duration,
      createdBy: req.id
    });

    res.status(201).json({
      success: true,
      project
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchProjects = async (req, res) => {
  try {
    const { keyword } = req.query;

    const projects = await Project.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { openRole: { $regex: keyword, $options: "i" } }
      ]
    });

    res.json({ success: true, projects });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "fullname")
      .populate("team", "_id fullname")
      .sort({ createdAt: -1 });

    res.json({ success: true, projects });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.id
    }).sort({ createdAt: -1 });

    res.json({ success: true, projects });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    if (!project.createdBy.equals(req.id)) {
      return res.status(403).json({
        success: false,
        message: "You can only modify your own project"
      });
    }

    const { title, description, openRole, requiredSkills, duration } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.openRole = openRole || project.openRole;
    project.requiredSkills = requiredSkills || project.requiredSkills;
    project.duration = duration || project.duration;

    await project.save();

    res.json({
      success: true,
      message: "Project updated successfully",
      project
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    if (!project.createdBy.equals(req.id))
      return res.status(403).json({ success: false, message: "Not authorized" });

    await project.deleteOne();

    res.json({ success: true, message: "Project deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.applyToProject = async (req, res) => {
  try {
    if (req.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only developers can apply"
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    if (project.applicants.includes(req.id))
      return res.status(400).json({ success: false, message: "Already applied" });

    project.applicants.push(req.id);
    await project.save();

    res.json({ success: true, message: "Applied successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMatchingProjects = async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const userSkills = (user.verifiedSkills || []).map(s => s.name);

    const projects = await Project.find({
      requiredSkills: { $in: userSkills },
      status: "open"
    }).populate("createdBy", "fullname");

    res.json({ success: true, projects });

  } catch (error) {
    console.log("Matching Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.getAppliedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      applicants: req.id
    });

    res.json({ success: true, projects });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecommendedDevelopers = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const users = await User.find({ role: "user" });

    const rankedUsers = users.map(user => {
      const verifiedSkills = user.verifiedSkills || [];

      const userSkillNames = verifiedSkills.map(skill => skill.name);

      const matchedSkills = project.requiredSkills.filter(skill =>
        userSkillNames.includes(skill)
      );

      const skillScore =
        project.requiredSkills.length > 0
          ? (matchedSkills.length / project.requiredSkills.length) * 100
          : 0;

      const normalizedGithubScore =
        Math.log(user.githubScore + 1);

      const finalScore =
        (skillScore * 0.7) +
        (normalizedGithubScore * 0.3);

     return {
  _id: user._id,
  fullname: user.fullname,
  matchedSkills,
  githubScore: user.githubScore,
  availability: user.availability || 0,
  skillMatchPercent: Math.round(skillScore),
  finalScore: Number(finalScore.toFixed(2))
};

    })
    .filter(user => user.finalScore > 0)
    .sort((a, b) => b.finalScore - a.finalScore);

    res.json({
      success: true,
      developers: rankedUsers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
