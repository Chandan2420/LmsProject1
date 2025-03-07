const express = require("express");
const router = express.Router();
const User = require("../models/userModel");


// Get Instructor Profile by ID
router.get('/InstructorProfile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const instructor = await User.findById(id);
        if (!instructor || instructor.role !== 'instructor') {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.json(instructor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router; 
