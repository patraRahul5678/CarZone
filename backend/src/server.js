const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
require('dotenv').config();
const app = express();
const fileURLToPath = require('url');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../../frontend/dist')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
//   });
// }

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// app.use(cors({
//   origin: function(origin, callback) {
//     const allowedOrigins = [
//       'http://localhost:3000',
//       'http://localhost:5173',
//       'http://localhost:5174',
//       'http://127.0.0.1:3000',
//       'http://127.0.0.1:5173',
//       'http://127.0.0.1:5174'
//     ];
//     if (process.env.NODE_ENV === 'production') {
//       allowedOrigins.push('https://your-frontend-domain.com');
//     }
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
const path = require('path');
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚗 CarZone server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
