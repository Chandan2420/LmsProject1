import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/StudentProfile.css";

function StudentProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
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
        } catch (err) {
          console.error(err.message);
        }
      };

      fetchProfile();
    }
  }, [navigate]);

  return (
    <div className="profile-page">
      {userProfile ? (
        <>
          <h2 className="profile-title">My Profile</h2>
          <div className="profile-details">
            <p className="profile-info">
              <strong>Name:</strong> {userProfile.name}
            </p>
            <p className="profile-info">
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p className="profile-info">
              <strong>Role:</strong> {userProfile.role}
            </p>
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default StudentProfile;
