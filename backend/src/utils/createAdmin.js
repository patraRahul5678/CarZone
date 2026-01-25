const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@carzone.com' });
    
    if (admin) {
      console.log('Admin user already exists');
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
    } else {
      // Create admin user
      admin = new User({
        name: 'CarZone Admin',
        email: 'admin@carzone.com',
        password: 'admin123', // This will be hashed automatically
        phone: '+919999999999',
        authMethod: 'email',
        role: 'admin'
      });
      
      await admin.save();
      console.log('Admin user created successfully');
      console.log('Email: admin@carzone.com');
      console.log('Password: admin123');
    }

    // Also create a test user
    let testUser = await User.findOne({ email: 'user@test.com' });
    
    if (!testUser) {
      testUser = new User({
        name: 'Test User',
        email: 'user@test.com',
        password: 'user123',
        phone: '+918888888888',
        authMethod: 'email',
        role: 'user'
      });
      
      await testUser.save();
      console.log('Test user created successfully');
      console.log('Email: user@test.com');
      console.log('Password: user123');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();