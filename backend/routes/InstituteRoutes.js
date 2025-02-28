const express = require('express');
const User = require('../models/userModel'); // Import the User model
const Institute = require('../models/InstituteModel'); // Import the Institute model
const router = express.Router();


// Add Student
router.post('/Institutestudents', async (req, res) => {
    try {
        const { name, email, mobile, password, instituteCode } = req.body;

        const institute = await Institute.findOne({ instituteCode });
        if (!institute) {
            return res.status(404).json({ message: 'Institute not found' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }



        const newStudent = new User({ name, email, mobile, password, role: 'student', instituteCode });
        await newStudent.save();

        res.status(201).json({ message: 'Student added successfully', user: newStudent });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: 'Error adding student', error: error.message });
    }
});

// Add Instructor
router.post('/Instituteinstructors', async (req, res) => {
    try {
        const { name, email, mobile, password, instituteCode } = req.body;

        // Check if the provided instituteCode exists in the database
        const institute = await Institute.findOne({ instituteCode });
        if (!institute) {
            return res.status(404).json({ message: 'Institute not found' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

    

        // Create a new instructor with the associated instituteCode
        const newInstructor = new User({ name, email, mobile, password, role: 'instructor', instituteCode });
        await newInstructor.save();

        res.status(201).json({ message: 'Instructor added successfully', user: newInstructor });
    } catch (error) {
        console.error("Error adding instructor:", error);
        res.status(500).json({ message: 'Error adding instructor', error: error.message });
    }
});


module.exports = router;


// Fetch students based on instituteCode
router.get('/fetchinstitutestudents', async (req, res) => {
    try {
      const { instituteCode } = req.query;
  
      if (!instituteCode) {
        return res.status(400).json({ message: 'Institute code is required' });
      }
  
      const students = await User.find({ instituteCode, role: 'student' }).select('-password'); // Exclude password
  
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });


  // Fetch instructors based on instituteCode
router.get('/fetchinstituteinstructors', async (req, res) => {
    try {
      const { instituteCode } = req.query;
  
      if (!instituteCode) {
        return res.status(400).json({ message: 'Institute code is required' });
      }
  
      const instructors = await User.find({ instituteCode, role: 'instructor' }).select('-password'); // Exclude password
  
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });



// Update student details
router.put("/institutestudents/:id", async (req, res) => {
    try {
      const { name, email, mobile } = req.body;
      const updatedStudent = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, mobile },
        { new: true }
      );
  
      if (updatedStudent) res.status(200).json(updatedStudent);
      else res.status(404).json({ message: "Student not found" });
    } catch (error) {
      res.status(500).json({ message: "Error updating student", error });
    }
  });
  
  // Delete a student
  router.delete("/institutestudents/:id", async (req, res) => {
    try {
      const deletedStudent = await User.findByIdAndDelete(req.params.id);
      if (deletedStudent) res.status(200).json({ message: "Student deleted successfully" });
      else res.status(404).json({ message: "Student not found" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting student", error });
    }
  });

  // Update instructor details
router.put("/instituteinstructors/:id", async (req, res) => {
    try {
      const { name, email, mobile } = req.body;
      const updatedInstructor = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, mobile },
        { new: true }
      );
  
      if (updatedInstructor) res.status(200).json(updatedInstructor);
      else res.status(404).json({ message: "Instructor not found" });
    } catch (error) {
      res.status(500).json({ message: "Error updating instructor", error });
    }
  });
  
  // Delete an instructor
  router.delete("/instituteinstructors/:id", async (req, res) => {
    try {
      const deletedInstructor = await User.findByIdAndDelete(req.params.id);
      if (deletedInstructor) res.status(200).json({ message: "Instructor deleted successfully" });
      else res.status(404).json({ message: "Instructor not found" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting instructor", error });
    }
  });