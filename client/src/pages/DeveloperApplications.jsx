// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/axiosConfig";

// function DeveloperApplications() {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMyRequests();
//   }, []);

//   const fetchMyRequests = async () => {
//     try {
//       const res = await api.get("/request/my-requests");
//       setRequests(res.data.requests);
//     } catch (error) {
//       console.log("Error fetching requests");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <h2 className="text-2xl font-bold mb-6">
//         My Applications
//       </h2>

//       {requests.length === 0 ? (
//         <p>No applications yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {requests.map((req) => (
//             <div
//               key={req._id}
//               className="bg-white p-6 rounded shadow"
//             >
//               <h3 className="text-xl font-semibold">
//                 {req.project?.title}
//               </h3>

//               <p className="text-gray-600 mt-2">
//                 {req.project?.description}
//               </p>

//               <p className="mt-3 font-medium">
//                 Status:{" "}
//                 <span
//                   className={
//                     req.status === "accepted"
//                       ? "text-green-600"
//                       : req.status === "rejected"
//                       ? "text-red-600"
//                       : "text-yellow-600"
//                   }
//                 >
//                   {req.status}
//                 </span>
//               </p>

//               {req.status === "accepted" && (
//                 <button
//                   onClick={() =>
//                     navigate(`/chat/${req.project._id}`)
//                   }
//                   className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
//                 >
//                   Open Chat
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DeveloperApplications;


