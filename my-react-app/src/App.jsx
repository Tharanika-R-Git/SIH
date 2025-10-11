import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PoliceDashboard from "./pages/PoliceDashboard";
import TahsildarDashboard from "./pages/TahsildharDashboard";
import TreasuryDBTPortal from "./pages/TreasuryDashboard"; // Correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/police-dashboard" element={<PoliceDashboard />} />
        <Route path="/tahsildar-dashboard" element={<TahsildarDashboard />} />
        <Route path="/treasury-dashboard" element={<TreasuryDBTPortal />} /> {/* Correct component */}
      </Routes>
    </Router>
  );
}

export default App;
