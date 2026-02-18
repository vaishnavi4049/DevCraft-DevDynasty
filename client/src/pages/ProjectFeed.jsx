import { useEffect, useState } from "react";
import api from "../services/axiosConfig";

function ProjectFeed() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };
  const handleApply = async (projectId) => {
    try {
      await api.post("/request/apply", {
        projectId,
        message: "Hi, I would like to collaborate!",
      });

      alert("Request Sent Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };
   const fetchUser = async () => {
  const res = await api.get("/auth/me");
  setCurrentUser(res.data.user);
};
  const handleSearch = async () => {
    const res = await api.get(`/projects/search?keyword=${search}`);
    setProjects(res.data);
  };

  return (
    <div className="p-8">
      <div className="flex mb-6">
        <input
          placeholder="Search roles..."
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full rounded-l"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 rounded-r"
        >
          Search
        </button>
      </div>

      {projects.map((project) => (
        <div key={project._id} className="border p-6 rounded-lg shadow mb-4">
          <h3 className="text-xl font-bold">{project.title}</h3>

          <p className="text-gray-600">{project.description}</p>
          <button
            onClick={() => handleApply(project._id)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Apply to Join
          </button>

          <p className="mt-2 font-semibold">Role: {project.openRole}</p>

          <p>Skills: {project.requiredSkills.join(", ")}</p>

          <p>Duration: {project.duration}</p>

          <p className="text-sm text-gray-500 mt-2">
            Posted by {project.createdBy?.fullname}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProjectFeed;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/axiosConfig";

// function ProjectFeed() {
//   const [projects, setProjects] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProjects();
//     fetchCurrentUser();
//   }, []);

//   // 🔹 Fetch Logged-in User (JWT from cookie)
//   const fetchCurrentUser = async () => {
//     try {
//       const res = await api.get("/auth/me");
//       setCurrentUser(res.data.user);
//     } catch (error) {
//       console.log("User not authenticated");
//     }
//   };

//   // 🔹 Fetch All Projects
//   const fetchProjects = async () => {
//     try {
//       const res = await api.get("/projects");
//       setProjects(res.data);
//     } catch (error) {
//       console.log("Error fetching projects");
//     }
//   };

//   // 🔹 Search
//   const handleSearch = async () => {
//     try {
//       const res = await api.get(
//         `/projects/search?keyword=${search}`
//       );
//       setProjects(res.data);
//     } catch (error) {
//       console.log("Search error");
//     }
//   };

//   // 🔹 Apply To Join
//   const handleApply = async (projectId) => {
//     try {
//       await api.post("/request/apply", {
//         projectId,
//         message: "Hi, I would like to collaborate!"
//       });

//       alert("Request Sent Successfully");
//     } catch (error) {
//       alert(error.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <div className="p-8">

//       {/* 🔍 Search Bar */}
//       <div className="flex mb-6">
//         <input
//           placeholder="Search roles..."
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 w-full rounded-l"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-indigo-600 text-white px-4 rounded-r"
//         >
//           Search
//         </button>
//       </div>

//       {/* 🧩 Project Cards */}
//       {projects.map((project) => {

//         const isOwner =
//           project.createdBy?._id === currentUser?._id;

//         const isTeamMember =
//           project.team?.some(
//             (member) => member._id === currentUser?._id
//           );

//         return (
//           <div
//             key={project._id}
//             className="border p-6 rounded-lg shadow mb-4"
//           >
//             <h3 className="text-xl font-bold">
//               {project.title}
//             </h3>

//             <p className="text-gray-600">
//               {project.description}
//             </p>

//             <p className="mt-2 font-semibold">
//               Role: {project.openRole}
//             </p>

//             <p>
//               Skills: {project.requiredSkills?.join(", ")}
//             </p>

//             <p>
//               Duration: {project.duration}
//             </p>

//             <p className="text-sm text-gray-500 mt-2">
//               Posted by {project.createdBy?.fullname}
//             </p>

//             {/* 🔐 Conditional Button */}
//             <div className="mt-4">

//               {isOwner || isTeamMember ? (
//                 <button
//                   onClick={() =>
//                     navigate(`/chat/${project._id}`)
//                   }
//                   className="bg-indigo-600 text-white px-4 py-2 rounded"
//                 >
//                   Open Chat
//                 </button>
//               ) : (
//                 <button
//                   onClick={() =>
//                     handleApply(project._id)
//                   }
//                   className="bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Apply to Join
//                 </button>
//               )}

//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default ProjectFeed;
