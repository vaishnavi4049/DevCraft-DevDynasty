
// import { useState } from "react";
// import { loginUser } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await loginUser(formData);

//       // Redirect based on profile completion
//       if (!data.user.profileCompleted) {
//         navigate("/complete-profile");
//       } else if (data.user.role === "creator") {
//         navigate("/creator-dashboard");
//       } else {
//         navigate("/developer-dashboard");
//       }

//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">

//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Welcome Back
//         </h2>

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
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login API via authService
      const data = await loginUser(formData);

      // Check if profile is completed
      if (!data.user.profileCompleted) {
        navigate("/complete-profile"); // redirect to complete profile page
      } 
      // If profile is complete, go to dashboard based on role
      else if (data.user.role === "creator") {
        navigate("/creator-dashboard");
      } else {
        navigate("/developer-dashboard");
      }

    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        {message && <p className="mb-4 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 cursor-pointer font-semibold"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
