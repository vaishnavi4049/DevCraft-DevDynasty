const express = require("express");

const Project = require("../models/Project");
const User = require("../models/User");

const router = express.Router();

const {
  createProject,
  getAllProjects,
  searchProjects,
  getMyProjects,
  deleteProject,
  updateProject,

} = require("../controllers/projectController");


const { isAuthenticated } =
  require("../middleware/isAuthenticated");

// Create project (creator only)
router.post("/", isAuthenticated, createProject);

// Get all projects
router.get("/", getAllProjects);

// Search projects
router.get("/search", searchProjects);

// Get projects of logged-in creator
router.get("/my-projects", isAuthenticated, getMyProjects);
// Update project
router.put("/:id", isAuthenticated, updateProject);

// Delete project
router.delete("/:id", isAuthenticated, deleteProject);
router.get("/:projectId/users", async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("team", "fullname skills githubScore")
      .populate("createdBy", "fullname skills githubScore"); // populate creator

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // include creator + team members
    const allUsers = [project.createdBy, ...project.team];
    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
