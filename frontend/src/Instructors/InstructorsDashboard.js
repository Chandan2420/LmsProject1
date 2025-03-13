import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InstructorsDashboard.css';
import Courseslms from './Courseslms';
import AddCourseslms from './AddCourseslms';
import CoursesLession from './CoursesLession';

const InstructorDashboard = () => {
  const { userId } = useParams(); // Get `userId` from URL
  const [instructorData, setInstructorData] = useState(null);
  const [activeTab, setActiveTab] = useState("addcourses");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/InstructorProfile/${userId}`)
      .then((response) => setInstructorData(response.data))
      .catch((error) => console.error("Error fetching instructor data:", error));
  }, [userId]);

  return (
    <div className="instructorsidebar-whole">
      <div className="instructorsidebar">
        {instructorData && <h2>Welcome, {instructorData.name}!</h2>}
        <a href="#" className="instructornav-item" onClick={() => setActiveTab("addcourseslms")}> 
          <span className="instructoricon">👨‍🎓</span> Add Courses
        </a>
        <a href="#" className="instructornav-item" onClick={() => setActiveTab("courseslms")}> 
          <span className="instructoricon">📘</span> Courses
        </a>
        <a href="#" className="instructornav-item" onClick={() => setActiveTab("courseslessons")}> 
          <span className="instructoricon">📘</span> Lessons
        </a>
        <a href="#" className="instructornav-item" onClick={() => window.location.href = "/logout"}> 
          <span className="instructoricon">🔒</span> Logout
        </a>
      </div>

      <div className="instructor-panel">
      {activeTab === "addcourseslms" && instructorData && (
  <AddCourseslms userId={userId} instructorName={instructorData.name} />
)}
        {activeTab === "courseslms" && <Courseslms userId={userId} />}
        {activeTab === "courseslessons" && <CoursesLession userId={userId} />}
      </div>
    </div>
  );
};

export default InstructorDashboard;
