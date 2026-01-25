const express = require('express');
const { body } = require('express-validator');
const { createBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', protect, [
  body('carId').notEmpty().withMessage('Car ID is required'),
  body('pickupDate').isISO8601().withMessage('Valid pickup date is required'),
  body('returnDate').isISO8601().withMessage('Valid return date is required'),
  body('pickupTime').notEmpty().withMessage('Pickup time is required'),
  body('returnTime').notEmpty().withMessage('Return time is required'),
  body('pickupLocation').trim().isLength({ min: 1 }).withMessage('Pickup location is required'),
  body('returnLocation').trim().isLength({ min: 1 }).withMessage('Return location is required'),
  body('totalAmount').isNumeric().withMessage('Valid total amount is required')
], createBooking);

module.exports = router;