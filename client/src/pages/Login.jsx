
// import { useState } from "react";
// import { loginUser } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Call the login API via authService
//       const data = await loginUser(formData);

//       // Check if profile is completed
//       if (!data.user.profileCompleted) {
//         navigate("/complete-profile"); // redirect to complete profile page
//       } 
//       // If profile is complete, go to dashboard based on role
//       else if (data.user.role === "creator") {
//         navigate("/creator-dashboard");
//       } else {
//         navigate("/developer-dashboard");
//       }

//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">

//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Welcome Back
//         </h2>

//         {message && <p className="mb-4 text-red-500">{message}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200"
//           >
//             Login
//           </button>

//         </form>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             className="text-indigo-600 cursor-pointer font-semibold"
//           >
//             Register
//           </span>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Login;


// import { useState } from "react";
// import { loginUser } from "../services/authService";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await loginUser(formData);
//   //     navigate("/dashboard"); // change this if needed
//   //   } catch (error) {
//   //     alert(error.response?.data?.message || "Login failed");
//   //   }
//   // };
//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Call the login API via authService
//       const data = await loginUser(formData);

//       // Check if profile is completed
//       if (!data.user.profileCompleted) {
//         navigate("/complete-profile"); // redirect to complete profile page
//       } 
//       // If profile is complete, go to dashboard based on role
//       else if (data.user.role === "creator") {
//         navigate("/creator-dashboard");
//       } else {
//         navigate("/developer-dashboard");
//       }

//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center relative overflow-hidden">

//       {/* Animated Background Blobs */}
//       <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
//       <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500 -translate-x-1/2 -translate-y-1/2" />

//       {/* Login Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 w-full max-w-md p-10 rounded-2xl 
//                    bg-gradient-to-b from-white/5 to-white/0 
//                    border border-white/10 backdrop-blur-xl shadow-2xl"
//       >
//         <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//           Welcome Back
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
//                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 
//                        outline-none transition"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
//                        focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 
//                        outline-none transition"
//           />

//           <motion.button
//             whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59,130,246,0.5)" }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 
//                        rounded-xl font-semibold text-lg shadow-lg 
//                        shadow-blue-500/25 transition-all"
//           >
//             Login
//           </motion.button>
//         </form>

//         <p className="text-center mt-6 text-sm text-gray-400">
//           Don't have an account?{" "}
//           <span
//             onClick={() => navigate("/signup")}
//             className="text-blue-400 cursor-pointer font-semibold hover:text-blue-300"
//           >
//             Create Account
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      if (!data || !data.user) {
        throw new Error("Invalid server response");
      }

      const { profileCompleted, role } = data.user;

      // 🚀 FORCE PROFILE COMPLETION
      if (!profileCompleted) {
        navigate("/complete-profile");
      } 
      // If profile is complete, go to dashboard based on role
      else if (data.user.role === "creator") {
        navigate("/creator");

      // 🚀 ROLE BASED DASHBOARD
      else if (role === "creator") {
        navigate("/creator-dashboard");
      } else {
        navigate("/developer-dashboard");
      }

    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-10 rounded-2xl 
                   bg-gradient-to-b from-white/5 to-white/0 
                   border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 
                       outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                       focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 
                       outline-none transition"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                       rounded-xl font-semibold text-lg shadow-lg 
                       shadow-blue-500/25 transition-all disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 cursor-pointer font-semibold hover:text-blue-300"
          >
            Create Account
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
