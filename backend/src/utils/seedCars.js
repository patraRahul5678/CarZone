const mongoose = require('mongoose');
const Car = require('../models/Car');
const User = require('../models/User');
require('dotenv').config();

const carData = [
  {
    name: "Toyota Camry 2023",
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    category: "Premium",
    pricePerHour: 120,
    price12Hour: 1200,
    price24Hour: 2200,
    pricePerDay: 2500,
    features: ["GPS Navigation", "Bluetooth", "Air Conditioning", "Backup Camera"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: 15
    },
    images: [{
      url: "https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/camry/xle/1g3/2023-toyota-camry-xle-celestial-silver-metallic-front-quarter.png",
      alt: "Toyota Camry 2023"
    }],
    location: {
      city: "Bhubaneswar",
      address: "Patia, Bhubaneswar",
      coordinates: { latitude: 20.2961, longitude: 85.8245 }
    },
    availability: true,
    rating: { average: 4.5, count: 23 }
  },
  {
    name: "Honda City 2022",
    brand: "Honda",
    model: "City",
    year: 2022,
    category: "Compact",
    pricePerHour: 80,
    price12Hour: 850,
    price24Hour: 1500,
    pricePerDay: 1800,
    features: ["Bluetooth", "Air Conditioning", "Power Steering"],
    specifications: {
      seats: 5,
      transmission: "Manual",
      fuelType: "Petrol",
      mileage: 18
    },
    images: [{
      url: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/city-exterior-right-front-three-quarter-109.jpeg",
      alt: "Honda City 2022"
    }],
    location: {
      city: "Cuttack",
      address: "Badambadi, Cuttack",
      coordinates: { latitude: 20.4625, longitude: 85.8828 }
    },
    availability: true,
    rating: { average: 4.2, count: 18 }
  },
  {
    name: "Maruti Swift 2023",
    brand: "Maruti",
    model: "Swift",
    year: 2023,
    category: "Economy",
    pricePerHour: 50,
    price12Hour: 550,
    price24Hour: 1000,
    pricePerDay: 1200,
    features: ["Air Conditioning", "Power Steering", "Central Locking"],
    specifications: {
      seats: 5,
      transmission: "Manual",
      fuelType: "Petrol",
      mileage: 22
    },
    images: [{
      url: "https://imgd.aeplcdn.com/664x374/n/cw/ec/54399/swift-exterior-right-front-three-quarter-63.jpeg",
      alt: "Maruti Swift 2023"
    }],
    location: {
      city: "Bhubaneswar",
      address: "Khandagiri, Bhubaneswar",
      coordinates: { latitude: 20.2700, longitude: 85.7800 }
    },
    availability: true,
    rating: { average: 4.0, count: 35 }
  },
  {
    name: "Hyundai Creta 2023",
    brand: "Hyundai",
    model: "Creta",
    year: 2023,
    category: "SUV",
    pricePerHour: 140,
    price12Hour: 1500,
    price24Hour: 2800,
    pricePerDay: 3200,
    features: ["Sunroof", "GPS Navigation", "Bluetooth", "Reverse Camera", "Leather Seats"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Diesel",
      mileage: 16
    },
    images: [{
      url: "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-4.jpeg",
      alt: "Hyundai Creta 2023"
    }],
    location: {
      city: "Cuttack",
      address: "Millennium City Centre, Cuttack",
      coordinates: { latitude: 20.4625, longitude: 85.8828 }
    },
    availability: true,
    rating: { average: 4.6, count: 42 }
  },
  {
    name: "BMW 3 Series 2022",
    brand: "BMW",
    model: "3 Series",
    year: 2022,
    category: "Luxury",
    pricePerHour: 300,
    price12Hour: 3200,
    price24Hour: 6000,
    pricePerDay: 7500,
    features: ["Premium Sound System", "GPS Navigation", "Leather Seats", "Sunroof", "Climate Control"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: 12
    },
    images: [{
      url: "https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-2545xM4RIyFnbm9Mb3JiaXROMmdXa3AuUDMwTzk%25bl8MDl0bS5EbmJnbCszbHE%25",
      alt: "BMW 3 Series 2022"
    }],
    location: {
      city: "Bhubaneswar",
      address: "Saheed Nagar, Bhubaneswar",
      coordinates: { latitude: 20.3019, longitude: 85.8449 }
    },
    availability: true,
    rating: { average: 4.8, count: 15 }
  },
  {
    name: "Tata Nexon EV 2023",
    brand: "Tata",
    model: "Nexon EV",
    year: 2023,
    category: "Electric",
    pricePerHour: 100,
    price12Hour: 1100,
    price24Hour: 2000,
    pricePerDay: 2400,
    features: ["Electric", "GPS Navigation", "Bluetooth", "Fast Charging", "Eco Mode"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Electric",
      mileage: 0
    },
    images: [{
      url: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-ev-exterior-right-front-three-quarter-3.jpeg",
      alt: "Tata Nexon EV 2023"
    }],
    location: {
      city: "Cuttack",
      address: "Link Road, Cuttack",
      coordinates: { latitude: 20.4625, longitude: 85.8828 }
    },
    availability: true,
    rating: { average: 4.3, count: 28 }
  },
  {
    name: "Mahindra XUV300 2023",
    brand: "Mahindra",
    model: "XUV300",
    year: 2023,
    category: "SUV",
    pricePerHour: 110,
    price12Hour: 1200,
    price24Hour: 2200,
    pricePerDay: 2600,
    features: ["Sunroof", "Touchscreen", "Reverse Camera", "Cruise Control"],
    specifications: {
      seats: 5,
      transmission: "Manual",
      fuelType: "Diesel",
      mileage: 17
    },
    images: [{
      url: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/xuv300-exterior-right-front-three-quarter-11.jpeg",
      alt: "Mahindra XUV300 2023"
    }],
    location: {
      city: "Bhubaneswar",
      address: "Jaydev Vihar, Bhubaneswar",
      coordinates: { latitude: 20.2700, longitude: 85.7800 }
    },
    availability: true,
    rating: { average: 4.1, count: 31 }
  },
  {
    name: "Kia Seltos 2023",
    brand: "Kia",
    model: "Seltos",
    year: 2023,
    category: "SUV",
    pricePerHour: 130,
    price12Hour: 1400,
    price24Hour: 2600,
    pricePerDay: 3000,
    features: ["Wireless Charging", "Ventilated Seats", "360 Camera", "Connected Car Tech"],
    specifications: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: 16
    },
    images: [{
      url: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/seltos-exterior-right-front-three-quarter-109.jpeg",
      alt: "Kia Seltos 2023"
    }],
    location: {
      city: "Cuttack",
      address: "Buxi Bazaar, Cuttack",
      coordinates: { latitude: 20.4625, longitude: 85.8828 }
    },
    availability: true,
    rating: { average: 4.4, count: 26 }
  }
];

const seedCars = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create a default admin user for car ownership
    let adminUser = await User.findOne({ email: 'admin@carzone.com' });
    
    if (!adminUser) {
      adminUser = new User({
        name: 'CarZone Admin',
        email: 'admin@carzone.com',
        phone: '+919999999999',
        authMethod: 'email',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Created admin user');
    }

    // Clear existing cars
    await Car.deleteMany({});
    console.log('Cleared existing cars');

    // Add owner to each car
    const carsWithOwner = carData.map(car => ({
      ...car,
      owner: adminUser._id
    }));

    // Insert new cars
    const insertedCars = await Car.insertMany(carsWithOwner);
    console.log(`Added ${insertedCars.length} cars to database`);
    
    // Display pricing summary
    console.log('\nCar Pricing Summary:');
    insertedCars.forEach(car => {
      console.log(`${car.name}: ₹${car.pricePerHour}/hr | ₹${car.price12Hour}/12hr | ₹${car.price24Hour}/24hr | ₹${car.pricePerDay}/day`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding cars:', error);
    process.exit(1);
  }
};

seedCars();