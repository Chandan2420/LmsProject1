import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css"; 

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/ResetPassword', { otp, newPassword, confirmPassword });
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
                        <div>
                            <label htmlFor="otp">OTP</label>
                            <input
                                type="number"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
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
