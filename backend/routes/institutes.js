const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const Institute = require('../models/InstituteModel');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Register Institute
router.post('/institutes', upload.single('logo'), async (req, res) => {
  const {
    instituteName, instituteCode, instituteType, affiliation, email, phone,
    website, streetAddress, city, postalCode,
    contactPersonName, contactPersonRole, contactEmail, contactPhone,
    username, password, numberOfStudents, numberOfInstructors, termsAccepted
  } = req.body;

  try {
    // Check if institute code or email exists
    const existingInstitute = await Institute.findOne({ $or: [{ instituteCode }, { email }] });
    if (existingInstitute) return res.status(400).json({ message: 'Institute with this code or email already exists.' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new institute
    const newInstitute = new Institute({
      instituteName,
      instituteCode,
      instituteType,
      affiliation,
      email,
      phone,
      website,
      address: { streetAddress, city, postalCode },
      contactPerson: { name: contactPersonName, role: contactPersonRole, email: contactEmail, phone: contactPhone },
      account: { username, password: hashedPassword },
      additionalInfo: {
        numberOfStudents,
        numberOfInstructors,
        logo: req.file ? req.file.filename : null
      },
      termsAccepted
    });

    await newInstitute.save();
    res.status(201).json({ message: 'Institute registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
