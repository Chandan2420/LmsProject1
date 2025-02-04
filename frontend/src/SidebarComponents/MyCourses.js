import React, { useState, useEffect } from 'react';
import '../SidebarComponents/MyCourses.css';

const MyCourses = () => {
  // Initial state for dashboard metrics
  const [mycoursesData, setMycoursesData] = useState({
    EnrolledCourse: 0,
    InprogressCourse: 0,
    FinishedCourse: 0,
    PassedCourse: 0,
    FailedCourse: 0,
  });

  const [activeTab, setActiveTab] = useState('all');
  const [courseData, setCourseData] = useState([]);

  // Simulate fetching data from API (this can be replaced with a real API call)
  useEffect(() => {
    const fetchData = () => {
      // Sample course data for the table
      const courses = [
        { name: 'Course 1', result: 'Passed', expirationTime: '2025-06-30', endTime: '2025-05-15' },
        { name: 'Course 2', result: 'Failed', expirationTime: '2025-07-01', endTime: '2025-04-10' },
        { name: 'Course 3', result: 'In Progress', expirationTime: '2025-08-01', endTime: '2025-06-25' },
        // Add more courses if needed
      ];
      setCourseData(courses); // Set the data based on the active tab
    };
    fetchData(); // Fetch the initial data
  }, [activeTab]);

  // Handle tab click and show course data
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mycourses-wrapper">
      <h1 className="mycourses-header">My Courses</h1>

      {/* Metrics Section */}
      <div className="metrics-wrapper">
        <div className="metric-card">
          <h2>{mycoursesData.EnrolledCourse}</h2>
          <p>Enrolled Course</p>
        </div>
        <div className="metric-card">
          <h2>{mycoursesData.InprogressCourse}</h2>
          <p>Inprogress Course</p>
        </div>
        <div className="metric-card">
          <h2>{mycoursesData.FinishedCourse}</h2>
          <p>Finished Course</p>
        </div>
        <div className="metric-card">
          <h2>{mycoursesData.PassedCourse}</h2>
          <p>Passed Course</p>
        </div>
        <div className="metric-card">
          <h2>{mycoursesData.FailedCourse}</h2>
          <p>Failed Course</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabClick('all')}
        >
          All
        </button>
        <button
          className={`nav-tab ${activeTab === 'InProgress' ? 'active' : ''}`}
          onClick={() => handleTabClick('InProgress')}
        >
          In Progress
        </button>
        <button
          className={`nav-tab ${activeTab === 'Finished' ? 'active' : ''}`}
          onClick={() => handleTabClick('Finished')}
        >
          Finished
        </button>
        <button
          className={`nav-tab ${activeTab === 'Passed' ? 'active' : ''}`}
          onClick={() => handleTabClick('Passed')}
        >
          Passed
        </button>
        <button
          className={`nav-tab ${activeTab === 'Failed' ? 'active' : ''}`}
          onClick={() => handleTabClick('Failed')}
        >
          Failed
        </button>
      </div>

      {/* Divider Line */}
      <hr className="divider-line" />

      {/* Popup Table with course data */}
      {courseData.length > 0 && (
        <table className="course-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Result</th>
              <th>Expiration Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.result}</td>
                <td>{course.expirationTime}</td>
                <td>{course.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCourses;
