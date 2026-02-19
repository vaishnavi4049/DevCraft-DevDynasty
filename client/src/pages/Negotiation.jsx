import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../services/socket";
import api from "../services/axiosConfig";

function NegotiationChat() {

  const { conversationId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchConversation();
  }, []);

  const fetchUser = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data.user);
  };

  const fetchConversation = async () => {
    const res = await api.get(`/conversations/${conversationId}`);
    setConversation(res.data);
  };

  useEffect(() => {
    if (!conversationId) return;

    socket.emit("joinNegotiation", conversationId);

    socket.on("receiveNegotiationMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("receiveNegotiationMessage");
    };
  }, [conversationId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendNegotiationMessage", {
      conversationId,
      userId: user._id,
      text
    });

    setText("");
  };

  const sendOffer = async () => {
    await api.post(`/conversations/${conversationId}/send-offer`);
    alert("Offer Sent!");
  };

  const acceptOffer = async () => {
    const res = await api.post(
      `/conversations/${conversationId}/accept`
    );

    const projectId = res.data.projectId;

    navigate(`/project-chat/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">

      <h2 className="text-2xl font-bold mb-6">
        Negotiation Chat
      </h2>

      <div className="h-96 overflow-y-auto bg-white/5 p-4 rounded-xl mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.sender?.fullname}</strong>: {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-white/5"
          placeholder="Type message..."
        />
        <button
          onClick={sendMessage}
          className="px-6 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500"
        >
          Send
        </button>
      </div>

      {/* OFFER BUTTON (only creator should see ideally) */}
      {conversation?.status === "negotiating" && (
        <button
          onClick={sendOffer}
          className="bg-green-500 px-4 py-2 rounded-xl"
        >
          Send Offer
        </button>
      )}

      {/* ACCEPT BUTTON (only developer should see ideally) */}
      {conversation?.status === "offer-sent" && (
        <button
          onClick={acceptOffer}
          className="bg-blue-500 px-4 py-2 rounded-xl"
        >
          Accept Offer
        </button>
      )}

    </div>
  );
}

export default NegotiationChat;
