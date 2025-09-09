import { useEffect, useState } from "react";

export default function Debug() {
  const [plans, setPlans] = useState(null);
  const [usage, setUsage] = useState(null);
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    fetch("/api/plans").then(r => r.json()).then(setPlans).catch(console.error);
    fetch("/api/usage").then(r => r.json()).then(setUsage).catch(console.error);
    fetch("/api/payments").then(r => r.json()).then(setPayments).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg">🔍 Debug API</h1>
      <h2>Plans</h2>
      <pre>{JSON.stringify(plans, null, 2)}</pre>
      <h2>Usage</h2>
      <pre>{JSON.stringify(usage, null, 2)}</pre>
      <h2>Payments</h2>
      <pre>{JSON.stringify(payments, null, 2)}</pre>
    </div>
  );
}
