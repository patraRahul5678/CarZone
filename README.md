<h1 align="center">
  🚗 <strong>CarZone Rentals</strong>
</h1>

<p align="center">
  <b>An Uber-inspired full-stack car rental marketplace built with modern web technologies.</b>
</p>

<p align="center">
  Rent cars, list your own vehicles, and experience a seamless booking journey powered by role-based access control and a modern, responsive user experience.
</p>

---

## 🌐 Live Demo

👉 **[View Live Website](https://your-deployed-url.com)**

> Replace the above URL with your deployed application link.

---

## 📖 About the Project

CarZone Rentals is a modern car rental marketplace inspired by Uber's clean and intuitive user experience.

The platform enables users to browse and rent vehicles, while also allowing any registered user to earn by listing their own cars. To maintain quality and trust, every submitted vehicle undergoes an admin approval process before becoming publicly available.

The project demonstrates production-grade concepts such as authentication, role-based access control, booking systems, approval workflows, dashboard analytics, theme switching, and payment processing.

---

## ✨ Key Features

### 🚘 Vehicle Rentals

* Browse available rental vehicles
* Search by pickup and return locations
* Select rental dates and times
* Filter vehicles by category and pricing
* View detailed vehicle information
* Book vehicles instantly
* View booking summaries
* Cancel upcoming reservations
* Access booking history

---

### 🚙 List Your Vehicle

Any registered user can list their vehicle on the platform.

Users can:

* Submit vehicles for approval
* Upload vehicle images
* Add specifications and descriptions
* Set rental pricing
* Edit pending listings
* Track listing status
* Resubmit rejected listings

---

## 🔐 Vehicle Approval Workflow

To maintain quality and authenticity, all vehicle listings are reviewed by administrators.

```text
User Registers/Login
        ↓
Lists a Vehicle
        ↓
Status: Pending Approval
        ↓
Admin Reviews Listing
      ↙            ↘
Approved         Rejected
    ↓                ↓
Visible to      User Receives
Customers        Feedback
```

> Vehicles become publicly visible only after administrator approval.

---

## 🛡️ Admin Dashboard

CarZone Rentals includes a dedicated Admin Dashboard for complete platform management.

### Vehicle Management

Admins can:

* View all submitted vehicles
* Approve vehicle listings
* Reject vehicle listings
* Suspend listings
* Remove fraudulent vehicles
* View detailed vehicle information

---

### 👥 User Management

Admins can:

* View all registered users
* Monitor user activities
* Suspend accounts
* Reactivate accounts
* Remove malicious users

---

### 📅 Booking Management

Admins can:

* View all bookings
* Monitor active rentals
* Track completed bookings
* Cancel suspicious reservations
* Resolve booking disputes

---

### 💳 Payment Monitoring

Admins can:

* View transaction records
* Monitor payment statuses
* Track revenue statistics
* Export reports

---

### 📈 Dashboard Analytics

Admins can monitor:

* Total Users
* Total Vehicles Listed
* Pending Approvals
* Approved Listings
* Active Rentals
* Completed Bookings
* Revenue Overview
* Platform Growth Metrics

---

## 🔐 Unified Authentication System

CarZone Rentals uses a single authentication system for everyone.

Users sign in through the same login page and are automatically redirected based on their role.

### Authentication Flow

```text
Login/Register
      ↓
Verify Credentials
      ↓
Check User Role
      ↓
Redirect to Appropriate Dashboard
```

### Role-Based Access

| Role          | Access                     |
| ------------- | -------------------------- |
| User          | Browse and rent vehicles   |
| Vehicle Owner | Manage submitted listings  |
| Admin         | Manage the entire platform |

> Users automatically gain vehicle management capabilities once they submit a listing.

---

## 💳 Mock Payment Integration

The platform includes a simulated payment system to provide a realistic checkout experience.

### Supported Payment Methods

* Credit Cards
* Debit Cards
* UPI
* Wallet Payments

### Test Payment Credentials

```text
Card Number: 4242 4242 4242 4242
Expiry Date: 12/30
CVV: 123
OTP: 123456
```

> No real payments are processed. Transactions are simulated for demonstration and portfolio purposes.

---

## 🌗 Theme Support

* Dark Theme
* Light Theme
* Persistent Theme Preferences
* Smooth Theme Switching

---

## 📱 User Experience Features

* Fully Responsive Design
* Mobile-First Approach
* Uber-inspired User Interface
* Smooth Animations
* Toast Notifications
* Skeleton Loaders
* Robust Error Handling
* Fast Performance

---

## 🛠️ Tech Stack

### Frontend

| Technology      | Purpose                  |
| --------------- | ------------------------ |
| React           | User Interface           |
| Vite            | Development & Build Tool |
| Tailwind CSS    | Styling                  |
| React Router    | Routing                  |
| TanStack Query  | Server State Management  |
| Framer Motion   | Animations               |
| React Hook Form | Form Handling            |

---

### Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime Environment |
| Express.js | Backend Framework   |
| MongoDB    | Database            |
| Mongoose   | ODM                 |
| JWT        | Authentication      |
| bcrypt     | Password Security   |

---

### Additional Services

| Service              | Purpose                |
| -------------------- | ---------------------- |
| Mock Payment Gateway | Simulated Transactions |
| Render / Vercel      | Deployment             |

---

## 📂 Project Structure

```text
carzone-rentals/
│
├── backend/src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
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

* Stripe/Razorpay Integration
* Google Maps Integration
* Driver Booking Services
* Reviews and Ratings
* Coupons and Discounts
* Email Notifications
* Push Notifications
* AI-Based Vehicle Recommendations
* Advanced Revenue Reports
* Vehicle Verification Documents
* Fraud Detection System

---

## 🎓 Learning Outcomes

This project helped strengthen my understanding of:

* Building scalable MERN applications
* JWT Authentication
* Role-Based Access Control (RBAC)
* Admin Dashboard Development
* Approval Workflows
* Marketplace Architectures
* Booking Management Systems
* Payment Flows
* State Management
* Responsive UI Development
* Production-Ready Application Design

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
