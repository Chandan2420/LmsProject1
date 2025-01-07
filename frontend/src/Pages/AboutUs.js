import React from 'react';
import "../Pages/AboutUs.css";

const AboutUsPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <h2>
            We are dedicated to delivering the best services to our clients with passion,
            innovation, and expertise.
          </h2>
          <h4>Every business has an origin story worth telling, and usually one that justifies why you do business and have clients.</h4>
        </div>
      </section>

      

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="team-image"
            />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="team-image"
            />
            <h3>Jane Smith</h3>
            <p>Head of Development</p>
          </div>
          <div className="team-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="team-image"
            />
            <h3>Mark Johnson</h3>
            <p>Design Lead</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      {/* <section className="values-section">
        <h2>Our Values</h2>
        <ul className="values-list">
          <li>Innovation</li>
          <li>Integrity</li>
          <li>Customer Focus</li>
          <li>Collaboration</li>
          <li>Excellence</li>
        </ul>
      </section> */}
    </div>
  );
};

export default AboutUsPage;
