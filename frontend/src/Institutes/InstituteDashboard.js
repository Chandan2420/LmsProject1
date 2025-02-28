import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InstituteDashboard.css';
import InstituteStudents from './InstituteStudents';
import InstituteInstructors from './InstituteInstructors';

const InstituteDashboard = () => {
  const { instituteId } = useParams(); // Get `_id` from the URL
  const [instituteData, setInstituteData] = useState(null);
  const [activeTab, setActiveTab] = useState("students");

  useEffect(() => {
    // Fetch the institute data using `_id`
    axios.get(`http://localhost:5000/api/InstituteProfile/${instituteId}`)
      .then((response) => setInstituteData(response.data))
      .catch((error) => console.error("Error fetching institute data:", error));
  }, [instituteId]);

  return (
    <div className="adminsidebar-whole">
      <div className="adminsidebar">
      <h2 className="institute-name">{instituteData?.instituteName || "Loading..."}</h2> {/* Display Institute Name */}
        <a href="#" className="adminnav-item" onClick={() => setActiveTab("students")}> 
          <span className="adminicon">📊</span> Students
        </a>
        <a href="#" className="adminnav-item" onClick={() => setActiveTab("instructors")}> 
          <span className="adminicon">📚</span> Instructors
        </a>
        <a href="#" className="adminnav-item" onClick={() => window.location.href = "/logout"}> 
          <span className="adminicon">🔒</span> Logout
        </a>
      </div>

      <div className="student-panel">
      {activeTab === "students" && <InstituteStudents instituteCode={instituteData?.instituteCode} />}
      {activeTab === "instructors" && <InstituteInstructors instituteCode={instituteData?.instituteCode} />}
      </div>
    </div>
  );
};

export default InstituteDashboard;
