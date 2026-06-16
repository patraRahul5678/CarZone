# 🚗 CarZone Rentals

<p align="center">
  <b>Modern Car Rental Platform inspired by Uber's clean and intuitive design.</b><br/>
  Rent vehicles seamlessly, list your own cars, and enjoy a premium booking experience with support for both Dark and Light themes.
</p>

---

## 🌐 Live Demo

👉 **[View Live Website](https://carzone-ype5.onrender.com)**

> Replace the above URL with your deployed application URL.

---

## 📖 About the Project

CarZone Rentals is a full-stack car rental platform designed to simplify the vehicle booking experience. Inspired by Uber's modern user experience, the platform enables users to browse available cars, book rentals, complete secure mock payments, and manage their reservations through an intuitive interface.

The application emphasizes usability, responsiveness, and scalability while providing a production-like booking workflow.

---

## ✨ Features

### 🚘 Vehicle Rentals

* Browse available rental vehicles
* Filter by category and pricing
* View detailed vehicle information
* Real-time availability status
* Book cars for specific dates and times

### 💳 Mock Payment Integration

* Simulated checkout experience
* Booking summary before payment
* Success and failure payment states
* Order confirmation page
* Transaction history (mock)

### 🌗 Theme Support

* Dark Theme
* Light Theme
* Persistent theme preference
* Smooth theme transitions

### 👥 User Features

* User Registration & Login
* JWT Authentication
* Protected Routes
* Profile Management
* Booking History
* Cancel Upcoming Reservations

### 🚙 Car Listing

* List your own vehicle
* Upload car images
* Set rental pricing
* Define vehicle specifications
* Manage listed vehicles

### 🔍 Smart Search

* Pickup & Return Locations
* Pickup Date & Time
* Vehicle Categories
* Pricing Filters
* Instant Availability Search

### 📱 User Experience

* Fully Responsive Design
* Mobile-First Approach
* Modern Uber-inspired UI
* Smooth Animations
* Toast Notifications
* Loading Skeletons
* Error Handling

---

## 🛠️ Tech Stack

### Frontend

| Technology      | Purpose                  |
| --------------- | ------------------------ |
| React           | User Interface           |
| Vite            | Development & Build Tool |
| Tailwind CSS    | Styling                  |
| React Router    | Routing                  |
| Framer Motion   | Animations               |
| React Hook Form | Form Handling            |

### Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime Environment |
| Express.js | Backend Framework   |
| MongoDB    | Database            |
| Mongoose   | ODM                 |
| JWT        | Authentication      |
| bcrypt     | Password Hashing    |

### Additional Services

| Service              | Purpose                |
| -------------------- | ---------------------- |
| Mock Payment Gateway | Simulated Transactions |
| Render / Vercel      | Deployment             |

---

## 🎯 Core Functionalities

### Customer Flow

1. Register/Login
2. Search for available cars
3. Select rental dates
4. View booking summary
5. Complete mock payment
6. Receive booking confirmation
7. Manage reservations

### Host Flow

1. Create an account
2. List a vehicle
3. Upload images
4. Set pricing
5. Track bookings
6. Manage availability

---

## 💳 Mock Payment Flow

This project includes a simulated payment gateway for demonstration purposes.

### Supported Mock Methods

* Credit Card
* Debit Card
* UPI
* Wallet Payments

### Test Payment Details

```text
Card Number: 4242 4242 4242 4242
Expiry Date: 12/30
CVV: 123
OTP: 123456
```

> No real transactions are processed. Payments are simulated for educational and portfolio purposes.

---

## 📂 Project Structure

```text
carzone-rentals/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── layouts/
│   │   └── App.jsx
│   │
│   ├── public/
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/carzone-rentals.git
cd carzone-rentals
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Future Enhancements

* Real Payment Gateway Integration (Stripe/Razorpay)
* Email Notifications
* Driver Booking Option
* Admin Dashboard
* Vehicle Reviews & Ratings
* Google Maps Integration
* Wishlist Functionality
* Coupons & Discounts
* Push Notifications
* AI-based Vehicle Recommendations

---

## 🎓 Learning Outcomes

This project helped strengthen my understanding of:

* Building scalable MERN applications
* Implementing authentication and protected routes
* Designing complete booking workflows
* Managing complex application state
* Simulating production-grade payment experiences
* Creating theme systems using React and Tailwind CSS
* Building responsive and accessible user interfaces

---

## 👨‍💻 Developer

**Rahul Patra**

* GitHub: https://github.com/patraRahul5678


---

## 📄 License

This project is shared for educational and portfolio purposes.

Feel free to explore the implementation and learn from it.

---

⭐ If you found this project interesting, consider giving the repository a star!
