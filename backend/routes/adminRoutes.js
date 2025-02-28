// src/routes/adminRoutes.js
const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/verifyAdmin');
const User = require('../models/userModel');
const Institute = require('../models/InstituteModel');

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

router.get('/institutes', async (req, res) => {
  try {
    const institutes = await Institute.find({ role: 'instituteadmin' });
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

router.delete('/students/:id', async (req, res) => {
  try {
    const student = await User.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/students/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.mobile) updates.mobile = req.body.mobile;

    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete('/instructors/:id', async (req, res) => {
  try {
    const instructor = await User.findByIdAndDelete(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json({ message: "Instructor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/instructors/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.mobile) updates.mobile = req.body.mobile;

    const updatedInstructor = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updatedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json(updatedInstructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete an institute
router.delete('/institutes/:id', async (req, res) => {
  try {
    const institute = await Institute.findByIdAndDelete(req.params.id);
    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    res.json({ message: 'Institute deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an institute
router.put('/institutes/:id', async (req, res) => {
  try {
    const updatedInstitute = await Institute.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedInstitute) {
      return res.status(404).json({ message: 'Institute not found' });
    }
    res.json(updatedInstitute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});