const express = require('express');
const { InstructorProfile } = require('../controllers/instructorController');
const multerConfig = require('../middlewares/multerConfig');

const router = express.Router();

// Route for creating instructor profiles
router.post('/InstructorProfile', multerConfig.single('profilePicture'), InstructorProfile);

module.exports = router;
