const Car = require('../models/Car');

// Create a new car listing
exports.createCar = async (req, res) => {
  try {
    // Extract features array from object
    const featuresArray = req.body.features 
      ? Object.values(req.body.features).filter(f => f && typeof f === 'string')
      : [];

    const carData = {
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      year: parseInt(req.body.year),
      category: req.body.category,
      pricePerHour: parseFloat(req.body.pricePerHour),
      price12Hour: parseFloat(req.body.price12Hour),
      price24Hour: parseFloat(req.body.price24Hour),
      pricePerDay: parseFloat(req.body.pricePerDay),
      features: featuresArray,
      specifications: {
        seats: parseInt(req.body.seats),
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        mileage: req.body.mileage ? parseFloat(req.body.mileage) : 0
      },
      location: {
        city: req.body.city,
        address: req.body.address
      },
      owner: req.user.id,
      status: 'approved',
      availability: true
    };

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      carData.images = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: req.body.name || 'Car image'
      }));
    }

    const car = new Car(carData);
    await car.save();

    res.status(201).json({
      success: true,
      message: 'Car listed successfully',
      data: car
    });

  } catch (error) {
    console.error('Create car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all cars with filters
exports.getCars = async (req, res) => {
  try {
    const { 
      category, 
      city, 
      minPrice, 
      maxPrice, 
      seats, 
      transmission, 
      fuelType,
      page = 1, 
      limit = 10,
      search 
    } = req.query;

    const query = { availability: true };

    if (category) query.category = category;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (minPrice || maxPrice) {
      query.pricePerHour = {};
      if (minPrice) query.pricePerHour.$gte = Number(minPrice);
      if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
    }
    if (seats) query['specifications.seats'] = Number(seats);
    if (transmission) query['specifications.transmission'] = transmission;
    if (fuelType) query['specifications.fuelType'] = fuelType;

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { model: new RegExp(search, 'i') }
      ];
    }

    const cars = await Car.find(query)
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Car.countDocuments(query);

    res.json({
      success: true,
      data: cars,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('owner', 'name email phone');

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      data: car
    });

  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get user's cars
exports.getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: cars
    });

  } catch (error) {
    console.error('Get user cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update car
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    if (car.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const featuresArray = req.body.features 
      ? Object.values(req.body.features).filter(f => f && typeof f === 'string')
      : [];

    const updateData = {
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      year: parseInt(req.body.year),
      category: req.body.category,
      pricePerHour: parseFloat(req.body.pricePerHour),
      price12Hour: parseFloat(req.body.price12Hour),
      price24Hour: parseFloat(req.body.price24Hour),
      pricePerDay: parseFloat(req.body.pricePerDay),
      features: featuresArray,
      specifications: {
        seats: parseInt(req.body.seats),
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        mileage: req.body.mileage ? parseFloat(req.body.mileage) : 0
      },
      location: {
        city: req.body.city,
        address: req.body.address
      }
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: req.body.name || 'Car image'
      }));
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Car updated successfully',
      data: updatedCar
    });

  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    if (car.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Car.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });

  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
