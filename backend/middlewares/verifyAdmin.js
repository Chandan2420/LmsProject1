// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure this is your User model
const SECRET_KEY = 'your_jwt_secret'; // You can keep the secret key hardcoded here if you don't need environment variables

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get the token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify the token using the secret key
    req.user = decoded; // Attach the decoded token to the request
    next(); // Call next middleware or route handler
  } catch (error) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to check if the user has the 'admin' role
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access forbidden, admin role required' });
  }
  next(); // Call next middleware or route handler
};

module.exports = { verifyToken, isAdmin };
