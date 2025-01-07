import React from "react";
import "../Pages/HiringSection.css";

const HiringSection = () => {
  return (
    <section className="hiring-section">
      <div className="hiring-header">
        <p className="hiring-subtitle">WE ARE HIRING!!</p>
        <h2 className="hiring-title">
          If You’re Looking To Make An Impact, <br />
          We’re Looking For You
        </h2>
      </div>
      <div className="hiring-features">
        <div className="feature-item">
          <i className="feature-icon fas fa-handshake"></i>
          <p className="feature-text">
            We work together as a friendly, supportive team
          </p>
        </div>
        <div className="feature-item">
          <i className="feature-icon fas fa-lightbulb"></i>
          <p className="feature-text">
            We strive to find the best solution, not the easy one
          </p>
        </div>
        <div className="feature-item">
          <i className="feature-icon fas fa-binoculars"></i>
          <p className="feature-text">
            We go the extra mile to deliver work we’re proud of
          </p>
        </div>
        <div className="feature-item">
          <i className="feature-icon fas fa-heart"></i>
          <p className="feature-text">
            We put our customers at the heart of everything we do
          </p>
        </div>
      </div>
      <div className="hiring-button">
        <button className="open-positions-button">See Open Positions</button>
      </div>
    </section>
  );
};

export default HiringSection;
