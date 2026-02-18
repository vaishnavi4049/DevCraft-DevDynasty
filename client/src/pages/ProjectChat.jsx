// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import socket from "../services/socket";
// import api from "../services/axiosConfig";

// function ProjectChat() {
//   const { projectId } = useParams(); // ✅ get from URL

//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/auth/me");
//       setUser(res.data.user);

//       // join room AFTER user is fetched
//       socket.emit("joinRoom", {
//         projectId,
//         userId: res.data.user._id
//       });

//     } catch (error) {
//       console.log("User not authenticated");
//     }
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!text.trim()) return;

//     socket.emit("sendMessage", {
//       projectId,
//       userId: user?._id,
//       text
//     });

//     setText("");
//   };


//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Project Chat</h2>

//       <div className="border h-96 overflow-y-scroll p-4 mb-4 rounded">
//         {messages.map((msg, index) => (
//           <div key={index} className="mb-2">
//             <strong>{msg.sender?.fullname}</strong>: {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="border p-2 w-full rounded-l"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-indigo-600 text-white px-4 rounded-r"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProjectChat;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import socket from "../services/socket";
// import api from "../services/axiosConfig";

// function ProjectChat() {
//   const { projectId } = useParams();

//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [user, setUser] = useState(null);
//   const [projectUsers, setProjectUsers] = useState([]);
//   const [compatibilityScores, setCompatibilityScores] = useState({});

//   // 1️⃣ Fetch current user
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/auth/me");
//       const currentUser = res.data.user;
//       setUser(currentUser);

//       // join room AFTER user is fetched
//       socket.emit("joinRoom", {
//         projectId,
//         userId: currentUser._id
//       });

//       // fetch project users
//       fetchProjectUsers(currentUser._id);
//     } catch (error) {
//       console.log("User not authenticated");
//     }
//   };

//   // 2️⃣ Fetch all users in project and their compatibility
//   const fetchProjectUsers = async (currentUserId) => {
//     try {
//       const res = await api.get(`/projects/${projectId}/users`);
//       let users = res.data;

//       // exclude current user from collaborators list
//       users = users.filter(u => u._id !== currentUserId);
//       setProjectUsers(users);

//       // fetch compatibility with each user
//       const scores = {};
//       for (let u of users) {
//         try {
//           const compRes = await api.get(`/compatibility/${currentUserId}/${u._id}`);
//           scores[u._id] = compRes.data.compatibility;
//         } catch (err) {
//           console.log("Error fetching compatibility for", u.fullname);
//           scores[u._id] = 0;
//         }
//       }
//       setCompatibilityScores(scores);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 3️⃣ Listen for incoming messages
//   useEffect(() => {
//     socket.on("receiveMessage", (message) => {
//       setMessages(prev => [...prev, message]);
//     });

//     // optional: handle new user joining dynamically
//     socket.on("userJoined", async (newUser) => {
//       if (newUser._id === user?._id) return; // skip self
//       setProjectUsers(prev => [...prev, newUser]);

//       // fetch compatibility
//       try {
//         const compRes = await api.get(`/compatibility/${user._id}/${newUser._id}`);
//         setCompatibilityScores(prev => ({ ...prev, [newUser._id]: compRes.data.compatibility }));
//       } catch (err) {
//         console.log("Error fetching compatibility for new user");
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("userJoined");
//     };
//   }, [user]);

//   // 4️⃣ Send message
//   const sendMessage = () => {
//     if (!text.trim()) return;

//     socket.emit("sendMessage", {
//       projectId,
//       userId: user?._id,
//       text
//     });

//     setText("");
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Project Chat</h2>

//       {/* Collaborators & Compatibility */}
//       <div className="mb-4">
//         <h3 className="font-semibold mb-2">Collaborators & Compatibility</h3>
//         <div className="flex flex-col gap-2">
//           {projectUsers.map(u => (
//             <div key={u._id} className="flex items-center justify-between p-2 border rounded">
//               <span>{u.fullname}</span>
//               <span
//                 className={`px-2 py-1 rounded-full text-white font-semibold ${
//                   compatibilityScores[u._id] >= 75
//                     ? "bg-green-500"
//                     : compatibilityScores[u._id] >= 50
//                     ? "bg-yellow-500"
//                     : "bg-red-500"
//                 }`}
//               >
//                 {compatibilityScores[u._id] ?? 0}%
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="border h-96 overflow-y-scroll p-4 mb-4 rounded">
//         {messages.map((msg, index) => (
//           <div key={index} className="mb-2">
//             <strong>{msg.sender?.fullname || "Unknown"}</strong>: {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Message Input */}
//       <div className="flex">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="border p-2 w-full rounded-l"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-indigo-600 text-white px-4 rounded-r"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProjectChat;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import api from "../services/axiosConfig";

function ProjectChat() {
  const { projectId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [projectUsers, setProjectUsers] = useState([]);
  const [compatibilityScores, setCompatibilityScores] = useState({});

  // 1️⃣ Fetch current user
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      const currentUser = res.data.user;
      setUser(currentUser);

      // join room AFTER user is fetched
      socket.emit("joinRoom", { projectId, userId: currentUser._id });

      // fetch all users in project
      fetchProjectUsers(currentUser._id);
    } catch (error) {
      console.log("User not authenticated");
    }
  };

  // 2️⃣ Fetch all users in project and calculate compatibility
  const fetchProjectUsers = async (currentUserId) => {
    try {
      const res = await api.get(`/projects/${projectId}/users`);
      let users = res.data;

      // optionally exclude self for display
      const collaborators = users.filter(u => u._id !== currentUserId);
      setProjectUsers(collaborators);

      // fetch compatibility with each other user
      const scores = {};
      for (let u of users) {
        if (u._id === currentUserId) continue;
        try {
          const compRes = await api.get(`/compatibility/${currentUserId}/${u._id}`);
          scores[u._id] = compRes.data.compatibility;
        } catch (err) {
          console.log("Error fetching compatibility for", u.fullname);
          scores[u._id] = 0;
        }
      }
      setCompatibilityScores(scores);
    } catch (err) {
      console.log(err);
    }
  };

  // 3️⃣ Listen for incoming messages and new users
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on("userJoined", async (newUser) => {
      if (newUser._id === user?._id) return;
      setProjectUsers(prev => [...prev, newUser]);

      // fetch compatibility with new user
      try {
        const compRes = await api.get(`/compatibility/${user._id}/${newUser._id}`);
        setCompatibilityScores(prev => ({ ...prev, [newUser._id]: compRes.data.compatibility }));
      } catch (err) {
        console.log("Error fetching compatibility for new user");
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userJoined");
    };
  }, [user]);

  // 4️⃣ Send message
  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", { projectId, userId: user?._id, text });
    setText("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Project Chat</h2>

      {/* Collaborators & Compatibility */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Collaborators & Compatibility</h3>

        {projectUsers.length === 0 ? (
          <p className="text-gray-500">You have only one teammate</p>
        ) : (
          <div className="flex flex-col gap-2">
            {projectUsers.map(u => (
              <div key={u._id} className="flex items-center justify-between p-2 border rounded">
                <span>{u.fullname}</span>
                <span
                  className={`px-2 py-1 rounded-full text-white font-semibold ${
                    compatibilityScores[u._id] >= 75
                      ? "bg-green-500"
                      : compatibilityScores[u._id] >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {compatibilityScores[u._id] ?? 0}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="border h-96 overflow-y-scroll p-4 mb-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender?.fullname || "Unknown"}</strong>: {msg.text}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-indigo-600 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}

export default ProjectChat;
