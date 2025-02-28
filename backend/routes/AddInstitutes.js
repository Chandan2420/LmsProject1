const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const Institute = require('../models/InstituteModel');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Function to generate unique institute code
const generateInstituteCode = async (instituteName) => {
  const initials = instituteName.replace(/\s+/g, '').substring(0, 3).toUpperCase(); // First 3 letters (without spaces)
  let unique = false;
  let instituteCode = '';

  while (!unique) {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    instituteCode = `${initials}${randomNum}`;

    // Check if the code already exists
    const existingInstitute = await Institute.findOne({ instituteCode });
    if (!existingInstitute) {
      unique = true;
    }
  }
  
  return instituteCode;
};

router.post('/AddInstitutes', upload.single('logo'), async (req, res) => {
  try {
    const { instituteName, instituteType, phone, website, streetAddress, city, postalCode, username, email, password, confirmPassword } = req.body;

    // Check if the email already exists
    const existingInstitute = await Institute.findOne({ email });
    if (existingInstitute) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Generate a unique institute code
    const instituteCode = await generateInstituteCode(instituteName);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new institute
    const newInstitute = new Institute({
      instituteName,
      instituteCode,
      instituteType,
      phone,
      website,
      streetAddress,
      city,
      postalCode,
      username,
      email,
      password: hashedPassword,
      logo: req.file ? req.file.path : null // Check if file is uploaded
    });

    await newInstitute.save();

    res.status(201).json({ message: 'Institute created successfully', instituteCode });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error, please check the institute code or email.' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
