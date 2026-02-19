import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";

function DeveloperDashboard() {
  const [projects, setProjects] = useState([]);
  const [applied, setApplied] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchMatchingProjects();
    fetchAppliedProjects();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);

      if (res.data.user.role !== "user") {
        navigate("/");
      }

    } catch {
      navigate("/login");
    }
  };

  const fetchMatchingProjects = async () => {
    const res = await api.get("/projects/matching");
    setProjects(res.data.projects);
  };

  const fetchAppliedProjects = async () => {
    const res = await api.get("/projects/applied");
    setApplied(res.data.projects);
  };

  const handleApply = async (id) => {
    await api.post(`/projects/${id}/apply`);
    fetchAppliedProjects();
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-indigo-600 text-white p-4 flex justify-between">
        <h2 className="text-xl font-bold">
          Developer Dashboard
        </h2>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-indigo-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-8 max-w-6xl mx-auto">

        {/* Matching Projects */}
        <h3 className="text-2xl font-bold mb-4">
          Matching Projects
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded shadow">
              <h4 className="text-xl font-semibold">
                {project.title}
              </h4>

              <p>{project.description}</p>

              <p className="mt-2 font-medium">
                Role: {project.openRole}
              </p>

              <p>
                Skills: {project.requiredSkills.join(", ")}
              </p>

              <button
                onClick={() => handleApply(project._id)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        {/* Applied Projects */}
        <h3 className="text-2xl font-bold mb-4">
          Applied Projects
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {applied.map(project => (
            <div key={project._id} className="bg-white p-6 rounded shadow">
              <h4 className="text-xl font-semibold">
                {project.title}
              </h4>

              <p className="text-gray-600">
                Waiting for response...
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default DeveloperDashboard;

