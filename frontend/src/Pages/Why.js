import React from "react";
import "../Pages/Why.css";
import Image from "../images/oldlady.png";

function Why() {
  return (
    <div className="why-whole-container">
      <div className="why-container">
        <div className="image-container">
          <img src={Image} alt="Representation" />
        </div>
        <div className="text-container">
          <h1>How You Get to Know About This?</h1>
          <p>
            We are here for you to give the best real-life implementation of
            your ideas. Our platform ensures practical applications of your
            concepts to help you achieve your goals. Join us to turn your
            visions into reality. You can learn about this by researching
            online, reading relevant books or articles, and watching tutorials
            that explain the topic in detail. Attending workshops or enrolling
            in specialized courses can also help you gain in-depth knowledge.
            Additionally, participating in forums or discussion groups allows
            you to engage with others who share similar interests and learn from
            their experiences. Practicing hands-on and experimenting with
            examples is another effective way to understand the subject better.
            Seeking guidance from experts or mentors can provide personalized
            advice, while step-by-step video tutorials can simplify complex
            concepts and make learning more engaging.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Why;
