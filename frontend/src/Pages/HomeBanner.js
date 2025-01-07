import React from "react";
import "../Pages/HomeBanner.css";
import cartoon2 from "../images/cartoon2.png";

function HomeBanner() {
  return (
    <div className="banner">
      <div className="overlay">
        <h1></h1>
        <p>
          "The peak is not just a destination; it’s a testament to your journey.
          It stands as a symbol of all the struggles you’ve overcome and the
          resilience you've built along the way. Reaching the peak may take
          time, effort, and unwavering determination, but the view from the top
          is worth every ounce of energy. As you climb, remember that the
          challenges are shaping you into a stronger, more capable version of
          yourself. Keep pushing forward, for the higher you climb, the closer
          you get to the greatness that awaits you at the peak."
        </p>
        <button className="cta-button">View Courses</button>
      </div>
      <div className="image-container">
        {/* <img src={cartoon2} alt="Banner Visual" /> */}
      </div>
    </div>
  );
}

export default HomeBanner;
