// import React from "react";
// import { Line } from "react-chartjs-2";  // Import Line chart from react-chartjs-2
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// import "./Dashboard.css";

// // Register components for the line chart
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   // Data for the Line Chart
//   const data = {
//     labels: ["January", "February", "March", "April", "May"],  // X-axis labels
//     datasets: [
//       {
//         label: "Courses Enrolled",
//         data: [10, 20, 30, 40, 50],  // Y-axis data points
//         fill: false,  // No fill below the line
//         borderColor: "rgb(75, 192, 192)",  // Line color
//         tension: 0.1,  // Smooth curve of the line
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Courses Enrolled Over Time",  // Title of the graph
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="dashboard-wrapper">
//       <h1 className="dashboard-header">Dashboard</h1>

//       {/* Metrics Section */}
//       <div className="metrics-wrapper">
//         <div className="metric-card">
//           <h2>5</h2>
//           <p>Total Courses</p>
//         </div>
//         <div className="metric-card">
//           <h2>37</h2>
//           <p>Completed Courses</p>
//         </div>
//         <div className="metric-card">
//           <h2>25</h2>
//           <p>Certificates Earned</p>
//         </div>
//         <div className="metric-card">
//           <h2>705</h2>
//           <p>Hours Spent</p>
//         </div>
//       </div>

//       {/* Line Graph Section */}
//       <div className="graph-wrapper">
//         <Line data={data} options={options} />  {/* Render the Line Chart */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';  // Import Line chart from react-chartjs-2
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import './Dashboard.css';

// // Register components for the line chart
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   // Initial state data
//   const [dashboardData, setDashboardData] = useState({
//     totalCourses: 5,
//     completedCourses: 37,
//     certificatesEarned: 25,
//     hoursSpent: 705,
//     coursesEnrolled: [10, 20, 30, 40, 50],  // Data for the graph
//     courseLabels: ['January', 'February', 'March', 'April', 'May'],  // X-axis labels
//   });

//   // Function to update data dynamically (simulate adding a course, etc.)
//   const addCourse = () => {
//     setDashboardData((prevState) => ({
//       ...prevState,
//       totalCourses: prevState.totalCourses + 1,
//       completedCourses: prevState.completedCourses + 1,  // Simulate completing a course
//       hoursSpent: prevState.hoursSpent + 10,  // Add hours
//       coursesEnrolled: [...prevState.coursesEnrolled, prevState.coursesEnrolled[prevState.coursesEnrolled.length - 1] + 10],  // Adding data for graph
//       courseLabels: [...prevState.courseLabels, `Month ${prevState.courseLabels.length + 1}`],  // Adding a new month for the graph
//     }));
//   };

//   // Data for the Line Chart
//   const graphData = {
//     labels: dashboardData.courseLabels,  // X-axis labels dynamically updated
//     datasets: [
//       {
//         label: 'Courses Enrolled',
//         data: dashboardData.coursesEnrolled,  // Y-axis data dynamically updated
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',  // Line color
//         tension: 0.1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Courses Enrolled Over Time',
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="dashboard-wrapper">
//       <h1 className="dashboard-header">LMS Dashboard</h1>

//       {/* Metrics Section */}
//       <div className="metrics-wrapper">
//         <div className="metric-card">
//           <h2>{dashboardData.totalCourses}</h2>
//           <p>Total Courses</p>
//         </div>
//         <div className="metric-card">
//           <h2>{dashboardData.completedCourses}</h2>
//           <p>Completed Courses</p>
//         </div>
//         <div className="metric-card">
//           <h2>{dashboardData.certificatesEarned}</h2>
//           <p>Certificates Earned</p>
//         </div>
//         <div className="metric-card">
//           <h2>{dashboardData.hoursSpent}</h2>
//           <p>Hours Spent</p>
//         </div>
//       </div>

//       {/* Line Graph Section */}
//       <div className="graph-wrapper">
//         <Line data={graphData} options={options} />  {/* Render the Line Chart */}
//       </div>

//       {/* Button to dynamically update the data */}
//       <div className="action-button">
//         <button onClick={addCourse}>Add Course</button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import './Dashboard.css';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   // Initial state for dashboard metrics
//   const [dashboardData, setDashboardData] = useState({
//     totalCourses: 0,
//     totalStudents: 0,
//     completedCourses: 0,
//     studentsCompleted: 0,
//     coursesEnrolled: [10, 20, 30, 40, 50],  // Graph data
//     courseLabels: ['January', 'February', 'March', 'April', 'May'], // X-axis labels
//   });

//   // Simulate fetching data from API (this can be replaced with a real API call)
//   useEffect(() => {
//     // Mock data simulation (replace with actual API calls)
//     const fetchData = () => {
//       setDashboardData({
//         totalCourses: 10,
//         totalStudents: 100,
//         completedCourses: 6,
//         studentsCompleted: 80,
//         coursesEnrolled: [15, 25, 35, 45, 55],  // Sample course data for graph
//         courseLabels: ['January', 'February', 'March', 'April', 'May'],
//       });
//     };
//     fetchData();  // Fetch the initial data
//   }, []);

