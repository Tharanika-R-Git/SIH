import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import PoliceDashboard from "./pages/PoliceDashboard";
import TahsildarDashboard from "./pages/TahsildharDashboard";
import TreasuryDBTPortal from "./pages/TreasuryDashboard";
import WelfarePortal from "./pages/WelfareDashboard";
import AdminPortal from "./pages/AdminPortal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/police-dashboard" element={<PoliceDashboard />} />
      <Route path="/tahsildar-dashboard" element={<TahsildarDashboard />} />
      <Route path="/treasury-dashboard" element={<TreasuryDBTPortal />} />
      <Route path="/welfare-dashboard" element={<WelfarePortal />} />
      <Route path="/admin-dashboard" element={<AdminPortal />} />
    </Routes>
  );
}

export default App;
