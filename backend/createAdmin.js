const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing admin if exists
    await User.deleteOne({ email: 'admin@carzone.com' });
    
    // Create new admin user
    const adminUser = new User({
      name: 'CarZone Admin',
      email: 'admin@carzone.com',
      password: 'admin123',
      phone: '+919999999999',
      authMethod: 'email',
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');

    console.log('Admin credentials:');
    console.log('Email: admin@carzone.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();