import { Server } from "socket.io";
import Message from "./models/Message.js";

export const initSocket = (server) => {

  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {

    socket.on("joinNegotiation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("joinProjectRoom", (projectId) => {
      socket.join(projectId);
    });

    socket.on("sendNegotiationMessage", async (data) => {

      const message = await Message.create({
        conversation: data.conversationId,
        sender: data.userId,
        text: data.text
      });

      io.to(data.conversationId)
        .emit("receiveNegotiationMessage", message);
    });

    socket.on("sendProjectMessage", (data) => {
      io.to(data.projectId)
        .emit("receiveProjectMessage", data);
    });

  });
};
