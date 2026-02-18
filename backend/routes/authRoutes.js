const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const isAuthenticated = require("../middleware/isAuthenticated").isAuthenticated;

router.post("/register", register);

router.post("/login", login);

router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});


router.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0)
    })
    .json({
      success: true,
      message: "Logged out successfully"
    });
});

module.exports = router;
