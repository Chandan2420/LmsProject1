// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Pages/LoginPage.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Both fields are required.');
//       return;
//     }

//     if (email === 'user@example.com' && password === 'password123') {
//       setError('');  // Clear any previous error
//       alert('Login successful!');
//       navigate('/home');
//     } else {
//       setError('Invalid email or password.');
//     }
//   };

//   return (

//     <div className='login-wholecontainer'>
//        <div className="login-two-container">
//       <div className="login-container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {error && <p className="error">{error}</p>}
//           <div className='form-group'>
//             <button type="submit">Login</button>
//           </div>
//         </form>
//       </div>
//       <div className='login-image'></div>
//     </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    if (email === "user@example.com" && password === "password123") {
      setError("");
      alert("Login successful!");
      navigate("/home");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-wholecontainer">
      <div className="login-two-container">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error">{error}</p>}
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <div className="login-image"></div>
      </div>
    </div>
  );
};

export default LoginPage;
