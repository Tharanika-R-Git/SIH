import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // New landing page
import Login from "./pages/Login";
import PoliceDashboard from "./pages/PoliceDashboard";
import TahsildarDashboard from "./pages/TahsildharDashboard";
import TreasuryDBTPortal from "./pages/TreasuryDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/police-dashboard" element={<PoliceDashboard />} />
        <Route path="/tahsildar-dashboard" element={<TahsildarDashboard />} />
        <Route path="/treasury-dashboard" element={<TreasuryDBTPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
