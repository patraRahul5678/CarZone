import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')
    
    if (!token) {
      setIsAuthenticated(false)
      return
    }

    setIsAuthenticated(true)
    setIsAdmin(userRole === 'admin')
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-black dark:text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    toast.error('Please login to access this page')
    return <Navigate to="/" replace />
  }

  if (requireAdmin && !isAdmin) {
    toast.error('Admin access required')
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}