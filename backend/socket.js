import { Server } from "socket.io";
import Message from "./models/Message.js";

export const initSocket = (server) => {

  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://devdynasty-git-main-vaishnaviadhav777-gmailcoms-projects.vercel.app"
      ],
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ["websocket", "polling"] // important for Render
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinNegotiation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("joinProjectRoom", (projectId) => {
      socket.join(projectId);
    });

    socket.on("sendNegotiationMessage", async (data) => {
      try {
        const message = await Message.create({
          conversation: data.conversationId,
          sender: data.userId,
          text: data.text
        });

        io.to(data.conversationId)
          .emit("receiveNegotiationMessage", message);

      } catch (error) {
        console.error("Error sending negotiation message:", error);
      }
    });

    socket.on("sendProjectMessage", (data) => {
      io.to(data.projectId)
        .emit("receiveProjectMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

};