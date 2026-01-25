const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true,
    maxlength: [100, 'Car name cannot exceed 100 characters']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [2000, 'Year must be 2000 or later'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Economy', 'Compact', 'Premium', 'Luxury', 'SUV', 'Electric'],
    default: 'Economy'
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required'],
    min: [0, 'Price cannot be negative']
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
    min: [0, 'Price cannot be negative']
  },
  price12Hour: {
    type: Number,
    required: [true, 'Price for 12 hours is required'],
    min: [0, 'Price cannot be negative']
  },
  price24Hour: {
    type: Number,
    required: [true, 'Price for 24 hours is required'],
    min: [0, 'Price cannot be negative']
  },
  features: [{
    type: String,
    trim: true
  }],
  specifications: {
    seats: {
      type: Number,
      required: true,
      min: [2, 'Minimum 2 seats required'],
      max: [8, 'Maximum 8 seats allowed']
    },
    transmission: {
      type: String,
      enum: ['Manual', 'Automatic'],
      required: true
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      required: true
    },
    mileage: {
      type: Number,
      min: [0, 'Mileage cannot be negative']
    },
    color:{
      type: String,
      default: 'White'
    }
  },
  images: [{
    url: String,
    alt: String
  }],
  location: {
    city: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  availability: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  },
  declineReason: {
    type: String
  }
}, {
  timestamps: true
});

// Index for search optimization
carSchema.index({ name: 'text', brand: 'text', model: 'text' });
carSchema.index({ category: 1, pricePerDay: 1 });
carSchema.index({ 'location.city': 1 });

module.exports = mongoose.model('Car', carSchema);