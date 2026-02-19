// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  // role can be 'creator' or 'tech'
  const isCreator = currentUser.role === "creator";

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link to="/">Home</Link>

        {isCreator ? (
          <>
            
            <Link to="/create-project">Create Project</Link>
          </>
        ) : (
          <>
            <Link to="/feed">Feed</Link>
            <Link to="/applied-projects">Applied Projects</Link>
          </>
        )}
      </div>

      <div className="flex space-x-4">
        <Link to="/profile">Profile</Link>
        <button onClick={() => console.log("Logout")}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
