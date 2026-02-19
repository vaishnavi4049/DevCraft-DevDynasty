import { useEffect, useState } from "react";
import api from "../services/axiosConfig";

function ProjectFeed() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔹 Fetch All Projects
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");

      // ✅ IMPORTANT FIX
      setProjects(
        Array.isArray(res.data.projects)
          ? res.data.projects
          : Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.log("Error fetching projects");
      setProjects([]);
    }
  };

  // 🔹 Apply To Join
  const handleApply = async (projectId) => {
    try {
      await api.post("/request/apply", {
        projectId,
        message: "Hi, I would like to collaborate!",
      });

      alert("Request Sent Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error applying");
    }
  };

  // 🔹 Search
  const handleSearch = async () => {
    try {
      const res = await api.get(
        `/projects/search?keyword=${search}`
      );

      // ✅ IMPORTANT FIX
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

  return (
    <div className="p-8">

      {/* 🔍 Search Bar */}
      <div className="flex mb-6">
        <input
          placeholder="Search roles..."
          value={search}
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

      {/* 🧩 Project Cards */}
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            className="border p-6 rounded-lg shadow mb-4"
          >
            <h3 className="text-xl font-bold">
              {project.title}
            </h3>

            <p className="text-gray-600">
              {project.description}
            </p>

            <p className="mt-2 font-semibold">
              Role: {project.openRole}
            </p>

            <p>
              Skills:{" "}
              {project.requiredSkills?.length
                ? project.requiredSkills.join(", ")
                : "Not specified"}
            </p>

            <p>Duration: {project.duration}</p>

            <p className="text-sm text-gray-500 mt-2">
              Posted by {project.createdBy?.fullname || "Unknown"}
            </p>

            <button
              onClick={() => handleApply(project._id)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Apply to Join
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectFeed;
