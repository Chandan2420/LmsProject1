// import React, { useState } from "react";
// import "../Components/Aio.css";
// import { useNavigate } from "react-router-dom";  



// function Aio(){




//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate(); 
    
//   const handleHomeClick = () =>{
//     navigate("")
// }
  
//   const handleSignupClick = () => {
//     navigate("/signup");  
// };


// const handleLoginClick = () => {
//   navigate("/login");  
// };


// const handleAboutUsClick = () => {
//   navigate("/about-page")
// };

// const handleCourseClick = () =>{
//   navigate("/courses")
// }
//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);

    

  

//   };

//   const handleAddCourseClick = () => {
//     navigate("/add");
// }
 

//   return (
//     <div className="wholedivision">
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo */}
//         <div className="navbar-logo" onClick={handleHomeClick}>
//           RSCS<span style={{ color: "#00e7c9" }}>ys</span>
//         </div>

//         {/* Hamburger Menu Icon */}
//         <div
//           className="hamburger-menu"
//           onClick={toggleMobileMenu}
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </div>

//         {/* Links and Actions */}
//         <div
//           className={`navbar-content ${
//             isMobileMenuOpen ? "active" : ""
//           }`}
//         >
//           <ul className="navbar-links">
//             <li><a href="#home" onClick={handleHomeClick}>Home</a></li>
//             <li><a href="#about" onClick={handleAboutUsClick}>About Us</a></li>
//             <li><a href="#courses" onClick={handleCourseClick}>Courses</a></li>
//             <li><a href="#blog">Blog</a></li>
//           </ul>
//           <div className="navbar-actions">
//             <button className="contact-button" onClick={handleLoginClick}>Login</button>
//             <button className="contact-button" onClick={handleSignupClick}>SignUp</button>
//           </div>
//         </div>
//       </div>
//     </nav>


//     <div className="nav-links">
//             {/* <a href="#home" onClick={handleHomeClick}>Home</a>
//             <a href="#services" onClick={handleCourseClick}>Courses</a>
//             <a href="#about" onClick={handleAboutUsClick}>About Us</a>
//             <a href="#contact">Pages</a>  */}
//               <input
//           type="text"
//           placeholder="Search..."
//           className="search-input"
//         />
//             {/* <button className="searchlog-button" onClick={""}>Login</button> */}
            
//             <button className="searchsign-button" onClick={handleAddCourseClick}>Add Courses</button> 
//         </div>


//         <div className="banner">
//       <div className="overlay">
//         <h1></h1>
//         <p>
//           "The peak is not just a destination; it’s a testament to your journey.
//           It stands as a symbol of all the struggles you’ve overcome and the
//           resilience you've built along the way. Reaching the peak may take
//           time, effort, and unwavering determination, but the view from the top
//           is worth every ounce of energy. As you climb, remember that the
//           challenges are shaping you into a stronger, more capable version of
//           yourself. Keep pushing forward, for the higher you climb, the closer
//           you get to the greatness that awaits you at the peak."
//         </p>
//         <button className="cta-button">View Courses</button>
//       </div>
//       <div className="image-container">
//         {/* <img src={cartoon2} alt="Banner Visual" /> */}
//       </div>
//     </div>
//     </div>




//   );
// };

// export default Aio;
