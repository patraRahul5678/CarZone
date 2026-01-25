const axios = require('axios');

const testCarsAPI = async () => {
  try {
    console.log('Testing Cars API...');
    
    const response = await axios.get('http://localhost:5000/api/cars');
    
    if (response.data.success) {
      console.log(`✅ API Working! Found ${response.data.cars.length} cars`);
      
      response.data.cars.forEach((car, index) => {
        console.log(`${index + 1}. ${car.name} - ${car.location.city}`);
        console.log(`   Pricing: ₹${car.pricePerHour}/hr | ₹${car.price12Hour}/12hr | ₹${car.price24Hour}/24hr | ₹${car.pricePerDay}/day`);
      });
    } else {
      console.log('❌ API Error:', response.data.message);
    }
    
  } catch (error) {
    console.log('❌ Connection Error:', error.message);
    console.log('Make sure backend server is running on port 5000');
  }
};

testCarsAPI();