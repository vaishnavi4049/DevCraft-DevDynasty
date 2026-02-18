import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import api from "../services/axiosConfig";

function ProjectChat() {
  const { projectId } = useParams(); // ✅ get from URL

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);

      // join room AFTER user is fetched
      socket.emit("joinRoom", {
        projectId,
        userId: res.data.user._id
      });

    } catch (error) {
      console.log("User not authenticated");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      projectId,
      userId: user?._id,
      text
    });

    setText("");
  };


  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Project Chat</h2>

      <div className="border h-96 overflow-y-scroll p-4 mb-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender?.fullname}</strong>: {msg.text}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full rounded-l"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ProjectChat;
