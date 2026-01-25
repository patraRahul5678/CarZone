import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import BookingForm from './BookingForm'
import { carAPI } from '../services/api'

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

interface CarsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CarsModal({ isOpen, onClose }: CarsModalProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchCars()
    }
  }, [isOpen])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const response = await carAPI.getCars({ limit: 50, page: 1 })
      if (response.data && Array.isArray(response.data)) {
        setCars(response.data)
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
      toast.error('Failed to load cars')
    } finally {
      setLoading(false)
    }
  }

  const handleBookCar = (car: Car) => {
    setSelectedCar(car)
    setShowBookingForm(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-lg w-full max-w-6xl h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <h2 className="text-2xl font-bold text-black dark:text-white">Available Cars</h2>
          <button 
            onClick={onClose}
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-black dark:text-gray-400">No cars available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cars.map((car) => (
                <div key={car._id} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 flex flex-col h-full">
                  {/* Car Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={car.images[0]?.url} 
                      alt={car.images[0]?.alt || car.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 dark:text-white text-blue-700 px-2 py-1 rounded text-xs">
                      {car.category}
                    </div>
                  </div>
                  
                  {/* Car Details */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-black dark:text-white text-sm leading-tight">{car.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{car.brand} {car.model}</p>
                      </div>
                      <div className="text-right ml-2">
                        <div className="font-bold text-black dark:text-white text-sm">₹{car.pricePerHour}/hr</div>
                      </div>
                    </div>
                    
                    {/* Specifications */}
                    <div className="space-y-1 mb-3 flex-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Seats:</span>
                        <span className="text-black dark:text-white font-medium">{car.specifications.seats}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Fuel:</span>
                        <span className="text-black dark:text-white font-medium">{car.specifications.fuelType}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Location:</span>
                        <span className="text-black dark:text-white font-medium">{car.location.city}</span>
                      </div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 mb-3">
                      <div className="grid grid-cols-2 gap-1 text-xs text-center">
                        <div>
                          <div className="font-semibold text-black dark:text-white">₹{car.price12Hour}</div>
                          <div className="text-gray-500">12hrs</div>
                        </div>
                        <div>
                          <div className="font-semibold text-black dark:text-white">₹{car.price24Hour}</div>
                          <div className="text-gray-500">24hrs</div>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-gray-200 dark:border-gray-600">
                          <div className="font-semibold text-black dark:text-white">₹{car.pricePerDay}</div>
                          <div className="text-gray-500">Daily</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Book Button */}
                    <button 
                      onClick={() => handleBookCar(car)}
                      className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black py-2 px-3 rounded font-medium text-xs transition-colors duration-200"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
    </div>
  )
}