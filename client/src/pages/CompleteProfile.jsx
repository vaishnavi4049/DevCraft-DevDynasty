

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, X, Github, Clock } from "lucide-react";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skills: [],
    bio: "",
    availability: "",
    githubUsername: ""
  });

  const [skillInput, setSkillInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= ADD SKILL =================
  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  // ================= REMOVE SKILL =================
  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove)
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/complete-profile",
        formData,
        { withCredentials: true }
      );

      setMessage(res.data.message);

      const userRole = res.data.user.role;
      setTimeout(() => {
        if (userRole === "creator") navigate("/create-project");
        else navigate("/developer-dashboard");
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Profile completion failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl p-10 rounded-3xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl shadow-2xl"
      >

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Complete Your Profile
        </h2>

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 text-green-400 text-sm bg-green-500/10 p-3 rounded-lg border border-green-500/20">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SKILLS INPUT */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Skills
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {/* SKILL TAGS */}
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs"
                >
                  {skill}
                  <X
                    size={14}
                    className="cursor-pointer text-red-400"
                    onClick={() => removeSkill(skill)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* BIO */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white resize-none"
              rows="4"
            />
          </div>

          {/* AVAILABILITY */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Availability (hours/week)
            </label>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus-within:border-blue-500">
              <Clock size={16} className="text-gray-400" />
              <input
                type="number"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
                placeholder="e.g. 20"
              />
            </div>
          </div>

          {/* GITHUB */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              GitHub Username
            </label>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus-within:border-blue-500">
              <Github size={16} className="text-gray-400" />
              <input
                type="text"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
                placeholder="your-github-username"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition font-semibold shadow-lg shadow-blue-500/20"
          >
            Complete Profile
          </button>

        </form>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;
