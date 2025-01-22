const express = require('express');
const {
    SignUpPage,
    LoginPage,
    ForgotPassword,
    ResetPassword
} = require('../controllers/authController');
const router = express.Router();

// Registration route
router.post('/SignUpPage', SignUpPage);

// Login route
router.post('/LoginPage', LoginPage);

// Forgot password route (generate OTP)
router.post('/ForgotPassword', ForgotPassword);

// Reset password route
router.post('/ResetPassword', ResetPassword);

module.exports = router;
