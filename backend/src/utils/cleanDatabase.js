const mongoose = require('mongoose');
require('dotenv').config();

const cleanDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    for (const collection of collections) {
      await mongoose.connection.db.collection(collection.name).deleteMany({});
      console.log(`Cleared collection: ${collection.name}`);
    }

    console.log('Database cleaned successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  }
};

cleanDatabase();