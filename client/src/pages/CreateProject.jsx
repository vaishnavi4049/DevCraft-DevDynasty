
import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    openRole: "",
    requiredSkills: "",
    duration: "",
  });

  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const createRes = await api.post("/projects", {
        ...formData,
        requiredSkills: formData.requiredSkills
          .split(",")
          .map((skill) => skill.trim()),
      });

      const newProjectId = createRes.data.project._id;
      setProjectId(newProjectId);

      const recommendRes = await api.get(
        `/projects/${newProjectId}/recommend`
      );

      setRecommended(recommendRes.data.developers);
      setLoading(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setLoading(false);
    }
  };

  // 🔥 Start Negotiation
  const startNegotiation = async (developerId) => {
    if (!projectId) {
      alert("Project not created yet.");
      return;
    }

    try {
      const res = await api.post("/conversations", {
        projectId,
        developerId,
      });

      const conversationId = res.data._id;

      navigate(`/negotiation/${conversationId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white px-6 md:px-20 py-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Post a
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              New Project
            </span>
          </h2>
          <p className="text-gray-400 mt-4">
            Find the perfect developer match instantly.
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-6 shadow-xl"
        >
          {["title", "openRole", "requiredSkills", "duration"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none transition"
              required
            />
          ))}

          <textarea
            name="description"
            placeholder="Project Description"
            onChange={handleChange}
            rows={4}
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none transition"
            required
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 font-semibold shadow-lg"
          >
            {loading ? "Finding Developers..." : "Post Project"}
          </motion.button>
        </motion.form>

        {/* Recommended Developers */}
        {recommended.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Users />
              Recommended Developers
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {recommended.map((dev, index) => (
                <motion.div
                  key={dev._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                  <h4 className="text-xl font-semibold">
                    {dev.fullname}
                  </h4>

                  {/* Match Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Match</span>
                      <span>{dev.skillMatchPercent}%</span>
                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{ width: `${dev.skillMatchPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-300 space-y-1">
                    <p>💻 GitHub Score: {dev.githubScore}</p>
                    <p>⏳ Availability: {dev.availability} hrs/week</p>
                    <p className="text-green-400">
                      Ranking Score: {dev.finalScore}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {dev.matchedSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* 🔥 Start Negotiation Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => startNegotiation(dev._id)}
                    disabled={!projectId}
                    className={`mt-4 w-full py-2 rounded-xl text-sm font-semibold 
                      ${projectId 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500" 
                        : "bg-gray-600 cursor-not-allowed"
                      }`}
                  >
                    Start Negotiation
                  </motion.button>

                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No Matches */}
        {recommended.length === 0 && !loading && (
          <p className="mt-10 text-center text-gray-500">
            No developers matched yet.
          </p>
        )}

      </div>
    </div>
  );
}

export default CreateProject;
