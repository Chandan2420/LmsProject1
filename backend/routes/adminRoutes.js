// src/routes/adminRoutes.js
const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/verifyAdmin');
const User = require('../models/userModel');

const router = express.Router();

// Admin Dashboard Route (Protected)
router.get('/admin-dashboard', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});


router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/instructors', async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' });
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
