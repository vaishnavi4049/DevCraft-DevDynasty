// import React, { useState } from "react";
// import axios from "axios";

// const CompleteProfile = ({ userId }) => {
//   const [skills, setSkills] = useState([]);
//   const [bio, setBio] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [githubUsername, setGithubUsername] = useState("");
//   const [message, setMessage] = useState("");

//   // Temporary skill input state
//   const [skillInput, setSkillInput] = useState("");

//   const handleAddSkill = () => {
//     if (skillInput && !skills.includes(skillInput)) {
//       setSkills([...skills, skillInput]);
//       setSkillInput("");
//     }
//   };

//   const handleRemoveSkill = (skill) => {
//     setSkills(skills.filter((s) => s !== skill));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!githubUsername || skills.length === 0) {
//       setMessage("Please enter GitHub username and at least one skill.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/complete-profile",
//         { userId, skills, bio, availability, githubUsername },
//         { withCredentials: true }
//       );
//       setMessage("Profile completed successfully!");
//       console.log(res.data.user);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error completing profile");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
//       {message && <p className="mb-4 text-red-500">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* GitHub Username */}
//         <div>
//           <label className="block mb-1 font-medium">GitHub Username *</label>
//           <input
//             type="text"
//             value={githubUsername}
//             onChange={(e) => setGithubUsername(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         {/* Skills Input */}
//         <div>
//           <label className="block mb-1 font-medium">Skills *</label>
//           <div className="flex mb-2">
//             <input
//               type="text"
//               value={skillInput}
//               onChange={(e) => setSkillInput(e.target.value)}
//               className="flex-1 border px-3 py-2 rounded mr-2"
//               placeholder="Enter a skill"
//             />
//             <button type="button" onClick={handleAddSkill} className="px-4 py-2 bg-blue-500 text-white rounded">
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {skills.map((skill) => (
//               <span key={skill} className="bg-gray-200 px-2 py-1 rounded flex items-center">
//                 {skill}
//                 <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-1 text-red-500 font-bold">
//                   x
//                 </button>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block mb-1 font-medium">Bio</label>
//           <textarea
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         {/* Availability */}
//         <div>
//           <label className="block mb-1 font-medium">Availability (hours/week)</label>
//           <input
//             type="number"
//             value={availability}
//             onChange={(e) => setAvailability(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded">
//           Complete Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CompleteProfile;


// import React, { useState } from "react";
// import axios from "axios";

// const CompleteProfile = () => {
//   const [skills, setSkills] = useState([]);
//   const [skillInput, setSkillInput] = useState("");
//   const [bio, setBio] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [githubUsername, setGithubUsername] = useState("");
//   const [message, setMessage] = useState("");

//   const handleAddSkill = () => {
//     if (skillInput && !skills.includes(skillInput)) {
//       setSkills([...skills, skillInput]);
//       setSkillInput("");
//     }
//   };

//   const handleRemoveSkill = (s) => setSkills(skills.filter(skill => skill !== s));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!githubUsername || skills.length === 0) {
//       setMessage("GitHub username and at least one skill required");
//       return;
//     }
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/complete-profile",
//         { skills, bio, availability, githubUsername },
//         { withCredentials: true }
//       );
//       setMessage(res.data.message);
//     } catch (err) {
//       console.log(err.response);
//       setMessage(err.response?.data?.message || "Error completing profile");
//     }
//   };

//   return (
//     <div>
//       <h2>Complete Profile</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input placeholder="GitHub Username" value={githubUsername} onChange={e => setGithubUsername(e.target.value)} required />
//         <div>
//           <input placeholder="Add skill" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
//           <button type="button" onClick={handleAddSkill}>Add</button>
//           {skills.map(s => <span key={s}>{s} <button type="button" onClick={() => handleRemoveSkill(s)}></button></span>)}
//         </div>
//         <textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} />
//         <input type="number" placeholder="Availability" value={availability} onChange={e => setAvailability(e.target.value)} />
//         <button type="submit">Complete Profile</button>
//       </form>
//     </div>
//   );
// };

// export default CompleteProfile;

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

      // Profile completed successfully
      setMessage(res.data.message);

      // Redirect based on role
      const userRole = res.data.user.role;
      if (userRole === "creator") navigate("/create-project");
      else navigate("/"); // Project Feed page

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
