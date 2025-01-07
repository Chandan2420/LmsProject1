import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="sidebar-whole">
      <div className="sidebar">
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/dashboard")}
        >
          <span className="icon">📊</span> Dashboard
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/courses")}
        >
          <span className="icon">📚</span> Courses
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/add-course")}
        >
          <span className="icon">➕</span> Add Course
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/lessons")}
        >
          <span className="icon">📖</span> Lessons
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/quizzes")}
        >
          <span className="icon">📝</span> Quizzes
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/questions")}
        >
          <span className="icon">❓</span> Questions
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/assignments")}
        >
          <span className="icon">📂</span> Assignments
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/settings")}
        >
          <span className="icon">⚙️</span> Settings
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={() => handleNavigation("/logout")}
        >
          <span className="icon">🔒</span> Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
