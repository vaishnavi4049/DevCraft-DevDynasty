
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skills: [],
    bio: "",
    availability: 0,
    githubUsername: ""
  });

  const [skillInput, setSkillInput] = useState("");
  const [message, setMessage] = useState("");

  // Add skill to skills array
  const addSkill = () => {
    if (skillInput && !formData.skills.includes(skillInput)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput]
      });
      setSkillInput("");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/complete-profile",
        formData,
        { withCredentials: true }
      );

      setMessage(res.data.message);

    
      const userRole = res.data.user.role;
      if (userRole === "creator") navigate("/create-project");
      else navigate("/"); 

    } catch (err) {
      setMessage(err.response?.data?.message || "Profile completion failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Complete Your Profile
        </h2>

        {message && <p className="mb-4 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <textarea
            name="bio"
            placeholder="Your bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="number"
            name="availability"
            placeholder="Availability (hours/week)"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="text"
            name="githubUsername"
            placeholder="GitHub Username"
            value={formData.githubUsername}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200"
          >
            Complete Profile
          </button>

        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
