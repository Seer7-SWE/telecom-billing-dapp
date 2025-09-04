import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (wallet.trim()) {
      localStorage.setItem("wallet", wallet);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login with Wallet</h2>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
