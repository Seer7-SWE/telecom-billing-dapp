

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UsageChart({ data }) {
  if (!Array.isArray(data)) {
    return <p>Loading usage data...</p>;
  }

  if (data.length === 0) {
    return <p>No usage data</p>;
  }

  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="text-lg font-semibold mb-2">Usage Data</h3>
      <ul className="list-disc ml-6">
        {data.map((item, i) => (
          <li key={i}>
            {item.user}: {item.units} units (${item.charge})
          </li>
        ))}
      </ul>
    </div>
  );
}

// export default function UsageChart({ usage }) {
//   const data = {
//     labels: usage.map((u) => u.date),
//     datasets: [
//       {
//         label: "Data Usage (MB)",
//         data: usage.map((u) => u.units),
//         borderColor: "rgb(99, 102, 241)",
//         backgroundColor: "rgba(99, 102, 241, 0.5)",
//       },
//     ],
//   };

//   return (
//     <div className="bg-white p-4 shadow-md rounded-lg">
//       <Line data={data} />
//     </div>
//   );
// }
