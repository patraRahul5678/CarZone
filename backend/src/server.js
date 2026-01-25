const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
require('dotenv').config();
const path = require('path');

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

// Connect to database
connectDB();

// CORS - Allow same origin since frontend and backend are served from same URL
app.use(cors({
  origin: true, // Allow same origin
  credentials: true,
}));

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', uploadRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Handle React routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚗 CarZone server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
