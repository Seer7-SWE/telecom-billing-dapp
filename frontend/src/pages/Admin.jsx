import { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";

export default function Admin() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/plans");
        const data = await res.json();
        console.log("Fetched plans:", data); // 👀 log it
        setPlans(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading plans:", err);
      }
    }
    fetchPlans();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.length > 0 ? (
          plans.map((plan, idx) => (
            <PlanCard key={plan.id || plan.planId || idx} plan={plan} />
          ))
        ) : (
          <p>No plans available</p>
        )}
      </div>
    </div>
  );
}
