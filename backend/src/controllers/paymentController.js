const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in paise for INR
      currency: currency,
      payment_method_types: ['card'],
      metadata: {
        bookingId: 'temp_booking_id'
      }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: error.message,
    });
  }
};

// Confirm payment
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, bookingId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      await Booking.findByIdAndUpdate(bookingId, {
        paymentStatus: 'completed',
        paymentId: paymentIntentId,
      });

      res.json({
        success: true,
        message: 'Payment confirmed successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not completed',
      });
    }
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment confirmation failed',
      error: error.message,
    });
  }
};