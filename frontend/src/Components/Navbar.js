// import React from "react";
// import "../Components/Navbar.css";
// import Logo from "../images/Rsc-Img.png";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate("/add");
//   };

//   return (
//     <div className="navbar">
//       <div className="logo-div">
//         <img src={Logo} className="logo" alt="Logo" /> {/* Logo */}
//       </div>
//       <input
//         type="text"
//         placeholder="Search..."
//         className="search-input"
//       /> {/* Search input */}
//       <button className="navadd-button" onClick={handleLoginClick}>
//         Add Course
//       </button>
//     </div>
//   );
// }

// export default Navbar;
import React, { useState } from "react";
import "../Components/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAboutUsClick = () => {
    navigate("/about-page");
  };

  const handleCourseClick = () => {
    navigate("/courses");
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={handleHomeClick}>
          RSCS<span style={{ color: "#164f66" }}>ys</span>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>

        {/* Links and Actions */}
        <div className={`navbar-content ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="navbar-links">
            <li>
              <a href="#home" onClick={handleHomeClick}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={handleAboutUsClick}>
                About Us
              </a>
            </li>
            <li>
              <a href="#courses" onClick={handleCourseClick}>
                Courses
              </a>
            </li>
            <li>
              <a href="#pages">Pages</a>
            </li>
          </ul>
          <div className="navbar-actions">
            <button className="contact-button" onClick={handleLoginClick}>
              Login
            </button>
            <button className="contact-button" onClick={handleSignupClick}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
