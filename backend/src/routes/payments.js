const express = require('express');
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-intent', protect, createPaymentIntent);

// Confirm payment
router.post('/confirm', protect, confirmPayment);

module.exports = router;