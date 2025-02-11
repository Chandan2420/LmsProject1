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

  // Retrieve role and token from localStorage
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");  // Assuming token indicates login status

  const handleAddCourseClick = () => {
    navigate("/add");
  };

  return (
    <div className="nav-links">
      <input type="text" placeholder="Search..." className="search-input" />
      
      {/* Show Add Courses button only if logged in and role is instructor */}
      {token && role === "instructor" && (
        <button className="searchsign-button" onClick={handleAddCourseClick}>
          Add Courses
        </button>
      )}
    </div>
  );
}

export default Searchbar;

