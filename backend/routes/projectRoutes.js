const express = require("express");
const router = express.Router();
const Project = require("../models/Project");



const {
  createProject,
  getAllProjects,
  searchProjects,
  getMyProjects,
  deleteProject,
  updateProject,
  applyToProject,
  getMatchingProjects,
  getAppliedProjects,
  getRecommendedDevelopers
} = require("../controllers/projectController");

const { isAuthenticated } = require("../middleware/isAuthenticated");


// =======================
// PROJECT CRUD
// =======================

router.post("/", isAuthenticated, createProject);
router.get("/", getAllProjects);
router.get("/search", searchProjects);
router.get("/my-projects", isAuthenticated, getMyProjects);



router.get("/matching", isAuthenticated, getMatchingProjects);
router.get("/applied", isAuthenticated, getAppliedProjects);
router.get("/:projectId/recommend", isAuthenticated, getRecommendedDevelopers);

router.post("/:id/apply", isAuthenticated, applyToProject);


router.put("/:id", isAuthenticated, updateProject);
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
