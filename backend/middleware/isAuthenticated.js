const User = require("../models/User");
const jwt= require("jsonwebtoken");
exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false
      });
    }

    req.user = user;
    req.id = user._id;
    req.role = user.role;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      success: false
    });
  }
};

