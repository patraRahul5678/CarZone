import { useState, useEffect } from 'react'
import { carAPI, bookingAPI } from '../services/api'
import ListCarForm from './ListCarForm'

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
    address: string
  }
  availability: boolean
  createdAt: string
}

interface RentalRequest {
  _id: string
  user: {
    name: string
    email: string
    phone: string
  }
  car: {
    name: string
  }
  pickupDate: string
  returnDate: string
  pickupTime: string
  returnTime: string
  rentalType: string
  totalAmount: number
  status: string
  createdAt: string
}

export default function MyCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'cars' | 'requests'>('cars')
  const [showListForm, setShowListForm] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | null>(null)

  useEffect(() => {
    fetchMyCars()
    fetchRentalRequests()
  }, [])

  const fetchMyCars = async () => {
    try {
      const response = await carAPI.getMyCars()
      if (response.data.success) {
        setCars(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRentalRequests = async () => {
    try {
      const response = await bookingAPI.getRentalRequests()
      if (response.data.success) {
        setRentalRequests(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching rental requests:', error)
    }
  }

  const toggleCarAvailability = async (carId: string, availability: boolean) => {
    try {
      const response = await carAPI.updateCar(carId, { availability })
      if (response.data.success) {
        fetchMyCars()
      }
    } catch (error: any) {
      console.error('Error updating car:', error)
      alert(error.response?.data?.message || 'Failed to update car')
    }
  }

  const deleteCar = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return

    try {
      const response = await carAPI.deleteCar(carId)
      if (response.data.success) {
        alert('Car deleted successfully')
        fetchMyCars()
      }
    } catch (error: any) {
      console.error('Error deleting car:', error)
      alert(error.response?.data?.message || 'Failed to delete car')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="text-black dark:text-white">Loading your cars...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-4">My Cars</h1>
            <p className="text-black dark:text-gray-400">Manage your car listings and rental requests</p>
          </div>
          <button
            onClick={() => {
              setEditingCar(null)
              setShowListForm(true)
            }}
            className="btn-primary"
          >
            List New Car
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('cars')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'cars'
                ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            My Cars ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'requests'
                ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Rental Requests ({rentalRequests.length})
          </button>
        </div>

        {activeTab === 'cars' ? (
          cars.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-black dark:text-gray-400 mb-4">You haven't listed any cars yet</div>
              <button
                onClick={() => {
                  setEditingCar(null)
                  setShowListForm(true)
                }}
                className="btn-primary"
              >
                List Your First Car
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car._id} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6 card-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-black dark:text-white">{car.name}</h3>
                      <p className="text-sm text-black dark:text-gray-400">{car.brand} {car.model}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      car.availability 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {car.availability ? 'Available' : 'Unavailable'}
                    </div>
                  </div>

                  {car.images.length > 0 ? (
                    <img
                      src={car.images[0].url}
                      alt={car.images[0].alt}
                      className="w-full h-32 object-cover rounded mb-4"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">No Image</span>
                    </div>
                  )}

                  <div className="space-y-2 mb-6">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-black dark:text-gray-400">Hourly:</span>
                        <span className="text-black dark:text-white font-medium ml-2">₹{car.pricePerHour}</span>
                      </div>
                      <div>
                        <span className="text-black dark:text-gray-400">12hrs:</span>
                        <span className="text-black dark:text-white font-medium ml-2">₹{car.price12Hour}</span>
                      </div>
                      <div>
                        <span className="text-black dark:text-gray-400">24hrs:</span>
                        <span className="text-black dark:text-white font-medium ml-2">₹{car.price24Hour}</span>
                      </div>
                      <div>
                        <span className="text-black dark:text-gray-400">Daily:</span>
                        <span className="text-black dark:text-white font-medium ml-2">₹{car.pricePerDay}</span>
                      </div>
                    </div>
                    <div className="text-sm text-black dark:text-gray-400">
                      {car.specifications.seats} seats • {car.specifications.transmission} • {car.specifications.fuelType}
                    </div>
                    <div className="text-sm text-black dark:text-gray-400">
                      📍 {car.location.city}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleCarAvailability(car._id, !car.availability)}
                        className={`flex-1 text-sm py-2 px-3 rounded font-medium transition-colors ${
                          car.availability
                            ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                            : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                        }`}
                      >
                        {car.availability ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => deleteCar(car._id)}
                        className="text-sm py-2 px-3 rounded font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setEditingCar(car)
                        setShowListForm(true)
                      }}
                      className="w-full text-sm py-2 px-3 rounded font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="space-y-4">
            {rentalRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-black dark:text-gray-400">No rental requests yet</div>
              </div>
            ) : (
              rentalRequests.map((request) => (
                <div key={request._id} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6 card-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-black dark:text-white">{request.car.name}</h3>
                      <p className="text-sm text-black dark:text-gray-400">Request from {request.user.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-black dark:text-white">₹{request.totalAmount}</div>
                      <div className="text-sm text-black dark:text-gray-400">{request.rentalType}</div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-black dark:text-gray-400">Customer:</span>
                      <div className="text-black dark:text-white">{request.user.name}</div>
                      <div className="text-black dark:text-gray-400">{request.user.email}</div>
                    </div>
                    <div>
                      <span className="text-black dark:text-gray-400">Duration:</span>
                      <div className="text-black dark:text-white">
                        {new Date(request.pickupDate).toLocaleDateString()} {request.pickupTime} - 
                        {new Date(request.returnDate).toLocaleDateString()} {request.returnTime}
                      </div>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="btn-primary text-sm">Accept</button>
                      <button className="btn-secondary text-sm">Decline</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showListForm && (
        <ListCarForm 
          carToEdit={editingCar}
          onClose={() => {
            setShowListForm(false)
            setEditingCar(null)
            fetchMyCars()
          }} 
        />
      )}
    </div>
  )
}
