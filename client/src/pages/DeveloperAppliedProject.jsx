// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import api from "../services/axiosConfig";

// function DeveloperApplications() {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMyRequests();
//   }, []);

//   const fetchMyRequests = async () => {
//     try {
//       const res = await api.get("/request/my-requests");
//       setRequests(res.data.requests);
//     } catch (error) {
//       console.log("Error fetching requests");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white px-6 md:px-20 py-16">
      
//       {/* Title */}
//       <motion.h2
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
//       >
//         My Applications
//       </motion.h2>

//       {requests.length === 0 ? (
//         <div className="text-gray-400 text-lg">
//           No applications yet.
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
//           {requests.map((req, index) => (
//             <motion.div
//               key={req._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ scale: 1.02 }}
//               className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all shadow-xl"
//             >
//               {/* Project Title */}
//               <h3 className="text-2xl font-semibold mb-3">
//                 {req.project?.title}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-400 mt-2">
//                 {req.project?.description}
//               </p>

//               {/* Status */}
//               <div className="mt-5">
//                 <span className="text-sm text-gray-400">Status:</span>

//                 <div
//                   className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-medium
//                     ${
//                       req.status === "accepted"
//                         ? "bg-green-500/20 text-green-400 border border-green-500/30"
//                         : req.status === "rejected"
//                         ? "bg-red-500/20 text-red-400 border border-red-500/30"
//                         : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
//                     }`}
//                 >
//                   {req.status}
//                 </div>
//               </div>

//               {/* Open Chat Button */}
//               {req.status === "accepted" && (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() =>
//                     navigate(`/chat/${req.project._id}`)
//                   }
//                   className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium shadow-lg shadow-blue-500/20"
//                 >
//                   Open Chat
//                 </motion.button>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DeveloperApplications;


// import React, { useEffect, useState } from "react";
// import {
//   CheckCircle,
//   XCircle,
//   Clock,
//   Calendar,
//   MapPin,
//   DollarSign,
//   Users,
//   Building2,
//   Search
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../services/axiosConfig";

// const DeveloperApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//  useEffect(() => {
//   fetchProjects();
//   fetchAppliedProjects();
// }, []);


//   const fetchAppliedProjects = async () => {
//   try {
//     const res = await api.get("/request/my-requests");

//     const appliedIds = res.data.requests.map(
//       (req) => req.project?._id
//     );

//     setAppliedProjects(appliedIds);
//   } catch (error) {
//     console.log("Error fetching applied projects");
//   }
// };




//   // ---------------- STATUS HELPERS ----------------

//   const getStatusUI = (status) => {
//     switch (status) {
//       case "accepted":
//         return {
//           icon: <CheckCircle className="w-4 h-4" />,
//           style: "bg-green-500/20 text-green-400 border-green-500/30",
//           text: "Accepted"
//         };
//       case "rejected":
//         return {
//           icon: <XCircle className="w-4 h-4" />,
//           style: "bg-red-500/20 text-red-400 border-red-500/30",
//           text: "Rejected"
//         };
//       case "interview":
//         return {
//           icon: <Calendar className="w-4 h-4" />,
//           style: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//           text: "Interview"
//         };
//       default:
//         return {
//           icon: <Clock className="w-4 h-4" />,
//           style: "bg-blue-500/20 text-blue-400 border-blue-500/30",
//           text: "In Review"
//         };
//     }
//   };

//   // ---------------- FILTERING ----------------

//   const filteredApplications = applications.filter((app) => {
//     if (activeTab !== "all" && app.status !== activeTab) return false;

//     if (searchQuery) {
//       return (
//         app.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         app.role.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     return true;
//   });

//   const stats = {
//     total: applications.length,
//     inReview: applications.filter((a) => a.status === "in-review").length,
//     interview: applications.filter((a) => a.status === "interview").length,
//     accepted: applications.filter((a) => a.status === "accepted").length
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">
//         Loading applications...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white px-6 md:px-20 py-16">

//       {/* TITLE */}
//       <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//         My Applied Projects
//       </h1>

     

//       {/* SEARCH */}
//       <div className="relative mb-6">
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search projects..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
//         />
//       </div>

    
//       {/* CARDS */}
//       <div className="space-y-6">
//         <AnimatePresence>
//           {filteredApplications.map((app) => {
//             const statusUI = getStatusUI(app.status);

//             return (
//               <motion.div
//                 key={app.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 whileHover={{ scale: 1.02 }}
//                 className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-2xl font-semibold">
//                       {app.projectName}
//                     </h3>
//                     <p className="text-gray-400">
//                       {app.company} • {app.role}
//                     </p>
//                   </div>

//                   <div
//                     className={`px-4 py-1 rounded-full border text-sm flex items-center gap-2 ${statusUI.style}`}
//                   >
//                     {statusUI.icon}
//                     {statusUI.text}
//                   </div>
//                 </div>

           
//                 {/* SKILLS */}
//                 <div className="flex flex-wrap gap-2">
//                   {app.skills.map((skill, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>

