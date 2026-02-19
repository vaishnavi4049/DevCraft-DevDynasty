// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/axiosConfig";

// function CreatorDashboard() {
//   const [projects, setProjects] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUser();
//     fetchMyProjects();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/auth/me");
//       setUser(res.data.user);

//       if (res.data.user.role !== "creator") {
//         navigate("/");
//       }

//     } catch (error) {
//       navigate("/login");
//     }
//   };

//   const fetchMyProjects = async () => {
//     try {
//       const res = await api.get("/projects/my-projects");
//       setProjects(res.data.projects);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (id) => {
//   try {
//     await api.delete(`/projects/${id}`);
//     fetchMyProjects(); // refresh list
//   } catch (error) {
//     alert("Delete failed");
//   }
// };

// const handleEdit = async (project) => {
//   const newTitle = prompt("Enter new title:", project.title);

//   if (!newTitle) return;

//   try {
//     await api.put(`/projects/${project._id}`, {
//       title: newTitle
//     });

//     fetchMyProjects();

//   } catch (error) {
//     alert("Update failed");
//   }
// };



//   const handleLogout = async () => {
//     await api.post("/auth/logout");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">

//       {/* Navbar */}
//       <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
//         <h2 className="text-xl font-bold">CollabSphere Creator</h2>

//         <div className="flex items-center gap-4">
//           <span>{user?.fullname}</span>
//           <button
//             onClick={handleLogout}
//             className="bg-white text-indigo-600 px-4 py-1 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Section */}
//       <div className="p-8 max-w-6xl mx-auto">

//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-bold">
//             My Posted Projects
//           </h3>

//           <button
//             onClick={() => navigate("/create-project")}
//             className="bg-indigo-600 text-white px-5 py-2 rounded"
//           >
//             + Create Project
//           </button>
//         </div>

//         {projects.length === 0 ? (
//           <p className="text-gray-600">
//             You haven't posted any projects yet.
//           </p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">

//             {projects.map((project) => (
//               <div
//                 key={project._id}
//                 className="bg-white p-6 rounded-lg shadow"
//               >
//                 <h4 className="text-xl font-semibold">
//                   {project.title}
//                 </h4>

//                 <p className="text-gray-600 mt-2">
//                   {project.description}
//                 </p>

//                 <p className="mt-3 font-medium">
//                   Role: {project.openRole}
//                 </p>

//                 <p>
//                   Skills: {project.requiredSkills.join(", ")}
//                 </p>

//                 <p>
//                   Duration: {project.duration}
//                 </p>

//                 <p className="text-sm text-gray-500 mt-3">
//                   Posted on {new Date(project.createdAt).toLocaleDateString()}
//                 </p>

//                 <div className="flex gap-3 mt-4">
//   <button
//     onClick={() => handleEdit(project)}
//     className="bg-yellow-500 text-white px-4 py-1 rounded"
//   >
//     Edit
//   </button>
   
//   <button
//     onClick={() => navigate(`/chat/${project._id}`)}
//     className="bg-indigo-600 text-white px-4 py-1 rounded"
//   >
//     Open Chat
//   </button>
//   <button
//     onClick={() => handleDelete(project._id)}
//     className="bg-red-600 text-white px-4 py-1 rounded"
//   >
//     Delete
//   </button>
// </div>

//               </div>
//             ))}

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// export default CreatorDashboard;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, LogOut, Edit, Trash2, MessageCircle } from "lucide-react";
import api from "../services/axiosConfig";

function CreatorDashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchMyProjects();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);

      if (res.data.user.role !== "creator") {
        navigate("/");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  const fetchMyProjects = async () => {
    try {
      const res = await api.get("/projects/my-projects");
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchMyProjects();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleEdit = async (project) => {
    const newTitle = prompt("Enter new title:", project.title);
    if (!newTitle) return;

    try {
      await api.put(`/projects/${project._id}`, {
        title: newTitle,
      });
      fetchMyProjects();
    } catch (error) {
      alert("Update failed");
    }
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Navbar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/5 px-6 md:px-20 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          CollabSphere Creator
        </h2>

        <div className="flex items-center gap-6">
          <span className="text-gray-300">{user?.fullname}</span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 px-6 md:px-20 py-16 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold">
            My
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/create-project")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 font-medium shadow-lg"
          >
            <Plus size={18} />
            Create Project
          </motion.button>
        </div>

        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="text-center mt-20 text-gray-400">
            You haven't posted any projects yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
              >
                <h4 className="text-xl font-semibold mb-2">
                  {project.title}
                </h4>

                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                <div className="space-y-1 text-sm text-gray-300">
                  <p><strong>Role:</strong> {project.openRole}</p>
                  <p>
                    <strong>Skills:</strong>{" "}
                    {project.requiredSkills.join(", ")}
                  </p>
                  <p><strong>Duration:</strong> {project.duration}</p>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Posted on{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-6 flex-wrap">

                  <button
                    onClick={() => handleEdit(project)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => navigate(`/chat/${project._id}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 hover:bg-indigo-500/30 transition"
                  >
                    <MessageCircle size={16} />
                    Chat
                  </button>

                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatorDashboard;


