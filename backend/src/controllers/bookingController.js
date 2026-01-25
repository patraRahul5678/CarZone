const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { sendBookingConfirmation } = require('../utils/emailService');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      carId,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      returnLocation,
      rentalType,
      totalAmount,
      notes
    } = req.body;

    // Check if car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    if (!car.availability) {
      return res.status(400).json({
        success: false,
        message: 'Car is not available'
      });
    }

    // Get user details
    const user = await User.findById(req.user.id);

    // Create booking
    const booking = new Booking({
      car: carId,
      user: req.user.id,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      returnLocation,
      rentalType,
      totalAmount,
      notes: notes || '',
      status: 'confirmed'
    });

    await booking.save();

    // Populate booking with car and user details for email
    await booking.populate('car', 'name brand model');

    // Send confirmation email
    const emailResult = await sendBookingConfirmation(user.email, {
      customerName: user.name,
      bookingId: booking._id,
      carName: `${booking.car.brand} ${booking.car.model} ${booking.car.name}`,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      returnLocation,
      rentalType,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};