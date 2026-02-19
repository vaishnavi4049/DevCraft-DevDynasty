import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";

function DeveloperApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const res = await api.get("/request/my-requests");
      setApplications(res.data.requests);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching requests");
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="text-gray-400 text-center">
          No applications yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((req, index) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-semibold mb-2">
                {req.project?.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {req.project?.description}
              </p>

              <p className="font-medium">
                Status:{" "}
                <span className={getStatusStyle(req.status)}>
                  {req.status}
                </span>
              </p>

              {req.status === "accepted" && (
                <button
                  onClick={() =>
                    navigate(`/chat/${req.project._id}`)
                  }
                  className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-xl text-sm hover:scale-105 transition"
                >
                  Open Chat
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeveloperApplications;
