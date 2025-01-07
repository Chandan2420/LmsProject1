import React from "react";
import "../Pages/InstructorCard.css";
import { Navigate, useNavigate } from "react-router-dom";

const InstructorCard = () => {
  const navigate = useNavigate();

  const handleGetClick = () => {
    navigate("/next");
  };

  return (
    <div className="instructor-whole-container">
      <div className="instructor-card">
        <div className="image-section"></div>
        <div className="text-section">
          <h1>
            Become One Of <span className="highlight">Our Company</span>{" "}
            Instructors
          </h1>
          <p>Become an instructor and change lives — including your own.</p>
          <button className="instructor-button" onClick={handleGetClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
