const express = require('express');
const {
  getDashboardStats,
  getPendingCars,
  approveCar,
  declineCar,
  getAllBookings,
  confirmBooking,
  cancelBooking,
  getAllCars,
  deleteAdminCar,
  updateAdminCar
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Admin middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.'
    });
  }
  next();
};

// Admin dashboard stats
router.get('/stats', protect, adminOnly, getDashboardStats);

// Car management
router.get('/cars/pending', protect, adminOnly, getPendingCars);
router.get('/cars/all', protect, adminOnly, getAllCars);
router.put('/cars/:id', protect, adminOnly, updateAdminCar);
router.delete('/cars/:id', protect, adminOnly, deleteAdminCar);
router.patch('/cars/:id/approve', protect, adminOnly, approveCar);
router.patch('/cars/:id/decline', protect, adminOnly, declineCar);

// Booking management
router.get('/bookings', protect, adminOnly, getAllBookings);
router.patch('/bookings/:id/confirm', protect, adminOnly, confirmBooking);
router.patch('/bookings/:id/cancel', protect, adminOnly, cancelBooking);

module.exports = router;