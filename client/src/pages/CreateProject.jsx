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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/projects", {
      ...formData,
      requiredSkills: formData.requiredSkills.split(",")
    });

    alert("Project Posted Successfully");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
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
          Post Project
        </button>

      </form>
    </div>
  );
}

export default CreateProject;
