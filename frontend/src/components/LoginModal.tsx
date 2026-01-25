import { useState } from 'react'
import toast from 'react-hot-toast'
import { authAPI } from '../services/api'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (userData: any) => void
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async () => {
    setLoading(true)
    try {
      const response = isRegister 
        ? await authAPI.register({ name, email, password })
        : await authAPI.login({ email, password })
        
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userRole', response.data.user.role || 'user')
        toast.success(response.data.message || 'Authentication successful! Welcome to CarZone 🚗')
        onLoginSuccess(response.data.user)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black dark:text-white">Login to continue booking</h2>
          <button onClick={onClose} className="text-black dark:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Email Login */}
          <div className="space-y-4">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-1 mb-4">
              <button
                onClick={() => setIsRegister(false)}
                className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                  !isRegister
                    ? 'bg-white dark:bg-black text-black dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsRegister(true)}
                className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                  isRegister
                    ? 'bg-white dark:bg-black text-black dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Register
              </button>
            </div>
            
            {isRegister && (
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            )}
            
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            
            <button
              onClick={handleEmailLogin}
              disabled={loading || !email || !password || (isRegister && !name)}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}