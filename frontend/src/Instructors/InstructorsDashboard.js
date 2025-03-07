import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InstructorsDashboard.css';
import Courseslms from './Courseslms';
import AddCourseslms from './AddCourseslms';

const InstructorDashboard = () => {
  const { userId } = useParams(); // Get `userId` from the URL
  const [instructorData, setInstructorData] = useState(null);
  const [activeTab, setActiveTab] = useState("addcourses");

  useEffect(() => {
    // Fetch the instructor data using `userId`
    axios.get(`http://localhost:5000/api/InstructorProfile/${userId}`)
      .then((response) => setInstructorData(response.data))
      .catch((error) => console.error("Error fetching instructor data:", error));
  }, [userId]);

  return (
    <div className="instructorsidebar-whole">
      <div className="instructorsidebar">
        <a href="#" className="instructornav-item" onClick={() => setActiveTab("addcourseslms")}> 
          <span className="instructoricon">👨‍🎓</span> AddCourses
        </a>
        <a href="#" className="instructornav-item" onClick={() => setActiveTab("courseslms")}> 
          <span className="instructoricon">📘</span> Courses
        </a>
        <a href="#" className="instructornav-item" onClick={() => window.location.href = "/logout"}> 
          <span className="instructoricon">🔒</span> Logout
        </a>
      </div>

      <div className="instructor-panel">
        {activeTab === "addcourseslms" && <AddCourseslms />}
        {activeTab === "courseslms" && <Courseslms />}
      </div>
    </div>
  );
};

export default InstructorDashboard;
