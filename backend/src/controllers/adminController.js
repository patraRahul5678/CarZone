const Car = require('../models/Car');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendBookingConfirmation } = require('../utils/emailService');

// Get admin dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    // Get real counts from database
    const totalCars = await Car.countDocuments();
    const pendingCars = await Car.countDocuments({ status: 'pending' });
    const approvedCars = await Car.countDocuments({ status: 'approved' });
    const activeCars = await Car.countDocuments({ availability: true });
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const totalUsers = await User.countDocuments();
    
    // Calculate total earnings from confirmed bookings
    const earningsResult = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalEarnings = earningsResult.length > 0 ? earningsResult[0].total : 0;

    // Get recent bookings count (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentBookings = await Booking.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    console.log('Dashboard Stats:', {
      totalCars,
      pendingCars,
      approvedCars,
      activeCars,
      totalBookings,
      confirmedBookings,
      totalUsers,
      totalEarnings,
      recentBookings
    });

    res.json({
      success: true,
      data: {
        totalCars,
        pendingCars,
        approvedCars,
        activeCars,
        totalBookings,
        confirmedBookings,
        totalUsers,
        totalEarnings,
        recentBookings
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get pending car listings
exports.getPendingCars = async (req, res) => {
  try {
    const cars = await Car.find({ status: 'pending' })
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Approve car listing
exports.approveCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', availability: true },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      message: 'Car approved successfully',
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Decline car listing
exports.declineCar = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { status: 'declined', declineReason: reason },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      message: 'Car declined successfully',
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('car', 'name brand model')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Confirm booking
exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    ).populate('user', 'name email').populate('car', 'name brand model');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Send confirmation email
    await sendBookingConfirmation(booking.user.email, {
      userName: booking.user.name,
      carName: `${booking.car.brand} ${booking.car.model}`,
      pickupDate: booking.pickupDate,
      returnDate: booking.returnDate,
      totalAmount: booking.totalAmount,
      status: 'confirmed'
    });

    res.json({
      success: true,
      message: 'Booking confirmed successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', cancellationReason: reason },
      { new: true }
    ).populate('user', 'name email').populate('car', 'name brand model');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Send cancellation email
    await sendBookingConfirmation(booking.user.email, {
      userName: booking.user.name,
      carName: `${booking.car.brand} ${booking.car.model}`,
      pickupDate: booking.pickupDate,
      returnDate: booking.returnDate,
      totalAmount: booking.totalAmount,
      status: 'cancelled'
    });

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all cars with full details
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find()
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// Create car as admin
exports.createAdminCar = async (req, res) => {
  try {
    const { name, brand, model, year, category, pricePerHour, price12Hour, price24Hour, pricePerDay, features, city, address } = req.body;
    const { seats, transmission, fuelType, mileage } = req.body;

    const car = new Car({
      name,
      brand,
      model,
      year,
      category,
      pricePerHour,
      price12Hour,
      price24Hour,
      pricePerDay,
      features: features ? features.split(',').map(f => f.trim()) : [],
      specifications: {
        seats: parseInt(seats),
        transmission,
        fuelType,
        mileage: mileage ? parseInt(mileage) : 0
      },
      location: {
        city,
        address
      },
      owner: req.user._id,
      status: 'approved',
      availability: true,
      images: req.files ? req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: name
      })) : []
    });

    await car.save();

    res.json({
      success: true,
      message: 'Car listed successfully',
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// Delete car as admin
exports.deleteAdminCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// Update car as admin
exports.updateAdminCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      message: 'Car updated successfully',
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
