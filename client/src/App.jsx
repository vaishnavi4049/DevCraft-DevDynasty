import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProject from "./pages/CreateProject";
import ProjectFeed from "./pages/ProjectFeed";
import CompleteProfile from "./pages/CompleteProfile";
import CreatorDashboard from "./pages/CreatorDashboard";

import DeveloperDashboard from "./pages/DeveloperDashboard";

import ViewRequest from "./pages/ProjectRequests";
import ProjectChat from "./pages/projectChat";
import LandingPage from "./pages/LandingPage";
import CreatorLanding from "./pages/CreatorLandingPage";
import NegotiationChat from "./pages/Negotiation";
import DeveloperApplications from "./pages/DeveloperAppliedProject";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Creator Routes */}
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/view-requests" element={<ViewRequest />} />
        <Route path="/chat/:projectId" element={<ProjectChat />} />
          <Route
          path="/negotiation/:conversationId"
          element={<NegotiationChat />}
        />

        {/* Developer Routes */}
        <Route path="/feed" element={<ProjectFeed />} />
        <Route path="/developer-dashboard" element={<DeveloperDashboard />} />

        <Route path="/developer-dashboard" element={<DeveloperDashboard />} />


        <Route path="/my-applications" element={<DeveloperApplications />} />
        <Route path="/creator" element={<CreatorLanding />} />
        <Route path="/developer-application" element={<DeveloperApplications />} />
        <Route path="/project-feed" element={<ProjectFeed />} />


        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
