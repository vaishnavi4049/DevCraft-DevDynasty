import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Github, Sparkles, Loader2 } from "lucide-react";
import api from "../services/axiosConfig";

function ProjectRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/request/received");
      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (id, action) => {
    try {
      setProcessingId(id);

      await api.post("/request/respond", {
        requestId: id,
        status: action === "accept" ? "accepted" : "rejected",
      });

      // Instantly update UI without refetch
      setRequests(prev =>
        prev.map(req =>
          req._id === id
            ? { ...req, status: action === "accept" ? "accepted" : "rejected" }
            : req
        )
      );

    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white px-6 md:px-20 py-16 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      <div className="relative z-10">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Collaboration
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Requests
            </span>
          </h2>
          <p className="text-gray-400 mt-4">
            Manage incoming project collaboration requests.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400">
            Loading requests...
          </div>
        )}

        {/* Empty State */}
        {!loading && requests.length === 0 && (
          <div className="text-center mt-20">
            <Sparkles className="w-12 h-12 mx-auto text-purple-400 mb-4" />
            <p className="text-gray-400 text-lg">
              No collaboration requests yet.
            </p>
          </div>
        )}

        {/* Request Cards */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {requests.map((req, index) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
            >
              {/* Sender Info */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {req.sender?.fullname || "Unknown User"}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <Github className="w-4 h-4" />
                    {req.sender?.githubUsername || "N/A"}
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold">
                  Score: {req.sender?.githubScore ?? 0}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Verified Skills</p>
                <div className="flex flex-wrap gap-2">
                  {req.sender?.verifiedSkills?.length > 0 ? (
                    req.sender.verifiedSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10"
                      >
                        {skill.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No skills listed
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-300 bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                {req.message}
              </p>

              {/* Status Message */}
              {req.status === "accepted" && (
                <div className="mb-4 p-3 rounded-xl bg-green-600/20 border border-green-500 text-green-400 text-sm">
                  You have accepted this collaboration request.
                </div>
              )}

              {req.status === "rejected" && (
                <div className="mb-4 p-3 rounded-xl bg-red-600/20 border border-red-500 text-red-400 text-sm">
                  You have rejected this collaboration request.
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">

                {req.status === "accepted" ? (
                  <div className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold">
                    Accepted ✅
                  </div>
                ) : req.status === "rejected" ? (
                  <div className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold">
                    Rejected ❌
                  </div>
                ) : (
                  <>
                    <button
                      disabled={processingId === req._id}
                      onClick={() => handleRespond(req._id, "accept")}
                      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {processingId === req._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      Accept
                    </button>

                    <button
                      disabled={processingId === req._id}
                      onClick={() => handleRespond(req._id, "reject")}
                      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {processingId === req._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                      Reject
                    </button>
                  </>
                )}

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ProjectRequests;
