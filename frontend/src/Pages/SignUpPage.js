// import React, { useState } from "react";
// import "./SignUpPage.css";

// const SignUpPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     let formErrors = {};
//     let isValid = true;

//     if (!formData.fullName) {
//       formErrors.fullName = "Full name is required.";
//       isValid = false;
//     }

//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!formData.email) {
//       formErrors.email = "Email is required.";
//       isValid = false;
//     } else if (!emailPattern.test(formData.email)) {
//       formErrors.email = "Please enter a valid email address.";
//       isValid = false;
//     }

//     if (!formData.password) {
//       formErrors.password = "Password is required.";
//       isValid = false;
//     } else if (formData.password.length < 6) {
//       formErrors.password = "Password must be at least 6 characters long.";
//       isValid = false;
//     }

//     if (!formData.confirmPassword) {
//       formErrors.confirmPassword = "Please confirm your password.";
//       isValid = false;
//     } else if (formData.confirmPassword !== formData.password) {
//       formErrors.confirmPassword = "Passwords do not match.";
//       isValid = false;
//     }

//     setErrors(formErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log("Form submitted successfully:", formData);
//       setIsSubmitted(true);
//     }
//   };

//   return (
//     <div className="signup-whole-container">
//     <div className="signup-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit} noValidate>
//         <div className="form-group">
//           <label htmlFor="fullName">Full Name</label>
//           <input
//             type="text"
//             id="fullName"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             className={errors.fullName ? "error" : ""}
//           />
//           {errors.fullName && <p className="error-text">{errors.fullName}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="phonenumber">Mobile Number</label>
//           <input
//             type="number"
//             id="phonenumber"
//             name="phonenumber"
//             value={formData.phonenumber}
//             onChange={handleChange}
//             className={errors.phonenumber ? "error" : ""}
//           />
//           {errors.phonenumber && (
//             <p className="error-text">{errors.phonenumber}</p>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={errors.email ? "error" : ""}
//           />
//           {errors.email && <p className="error-text">{errors.email}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className={errors.password ? "error" : ""}
//           />
//           {errors.password && <p className="error-text">{errors.password}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className={errors.confirmPassword ? "error" : ""}
//           />
//           {errors.confirmPassword && (
//             <p className="error-text">{errors.confirmPassword}</p>
//           )}
//         </div>

//         <div className="form-group">
//           <button type="submit">Sign Up</button>
//         </div>

//         {isSubmitted && (
//           <p className="success-message">
//             Signup successful! You can now log in.
//           </p>
//         )}
//       </form>
//     </div>
//     <div className="signup-image"></div>
// </div>

//   );
// };

// export default SignUpPage;

import React, { useState } from "react";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.fullName) {
      formErrors.fullName = "Full name is required.";
      isValid = false;
    }
    console.log(formData.fullName, "test");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/studentsignup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.fullName,
              mobile: formData.phonenumber,
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setIsSubmitted(true);
          setServerError(""); // Clear any previous errors
        } else {
          setServerError(data.error || "An error occurred. Please try again.");
        }
      } catch (error) {
        setServerError("Failed to connect to the server. Please try again.");
      }
    }
  };

  return (
    <div className="signup-whole-container">
      <div className="signup-two-container">
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "error" : ""}
              />
              {errors.fullName && (
                <p className="error-text">{errors.fullName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phonenumber">Mobile Number</label>
              <input
                type="number"
                id="phonenumber"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                className={errors.phonenumber ? "error" : ""}
              />
              {errors.phonenumber && (
                <p className="error-text">{errors.phonenumber}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="form-group">
              <button type="submit">Sign Up</button>
            </div>

            {serverError && <p className="error-text">{serverError}</p>}
            {isSubmitted && (
              <p className="success-message">
                Signup successful! You can now log in.
              </p>
            )}
          </form>
        </div>

        <div className="signup-image"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
