import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Admin from "./pages/Admin.jsx";
import { Web3Provider } from "./context/Web3Context.jsx";

export default function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-5xl mx-auto p-4 space-y-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Web3Provider>
  );
}
