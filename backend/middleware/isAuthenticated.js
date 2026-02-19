
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated. Please login."
      });
    }

 
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token."
      });
    }


    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found."
      });
    }

    // 4️⃣ Attach user info to request
    req.user = user;
    req.id = user._id;
    req.role = user.role;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed."
    });
  }
};

module.exports = { isAuthenticated };
