const Project = require("../models/Project");

// 🔹 Create Project (Creator Only)
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

// 🔹 Get All Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "fullname")
  .populate("team", "_id fullname")
      .sort({ createdAt: -1 });

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Projects Created By Logged In Creator
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      projects
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Delete Project (Only Owner)
exports.deleteProject = async (req, res) => {
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
    message: "Not authorized to delete this project"
  });
}


    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Apply to Project (Developer Only)
exports.applyToProject = async (req, res) => {
  try {
    if (req.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only developers can apply"
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // Prevent duplicate applications
    if (project.applicants.includes(req.id)) {
      return res.status(400).json({
        success: false,
        message: "Already applied"
      });
    }

    project.applicants.push(req.id);
    await project.save();

    res.json({
      success: true,
      message: "Applied successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔹 Update Project (Only Owner)
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

// 🔹 Get Projects Matching Developer Skills
exports.getMatchingProjects = async (req, res) => {
  try {
    const user = await User.findById(req.id);

    const userSkills = user.verifiedSkills.map(skill => skill.name);

    const projects = await Project.find({
      requiredSkills: { $in: userSkills }
    }).populate("createdBy", "fullname");

    res.json({
      success: true,
      projects
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAppliedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      applicants: req.id
    });

    res.json({
      success: true,
      projects
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔹 Search Projects
exports.searchProjects = async (req, res) => {
  try {
    const { keyword } = req.query;

    const projects = await Project.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { openRole: { $regex: keyword, $options: "i" } }
      ]
    });

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
