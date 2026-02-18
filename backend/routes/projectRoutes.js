const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  searchProjects,
  getMyProjects,
  deleteProject,
  updateProject
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


module.exports = router;
