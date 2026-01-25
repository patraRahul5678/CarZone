import { useState, useEffect } from 'react'
import { bookingAPI } from '../services/api'

interface Booking {
  _id: string
  car: {
    name: string
    brand: string
    model: string
    category: string
    images: Array<{ url: string; alt: string }>
  }
  pickupDate: string
  returnDate: string
  pickupTime: string
  returnTime: string
  pickupLocation: string
  returnLocation: string
  rentalType: string
  totalHours: number
  totalAmount: number
  status: string
  paymentStatus: string
  createdAt: string
}

export default function MyRentals() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings()
      if (response.data.success) {
        setBookings(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const cancelBooking = async (bookingId: string, reason: string) => {
    try {
      const response = await bookingAPI.cancelBooking(bookingId, reason)
      if (response.data.success) {
        alert('Booking cancelled successfully')
        fetchBookings()
      }
    } catch (error: any) {
      console.error('Error cancelling booking:', error)
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 dark:text-green-400'
      case 'active': return 'text-blue-600 dark:text-blue-400'
      case 'completed': return 'text-gray-600 dark:text-gray-400'
      case 'cancelled': return 'text-red-600 dark:text-red-400'
      default: return 'text-yellow-600 dark:text-yellow-400'
    }
  }

  const getRentalTypeLabel = (type: string) => {
    switch (type) {
      case 'hourly': return 'Hourly'
      case '12hour': return '12 Hours'
      case '24hour': return '24 Hours'
      case 'daily': return 'Daily'
      default: return type
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'active') return ['pending', 'confirmed', 'active'].includes(booking.status)
    if (activeTab === 'completed') return booking.status === 'completed'
    if (activeTab === 'cancelled') return booking.status === 'cancelled'
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="text-black dark:text-white">Loading your rentals...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">My Rentals</h1>
          <p className="text-black dark:text-gray-400">Manage your car bookings</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
          {(['active', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({filteredBookings.length})
            </button>
          ))}
        </div>

        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-black dark:text-gray-400 mb-4">No {activeTab} rentals found</div>
            <button className="btn-primary">
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6 card-shadow">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Car Image */}
                  <div className="lg:w-48 flex-shrink-0">
                    {booking.car.images.length > 0 ? (
                      <img
                        src={booking.car.images[0].url}
                        alt={booking.car.images[0].alt}
                        className="w-full h-32 lg:h-24 object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-32 lg:h-24 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-black dark:text-white mb-1">
                          {booking.car.name}
                        </h3>
                        <p className="text-sm text-black dark:text-gray-400 mb-2">
                          {booking.car.brand} {booking.car.model} • {booking.car.category}
                        </p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)} bg-gray-100 dark:bg-gray-900`}>
                          {booking.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="text-right mt-4 sm:mt-0">
                        <div className="text-2xl font-bold text-black dark:text-white">₹{booking.totalAmount}</div>
                        <div className="text-sm text-black dark:text-gray-400">{getRentalTypeLabel(booking.rentalType)}</div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-black dark:text-gray-400">Pickup:</span>
                        <div className="text-black dark:text-white font-medium">
                          {new Date(booking.pickupDate).toLocaleDateString()} {booking.pickupTime}
                        </div>
                        <div className="text-black dark:text-gray-400 text-xs">{booking.pickupLocation}</div>
                      </div>
                      <div>
                        <span className="text-black dark:text-gray-400">Return:</span>
                        <div className="text-black dark:text-white font-medium">
                          {new Date(booking.returnDate).toLocaleDateString()} {booking.returnTime}
                        </div>
                        <div className="text-black dark:text-gray-400 text-xs">{booking.returnLocation}</div>
                      </div>
                      <div>
                        <span className="text-black dark:text-gray-400">Duration:</span>
                        <div className="text-black dark:text-white font-medium">{booking.totalHours} hours</div>
                      </div>
                      <div>
                        <span className="text-black dark:text-gray-400">Payment:</span>
                        <div className={`font-medium ${booking.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                          {booking.paymentStatus.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {booking.status === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => {
                            const reason = prompt('Please provide a reason for cancellation:')
                            if (reason) cancelBooking(booking._id, reason)
                          }}
                          className="btn-secondary text-sm"
                        >
                          Cancel Booking
                        </button>
                        <button className="btn-primary text-sm">
                          Pay Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}