const express = require("express");
const router = express.Router();
const { matchUsers } = require("../controllers/matchController");

router.post("/match", matchUsers);

module.exports = router;
