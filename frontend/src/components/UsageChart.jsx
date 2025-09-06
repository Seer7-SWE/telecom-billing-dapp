

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

export default function UsageChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No usage data</p>;
  }

  return (
    <div>
      {data.map((item, i) => (
        <p key={i}>
          {item.user}: {item.units} units (${item.charge})
        </p>
      ))}
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
