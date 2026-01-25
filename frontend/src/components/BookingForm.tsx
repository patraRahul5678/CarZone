import { useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import LoginModal from './LoginModal'
import BookingConfirmation from './BookingConfirmation'

interface BookingFormProps {
  carId: string
  carName: string
  pricePerHour: number
  price12Hour: number
  price24Hour: number
  pricePerDay: number
  onClose: () => void
}

export default function BookingForm({ 
  carId, 
  carName, 
  pricePerHour, 
  price12Hour, 
  price24Hour, 
  pricePerDay, 
  onClose 
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    pickupTime: '10:00',
    returnTime: '10:00',
    pickupLocation: '',
    returnLocation: '',
    rentalType: 'hourly',
    notes: ''
  })
  const [totalAmount, setTotalAmount] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      // Try to get user profile
      authAPI.getProfile().then(response => {
        if (response.data.success) {
          setUserData(response.data.user)
          setIsLoggedIn(true)
        }
      }).catch(() => {
        // Token might be invalid, remove it
        localStorage.removeItem('token')
      })
    }
  }, [])

  const isFormValid = () => {
    if (formData.pickupLocation.trim() === '' ||
        formData.returnLocation.trim() === '' ||
        formData.pickupDate === '' ||
        formData.returnDate === '' ||
        formData.pickupTime === '' ||
        formData.returnTime === '') {
      return false
    }
    
    const now = new Date()
    const pickup = new Date(`${formData.pickupDate}T${formData.pickupTime}`)
    const returnDateTime = new Date(`${formData.returnDate}T${formData.returnTime}`)
    
    // Pickup must be at least current time or later
    if (pickup < now) return false
    
    // Return must be at least 1 hour after pickup
    const oneHourLater = new Date(pickup.getTime() + 60 * 60 * 1000)
    if (returnDateTime < oneHourLater) return false
    
    return totalAmount > 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    
    // Recalculate amount immediately
    if (newFormData.pickupDate && newFormData.returnDate && newFormData.pickupTime && newFormData.returnTime) {
      const pickup = new Date(`${newFormData.pickupDate}T${newFormData.pickupTime}`)
      const returnDateTime = new Date(`${newFormData.returnDate}T${newFormData.returnTime}`)
      const totalHours = Math.ceil((returnDateTime.getTime() - pickup.getTime()) / (1000 * 3600))
      
      if (totalHours > 0) {
        let amount = 0
        switch (newFormData.rentalType) {
          case 'hourly':
            amount = totalHours * pricePerHour
            break
          case '12hour':
            amount = price12Hour
            break
          case '24hour':
            amount = price24Hour
            break
          case 'daily': {
            const days = Math.ceil(totalHours / 24)
            amount = days * pricePerDay
            break
          }
        }
        setTotalAmount(amount)
      } else {
        setTotalAmount(0)
      }
    }
  }

  const getMinReturnDate = () => {
    if (!formData.pickupDate) return new Date().toISOString().split('T')[0]
    return formData.pickupDate
  }

  const getMinReturnTime = () => {
    if (formData.pickupDate === formData.returnDate && formData.pickupTime) {
      const pickup = new Date(`2000-01-01T${formData.pickupTime}`)
      const oneHourLater = new Date(pickup.getTime() + 60 * 60 * 1000)
      return oneHourLater.toTimeString().slice(0, 5)
    }
    return '00:00'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLoggedIn && userData) {
      // User is already logged in, skip login and go directly to confirmation
      setShowConfirmation(true)
    } else {
      // User not logged in, show login modal
      setShowLoginModal(true)
    }
  }

  const handleLoginSuccess = (user: any) => {
    setUserData(user)
    setShowLoginModal(false)
    setShowConfirmation(true)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">Book {carName}</h2>
          <button 
            onClick={onClose}
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter pickup location"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Return Location
              </label>
              <input
                type="text"
                name="returnLocation"
                value={formData.returnLocation}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter return location"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Pickup Date & Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Return Date & Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  className="input"
                  min={getMinReturnDate()}
                  required
                />
                <input
                  type="time"
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleInputChange}
                  className="input"
                  min={formData.pickupDate === formData.returnDate ? getMinReturnTime() : '00:00'}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Rental Type
            </label>
            <select
              name="rentalType"
              value={formData.rentalType}
              onChange={handleInputChange}
              className="input"
              required
            >
              <option value="hourly">Hourly - ₹{pricePerHour}/hour</option>
              <option value="12hour">12 Hours - ₹{price12Hour}</option>
              <option value="24hour">24 Hours - ₹{price24Hour}</option>
              <option value="daily">Daily - ₹{pricePerDay}/day</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="input"
              rows={3}
              placeholder="Any special requirements or notes"
              maxLength={500}
            />
          </div>

          {totalAmount > 0 && (
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-black dark:text-gray-400">Duration:</span>
                  <span className="text-black dark:text-white">
                    {(() => {
                      if (!formData.pickupDate || !formData.returnDate) return ''
                      const pickup = new Date(`${formData.pickupDate}T${formData.pickupTime}`)
                      const returnDateTime = new Date(`${formData.returnDate}T${formData.returnTime}`)
                      const hours = Math.ceil((returnDateTime.getTime() - pickup.getTime()) / (1000 * 3600))
                      const days = Math.floor(hours / 24)
                      const remainingHours = hours % 24
                      
                      if (days > 0) {
                        return remainingHours > 0 ? `${days} day${days > 1 ? 's' : ''} ${remainingHours} hour${remainingHours > 1 ? 's' : ''}` : `${days} day${days > 1 ? 's' : ''}`
                      }
                      return `${hours} hour${hours > 1 ? 's' : ''}`
                    })()} 
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-black dark:text-white">Total Amount:</span>
                  <span className="text-2xl font-bold text-black dark:text-white">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {totalAmount > 0 ? 
                (isLoggedIn ? `Proceed to Payment - ₹${totalAmount}` : `Login & Book - ₹${totalAmount}`) : 
                'Find Car'
              }
            </button>
          </div>
        </form>
      </div>
      
      <LoginModal
        isOpen={showLoginModal && !isLoggedIn}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <BookingConfirmation
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false)
          onClose()
        }}
        bookingData={{
          carId,
          carName,
          ...formData,
          totalAmount
        }}
        userData={userData}
      />
    </div>
  )
}