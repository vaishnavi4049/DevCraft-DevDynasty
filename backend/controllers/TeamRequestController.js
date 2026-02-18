const TeamRequest = require("../models/TeamRequest");
const Project = require("../models/Project");


// 🔹 Apply to Join Project
exports.applyToProject = async (req, res) => {
  try {
    const { projectId, message } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // prevent duplicate request
    const existing = await TeamRequest.findOne({
      project: projectId,
      sender: req.id,
      status: "pending"
    });

    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await TeamRequest.create({
      type: "project_join",
      project: projectId,
      sender: req.id,
      receiver: project.createdBy,
      message
    });

    res.status(201).json({
      success: true,
      request
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.respondToRequest = async (req, res) => {
//   try {
//     const { requestId, action } = req.body; // action = accept or reject

//     const request = await TeamRequest.findById(requestId);

//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     if (!request.receiver.equals(req.id)) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     if (action === "accept") {
//       request.status = "accepted";

//       // Add user to project team
//       await Project.findByIdAndUpdate(request.project, {
//         $addToSet: { team: request.sender }
//       });

//     } else {
//       request.status = "rejected";
//     }

//     await request.save();

//     res.json({
//       success: true,
//       message: `Request ${action}ed`
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.respondToRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    const request = await TeamRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    // 🔥 If accepted → add to project team
    if (status === "accepted") {
      const project = await Project.findById(request.project);

      if (!project.team.includes(request.sender)) {
        project.team.push(request.sender);
        await project.save();
      }
    }

    res.json({
      success: true,
      message: `Request ${status}`
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await TeamRequest.find({
      sender: req.id   // logged-in user
    })
      .populate({
        path: "project",
        populate: {
          path: "createdBy",
          select: "fullname"
        }
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      requests
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await TeamRequest.find({
      receiver: req.id   // logged-in creator
    })
      .populate("sender", "fullname githubUsername githubScore verifiedSkills")
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      requests
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};