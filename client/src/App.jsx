import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProject from "./pages/CreateProject";
import ProjectFeed from "./pages/ProjectFeed";
import CompleteProfile from "./pages/CompleteProfile";
import CreatorDashboard from "./pages/CreatorDashboard";


// Temporary dashboards (you can improve later)
// const CreatorDashboard = () => (
//   <div className="p-8">
//     <h2 className="text-2xl font-bold">Creator Dashboard</h2>
//   </div>
// );

const DeveloperDashboard = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold">Developer Dashboard</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<ProjectFeed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Creator Routes */}
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        {/* Developer Routes */}
        <Route path="/developer-dashboard" element={<DeveloperDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
