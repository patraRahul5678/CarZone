import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'
const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000' : ''

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? API_BASE_URL : "/api",
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // Remove Content-Type for FormData to let axios set it with boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }
  return config
})

// Transform response to add full image URLs
api.interceptors.response.use((response) => {
  if (response.data?.data) {
    const data = response.data.data;
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.images && Array.isArray(item.images)) {
          item.images = item.images.map((img: any) => ({
            ...img,
            url: img.url && !img.url.startsWith('http') ? `${BASE_URL}${img.url}` : img.url
          }))
        }
      })
    } else if (data.images && Array.isArray(data.images)) {
      data.images = data.images.map((img: any) => ({
        ...img,
        url: img.url && !img.url.startsWith('http') ? `${BASE_URL}${img.url}` : img.url
      }))
    }
  }
  return response
})

// API functions
export const carAPI = {
  getCars: (params: any = {}) => api.get('/cars', { params }),
  getCarById: (id: string) => api.get(`/cars/${id}`),
  createCar: (data: any) => api.post('/cars', data),
  updateCar: (id: string, data: any) => api.put(`/cars/${id}`, data),
  deleteCar: (id: string) => api.delete(`/cars/${id}`),
  getMyCars: () => api.get('/cars/user/my-cars')
}

export const bookingAPI = {
  createBooking: (data: any) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getBookingById: (id: string) => api.get(`/bookings/${id}`),
  cancelBooking: (id: string, reason: string) => 
    api.patch(`/bookings/${id}/cancel`, { cancellationReason: reason }),
  getRentalRequests: () => api.get('/bookings/rental-requests'),
  acceptRentalRequest: (id: string) => api.patch(`/bookings/${id}/accept`)
}

export const paymentAPI = {
  createPaymentIntent: (data: any) => api.post('/payments/create-intent', data),
  confirmPayment: (data: any) => api.post('/payments/confirm', data)
}

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) => api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  sendOTP: (data: { phone: string }) => api.post('/auth/send-otp', data),
  verifyOTP: (data: { phone: string; otp: string; name?: string }) => api.post('/auth/verify-otp', data),
  getProfile: () => api.get('/auth/me')
}

export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  getPendingCars: () => api.get('/admin/cars/pending'),
  getAllCars: () => api.get('/admin/cars/all'),
  deleteAdminCar: (id: string) => api.delete(`/admin/cars/${id}`),
  updateAdminCar: (id: string, data: any) => api.put(`/admin/cars/${id}`, data),
  approveCar: (id: string) => api.patch(`/admin/cars/${id}/approve`),
  declineCar: (id: string, reason: string) => api.patch(`/admin/cars/${id}/decline`, { reason }),
  getAllBookings: () => api.get('/admin/bookings'),
  confirmBooking: (id: string) => api.patch(`/admin/bookings/${id}/confirm`),
  cancelBooking: (id: string, reason: string) => api.patch(`/admin/bookings/${id}/cancel`, { reason })
}

export default api
