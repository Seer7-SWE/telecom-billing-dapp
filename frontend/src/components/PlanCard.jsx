export default function PlanCard({ plan, onSubscribe }) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h3 className="text-lg font-bold">{plan.name}</h3>
      <p className="text-gray-600">
        Type: {plan.planType === 0 ? "Prepaid" : "Postpaid"}
      </p>
      <p className="text-gray-600">Price per unit: {plan.pricePerUnit}</p>
      <p className="text-gray-600">
        Subscription fee: {plan.subscriptionFee}
      </p>
      <button
        onClick={() => onSubscribe(plan.planId)}
        className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
      >
        Subscribe
      </button>
    </div>
  );
}
