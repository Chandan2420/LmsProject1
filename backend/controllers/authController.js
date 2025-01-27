const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const { sendEmail } = require('../utils/email');

exports.SignUpPage = async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new User({ name, mobile, email, password: hashedPassword, role: 'student' });
        await student.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            res.status(400).json({ error: `${field} already exists` });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

exports.LoginPage = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


exports.ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const otp = crypto.randomInt(1000, 9999); // Random 4-digit OTP
        const resetTokenExpiry = Date.now() + 3 * 60 * 1000; // 3 minutes expiry

        user.resetToken = otp.toString();
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


exports.ResetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email, resetToken: otp, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) return res.status(400).json({ error: 'Invalid or expired OTP' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



