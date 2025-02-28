const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const Institute = require('../models/InstituteModel');
const { sendEmail } = require('../utils/email');

exports.SignUpPage = async (req, res) => {
    try {
        const { name, mobile, email, password, role } = req.body;

        // Validate role (ensure it's either 'student' or 'instructor')
        if (!["student", "instructor","admin"].includes(role)) {
            return res.status(400).json({ error: "Invalid role selection" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with the provided role
        const user = new User({ name, mobile, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: `${role} registered successfully` });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            res.status(400).json({ error: `${field} already exists` });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
};

exports.LoginPage = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Try finding the user first
        let user = await User.findOne({ email });

        if (!user) {
            // If no user, try finding an institute
            user = await Institute.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // If it's an institute, compare password and return institute-specific token
            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

             // Use `_id` as the unique identifier for the institute
            const instituteId = user._id.toString(); 

            const token = jwt.sign({ id: user._id, role: 'instituteadmin',instituteId }, 'your_jwt_secret', { expiresIn: '1h' });
            return res.json({ message: 'Institute login successful', token, role: 'instituteadmin', instituteId });
        }

        // If user is found, compare password and return user-specific token
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'User login successful', token, role: user.role });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


exports.ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Try finding the email in the User model first
        let user = await User.findOne({ email });

        if (!user) {
            // If not found, check in the Institute model
            user = await Institute.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: 'User/Institute not found' });
            }
        }

        const otp = crypto.randomInt(1000, 9999).toString(); // 4-digit OTP
        const resetTokenExpiry = Date.now() + 3 * 60 * 1000; // OTP expires in 3 minutes

        user.resetToken = otp;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send OTP email
        await sendEmail({
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. It is valid for 3 minutes.`,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Reset Password
exports.ResetPassword = async (req, res) => {
    try {
        const { otp, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Check if the OTP exists in either User or Institute model
        let user = await User.findOne({ resetToken: otp, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            user = await Institute.findOne({ resetToken: otp, resetTokenExpiry: { $gt: Date.now() } });

            if (!user) {
                return res.status(400).json({ error: 'Invalid or expired OTP' });
            }
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};




