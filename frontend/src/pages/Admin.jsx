import { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";

export default function Admin() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  const handleSubscribe = (planId) => {
    alert(`Subscribed to plan ${planId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">⚙️ Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <PlanCard key={plan.planId} plan={plan} onSubscribe={handleSubscribe} />
        ))}
      </div>
    </div>
  );
}
