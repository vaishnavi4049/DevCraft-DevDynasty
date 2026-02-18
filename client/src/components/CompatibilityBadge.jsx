import React, { useEffect, useState } from "react";
import axios from "axios";

const CompatibilityBadge = ({ userAId, userBId }) => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchCompatibility = async () => {
      try {
        const { data } = await axios.get(
          `/api/compatibility/${userAId}/${userBId}`
        );
        setScore(data.compatibility);
      } catch (e3rr) {
        console.error("Error fetching compatibility:", err);
      }
    };

    if (userAId && userBId) {
      fetchCompatibility();
    }
  }, [userAId, userBId]);

  if (score === null) return <div>Loading...</div>;

  // Color logic: red (<50), yellow (50-74), green (75+)
  let color = "bg-red-500";
  if (score >= 75) color = "bg-green-500";
  else if (score >= 50) color = "bg-yellow-500";

  return (
    <div
      className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${color}`}
    >
      Compatibility: {score}%
    </div>
  );
};

export default CompatibilityBadge;
