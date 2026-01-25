import { useState, useEffect } from 'react'
import { carAPI } from '../services/api'
import BookingForm from './BookingForm'

interface Car {
  _id: string
  name: string
  brand: string
  model: string
  category: string
  pricePerHour: number
  price12Hour: number
  price24Hour: number
  pricePerDay: number
  specifications: {
    seats: number
    transmission: string
    fuelType: string
  }
  images: Array<{ url: string; alt: string }>
  location: {
    city: string
  }
  availability: boolean
}

export default function AvailableCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    search: ''
  })

  useEffect(() => {
    fetchCars()
  }, [filters])

  const fetchCars = async () => {
    try {
      setError(null)
      console.log('Fetching cars with filters:', filters)
      const response = await carAPI.getCars(filters)
      console.log('Full API response:', response)
      console.log('Response data:', response?.data)
      
      if (response?.data?.success) {
        const carsData = response.data.data || []
        console.log('Cars received:', carsData.length, carsData)
        setCars(carsData)
      } else {
        console.log('API returned success: false')
        setError('Failed to load cars')
        setCars([])
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
      setError('Unable to connect to server. Please check your connection.')
      setCars([])
    } finally {
      setLoading(false)
    }
  }

  const handleBookCar = (car: Car) => {
    setSelectedCar(car)
    setShowBookingForm(true)
  }

  if (loading) {
    return (
      <section className="bg-white dark:bg-black py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-black dark:text-white">Loading cars...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white dark:bg-black py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Cars</h2>
          <p className="text-black dark:text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => {
              setLoading(true)
              fetchCars()
            }}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="available-cars" className="bg-white dark:bg-black py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Available Cars
          </h2>
          <p className="text-lg text-black dark:text-gray-400">Choose from our fleet of verified cars</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search cars..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="input"
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="input"
          >
            <option value="">All Categories</option>
            <option value="Economy">Economy</option>
            <option value="Compact">Compact</option>
            <option value="Premium">Premium</option>
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="Electric">Electric</option>
          </select>
          <input
            type="text"
            placeholder="City"
            value={filters.city}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
            className="input"
          />
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black dark:text-gray-400">No cars available matching your criteria.</p>
            <p className="text-sm text-gray-500 mt-2">Cars in state: {cars.length}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car._id} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                {/* Car Image */}
                {car.images && car.images.length > 0 ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={car.images[0].url} 
                      alt={car.images[0].alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {car.category}
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
                    </div>
                  </div>
                )}
                
                {/* Car Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black dark:text-white mb-1">{car.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{car.brand} {car.model}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{car.pricePerHour}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">per hour</div>
                    </div>
                  </div>
                  
                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{car.specifications.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{car.specifications.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{car.specifications.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{car.location.city}</span>
                    </div>
                  </div>

                  {/* Pricing Options */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">₹{car.price12Hour}</div>
                        <div className="text-gray-500">12 Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">₹{car.price24Hour}</div>
                        <div className="text-gray-500">24 Hours</div>
                      </div>
                      <div className="text-center col-span-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="font-semibold text-gray-900 dark:text-white">₹{car.pricePerDay}</div>
                        <div className="text-gray-500">Per Day</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Availability Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">Available Now</span>
                    </div>
                  </div>
                  
                  {/* Book Button */}
                  <button 
                    onClick={() => handleBookCar(car)}
                    className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showBookingForm && selectedCar && (
        <BookingForm
          carId={selectedCar._id}
          carName={selectedCar.name}
          pricePerHour={selectedCar.pricePerHour}
          price12Hour={selectedCar.price12Hour}
          price24Hour={selectedCar.price24Hour}
          pricePerDay={selectedCar.pricePerDay}
          onClose={() => {
            setShowBookingForm(false)
            setSelectedCar(null)
          }}
        />
      )}
    </section>
  )
}