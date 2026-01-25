import { useState, useEffect } from 'react'
import { adminAPI } from '../services/api'
import toast from 'react-hot-toast'
import CarDetailsModal from '../components/CarDetailsModal'
import ListCarForm from '../components/ListCarForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EditCarForm from '../components/EditCarForm'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [pendingCars, setPendingCars] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([]) 
  const [allCars, setAllCars] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedCar, setSelectedCar] = useState<any>(null)
  const [isListCarFormOpen, setIsListCarFormOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; carId: string | null }>({ isOpen: false, carId: null })
  const [editCar, setEditCar] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please login as admin to access dashboard')
      return
    }
    setIsAuthenticated(true)
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      const statsPromise = adminAPI.getDashboardStats().then(res => {
        console.log('Stats API response:', res.data)
        return res
      }).catch(err => {
        console.error('Stats error:', err)
        throw err
      })
      
      const pendingPromise = adminAPI.getPendingCars().catch(err => {
        console.error('Pending cars error:', err)
        return { data: { data: [] } }
      })
      
      const bookingsPromise = adminAPI.getAllBookings().catch(err => {
        console.error('Bookings error:', err)
        return { data: { data: [] } }
      })

      const carsPromise = adminAPI.getAllCars().catch(err => {
        console.error('Cars error:', err)
        console.error('Cars error response:', err.response?.data)
        return { data: { data: [] } }
      })

      const [statsRes, pendingRes, bookingsRes, carsRes] = await Promise.all([
        statsPromise,
        pendingPromise, 
        bookingsPromise,
        carsPromise
      ])

      setStats(statsRes.data.data)
      setPendingCars(pendingRes.data.data)
      setBookings(bookingsRes.data.data)
      setAllCars(carsRes.data.data)
      
    } catch (error) {
      console.error('Dashboard error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to load'
      toast.error(`Failed to load dashboard data: ${errorMessage}`)
      setPendingCars([])
      setBookings([])
      setAllCars([])
    } finally {
      setLoading(false)
    }
  }

  const handleApproveCar = async (carId: string) => {
    try {
      await adminAPI.approveCar(carId)
      toast.success('Car approved successfully')
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to approve car')
    }
  }

  const handleDeclineCar = async (carId: string) => {
    const reason = prompt('Enter decline reason:')
    if (!reason) return

    try {
      await adminAPI.declineCar(carId, reason)
      toast.success('Car declined successfully')
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to decline car')
    }
  }

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      await adminAPI.confirmBooking(bookingId)
      toast.success('Booking confirmed successfully')
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to confirm booking')
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    const reason = prompt('Enter cancellation reason:')
    if (!reason) return

    try {
      await adminAPI.cancelBooking(bookingId, reason)
      toast.success('Booking cancelled successfully')
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to cancel booking')
    }
  }

  const handleDeleteCar = async (carId: string) => {
    setDeleteConfirm({ isOpen: true, carId })
  }

  // const handleEditCar=async(carId: string)=>{
  //   setEdit({ isOpen: true, carId })
  // }

  const confirmDelete = async () => {
    if (!deleteConfirm.carId) return

    try {
      await adminAPI.deleteAdminCar(deleteConfirm.carId)
      toast.success('Car deleted successfully')
      setDeleteConfirm({ isOpen: false, carId: null })
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to delete car')
    }
  }

  const handleEditCar = async (carId: string, updatedData: any) => {
    try {
      await adminAPI.updateAdminCar(carId, updatedData)
      toast.success('Car updated successfully')
      setEditCar(null)
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to update car')
    }
  }

  const exportToCSV = () => {
    const csvData = bookings.map(booking => ({
      Car: booking.car?.name || 'N/A',
      Customer: booking.user?.name || 'N/A',
      Email: booking.user?.email || 'N/A',
      Amount: booking.totalAmount,
      Status: booking.status,
      Date: new Date(booking.createdAt).toLocaleDateString(),
      'Pickup Date': new Date(booking.pickupDate).toLocaleDateString(),
      'Return Date': new Date(booking.returnDate).toLocaleDateString()
    }))

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Admin Access Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please login as admin to access the dashboard</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-black dark:text-white">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 dark">
      {selectedCar && <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
      <ListCarForm isOpen={isListCarFormOpen} onClose={() => {
        setIsListCarFormOpen(false)
        fetchDashboardData()
      }} />
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Car"
        message="Are you sure you want to delete this car? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, carId: null })}
        confirmText="Delete"
        cancelText="Cancel"
      />
      {editCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Car</h2>
            <EditCarForm car={editCar} onSave={handleEditCar} onCancel={() => setEditCar(null)} />
          </div>
        </div>
      )}

      <div className="bg-black shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsListCarFormOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors"
              >
                Add Car
              </button>
              <button
                onClick={() => setActiveTab('allcars')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
              >
                List All Cars
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="text-gray-300 hover:text-white px-3 py-2 rounded transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('userRole')
                  toast.success('Logged out successfully')
                  window.location.href = '/'
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-black rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('allcars')}>
            <div className="flex items-center">
              <div className="p-2 bg-blue-900 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Cars</p>
                <p className="text-2xl font-semibold text-white">{stats?.totalCars || 0}</p>
                <p className="text-xs text-green-400">+{stats?.activeCars || 0} active</p>
              </div>
            </div>
          </div>

          <div className="bg-black rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-900 rounded-lg">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Pending Approval</p>
                <p className="text-2xl font-semibold text-white">{stats?.pendingCars || 0}</p>
                <p className="text-xs text-yellow-400">Needs review</p>
              </div>
            </div>
          </div>

          <div className="bg-black rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('bookings')}>
            <div className="flex items-center">
              <div className="p-2 bg-green-900 rounded-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Bookings</p>
                <p className="text-2xl font-semibold text-white">{stats?.totalBookings || 0}</p>
                <p className="text-xs text-green-400">All time</p>
              </div>
            </div>
          </div>

          <div className="bg-black rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-900 rounded-lg">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Earnings</p>
                <p className="text-2xl font-semibold text-white">₹{stats?.totalEarnings?.toLocaleString() || 0}</p>
                <p className="text-xs text-purple-400">Revenue</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black rounded-lg shadow">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Pending Cars
              </button>
              <button
                onClick={() => setActiveTab('cars')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cars'
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Approved Cars
              </button>
              <button
                onClick={() => setActiveTab('allcars')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'allcars'
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                All Cars
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                All Bookings
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                {activeTab === 'overview' ? 'Pending Car Approvals' : 
                 activeTab === 'cars' ? 'Approved Cars' :
                 activeTab === 'allcars' ? 'All Cars' :
                 activeTab === 'bookings' ? 'All Bookings' : 'All Cars'}
              </h3>
              <div className="flex gap-2">
                {activeTab === 'bookings' && bookings.length > 0 && (
                  <button
                    onClick={exportToCSV}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Export CSV
                  </button>
                )}
                <button
                  onClick={fetchDashboardData}
                  className="bg-white text-black px-3 py-1 rounded text-sm hover:opacity-80"
                >
                  Refresh
                </button>
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4">
                {pendingCars.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No pending cars for approval</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {pendingCars.map((car) => (
                      <div key={car._id} className="border border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 cursor-pointer" onClick={() => setSelectedCar(car)}>
                            <div className="flex items-center gap-3 mb-2">
                              {car.images?.[0] && (
                                <img src={car.images[0].url} alt={car.name} className="w-16 h-12 object-cover rounded" />
                              )}
                              <div>
                                <h4 className="font-medium text-white">{car.name}</h4>
                                <p className="text-sm text-gray-400">{car.brand} {car.model}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <p className="text-gray-400">Owner: <span className="text-white">{car.owner?.name}</span></p>
                              <p className="text-gray-400">Price: <span className="text-white">₹{car.pricePerHour}/hr</span></p>
                              <p className="text-gray-400">Category: <span className="text-white">{car.category}</span></p>
                              <p className="text-gray-400">Location: <span className="text-white">{car.location?.city}</span></p>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleApproveCar(car._id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDeclineCar(car._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'cars' && (
              <div className="space-y-4">
                {allCars.filter(c => c.status === 'approved').length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No approved cars found</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {allCars.filter(c => c.status === 'approved').map((car) => (
                      <div key={car._id} className="border border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 cursor-pointer" onClick={() => setSelectedCar(car)}>
                            <div className="flex items-center gap-3 mb-2">
                              {car.images?.[0] && (
                                <img src={car.images[0].url} alt={car.name} className="w-20 h-16 object-cover rounded" />
                              )}
                              <div>
                                <h4 className="font-medium text-white">{car.name}</h4>
                                <p className="text-sm text-gray-400">{car.brand} {car.model}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                              <p className="text-gray-400">Owner: <span className="text-white">{car.owner?.name}</span></p>
                              <p className="text-gray-400">Price: <span className="text-white">₹{car.pricePerHour}/hr</span></p>
                              <p className="text-gray-400">Category: <span className="text-white">{car.category}</span></p>
                              <p className="text-gray-400">Location: <span className="text-white">{car.location?.city}</span></p>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleDeleteCar(car._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                              Delete
                            </button>

                            <button
                              onClick={() => setEditCar(car)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'allcars' && (
              <div className="space-y-4">
                {allCars.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No cars found</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {allCars.map((car) => (
                      <div key={car._id} className="border border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 cursor-pointer" onClick={() => setSelectedCar(car)}>
                            <div className="flex items-center gap-3 mb-2">
                              {car.images?.[0] && (
                                <img src={car.images[0].url} alt={car.name} className="w-20 h-16 object-cover rounded" />
                              )}
                              <div>
                                <h4 className="font-medium text-white">{car.name}</h4>
                                <p className="text-sm text-gray-400">{car.brand} {car.model}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                              <p className="text-gray-400">Owner: <span className="text-white">{car.owner?.name}</span></p>
                              <p className="text-gray-400">Price: <span className="text-white">₹{car.pricePerHour}/hr</span></p>
                              <p className="text-gray-400">Category: <span className="text-white">{car.category}</span></p>
                              <p className="text-gray-400">Status: <span className="font-semibold text-green-400">Accepted</span></p>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => setEditCar(car)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No bookings found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Car</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-black divide-y divide-gray-700">
                        {bookings.map((booking) => (
                          <tr key={booking._id} className="hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {booking.car?.name || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {booking.user?.name || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              ₹{booking.totalAmount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === 'confirmed' ? 'bg-green-800 text-green-200' :
                                booking.status === 'pending' ? 'bg-yellow-800 text-yellow-200' :
                                'bg-red-800 text-red-200'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {booking.status === 'pending' ? (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleConfirmBooking(booking._id)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => handleCancelBooking(booking._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-xs">
                                  {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
