import React, { useState } from 'react';
import './AdminDashboard.css'; // Ensure your CSS handles the layout correctly
import StudentsPage from './StudentsPage'; // Import the StudentsPage component
import InstructorsPage from './InstructorsPage'; // Import the InstructorsPage component

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);

  // Handle sidebar clicks
  const handleNavigation = (path) => {
    if (path === "/students") {
      setActiveTab("students"); // Set active tab to "students"
    } else if (path === "/instructors") {
      setActiveTab("instructors"); // Set active tab to "instructors"
    } else {
      setActiveTab(null); // Reset the active tab when navigating elsewhere
      window.location.href = path; // For other navigation
    }
  };

  return (
    <div className="adminsidebar-whole">
      <div className="adminsidebar">
        <a href="#" className="adminnav-item" onClick={() => handleNavigation("/students")}> 
          <span className="adminicon">📊</span> Students
        </a>
        <a href="#" className="adminnav-item" onClick={() => handleNavigation("/instructors")}> 
          <span className="adminicon">📊</span> Instructors
        </a>
        <a href="#" className="adminnav-item" onClick={() => handleNavigation("/Institutes1")}> 
          <span className="adminicon">📊</span> Institute
        </a>
        <a href="#" className="adminnav-item" onClick={() => handleNavigation("/logout")}> 
          <span className="adminicon">📊</span> Logout
        </a>
      </div>

      {/* Right Side Content */}
      <div className="student-panel">
        {activeTab === "students" && <StudentsPage />} {/* Render StudentsPage when "students" tab is active */}
        {activeTab === "instructors" && <InstructorsPage />} {/* Render InstructorsPage when "instructors" tab is active */}
      </div>
    </div>
  );
};

export default AdminDashboard;
