// import React from "react";
// import "../components/Searchbar.css";
// import { Link } from "react-router-dom";

// function Searchbar(){
//     return (
//          <div class="nav-links">
//         <a href="#home">Home</a>
//         <a href="#services">Courses</a>
//         <a href="#about">About Us</a>
//         <a href="#contact">Pages</a>
//         <button href="#Login" className="log-button"  onClick={() => window.location.href = "#login"}>Login</button>
//         </div>
//     )
// }

import React from "react";
import "../Components/Searchbar.css";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const navigate = useNavigate();

  const handleAddCourseClick = () => {
    navigate("/add");
  };

  return (
    <div className="nav-links">
      {/* <a href="#home" onClick={handleHomeClick}>Home</a>
            <a href="#services" onClick={handleCourseClick}>Courses</a>
            <a href="#about" onClick={handleAboutUsClick}>About Us</a>
            <a href="#contact">Pages</a>  */}
      <input type="text" placeholder="Search..." className="search-input" />
      {/* <button className="searchlog-button" onClick={""}>Login</button> */}

      <button className="searchsign-button" onClick={handleAddCourseClick}>
        Add Courses
      </button>
    </div>
  );
}

export default Searchbar;
