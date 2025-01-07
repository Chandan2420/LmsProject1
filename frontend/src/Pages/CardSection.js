import React from "react";
import "../Pages/CardSection.css";

const CardSection = () => {
  const cards = [
    {
      title: "Highly Experienced",
      description:
        "Benefit from the expertise of seasoned instructors who bring real-world insights and knowledge to every course. Their experience ensures a rich and impactful learning journey.",
    },
    {
      title: "Question, Quiz & Course",
      description:
        "Engage with interactive quizzes and comprehensive courses designed to reinforce your understanding and assess your progress. This dynamic approach helps solidify key concepts and enhance retention.",
    },
    {
      title: "Dedicated Support",
      description:
        "Receive personalized assistance from a dedicated support team ready to address your questions and challenges. This commitment to student success ensures you have the guidance needed to thrive.",
    },
  ];

  return (
    <div className="expect-card-section">
      <h2 className="section-title">What To Expect From A <span>RSCSys?</span></h2>
      <div className="card-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-icon">✔️</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;