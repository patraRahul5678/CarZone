const express = require('express');
const { body } = require('express-validator');
const {
  createCar,
  getCars,
  getCarById,
  getUserCars,
  updateCar,
  deleteCar
} = require('../controllers/carController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Validation rules for car creation
const carValidation = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Car name is required and must be less than 100 characters'),
  body('brand').trim().isLength({ min: 1 }).withMessage('Brand is required'),
  body('model').trim().isLength({ min: 1 }).withMessage('Model is required'),
  body('year').isInt({ min: 2000, max: new Date().getFullYear() + 1 }).withMessage('Invalid year'),
  body('category').isIn(['Economy', 'Compact', 'Premium', 'Luxury', 'SUV', 'Electric']).withMessage('Invalid category'),
  body('pricePerHour').isFloat({ min: 1 }).withMessage('Price per hour must be greater than 0'),
  body('price12Hour').isFloat({ min: 1 }).withMessage('12 hour price must be greater than 0'),
  body('price24Hour').isFloat({ min: 1 }).withMessage('24 hour price must be greater than 0'),
  body('pricePerDay').isFloat({ min: 1 }).withMessage('Daily price must be greater than 0'),
  body('specifications.seats').isInt({ min: 2, max: 8 }).withMessage('Seats must be between 2 and 8'),
  body('specifications.transmission').isIn(['Manual', 'Automatic']).withMessage('Invalid transmission type'),
  body('specifications.fuelType').isIn(['Petrol', 'Diesel', 'Electric', 'Hybrid']).withMessage('Invalid fuel type'),
  body('location.city').trim().isLength({ min: 1 }).withMessage('City is required'),
  body('location.address').trim().isLength({ min: 1 }).withMessage('Address is required')
];

// Get all cars (public)
router.get('/', getCars);

// Get car by ID (public)
router.get('/:id', getCarById);

// Create car with image upload (protected)
router.post('/', protect, upload.array('images', 5), createCar);

// Get user's cars (protected)
router.get('/user/my-cars', protect, getUserCars);

// Update car (protected)
router.put('/:id', protect, upload.array('images', 5), updateCar);

// Delete car (protected)
router.delete('/:id', protect, deleteCar);

module.exports = router;