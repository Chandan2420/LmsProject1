import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Data for the chart
  const data = {
    labels: [
      "Total Courses",
      "Published Courses",
      "Pending Courses",
      "Students Completed",
      "Students In-progress",
    ], // Chart labels
    datasets: [
      {
        label: "Course Overview",
        data: [1, 1, 0, 2, 0], // Data points
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
        ], // Slice colors
        hoverOffset: 4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Move the legend below the chart
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
