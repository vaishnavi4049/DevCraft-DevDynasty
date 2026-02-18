const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
   try {
    const { fullname, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role // must be either "user" or "creator"
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      success: false
    });
  }
};

exports.login = async (req, res) => {
  //   try {
  //   const { email, password } = req.body;

  //   const user = await User.findOne({ email });

  //   if (!user) {
  //     return res.status(400).json({
  //       message: "Invalid credentials",
  //       success: false
  //     });
  //   }

  //   const isMatch = await bcrypt.compare(password, user.password);

  //   if (!isMatch) {
  //     return res.status(400).json({
  //       message: "Invalid credentials",
  //       success: false
  //     });
  //   }

  //   const token = jwt.sign(
  //     {
  //       id: user._id,
  //       role: user.role
  //     },
  //     process.env.SECRET_KEY,
  //     { expiresIn: "1d" }
  //   );

  // res.status(200)
  // .cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  //   maxAge: 24 * 60 * 60 * 1000
  // })
  // .json({
  //   success: true,
  //   user: {
  //     _id: user._id,
  //     fullname: user.fullname,
  //     role: user.role,
  //     profileCompleted: user.profileCompleted, // <-- add this
  //     skills: user.skills || [],
  //     bio: user.bio || "",
  //     githubUsername: user.githubUsername || "",
  //     githubScore: user.githubScore || 0
  //   }
  // });

  // } catch (error) {
  //   res.status(500).json({
  //     message: "Login failed",
  //     success: false
  //   });
  // }
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials", success: false });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1d" });

    // Return updated user object including profileCompleted
    const userData = await User.findById(user._id).select("-password");

    res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
      })
      .json({ success: true, user: userData });

  } catch (error) {
    res.status(500).json({ message: "Login failed", success: false });
  }
};
