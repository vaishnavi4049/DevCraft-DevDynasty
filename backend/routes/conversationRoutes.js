const express = require("express");
const router = express.Router();

const {
  createConversation,
  sendOffer,
  acceptOffer,
} = require("../controllers/ConversationController");

const { isAuthenticated } = require("../middleware/isAuthenticated");

router.post("/", isAuthenticated, createConversation);
router.post("/:id/send-offer", isAuthenticated, sendOffer);
router.post("/:id/accept", isAuthenticated, acceptOffer);

module.exports = router;
