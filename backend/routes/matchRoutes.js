const express = require("express");
const router = express.Router();
const { matchUsers } = require("../controllers/matchController");

router.post("/", matchUsers);

module.exports = router;
