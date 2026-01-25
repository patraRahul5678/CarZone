const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const smsService = require('../utils/smsService');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

// Register with email
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone: '',
      authMethod: 'email'
    });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Login with email
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    console.log('Login attempt for email:', email);

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('User found:', user.email, 'Role:', user.role);

    // Check if user has a password (for email auth)
    if (!user.password) {
      console.log('User has no password set');
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials - no password set'
      });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Send OTP to phone
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with expiry (5 minutes)
    otpStore.set(phone, {
      otp,
      expires: Date.now() + 5 * 60 * 1000
    });

    // Send OTP via SMS using Twilio
    const smsResult = await smsService.sendOTP(phone, otp);
    
    if (!smsResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP',
        error: smsResult.error
      });
    }

    res.json({
      success: true,
      message: 'OTP sent successfully',
      // In development, return OTP for testing
      ...(process.env.NODE_ENV === 'development' && { otp })
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
};

// Verify OTP and login
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp, name } = req.body;

    const storedOTP = otpStore.get(phone);
    
    if (!storedOTP) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or expired'
      });
    }

    if (storedOTP.expires < Date.now()) {
      otpStore.delete(phone);
      return res.status(400).json({
        success: false,
        message: 'OTP expired'
      });
    }

    if (storedOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // OTP verified, remove from store
    otpStore.delete(phone);

    // Find or create user
    let user = await User.findOne({ phone });
    
    if (!user) {
      user = new User({
        name: name || `User ${phone.slice(-4)}`,
        email: '',
        phone,
        authMethod: 'phone'
      });
      await user.save();
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};