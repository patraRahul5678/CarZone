import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { carAPI } from '../services/api'

interface ListCarFormProps {
  isOpen?: boolean
  carToEdit?: any
  onClose: () => void
}

export default function ListCarForm({ isOpen = true, carToEdit, onClose }: ListCarFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Economy',
    pricePerHour: '',
    price12Hour: '',
    price24Hour: '',
    pricePerDay: '',
    seats: 4,
    transmission: 'Manual',
    fuelType: 'Petrol',
    mileage: '',
    color: 'White',
    features: '',
    city: '',
    address: ''
  })
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (carToEdit) {
      setFormData({
        name: carToEdit.name,
        brand: carToEdit.brand,
        model: carToEdit.model,
        year: carToEdit.year,
        category: carToEdit.category,
        pricePerHour: carToEdit.pricePerHour.toString(),
        price12Hour: carToEdit.price12Hour.toString(),
        price24Hour: carToEdit.price24Hour.toString(),
        pricePerDay: carToEdit.pricePerDay.toString(),
        seats: carToEdit.specifications.seats,
        transmission: carToEdit.specifications.transmission,
        fuelType: carToEdit.specifications.fuelType,
        mileage: carToEdit.specifications.mileage?.toString() || '',
        color: carToEdit.specifications.color || 'White',
        features: carToEdit.features?.join(', ') || '',
        city: carToEdit.location.city,
        address: carToEdit.location.address
      })
    }
  }, [carToEdit])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString())
      })
      
      formDataToSend.append('specifications[seats]', formData.seats.toString())
      formDataToSend.append('specifications[transmission]', formData.transmission)
      formDataToSend.append('specifications[fuelType]', formData.fuelType)
      formDataToSend.append('specifications[mileage]', formData.mileage)
      formDataToSend.append('specifications[color]', formData.color)
      formDataToSend.append('location[city]', formData.city)
      formDataToSend.append('location[address]', formData.address)
      
      const features = formData.features.split(',').map(f => f.trim()).filter(f => f)
      features.forEach((feature, index) => {
        formDataToSend.append(`features[${index}]`, feature)
      })
      
      selectedImages.forEach(image => {
        formDataToSend.append('images', image)
      })

      if (carToEdit) {
        await carAPI.updateCar(carToEdit._id, formDataToSend)
        toast.success('Car updated successfully! 🚗')
      } else {
        await carAPI.createCar(formDataToSend)
        toast.success('Car listed successfully! 🚗')
      }
      onClose()
    } catch (error: any) {
      console.error('Error:', error)
      if (error.response?.status === 401) {
        toast.error('Please sign in to list your car')
      } else {
        toast.error(error.response?.data?.message || 'Failed to save car. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">{carToEdit ? 'Edit Car' : 'List Your Car'}</h2>
          <button 
            onClick={onClose}
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Car Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input" placeholder="e.g., Maruti Swift" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Brand *</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="input" placeholder="e.g., Maruti" required />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Model *</label>
                <input type="text" name="model" value={formData.model} onChange={handleInputChange} className="input" placeholder="e.g., Swift VXI" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Year *</label>
                <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="input" min="2000" max={new Date().getFullYear() + 1} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="input" required>
                  <option value="Economy">Economy</option>
                  <option value="Compact">Compact</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                  <option value="SUV">SUV</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Pricing</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Price per Hour (₹) *</label>
                <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleInputChange} className="input" placeholder="49" min="1" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">12 Hour Price (₹) *</label>
                <input type="number" name="price12Hour" value={formData.price12Hour} onChange={handleInputChange} className="input" placeholder="500" min="1" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">24 Hour Price (₹) *</label>
                <input type="number" name="price24Hour" value={formData.price24Hour} onChange={handleInputChange} className="input" placeholder="900" min="1" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Daily Price (₹) *</label>
                <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleInputChange} className="input" placeholder="1200" min="1" required />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Specifications</h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Seats *</label>
                <select name="seats" value={formData.seats} onChange={handleInputChange} className="input" required>
                  <option value={2}>2 Seats</option>
                  <option value={4}>4 Seats</option>
                  <option value={5}>5 Seats</option>
                  <option value={7}>7 Seats</option>
                  <option value={8}>8 Seats</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Transmission *</label>
                <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="input" required>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Fuel Type *</label>
                <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="input" required>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Mileage (km/l)</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} className="input" placeholder="15" min="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Color</label>
                <input type="text" name="color" value={formData.color} onChange={handleInputChange} className="input" placeholder="White" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Location</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="input" placeholder="e.g., Bhubaneswar" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="input" placeholder="Full address" required />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Additional Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Features (comma separated)</label>
                <input type="text" name="features" value={formData.features} onChange={handleInputChange} className="input" placeholder="AC, Power Steering, Music System, GPS" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Car Images (Max 5)</label>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="input" />
                {selectedImages.length > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedImages.length} image(s) selected</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50">
              {loading ? (carToEdit ? 'Updating...' : 'Listing...') : (carToEdit ? 'Update Car' : 'List My Car')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
