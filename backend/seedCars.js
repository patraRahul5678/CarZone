const mongoose = require('mongoose');
const Car = require('./src/models/Car');
const User = require('./src/models/User');
require('dotenv').config();

const sampleCars = [
  {
    name: "Toyota Camry 2023",
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    category: "Premium",
    pricePerHour: 800,
    price12Hour: 8000,
    price24Hour: 15000,
    pricePerDay: 12000,
    features: ["GPS Navigation", "Bluetooth", "Air Conditioning", "Power Steering"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: 15
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop",
        alt: "Toyota Camry Front View"
      },
      {
        url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=300&fit=crop",
        alt: "Toyota Camry Interior"
      }
    ],
    location: {
      city: "Mumbai",
      address: "Bandra West, Mumbai",
      coordinates: {
        latitude: 19.0596,
        longitude: 72.8295
      }
    },
    availability: true
  },
  {
    name: "Honda City 2022",
    brand: "Honda",
    model: "City",
    year: 2022,
    category: "Compact",
    pricePerHour: 600,
    price12Hour: 6000,
    price24Hour: 11000,
    pricePerDay: 9000,
    features: ["Sunroof", "Bluetooth", "Air Conditioning", "Rear Camera"],
    specifications: {
      seats: 5,
      transmission: "Manual",
      fuelType: "Petrol",
      mileage: 18
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop",
        alt: "Honda City Side View"
      }
    ],
    location: {
      city: "Delhi",
      address: "Connaught Place, Delhi",
      coordinates: {
        latitude: 28.6315,
        longitude: 77.2167
      }
    },
    availability: true
  },
  {
    name: "Maruti Swift 2023",
    brand: "Maruti",
    model: "Swift",
    year: 2023,
    category: "Economy",
    pricePerHour: 400,
    price12Hour: 4000,
    price24Hour: 7500,
    pricePerDay: 6000,
    features: ["Music System", "Air Conditioning", "Power Windows"],
    specifications: {
      seats: 5,
      transmission: "Manual",
      fuelType: "Petrol",
      mileage: 22
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=300&fit=crop",
        alt: "Maruti Swift Red"
      }
    ],
    location: {
      city: "Bangalore",
      address: "MG Road, Bangalore",
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946
      }
    },
    availability: true
  },
  {
    name: "Hyundai Creta 2023",
    brand: "Hyundai",
    model: "Creta",
    year: 2023,
    category: "SUV",
    pricePerHour: 1000,
    price12Hour: 10000,
    price24Hour: 18000,
    pricePerDay: 15000,
    features: ["Sunroof", "Touchscreen", "Wireless Charging", "360° Camera"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Diesel",
      mileage: 16
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop",
        alt: "Hyundai Creta SUV"
      }
    ],
    location: {
      city: "Chennai",
      address: "T. Nagar, Chennai",
      coordinates: {
        latitude: 13.0827,
        longitude: 80.2707
      }
    },
    availability: true
  },
  {
    name: "BMW 3 Series 2023",
    brand: "BMW",
    model: "3 Series",
    year: 2023,
    category: "Luxury",
    pricePerHour: 2000,
    price12Hour: 20000,
    price24Hour: 35000,
    pricePerDay: 30000,
    features: ["Leather Seats", "Premium Sound", "Adaptive Cruise Control", "Parking Assist"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: 12
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop",
        alt: "BMW 3 Series Luxury"
      }
    ],
    location: {
      city: "Pune",
      address: "Koregaon Park, Pune",
      coordinates: {
        latitude: 18.5204,
        longitude: 73.8567
      }
    },
    availability: true
  },
  {
    name: "Tata Nexon EV 2023",
    brand: "Tata",
    model: "Nexon EV",
    year: 2023,
    category: "Electric",
    pricePerHour: 700,
    price12Hour: 7000,
    price24Hour: 13000,
    pricePerDay: 10000,
    features: ["Fast Charging", "Digital Cluster", "Connected Car Tech", "Regenerative Braking"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Electric",
      mileage: 0
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=500&h=300&fit=crop",
        alt: "Electric Car Charging"
      }
    ],
    location: {
      city: "Hyderabad",
      address: "Banjara Hills, Hyderabad",
      coordinates: {
        latitude: 17.3850,
        longitude: 78.4867
      }
    },
    availability: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find or create a default user to be the owner
    let defaultUser = await User.findOne({ email: 'admin@carzone.com' });
    
    if (!defaultUser) {
      defaultUser = new User({
        name: 'CarZone Admin',
        email: 'admin@carzone.com',
        phone: '+919999999999',
        password: 'hashedpassword', // This should be properly hashed in real scenario
        role: 'admin'
      });
      await defaultUser.save();
      console.log('Created default user');
    }

    // Clear existing cars
    await Car.deleteMany({});
    console.log('Cleared existing cars');

    // Add owner to each car
    const carsWithOwner = sampleCars.map(car => ({
      ...car,
      owner: defaultUser._id
    }));

    // Insert sample cars
    await Car.insertMany(carsWithOwner);
    console.log(`Added ${sampleCars.length} sample cars with images`);

    console.log('Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();