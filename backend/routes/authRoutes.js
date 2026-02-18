const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { register, login } = require("../controllers/authController");
const isAuthenticated = require("../middleware/isAuthenticated").isAuthenticated;
const jwt = require("jsonwebtoken");


router.post("/register", register);

router.post("/login", login);

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});


module.exports = router;
