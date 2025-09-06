import { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";

export default function Admin() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/plans");
        if (!res.ok) throw new Error("Failed to fetch plans");
        const data = await res.json();
        setPlans(Array.isArray(data) ? data : []); // ✅ ensure array
      } catch (err) {
        console.error("Error loading plans:", err);
        setPlans([]); // ✅ fallback
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
