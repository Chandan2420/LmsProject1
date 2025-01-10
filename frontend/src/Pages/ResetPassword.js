import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css"; 

const ResetPassword = ({ email: initialEmail }) => {
    const [email, setEmail] = useState(initialEmail || '');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/ResetPassword', { email, otp, newPassword });
            alert(response.data.message); // Success message
            navigate("/login");
        } catch (err) {
          alert(err.response?.data?.error || 'Something went wrong'); // Error message
        }
    };

    return (
        <div className="reset-wholecontainer">
          <div className="reset-two-container">
            <div className="reset-container">
              <h2>Reset Password</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
          {!initialEmail && (
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
          )}
            <div>
                  <label htmlFor="password">OTP</label>
                  <input
                    type="password"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
            <div>
                  <label htmlFor="password">confirm Password</label>
                  <input
                    type="password"
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
      
                <div className="form-group">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
            <div className="reset-image"></div>
          </div>
        </div>
      );
};

export default ResetPassword;
