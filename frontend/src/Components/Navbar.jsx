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
    localStorage.clear(); // This will remove all items from localStorage
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
    if (userProfile?.role === "admin") {
      navigate("/admin-dashboard"); // Navigate to admin dashboard if user is admin
    } else {
      navigate("/profile"); // Navigate to user profile if not admin
    }
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
                      <button
                        className="dropdown-item logout-button"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                 {/* Additional Logout Button */}
                 <button
                  className="contact-button"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
