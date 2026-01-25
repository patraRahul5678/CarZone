# CarZone Backend API

A professional car rental backend API built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Authentication & Authorization** - JWT-based auth with role-based access
- **Car Management** - CRUD operations for cars with search and filtering
- **Booking System** - Complete booking lifecycle management
- **User Management** - User profiles and admin controls
- **Security** - Helmet, CORS, rate limiting, input validation
- **Database** - MongoDB with Mongoose ODM

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── carController.js     # Car management
│   │   ├── bookingController.js # Booking operations
│   │   └── userController.js    # User management
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Car.js               # Car schema
│   │   └── Booking.js           # Booking schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── cars.js              # Car routes
│   │   ├── bookings.js          # Booking routes
│   │   └── users.js             # User routes
│   └── server.js                # Main server file
├── .env                         # Environment variables
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env` file and update values
   - Set your MongoDB URI
   - Set JWT secret key

3. **Start MongoDB:**
   - Make sure MongoDB is running locally or use MongoDB Atlas

4. **Run the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Cars
- `GET /api/cars` - Get all cars (with filtering)
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create car (auth required)
- `PUT /api/cars/:id` - Update car (auth required)
- `DELETE /api/cars/:id` - Delete car (auth required)
- `GET /api/cars/search/:query` - Search cars

### Bookings
- `POST /api/bookings` - Create booking (auth required)
- `GET /api/bookings/my-bookings` - Get user bookings (auth required)
- `GET /api/bookings/:id` - Get single booking (auth required)
- `PUT /api/bookings/:id/cancel` - Cancel booking (auth required)

### Admin Routes
- `GET /api/cars/admin/all` - Get all cars (admin only)
- `GET /api/bookings/admin/all` - Get all bookings (admin only)
- `PUT /api/bookings/admin/:id/status` - Update booking status (admin only)
- `GET /api/users/admin/all` - Get all users (admin only)
- `PUT /api/users/admin/:id/status` - Update user status (admin only)
- `DELETE /api/users/admin/:id` - Delete user (admin only)

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carzone
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
BCRYPT_SALT_ROUNDS=12
```

## 🚗 Car Categories

- Economy
- Compact  
- Premium
- Luxury
- SUV
- Electric

## 📋 Booking Status

- `pending` - Booking created, awaiting confirmation
- `confirmed` - Booking confirmed
- `active` - Booking is currently active
- `completed` - Booking completed successfully
- `cancelled` - Booking cancelled

## 🛡️ Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Validate all inputs
- **Password Hashing** - Bcrypt for password security
- **JWT Authentication** - Secure token-based auth

## 🚀 Getting Started

1. Install MongoDB locally or use MongoDB Atlas
2. Clone the repository
3. Install dependencies: `npm install`
4. Set up environment variables
5. Start the server: `npm run dev`
6. API will be available at `http://localhost:5000`

## 📊 Database Models

### User
- name, email, password, phone
- role (user/admin)
- isActive status

### Car
- name, brand, model, year
- category, pricePerDay
- specifications (seats, transmission, fuel type)
- location, availability
- owner reference

### Booking
- user and car references
- pickup/return dates and times
- locations, total amount
- status and payment status

## 🔧 Development

```bash
# Install nodemon for development
npm install -g nodemon

# Run in development mode
npm run dev
```

The server will restart automatically when you make changes to the code.