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
            Skills: {project.requiredSkills.join(", ")}
          </p>

          <p>
            Duration: {project.duration}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Posted by {project.createdBy?.fullname}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProjectFeed;
