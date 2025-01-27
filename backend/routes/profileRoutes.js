const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

// Profile endpoint
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
