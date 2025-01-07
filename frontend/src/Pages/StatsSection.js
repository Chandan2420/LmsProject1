import React from "react";
import CountUp from "react-countup";
import "../Pages/StatsSection.css";
function StatsSection() {
  return (
    <div className="stats-full-container">
      <div className="stats-container">
        <div className="stats-content">
          <h1>Creativity Meets Innovation</h1>
          <p>
            RSCSys Pvt Limited is a software services company based in
            Bengaluru, India, specializing in various areas of technology.
            Established in 2020, the company provides services such as software
            development, web and mobile application development, cloud
            solutions, e-commerce development, artificial intelligence
            integration, and augmented reality.
          </p>
        </div>
        <div className="stats-grid">
          <div className="stats-card blue">
            <h2>
              <CountUp end={9452} duration={2} />
            </h2>
            <p>Foreign Followers</p>
          </div>
          <div className="stats-card green">
            <h2>
              <CountUp end={1223} duration={2} />
            </h2>
            <p>Classes Complete</p>
          </div>
          <div className="stats-card yellow">
            <h2>
              <CountUp end={2678} duration={2} />
            </h2>
            <p>Students Enrolled</p>
          </div>
          <div className="stats-card pink">
            <h2>
              <CountUp end={278} duration={2} />
            </h2>
            <p>Certified Teachers</p>
          </div>
          <div className="stats-card blue">
            <h2>
              <CountUp end={9452} duration={2} />
            </h2>
            <p>Foreign Followers</p>
          </div>
          <div className="stats-card pink">
            <h2>
              <CountUp end={278} duration={2} />
            </h2>
            <p>Certified Teachers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
