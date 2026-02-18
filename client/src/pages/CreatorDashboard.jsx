import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    fetchMyProjects(); // refresh list
  } catch (error) {
    alert("Delete failed");
  }
};

const handleEdit = async (project) => {
  const newTitle = prompt("Enter new title:", project.title);

  if (!newTitle) return;

  try {
    await api.put(`/projects/${project._id}`, {
      title: newTitle
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
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">CollabSphere Creator</h2>

        <div className="flex items-center gap-4">
          <span>{user?.fullname}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="p-8 max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">
            My Posted Projects
          </h3>

          <button
            onClick={() => navigate("/create-project")}
            className="bg-indigo-600 text-white px-5 py-2 rounded"
          >
            + Create Project
          </button>
        </div>

        {projects.length === 0 ? (
          <p className="text-gray-600">
            You haven't posted any projects yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h4 className="text-xl font-semibold">
                  {project.title}
                </h4>

                <p className="text-gray-600 mt-2">
                  {project.description}
                </p>

                <p className="mt-3 font-medium">
                  Role: {project.openRole}
                </p>

                <p>
                  Skills: {project.requiredSkills.join(", ")}
                </p>

                <p>
                  Duration: {project.duration}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  Posted on {new Date(project.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-4">
  <button
    onClick={() => handleEdit(project)}
    className="bg-yellow-500 text-white px-4 py-1 rounded"
  >
    Edit
  </button>
   
  <button
    onClick={() => navigate(`/chat/${project._id}`)}
    className="bg-indigo-600 text-white px-4 py-1 rounded"
  >
    Open Chat
  </button>
  <button
    onClick={() => handleDelete(project._id)}
    className="bg-red-600 text-white px-4 py-1 rounded"
  >
    Delete
  </button>
</div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default CreatorDashboard;
