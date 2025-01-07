import React from "react";
import "../Pages/InstructorSection.css";
import { Navigate, useNavigate } from "react-router-dom";

const InstructorSection = () => {
  const navigate = useNavigate();

  const handleTakeClick = () => {
    navigate("/hello");
  };

  return (
    <section className="instructor-section">
      <div className="overlay">
        <div className="content">
          <h1>
            <span>Become an Instructor</span> & <span>Teach what you love</span>
          </h1>
          <p>
            Share your knowledge with the largest community of creatives and
            generate an income by teaching online courses.
          </p>
          <button className="instructor-cta-button" onClick={handleTakeClick}>
            Teach A Course
          </button>
          <p className="proposal-text">
            We’ll check your proposal and get back to you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
