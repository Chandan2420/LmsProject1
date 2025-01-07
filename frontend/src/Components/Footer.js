// // import React from 'react';
// // import "../Components/Footer.css";

// // const Footer = () => {
// //   return (
// //     <footer className="footer">
// //       <div className="footer-container">
// //         {/* Newsletter Section */}
// //         <div className="footer-newsletter">
// //           <h2>Sign up for our newsletter</h2>
// //           <p>
// //             Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
// //           </p>
// //           <form className="footer-form">
// //             <input
// //               type="email"
// //               placeholder="Your Email Address"
// //               className="footer-input"
// //             />
// //             <button type="submit" className="footer-button">
// //               Subscribe
// //             </button>
// //           </form>
// //         </div>

// //         <div className="footer-sections">
// //           {/* About Section */}
// //           <div>
// //             <h3 className="footer-heading">Retailhut</h3>
// //             <p className="footer-text">
// //               Our goal is to create insightful content that you can put to work in
// //               personal and professional life.
// //             </p>
// //             <div className="footer-social-icons">
// //               <a href="#"><i className="fab fa-facebook"></i></a>
// //               <a href="#"><i className="fab fa-instagram"></i></a>
// //               <a href="#"><i className="fab fa-twitter"></i></a>
// //               <a href="#"><i className="fab fa-linkedin"></i></a>
// //             </div>
// //           </div>

         
// //           {/* Contact Section */}
// //           <div>
// //             <h3 className="footer-heading">Contact us!</h3>
// //             <p className="footer-text">
// //             J. P. Nagar <br />
// //             Bengaluru, Karnataka 560078

// //             </p>
// //             <p className="footer-text">
// //               Phone: <a href="tel:+13024371780">+91 8088239564</a>
// //             </p>
// //             <p className="footer-text">
// //               Email: <a href="mailto:contact.retailhut@gmail.com">RSCSys@gmail.com</a>
// //             </p>
// //             <p className="footer-text">Office hours: 9:00am–8:00pm M-F</p>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="footer-bottom-bar">
// //         ©RSCSys Pvt Lmtd!!
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;
// // Footer.js
// import React from "react";
// import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-section">
//           <h3>About Us</h3>
//           <p>
//             We are dedicated to providing the best services to our customers.
//             Follow us on our journey to excellence!
//           </p>
//         </div>
//         <div className="footer-section">
//           <h3>Quick Links</h3>
//           <ul>
//             <li><a href="#home">Home</a></li>
//             <li><a href="#services">Services</a></li>
//             <li><a href="#about">About</a></li>
//             <li><a href="#contact">Contact</a></li>
//           </ul>
//         </div>
//         <div className="footer-section">
//           <h3>Contact Us</h3>
//           <p>Email: support@example.com</p>
//           <p>Phone: +123 456 7890</p>
//           <p>Address: 123 Main St, Cityville</p>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <p>&copy; 2024 Your Company. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <i className="fab fa-twitter"></i>
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <i className="fab fa-instagram"></i>
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import "../Components/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-container">
      {/* Footer Content Section */}
      <div className="footer-section">
        <h1>RSCSYS</h1>
        <p>
        "The peak is not just a destination; it’s a testament to your journey.
          It stands as a symbol of all the struggles you’ve overcome and the
          resilience you've built along the way.        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit amet
          numquam iure provident voluptate esse quasi, veritatis totam
          voluptas nostrum.
        </p>
      </div>

      {/* About Section */}
      <div className="footer-section">
        <h3>ABOUT</h3>
        <p>Projects</p>
        <p>About Us</p>
        <p>Courses</p>
        <p>Pages</p>
      </div>

      {/* Address Section */}
      <div className="footer-section">
        <h3>ADDRESS</h3>
        <p>🏠 4/A2, Kothnur Main Rd, Puttenahalli, JP Nagar 7th Phase, J. P. Nagar, Bengaluru, Karnataka 560078</p>
        <p>✉️ rscsys2024@.com</p>
        <p>📞 +91 8088239564</p>
        {/* <p>📠 +01 234 567 89</p> */}
      </div>

      {/* Follow Us Section */}
      <div className="footer-section">
        <h3>FOLLOW US</h3>
        <div className="social-icons">
          <div className="icon fb"></div>
          <div className="icon tw"></div>
          <div className="icon gp"></div>
          <div className="icon db"></div>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; 2024 Copyright: rscsys.com</p>
    </div>
  </footer>
  );
};

export default Footer;






// import React from 'react';

// import "../Components/Footer.css";
// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-content">
//         {/* Logo and Title */}
//         <div className="footer-logo">
//           <span className="footer-title">RSCsys</span>
//         </div>
//         {/* Navigation Links */}
//         <nav className="footer-nav">
//           <a href="#home" className="footer-link">Home</a>
//           <a href="#technologies" className="footer-link">Technologies</a>
//           <a href="#services" className="footer-link">Services</a>
//           <a href="#about" className="footer-link">About</a>
//           <a href="#contact" className="footer-link">Contact</a>
//         </nav>
//         {/* Social Media Icons */}
//         <div className="footer-socials">
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <i className="fab fa-twitter"></i>
//           </a>
//         </div>
//         {/* Contact Button */}
//         <div className="footer-contact">
//           <button className="contact-us">Contact us</button>
//         </div>
//         {/* Copyright */}
//         <p className="footer-copyright">
//           &copy; 2024 All Rights Reserved. Design & Developed By RSCsys
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
