import { useEffect, useState } from "react";
import UsageChart from "../components/UsageChart";

export default function Dashboard() {
  const [usage, setUsage] = useState([]);

  useEffect(() => {
    // Fetch mock usage from backend
    fetch("/api/usage")
      .then((res) => res.json())
      .then((data) => setUsage(data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📊 Dashboard</h2>
      <div>
        <h3 className="font-semibold mb-2">Your Usage</h3>
        {usage.length > 0 ? (
          <UsageChart usage={usage} />
        ) : (
          <p>No usage data available.</p>
        )}
      </div>
    </div>
  );
}
