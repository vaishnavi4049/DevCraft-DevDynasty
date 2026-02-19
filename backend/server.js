
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const matchRoutes = require("./routes/matchRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const completeProfileRoutes = require("./routes/CompleteProfileRoute");
const compatibilityRoutes = require("./routes/CompatibilityRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

const TeamRequest = require("./models/TeamRequest");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", completeProfileRoutes);
app.use("/api/compatibility", compatibilityRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/request", require("./routes/TeamRequestRoutes"));

/* ================= SOCKET LOGIC ================= */

io.on("connection", (socket) => {

  // GROUP CHAT
  socket.on("joinRoom", async ({ projectId, userId }) => {

    const accepted = await TeamRequest.findOne({
      project: projectId,
      status: "accepted",
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    });

    if (!accepted) {
      return socket.emit("error", "Not authorized to join chat");
    }

    socket.join(projectId);
  });

  socket.on("sendMessage", async ({ projectId, userId, text }) => {

    const message = await Message.create({
      roomId: projectId,
      sender: userId,
      text
    });

    const populatedMessage =
      await message.populate("sender", "fullname");

    io.to(projectId).emit("receiveMessage", populatedMessage);
  });

  // NEGOTIATION CHAT
  socket.on("joinNegotiation", (conversationId) => {
    socket.join(conversationId);
  });

 socket.on("sendNegotiationMessage", async ({ conversationId, userId, text }) => {

  const message = await Message.create({
    conversation: conversationId,
    sender: userId,
    text
  });

  const populatedMessage =
    await message.populate("sender", "fullname");

  io.to(conversationId)
    .emit("receiveNegotiationMessage", populatedMessage);
});


}

);

/* ================= DATABASE ================= */

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});
