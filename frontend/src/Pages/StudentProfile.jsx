import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/StudentProfile.css"; // Import the external CSS file
import Dashboard from "../Pages/Dashboard"; // Import the Dashboard component
import AddCourse from "../SidebarComponents/MyCourses"; // Import the AddCourse component
import MyCourses from "../SidebarComponents/MyCourses";

function StudentProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [showDashboard, setShowDashboard] = useState(true); // Set dashboard to be shown by default
  const [showMyCourses, setShowMyCourses] = useState(false); // Manage visibility of AddCourse component
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const fetchProfile = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/profile", {
            method: "GET",
            headers: {
              Authorization: token,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch profile.");
          }

          const data = await response.json();
          setUserProfile(data);
          setAvatar(data.avatar);
        } catch (err) {
          console.error(err.message);
        }
      };

      fetchProfile();
    }
  }, [navigate]);

  const handleAvatarClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar.");
      }

      const data = await response.json();
      setAvatar(data.avatar);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="studentsidebar-whole">
      {/* Sidebar Section */}
      <div className="sidebar">
        <div className="profile-content">
          {userProfile ? (
            <>
              <h2 className="profile-title">My Profile</h2>
              <div className="profile-card">
                <div className="avatar-container">
                  <img
                    className="avatar"
                    src={avatar || "https://via.placeholder.com/150/0000FF/FFFFFF?text=Student"}
                    alt="User Avatar"
                    onClick={handleAvatarClick}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="profile-details">
                  <p className="profile-info">
                    <strong>Name:</strong> <strong>{userProfile.name}</strong>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        <a
          href="#"
          className="nav-item"
          onClick={() => {
            setShowDashboard(true);
            setShowMyCourses(false); // Hide Add Course when Dashboard is clicked
          }}
        >
          <span className="icon">📊</span> Dashboard
        </a>

        <a
          href="#"
          className="nav-item"
          onClick={() => {
            setShowDashboard(false); // Hide Dashboard when Add Course is clicked
            setShowMyCourses(true);
          }}
        >
          <span className="icon">➕</span> My Courses
        </a>

        <a href="#" className="nav-item" onClick={() => navigate("/courses1")}>
          <span className="icon">📚</span> Courses
        </a>
        <a href="#" className="nav-item" onClick={() => navigate("/lessons1")}>
          <span className="icon">📖</span> Lessons
        </a>
        <a href="#" className="nav-item" onClick={() => navigate("/quizzes1")}>
          <span className="icon">📝</span> Quizzes
        </a>
        <a href="#" className="nav-item" onClick={() => navigate("/questions1")}>
          <span className="icon">❓</span> Questions
        </a>
        <a href="#" className="nav-item" onClick={() => navigate("/assignments1")}>
          <span className="icon">📂</span> Assignments
        </a>
        <a href="#" className="nav-item" onClick={() => navigate("/settings1")}>
          <span className="icon">⚙️</span> Settings
        </a>
        <a href="#" className="nav-item" onClick={() => navigate("/logout1")}>
          <span className="icon">🔒</span> Logout
        </a>
      </div>

      {/* Conditionally render the Dashboard or AddCourse component */}
      {showDashboard && <Dashboard />}
      {showMyCourses && <MyCourses />}
    </div>
  );
}

export default StudentProfile;
