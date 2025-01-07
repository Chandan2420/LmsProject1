import React from "react";
import "../Pages/FeaturesSection.css";

const FeaturesSection = () => {
  const features = [
    {
      icon: "📸", // Replace with an actual icon if using an icon library
      title: "Produced by Eduma",
      description:
        "You bring the content and Eduma makes it happen. This will be the beginning of a project we'll do together, side by side.",
    },
    {
      icon: "👥", // Replace with an actual icon
      title: "Share and grow with the community",
      description:
        "Inspire and get inspired alongside other creatives. Eduma is a community with millions of creatives who are eager to learn.",
    },
    {
      icon: "➕", // Replace with an actual icon
      title: "Your creativity is golden",
      description:
        "Harness your passion. Create a course for thousands of people around the world and generate an income stream with your creative knowledge.",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
