// import { useEffect, useState } from "react";
// import {
//   Search,
//   MapPin,
//   Users,
//   Calendar,
//   Briefcase,
//   Send,
//   LogOut,
//   LayoutDashboard,
//   FolderOpen
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import api from "../services/axiosConfig";

// function DeveloperDashboard() {
//   const [projects, setProjects] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [appliedProjects, setAppliedProjects] = useState([]);


//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await api.get("/projects");

//       setProjects(
//         Array.isArray(res.data.projects)
//           ? res.data.projects
//           : Array.isArray(res.data)
//           ? res.data
//           : []
//       );

//       setLoading(false);
//     } catch (error) {
//       console.log("Error fetching projects");
//       setProjects([]);
//       setLoading(false);
//     }
//   };

//   const handleApply = async (projectId) => {
//   try {
//     await api.post("/request/apply", {
//       projectId,
//       message: "Hi, I would like to collaborate!",
//     });

//     // ✅ update instantly without refresh
//     setAppliedProjects((prev) => [...prev, projectId]);

//     alert("Application Sent 🚀");
//   } catch (error) {
//     alert(error.response?.data?.message || "Error applying");
//   }
// };


//   const handleSearch = async () => {
//     try {
//       const res = await api.get(
//         `/projects/search?keyword=${search}`
//       );

//       setProjects(
//         Array.isArray(res.data.projects)
//           ? res.data.projects
//           : Array.isArray(res.data)
//           ? res.data
//           : []
//       );
//     } catch (error) {
//       console.log("Search error");
//     }
//   };

//   // ✅ FIXED LOGOUT
//   const handleLogout = async () => {
//     try {
//       await api.post("/auth/logout");

//       // If you store token in localStorage:
//       localStorage.removeItem("token");

//       navigate("/login");
//     } catch (error) {
//       console.log("Logout failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">
//         Loading projects...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white">

//       {/* ================= NAVBAR ================= */}
//       <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/10 px-6 md:px-20 py-4 flex justify-between items-center">
        
//         <div
//           onClick={() => navigate("/developer-dashboard")}
//           className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
//         >
//           CollabSphere
//         </div>

//         <div className="flex gap-6 items-center text-gray-300">

//           <button
//             onClick={() => navigate("/developer-application")}
//             className="flex items-center gap-2 hover:text-white"
//           >
//             <FolderOpen size={18} />
//             My Applications
//           </button>

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-red-400 hover:text-red-500"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* ================= CONTENT ================= */}
//       <div className="px-6 md:px-20 py-16">

//         <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//           Developer Dashboard
//         </h1>

//         {/* SEARCH */}
//         <div className="relative mb-10">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search projects..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
//           />
//           <button
//             onClick={handleSearch}
//             className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
//           >
//             Search
//           </button>
//         </div>

//         {/* PROJECTS */}
//         {projects.length === 0 ? (
//           <div className="text-center text-gray-400 py-20">
//             No projects available.
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-8">
//             {projects.map((project, index) => (
//               <motion.div
//                 key={project._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 whileHover={{ scale: 1.02 }}
//                 className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl"
//               >
//                 <h3 className="text-2xl font-semibold mb-2">
//                   {project.title}
//                 </h3>

//                 <p className="text-gray-400 mb-4">
//                   {project.description}
//                 </p>

//                 <div className="grid grid-cols-2 gap-4 text-gray-400 text-sm mb-6">
//                   <div className="flex items-center gap-2">
//                     <Briefcase size={16} />
//                     {project.openRole}
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {project.requiredSkills?.map((skill, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>

//                <button
//   disabled={appliedProjects.includes(project._id)}
//   onClick={() => handleApply(project._id)}
//   className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium shadow-lg transition
//     ${
//       appliedProjects.includes(project._id)
//         ? "bg-green-600 cursor-not-allowed"
//         : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"
//     }`}
// >
//   <Send size={16} />
//   {appliedProjects.includes(project._id)
//     ? "Applied ✅"
//     : "Apply to Join"}
// </button>

//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DeveloperDashboard;


import { useEffect, useState } from "react";
import {
  Search,
  Briefcase,
  Send,
  LogOut,
  FolderOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";

function DeveloperDashboard() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchAppliedProjects();
  }, []);

  // ================= FETCH ALL PROJECTS =================
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");

      setProjects(
        Array.isArray(res.data.projects)
          ? res.data.projects
          : Array.isArray(res.data)
          ? res.data
          : []
      );

      setLoading(false);
    } catch (error) {
      console.log("Error fetching projects");
      setProjects([]);
      setLoading(false);
    }
  };

  // ================= FETCH APPLIED PROJECTS =================
  const fetchAppliedProjects = async () => {
    try {
      const res = await api.get("/request/my-requests");

      const appliedIds = res.data.requests.map(
        (req) => req.project?._id
      );

      setAppliedProjects(appliedIds);
    } catch (error) {
      console.log("Error fetching applied projects");
    }
  };

  // ================= APPLY =================
  const handleApply = async (projectId) => {
    try {
      await api.post("/request/apply", {
        projectId,
        message: "Hi, I would like to collaborate!",
      });

      // Instant UI update
      setAppliedProjects((prev) => [...prev, projectId]);

      alert("Application Sent 🚀");
    } catch (error) {
      alert(error.response?.data?.message || "Error applying");
    }
  };

  // ================= SEARCH =================
  const handleSearch = async () => {
    try {
      const res = await api.get(
        `/projects/search?keyword=${search}`
      );

      setProjects(
        Array.isArray(res.data.projects)
          ? res.data.projects
          : Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.log("Search error");
    }
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/10 px-6 md:px-20 py-4 flex justify-between items-center">
        <div
          onClick={() => navigate("/developer-dashboard")}
          className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          CollabSphere
        </div>

        <div className="flex gap-6 items-center text-gray-300">
          <button
            onClick={() => navigate("/developer-application")}
            className="flex items-center gap-2 hover:text-white"
          >
            <FolderOpen size={18} />
            My Applications
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="px-6 md:px-20 py-16">

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Developer Dashboard
        </h1>

        {/* SEARCH */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* PROJECT CARDS */}
        {projects.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No projects available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const isApplied = appliedProjects.includes(project._id);

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl"
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                    <Briefcase size={16} />
                    {project.openRole}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.requiredSkills?.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    disabled={isApplied}
                    onClick={() => handleApply(project._id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition
                      ${
                        isApplied
                          ? "bg-green-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"
                      }`}
                  >
                    <Send size={16} />
                    {isApplied ? "Applied ✅" : "Apply to Join"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeveloperDashboard;
