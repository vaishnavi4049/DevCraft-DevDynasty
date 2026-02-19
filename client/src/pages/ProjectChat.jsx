import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import api from "../services/axiosConfig";

function ProjectChat() {
  const { projectId } = useParams();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [projectUsers, setProjectUsers] = useState([]);
  const [compatibilityScores, setCompatibilityScores] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      const currentUser = res.data.user;
      setUser(currentUser);

      socket.emit("joinRoom", { projectId, userId: currentUser._id });
      fetchProjectUsers(currentUser._id);
    } catch (error) {
      console.log("User not authenticated");
    }
  };

  const fetchProjectUsers = async (currentUserId) => {
    try {
      const res = await api.get(`/projects/${projectId}/users`);
      const users = res.data;

      const collaborators = users.filter(u => u._id !== currentUserId);
      setProjectUsers(collaborators);

      const scores = {};
      for (let u of users) {
        if (u._id === currentUserId) continue;

        try {
          const compRes = await api.get(
            `/compatibility/${currentUserId}/${u._id}`
          );
          scores[u._id] = compRes.data.compatibility;
        } catch {
          scores[u._id] = 0;
        }
      }

      setCompatibilityScores(scores);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on("userJoined", async (newUser) => {
      if (newUser._id === user?._id) return;

      setProjectUsers(prev => [...prev, newUser]);

      try {
        const compRes = await api.get(
          `/compatibility/${user._id}/${newUser._id}`
        );

        setCompatibilityScores(prev => ({
          ...prev,
          [newUser._id]: compRes.data.compatibility
        }));
      } catch {
        console.log("Compatibility fetch error");
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userJoined");
    };
  }, [user]);

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
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden relative">

      {/* 🌌 Background Glow (SAME AS LANDING) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex h-screen">

        {/* Sidebar */}
        <div className="w-80 hidden md:block p-6 border-r border-white/10 bg-white/5 backdrop-blur-xl overflow-y-auto">
          <h3 className="text-xl font-bold mb-6">
            Collaborators
          </h3>

          {projectUsers.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No teammates yet
            </p>
          ) : (
            <div className="space-y-4">
              {projectUsers.map(u => {
                const score = compatibilityScores[u._id] ?? 0;

                return (
                  <div
                    key={u._id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">
                        {u.fullname}
                      </span>
                      <span className="text-sm text-purple-400 font-semibold">
                        {score}%
                      </span>
                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">

          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Project Chat
            </h2>

            <span className="text-gray-400 text-sm">
              {projectUsers.length + 1} Members
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-4">

            {messages.map((msg, index) => {
              const isMe = msg.sender?._id === user?._id;

              return (
                <div
                  key={index}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-5 py-4 rounded-2xl text-sm border backdrop-blur-xl
                      ${
                        isMe
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent"
                          : "bg-white/5 border-white/10 text-gray-200"
                      }`}
                  >
                    {!isMe && (
                      <p className="text-xs mb-1 text-purple-400 font-semibold">
                        {msg.sender?.fullname || "Unknown"}
                      </p>
                    )}

                    <p>{msg.text}</p>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl flex gap-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none transition"
            />

            <button
              onClick={sendMessage}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 font-semibold shadow-lg hover:scale-105 transition"
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProjectChat;
