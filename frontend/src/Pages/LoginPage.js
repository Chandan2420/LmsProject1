import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../Pages/LoginPage.css";
import { jwtDecode } from 'jwt-decode';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/api/LoginPage', { email, password });
        alert(response.data.message);
        
        // Store token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);

        // Decode the token to check the role (you can use a library like jwt-decode)
        const decodedToken = jwtDecode(response.data.token); // You'll need to install jwt-decode package
        console.log('Decoded Token:', decodedToken);

        // Check the role and navigate accordingly
        if (decodedToken.role.toLowerCase() === 'admin') {
            navigate("/admin-dashboard"); // Redirect to the admin dashboard
        } else {
            navigate("/#home"); // Redirect to the home page
        }
    } catch (error) {
        alert(error.response.data.error);
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
            <div className="form-field">
              <p>
                <a href="#ForgotPassword" onClick={() => navigate("/ForgotPassword")}>
                  Forgot Password?
                </a>
              </p>
            </div>
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
