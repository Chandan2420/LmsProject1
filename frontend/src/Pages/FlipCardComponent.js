import React from "react";
import "../Pages/FlipCardComponent.css";

const FlipCardComponent = () => {
  const cardsData = [
    {
      title: "Who are we?",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      image: "image1.jpg", // Replace with the actual image URL
    },
    {
      title: "What we do?",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      image: "image2.jpg", // Replace with the actual image URL
    },
    {
      title: "How it works?",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      image: "image3.jpg", // Replace with the actual image URL
    },
  ];

  return (
    <div className="flip-card-container">
      {cardsData.map((card, index) => (
        <div className="flip-card" key={index}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={card.image} alt={card.title} />
            </div>
            <div className="flip-card-back">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlipCardComponent;
