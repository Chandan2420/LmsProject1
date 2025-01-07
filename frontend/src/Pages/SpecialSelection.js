import React from "react";
import "../Pages/SpecialSelection.css";

const SpecialSection = () => {
  const cards = [
    {
      title: "Who are we?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      bgClass: "bg-image1", // CSS class for the background image
    },
    {
      title: "What we do?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      bgClass: "bg-image2",
    },
    {
      title: "How it works?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      bgClass: "bg-image3",
    },
  ];

  return (
    <div className="special-whole-container">
      <section className="special-section">
        <h2>
          What Make Us <span className="highlight">Special?</span>
        </h2>
        <p className="intro">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s...
        </p>
        <div className="cards">
          {cards.map((card, index) => (
            <div className={`card ${card.bgClass}`} key={index}>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpecialSection;
