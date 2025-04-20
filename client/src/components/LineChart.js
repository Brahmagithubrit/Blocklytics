import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData, label }) {
  const labels = chartData.map((_, index) => index + 1); // Just use index for X-axis

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: chartData, 
        borderColor: "rgb(41, 11, 241)",
        backgroundColor: "rgba(49, 9, 230, 0.97)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{label} Chart</h2>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `${label} Price History`,
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
