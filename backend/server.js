require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const matchRoutes = require("./routes/matchRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/match", matchRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("🚀 CollabSphere API Running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});
