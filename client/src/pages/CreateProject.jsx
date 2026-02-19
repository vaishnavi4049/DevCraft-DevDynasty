import { useState } from "react";
import api from "../services/axiosConfig";

function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    openRole: "",
    requiredSkills: "",
    duration: ""
  });

  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 1️⃣ Create Project
      const createRes = await api.post("/projects", {
        ...formData,
        requiredSkills: formData.requiredSkills
          .split(",")
          .map(skill => skill.trim())
      });

      const projectId = createRes.data.project._id;

      // 2️⃣ Get Recommended Developers
      const recommendRes = await api.get(
        `/projects/${projectId}/recommend`
      );

      setRecommended(recommendRes.data.developers);

      setLoading(false);

    } catch (error) {
      console.log(error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Post New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Project Title"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Project Description"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="openRole"
          placeholder="Open Role (UI/UX Designer)"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="requiredSkills"
          placeholder="Required Skills (React, Tailwind)"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="duration"
          placeholder="Duration (48 hours)"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button className="bg-indigo-600 text-white px-6 py-2 rounded">
          {loading ? "Posting..." : "Post Project"}
        </button>
      </form>

      {/* 🔥 Recommended Developers Section */}
      {recommended.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">
            Recommended Developers
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {recommended.map(dev => (
              <div key={dev._id} className="bg-white p-6 rounded shadow">

                <h4 className="text-xl font-semibold">
                  {dev.fullname}
                </h4>

                <p className="mt-2">
                  🎯 Match: {dev.skillMatchPercent}%
                </p>

                <p>
                  💻 GitHub Score: {dev.githubScore}
                </p>

                <p>
                  ⏳ Availability: {dev.availability} hrs/week
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Matched Skills: {dev.matchedSkills.join(", ")}
                </p>

                <p className="text-sm text-green-600 mt-2">
                  Ranking Score: {dev.finalScore}
                </p>

              </div>
            ))}
          </div>
        </div>
      )}

      {recommended.length === 0 && !loading && (
        <p className="mt-6 text-gray-500">
          No developers matched yet.
        </p>
      )}
    </div>
  );
}

export default CreateProject;
