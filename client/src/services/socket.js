import { io } from "socket.io-client";

const socket = io("https://backend.onrender.com", {
  withCredentials: true
});

export default socket;
