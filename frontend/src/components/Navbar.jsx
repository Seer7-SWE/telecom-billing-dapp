import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [apiStatus, setApiStatus] = useState("...");
  
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setApiStatus(data.status || "OK"))
      .catch(() => setApiStatus("❌ Down"));
  }, []);
  
  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">📡 Telecom Billing DApp</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/admin" className="hover:underline">
          Admin
        </Link>
        <Link to="/" className="hover:underline">
          Logout
        </Link>
      </div>
      <div className="text-sm">API: {apiStatus}</div>
    </nav>
  );
}