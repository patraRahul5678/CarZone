import { useState } from 'react'
import PaymentForm from './PaymentForm'
import toast from 'react-hot-toast'

interface BookingConfirmationProps {
  isOpen: boolean
  onClose: () => void
  bookingData: {
    carId: string
    carName: string
    pickupDate: string
    returnDate: string
    pickupTime: string
    returnTime: string
    pickupLocation: string
    returnLocation: string
    rentalType: string
    totalAmount: number
    notes: string
  }
  userData: {
    name: string
    phone: string
    email: string
  }
}

export default function BookingConfirmation({ 
  isOpen, 
  onClose, 
  bookingData, 
  userData 
}: BookingConfirmationProps) {
  const [showPayment, setShowPayment] = useState(false)
  
  const handleConfirmBooking = () => {
    setShowPayment(true)
  }

  const handlePaymentSuccess = () => {
    toast.success('Booking confirmed successfully! 🎉')
    setShowPayment(false)
    onClose()
  }

  const handlePaymentCancel = () => {
    setShowPayment(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">Confirm Your Booking</h2>
          <button onClick={onClose} className="text-black dark:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* User Details */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="font-bold text-black dark:text-white mb-3">Customer Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Name:</span>
                <span className="text-black dark:text-white font-medium">{userData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Phone:</span>
                <span className="text-black dark:text-white font-medium">{userData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Email:</span>
                <span className="text-black dark:text-white font-medium">{userData.email}</span>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="font-bold text-black dark:text-white mb-3">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Car:</span>
                <span className="text-black dark:text-white font-medium">{bookingData.carName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Rental Type:</span>
                <span className="text-black dark:text-white font-medium capitalize">{bookingData.rentalType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Pickup:</span>
                <span className="text-black dark:text-white font-medium">
                  {new Date(bookingData.pickupDate).toLocaleDateString()} {bookingData.pickupTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Return:</span>
                <span className="text-black dark:text-white font-medium">
                  {new Date(bookingData.returnDate).toLocaleDateString()} {bookingData.returnTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Pickup Location:</span>
                <span className="text-black dark:text-white font-medium">{bookingData.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black dark:text-gray-400">Return Location:</span>
                <span className="text-black dark:text-white font-medium">{bookingData.returnLocation}</span>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-black dark:text-white">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{bookingData.totalAmount}</span>
            </div>
          </div>

          {/* Terms */}
          <div className="text-xs text-black dark:text-gray-400 space-y-1">
            <p>• Free cancellation up to 2 hours before pickup</p>
            <p>• Full insurance coverage included</p>
            <p>• 24/7 roadside assistance available</p>
            <p>• Valid driving license required at pickup</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              className="flex-1 btn-primary"
            >
              Pay ₹{bookingData.totalAmount}
            </button>
          </div>
        </div>
      </div>
      
      {showPayment && (
        <PaymentForm
          amount={bookingData.totalAmount}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          userData={userData}
        />
      )}
    </div>
  )
}