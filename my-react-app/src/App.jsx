import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PoliceDashboard from "./pages/PoliceDashboard";
import TahsildarDashboard from "./pages/TahsildharDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/police-dashboard" element={<PoliceDashboard />} />
        <Route path="/Tahsildar-dashboard" element={<TahsildarDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
