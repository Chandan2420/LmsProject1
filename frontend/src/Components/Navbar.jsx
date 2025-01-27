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
import React, { useState, useEffect } from "react";
import "../Components/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/profile", {
            method: "GET",
            headers: {
              Authorization: token,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch profile.");
          }

          const data = await response.json();
          setUserProfile(data);
        } catch (err) {
          console.error(err.message);
        }
      };

      fetchProfile();
    }
  }, []);

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

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to profile page
  };

  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleHomeClick}>
          RSCS<span style={{ color: "#164f66" }}>ys</span>
        </div>

        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>

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
            {!isLoggedIn ? (
              <>
                <button className="contact-button" onClick={handleSignupClick}>
                  SignUp
                </button>
                <button className="contact-button" onClick={handleLoginClick}>
                  Login
                </button>
              </>
            ) : (
              <>
                <div
                  className="user-profile-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="contact-button">Hi, {userProfile?.name}</span>
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      <p className="dropdown-item" onClick={handleProfileClick}>
                        My Profile
                      </p>
                      <p className="dropdown-item">Email: {userProfile?.email}</p>
                      <p className="dropdown-item">Role: {userProfile?.role}</p>
                      <button
                        className="dropdown-item logout-button"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



