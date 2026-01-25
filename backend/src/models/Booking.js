const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  pickupDate: {
    type: Date,
    required: [true, 'Pickup date is required']
  },
  returnDate: {
    type: Date,
    required: [true, 'Return date is required']
  },
  pickupTime: {
    type: String,
    required: [true, 'Pickup time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
  },
  returnTime: {
    type: String,
    required: [true, 'Return time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required'],
    trim: true
  },
  returnLocation: {
    type: String,
    required: [true, 'Return location is required'],
    trim: true
  },
  totalDays: {
    type: Number,
    min: [0, 'Total days cannot be negative']
  },
  totalHours: {
    type: Number,
    min: [1, 'Minimum booking is 1 hour']
  },
  rentalType: {
    type: String,
    enum: ['hourly', '12hour', '24hour', 'daily'],
    required: true,
    default: 'hourly'
  },
  pricePerDay: {
    type: Number
  },
  pricePerHour: {
    type: Number
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  cancellationReason: {
    type: String,
    maxlength: [200, 'Cancellation reason cannot exceed 200 characters']
  }
}, {
  timestamps: true
});

// Validate dates and calculate pricing
bookingSchema.pre('save', function(next) {
  if (this.returnDate <= this.pickupDate) {
    return next(new Error('Return date must be after pickup date'));
  }
  
  // Calculate total hours
  const timeDiff = this.returnDate.getTime() - this.pickupDate.getTime();
  this.totalHours = Math.ceil(timeDiff / (1000 * 3600));
  this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  // Calculate total amount based on rental type
  if (this.rentalType === 'hourly') {
    this.totalAmount = this.totalHours * this.pricePerHour;
  } else if (this.rentalType === '12hour') {
    this.totalAmount = Math.ceil(this.totalHours / 12) * this.car.price12Hour;
  } else if (this.rentalType === '24hour') {
    this.totalAmount = Math.ceil(this.totalHours / 24) * this.car.price24Hour;
  } else if (this.rentalType === 'daily') {
    this.totalAmount = this.totalDays * this.pricePerDay;
  }
  
  next();
});

// Index for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ car: 1, pickupDate: 1, returnDate: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);