//   // Function to update courses and students dynamically
//   const addCourse = () => {
//     setDashboardData((prevState) => ({
//       ...prevState,
//       totalCourses: prevState.totalCourses + 1,
//       completedCourses: prevState.completedCourses + 1,  // Simulating completion
//       coursesEnrolled: [...prevState.coursesEnrolled, prevState.coursesEnrolled[prevState.coursesEnrolled.length - 1] + 10],
//       courseLabels: [...prevState.courseLabels, `Month ${prevState.courseLabels.length + 1}`],  // Add new month to graph
//     }));
//   };

//   const addStudent = () => {
//     setDashboardData((prevState) => ({
//       ...prevState,
//       totalStudents: prevState.totalStudents + 1,
//       studentsCompleted: prevState.studentsCompleted + 1,  // Simulating a student completing a course
//     }));
//   };

//   // Data for the Line Chart
//   const graphData = {
//     labels: dashboardData.courseLabels,  // X-axis labels dynamically updated
//     datasets: [
//       {
//         label: 'Courses Enrolled',
//         data: dashboardData.coursesEnrolled,  // Y-axis data dynamically updated
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',  // Line color
//         tension: 0.1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Courses Enrolled Over Time',
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="dashboard-wrapper">
//       <h1 className="dashboard-header">Dynamic LMS Dashboard</h1>

//       {/* Dynamic Metrics Section */}
//       <div className="metrics-wrapper">
//         <div className="metric-card">
//           <h2>{dashboardData.totalCourses}</h2>
//           <p>Total Courses</p>
//         </div>
//         <div className="metric-card">
//           <h2>{dashboardData.completedCourses}</h2>
//           <p>Completed Courses</p>
//         </div>
//         <div className="metric-card">
//           <h2>{dashboardData.totalStudents}</h2>
//           <p>Total Students</p>
//         </div>
//         <div className="metric-card">
//           <h2>{dashboardData.studentsCompleted}</h2>
//           <p>Students Completed</p>
//         </div>
//       </div>

//       {/* Line Graph Section */}
//       <div className="graph-wrapper">
//         <Line data={graphData} options={options} />  {/* Render the dynamic Line Chart */}
//       </div>

//       {/* Buttons to add courses and students */}
//       <div className="action-buttons">
//         <button onClick={addCourse}>Add Course</button>
//         <button onClick={addStudent}>Add Student</button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Initial state for dashboard metrics
  const [dashboardData, setDashboardData] = useState({
    totalCourses: 10,
    totalStudents: 100,
    completedCourses: 6,
    studentsCompleted: 80,
    certificatesEarned: 50,
    hoursSpent: 1200,
    upcomingDeadlines: 3,
    activeCourses: 7,
    coursesEnrolled: [15, 25, 35, 45, 55],  // Graph data
    courseLabels: ['January', 'February', 'March', 'April', 'May'], // X-axis labels
  });

  // Simulate fetching data from API (this can be replaced with a real API call)
  useEffect(() => {
    // Mock data simulation (replace with actual API calls)
    const fetchData = () => {
      setDashboardData({
        totalCourses: 10,
        totalStudents: 100,
        completedCourses: 6,
        studentsCompleted: 80,
        certificatesEarned: 50,
        hoursSpent: 1200,
        upcomingDeadlines: 3,
        activeCourses: 7,
        coursesEnrolled: [15, 25, 35, 45, 55],  // Sample course data for graph
        courseLabels: ['January', 'February', 'March', 'April', 'May'],
      });
    };
    fetchData();  // Fetch the initial data
  }, []);

  // Data for the Line Chart
  const graphData = {
    labels: dashboardData.courseLabels,  // X-axis labels dynamically updated
    datasets: [
      {
        label: 'Courses Enrolled',
        data: dashboardData.coursesEnrolled,  // Y-axis data dynamically updated
        fill: false,
        borderColor: 'rgb(75, 192, 192)',  // Line color
        tension: 0.1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Courses Enrolled Over Time',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-header">Dashboard</h1>

      {/* 8 Containers Section */}
      <div className="metrics-wrapper">
        <div className="metric-card">
          <h2>{dashboardData.totalCourses}</h2>
          <p>Total Courses</p>
        </div>
        <div className="metric-card">
          <h2>{dashboardData.completedCourses}</h2>
          <p>Completed Courses</p>
        </div>
        <div className="metric-card">
          <h2>{dashboardData.totalStudents}</h2>
          <p>Total Students</p>
        </div>
        <div className="metric-card">
          <h2>{dashboardData.studentsCompleted}</h2>
          <p>Students Completed</p>
        </div>
        <div className="metric-card">
          <h2>{dashboardData.certificatesEarned}</h2>
          <p>Certificates Earned</p>
        </div>
        <div className="metric-card">
          <h2>{dashboardData.hoursSpent}</h2>
          <p>Hours Spent</p>
        </div>
        <div className="metric-card">
          <h2>{dashboardData.upcomingDeadlines}</h2>
          <p>Upcoming Deadlines</p>
        </div>
        <div className="metric-card">
          <h2>{dashboardData.activeCourses}</h2>
          <p>Active Courses</p>
        </div>
      </div>

      {/* Line Graph Section */}
      <div className="graph-wrapper">
         <Line data={graphData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
