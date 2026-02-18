import CompatibilityBadge from "./CompatibilityBadge";

const TeamMemberComparison = ({ currentUser, otherUser }) => {
  return (
    <div className="flex items-center gap-4">
      <div>{otherUser.name}</div>
      <CompatibilityBadge userAId={currentUser._id} userBId={otherUser._id} />
    </div>
  );
};
