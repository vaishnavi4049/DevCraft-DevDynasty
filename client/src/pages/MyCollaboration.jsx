import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";

function MyCollaborations() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects/my-collaborations");
      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        My Collaborations
      </h1>

      {projects.length === 0 ? (
        <p>No collaborations yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div
              key={project._id}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold">
                {project.title}
              </h2>

              <p className="text-gray-400 mt-2">
                {project.description}
              </p>

              <p className="mt-4">
                <strong>Creator:</strong>{" "}
                {project.createdBy.fullname}
              </p>

              <p className="mt-2">
                <strong>Team Members:</strong>{" "}
                {project.team.length}
              </p>

              <button
                onClick={() =>
                  navigate(`/chat/${project._id}`)
                }
                className="mt-6 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"
              >
                Open Workspace
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCollaborations;