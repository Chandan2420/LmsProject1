import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./ForgottenPassword.css";

const ForgotPassword = ({ onOtpSent }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/ForgotPassword', { email });
            alert(response.data.message); // Success message
            navigate("/ResetPassword");
        } catch (err) {
            alert(err.response?.data?.error || 'Something went wrong'); // Error message
        }
    };

    return (
        <div className="forgot-wholecontainer">
          <div className="forgot-two-container">
            <div className="forgot-container">
              <h2>Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="form-group">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
            <div className="forgot-image"></div>
          </div>
        </div>
      );
};

export default ForgotPassword;
