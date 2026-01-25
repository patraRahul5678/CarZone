const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  sendOTP,
  verifyOTP,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register with email
router.post('/register', [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

// Login with email
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 1 }).withMessage('Password is required')
], login);

// Send OTP
router.post('/send-otp', [
  body('phone').isMobilePhone().withMessage('Valid phone number is required')
], sendOTP);

// Verify OTP
router.post('/verify-otp', [
  body('phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('name').optional().trim()
], verifyOTP);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;