//         {filteredApplications.length === 0 && (
//           <div className="text-center py-16 text-gray-400">
//             No applications found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeveloperApplications;

// import React, { useEffect, useState } from "react";
// import {
//   CheckCircle,
//   XCircle,
//   Clock,
//   Calendar,
//   Search
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import api from "../services/axiosConfig";
// import socket from "../services/socket"; // ✅ make sure this exists

// const DeveloperApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMyRequests();

//     // ✅ REAL-TIME LISTENER
//     socket.on("applicationStatusUpdated", (updatedRequest) => {
//       setApplications((prev) =>
//         prev.map((app) =>
//           app.requestId === updatedRequest._id
//             ? { ...app, status: updatedRequest.status }
//             : app
//         )
//       );
//     });

//     return () => {
//       socket.off("applicationStatusUpdated");
//     };
//   }, []);

//   const fetchMyRequests = async () => {
//     try {
//       const res = await api.get("/request/my-requests");

//       const formatted = res.data.requests.map((req) => ({
//         requestId: req._id,
//         projectId: req.project?._id,
//         projectName: req.project?.title,
//         description: req.project?.description,
//         role: req.project?.openRole,
//         status: req.status,
//         skills: req.project?.requiredSkills || []
//       }));

//       setApplications(formatted);
//       setLoading(false);
//     } catch (error) {
//       console.log("Error fetching requests");
//       setLoading(false);
//     }
//   };

//   // ---------------- STATUS UI ----------------

//   const getStatusUI = (status) => {
//     switch (status) {
//       case "accepted":
//         return {
//           icon: <CheckCircle className="w-4 h-4" />,
//           style: "bg-green-500/20 text-green-400 border-green-500/30",
//           text: "Accepted"
//         };
//       case "rejected":
//         return {
//           icon: <XCircle className="w-4 h-4" />,
//           style: "bg-red-500/20 text-red-400 border-red-500/30",
//           text: "Rejected"
//         };
//       case "interview":
//         return {
//           icon: <Calendar className="w-4 h-4" />,
//           style: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//           text: "Interview"
//         };
//       default:
//         return {
//           icon: <Clock className="w-4 h-4" />,
//           style: "bg-blue-500/20 text-blue-400 border-blue-500/30",
//           text: "In Review"
//         };
//     }
//   };

//   // ---------------- FILTER ----------------

//   const filteredApplications = applications.filter((app) => {
//     if (activeTab !== "all" && app.status !== activeTab) return false;

//     if (searchQuery) {
//       return (
//         app.projectName?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     return true;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">
//         Loading applications...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white px-6 md:px-20 py-16">
//       <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//         My Applied Projects
//       </h1>

//       {/* SEARCH */}
//       <div className="relative mb-8">
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search projects..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
//         />
//       </div>

//       {/* CARDS */}
//       <div className="space-y-6">
//         <AnimatePresence>
//           {filteredApplications.map((app) => {
//             const statusUI = getStatusUI(app.status);

//             return (
//               <motion.div
//                 key={app.requestId}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ scale: 1.02 }}
//                 className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-2xl font-semibold">
//                       {app.projectName}
//                     </h3>
//                     <p className="text-gray-400">
//                       {app.role}
//                     </p>
//                   </div>

//                   <div
//                     className={`px-4 py-1 rounded-full border text-sm flex items-center gap-2 ${statusUI.style}`}
//                   >
//                     {statusUI.icon}
//                     {statusUI.text}
//                   </div>
//                 </div>

//                 <p className="text-gray-400 mb-4">
//                   {app.description}
//                 </p>

//                 {/* SKILLS */}
//                 <div className="flex flex-wrap gap-2">
//                   {app.skills.map((skill, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>

//                 {/* CHAT BUTTON */}
//                 {app.status === "accepted" && (
//                   <button
//                     onClick={() => navigate(`/chat/${app.projectId}`)}
//                     className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-xl text-sm hover:scale-105 transition"
//                   >
//                     Open Chat
//                   </button>
//                 )}
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>

//         {filteredApplications.length === 0 && (
//           <div className="text-center py-16 text-gray-400">
//             No applications found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeveloperApplications;
import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";

function DeveloperApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const res = await api.get("/request/my-requests");
      setApplications(res.data.requests);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching requests");
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="text-gray-400 text-center">
          No applications yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((req, index) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-semibold mb-2">
                {req.project?.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {req.project?.description}
              </p>

              <p className="font-medium">
                Status:{" "}
                <span className={getStatusStyle(req.status)}>
                  {req.status}
                </span>
              </p>

              {req.status === "accepted" && (
                <button
                  onClick={() =>
                    navigate(`/chat/${req.project._id}`)
                  }
                  className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-xl text-sm hover:scale-105 transition"
                >
                  Open Chat
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeveloperApplications;
