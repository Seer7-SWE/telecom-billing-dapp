import { useEffect, useState } from "react";
import UsageChart from "../components/UsageChart";

export default function Dashboard() {
  const [usage, setUsage] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usageRes = await fetch("/api/usage");
        const usageData = await usageRes.json();
        setUsage(usageData);

        const paymentsRes = await fetch("/api/payments");
        const paymentsData = await paymentsRes.json();
        setPayments(paymentsData);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">Usage</h2>
      <UsageChart data={usage} />

      <h2 className="text-xl font-semibold mt-6 mb-2">Payments</h2>
      <ul className="list-disc ml-6">
        {payments.map((p, i) => (
          <li key={i}>
            {p.user} paid ${p.amount} ({p.type})
          </li>
        ))}
      </ul>
    </div>
  );
}
