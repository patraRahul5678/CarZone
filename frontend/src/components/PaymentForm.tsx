import { useState } from 'react'
import { bookingAPI } from '../services/api'
import toast from 'react-hot-toast'

// Declare Razorpay for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentFormProps {
  amount: number
  onSuccess: () => void
  onCancel: () => void
  userData: {
    name: string
    email: string
    phone: string
  }
}

function PaymentMethodSelector({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'netbanking'>('card')
  const [loading, setLoading] = useState(false)
  const [upiId, setUpiId] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      console.log('Starting payment process...')
      console.log('Starting payment process...')
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Payment simulation complete, creating booking...')
      
      // Create booking after payment
      const bookingResponse = await bookingAPI.createBooking({
        totalAmount: amount
      })
      
      console.log('Booking API response:', bookingResponse)
      
      if (bookingResponse?.data?.success) {
        toast.success(`${selectedMethod.toUpperCase()} Payment successful! Booking confirmed! Check your email. 📧`)
        onSuccess()
      } else {
        console.error('Booking creation failed:', bookingResponse)
        toast.error('Booking creation failed')
      }
    } catch (error) {
      console.error('Payment/Booking error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Payment failed'
      toast.error(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const isPaymentReady = () => {
    if (selectedMethod === 'card') return cardNumber.length >= 16
    if (selectedMethod === 'upi') return upiId.length > 0
    if (selectedMethod === 'netbanking') return selectedBank.length > 0
    return false
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <h3 className="font-bold text-black dark:text-white mb-4">Select Payment Method</h3>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={selectedMethod === 'card'}
              onChange={(e) => setSelectedMethod(e.target.value as 'card')}
              className="text-black"
            />
            <div className="flex-1">
              <div className="font-medium text-black dark:text-white">Credit/Debit Cards</div>
              <div className="text-sm text-gray-500">Pay using Visa, Mastercard, American Express</div>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Visa</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Mastercard</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Amex</span>
              </div>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={selectedMethod === 'upi'}
              onChange={(e) => setSelectedMethod(e.target.value as 'upi')}
              className="text-black"
            />
            <div className="flex-1">
              <div className="font-medium text-black dark:text-white">UPI Payment</div>
              <div className="text-sm text-gray-500">Pay using Google Pay, PhonePe, Paytm, BHIM</div>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">GPay</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">PhonePe</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Paytm</span>
              </div>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="netbanking"
              checked={selectedMethod === 'netbanking'}
              onChange={(e) => setSelectedMethod(e.target.value as 'netbanking')}
              className="text-black"
            />
            <div className="flex-1">
              <div className="font-medium text-black dark:text-white">Net Banking</div>
              <div className="text-sm text-gray-500">Pay using your bank account</div>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">SBI</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">HDFC</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">ICICI</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-black dark:text-white">Total Amount:</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{amount}</span>
        </div>
      </div>

      <div className="space-y-4">
        {selectedMethod === 'card' && (
          <div className="bg-white dark:bg-black p-4 rounded border border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Card Number (e.g., 4242424242424242)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="MM/YY" className="p-2 border rounded" />
              <input type="text" placeholder="CVV" className="p-2 border rounded" />
            </div>
          </div>
        )}
        
        {selectedMethod === 'upi' && (
          <div className="bg-white dark:bg-black p-4 rounded border border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Enter UPI ID (e.g., user@paytm)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        
        {selectedMethod === 'netbanking' && (
          <div className="bg-white dark:bg-black p-4 rounded border border-gray-200 dark:border-gray-700">
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="kotak">Kotak Mahindra Bank</option>
            </select>
          </div>
        )}
        
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading || !isPaymentReady()}
            className="flex-1 btn-primary disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Pay ₹${amount}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PaymentForm(props: PaymentFormProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">Payment</h2>
          <button onClick={props.onCancel} className="text-black dark:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <PaymentMethodSelector {...props} />
      </div>
    </div>
  )
}