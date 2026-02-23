import { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";

function DeveloperInvitations() {
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    const res = await api.get("/invitations/developer");
    setInvitations(res.data);
  };

  const acceptInvite = async (id) => {
    const res = await api.patch(`/invitations/${id}/accept`);
    const conversationId = res.data.conversation._id;

    navigate(`/negotiation/${conversationId}`);
  };

  const rejectInvite = async (id) => {
    await api.patch(`/invitations/${id}/reject`);
    fetchInvitations();
  };

  return (
    <div className="p-10 text-white bg-[#0A0A0F] min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Project Invitations</h2>

      {invitations.map((invite) => (
        <div
          key={invite._id}
          className="p-6 rounded-xl bg-white/5 border border-white/10 mb-6"
        >
          {/* <h3 className="text-xl font-semibold">
            {invite.projectId.title}
          </h3>
          <p className="text-gray-400">
            Invited by: {invite.recruiterId.fullname}
          </p> */}
          <h3 className="text-xl font-semibold">
  {invite.projectId?.title || "Project not available"}
</h3>

<p className="text-gray-400">
  Invited by: {invite.recruiterId?.fullname || "Unknown recruiter"}
</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => acceptInvite(invite._id)}
              className="px-4 py-2 bg-green-500 rounded-lg"
            >
              Accept
            </button>

            <button
              onClick={() => rejectInvite(invite._id)}
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeveloperInvitations;
