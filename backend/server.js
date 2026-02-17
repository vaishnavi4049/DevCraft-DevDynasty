require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const matchRoutes = require("./routes/matchRoutes");

const app = express();   // ✅ MUST come before app.use()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", matchRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("CollabSphere API Running 🚀");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });
