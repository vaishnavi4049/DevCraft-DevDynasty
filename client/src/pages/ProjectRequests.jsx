import { useEffect, useState } from "react";
import api from "../services/axiosConfig";

function ProjectRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await api.get("/request/received");
    setRequests(res.data.requests);
  };

  const handleRespond = async (id, action) => {
  await api.post("/request/respond", {
    requestId: id,
    status: action === "accept" ? "accepted" : "rejected"
  });

  fetchRequests();
};

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        Collaboration Requests
      </h2>

     {requests.map(req => (
  <div key={req._id} className="border p-4 mb-4 rounded">
    <p>
      <strong>{req.sender?.fullname || "Unknown User"}</strong> wants to join
    </p>

    <p><strong>GitHub:</strong> {req.sender?.githubUsername || "N/A"}</p>
    <p><strong>GitHub Score:</strong> {req.sender?.githubScore ?? 0}</p>
    <p>
      <strong>Skills:</strong>{" "}
      {req.sender?.verifiedSkills?.map(skill => skill.name).join(", ") || "None"}
    </p>

    <p className="text-gray-600">{req.message}</p>

    <div className="mt-3 space-x-3">
      <button
        onClick={() => handleRespond(req._id, "accept")}
        className="bg-green-600 text-white px-4 py-1 rounded"
      >
        Accept
      </button>

      <button
        onClick={() => handleRespond(req._id, "reject")}
        className="bg-red-600 text-white px-4 py-1 rounded"
      >
        Reject
      </button>
    </div>
  </div>
))}

    </div>
  );
}

export default ProjectRequests;
