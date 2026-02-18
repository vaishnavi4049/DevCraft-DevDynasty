const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/isAuthenticated");
const {
  applyToProject,
  respondToRequest,  getMyRequests, getReceivedRequests
} = require("../controllers/TeamRequestController");

router.post("/apply", isAuthenticated, applyToProject);
router.post("/respond", isAuthenticated, respondToRequest);
router.get("/my-requests", isAuthenticated, getMyRequests);
router.get("/received", isAuthenticated, getReceivedRequests);

module.exports = router;
