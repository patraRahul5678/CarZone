import { useState } from 'react'
import CarsModal from './CarsModal'

export default function BookingCard() {
    const [showCarsModal, setShowCarsModal] = useState(false)
    const [formData, setFormData] = useState({
        pickupLocation: '',
        returnLocation: '',
        pickupDate: '',
        pickupTime: '10:00',
        carType: 'Economy - ₹49/day'
    })
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    const isFormValid = () => {
        if (formData.pickupLocation.trim() === '' ||
            formData.returnLocation.trim() === '' ||
            formData.pickupDate === '') {
            return false
        }
        
        // Date validation
        const today = new Date()
        const pickupDateTime = new Date(`${formData.pickupDate}T${formData.pickupTime}`)
        
        // Pickup must be at least current time or later
        return pickupDateTime >= today
    }
    
    const handleFindCars = () => {
        if (isFormValid()) {
            setShowCarsModal(true)
        }
    }

    return (
        <div className="w-full max-w-sm sm:max-w-md mx-auto">
            <div className="booking-card bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded p-4 sm:p-6 card-shadow transition-all duration-500">
                <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 sm:mb-6 text-center">
                    Book a car now
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <input 
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleInputChange}
                            className="input text-sm sm:text-base" 
                            placeholder="Pickup location"
                            required
                        />
                    </div>
                    
                    <div>
                        <input 
                            name="returnLocation"
                            value={formData.returnLocation}
                            onChange={handleInputChange}
                            className="input text-sm sm:text-base" 
                            placeholder="Return location"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <input 
                            name="pickupDate"
                            value={formData.pickupDate}
                            onChange={handleInputChange}
                            className="input text-sm sm:text-base" 
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                        <input 
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleInputChange}
                            className="input text-sm sm:text-base" 
                            type="time"
                        />
                    </div>
                    
                    <div>
                        <select 
                            name="carType"
                            value={formData.carType}
                            onChange={handleInputChange}
                            className="input text-sm sm:text-base"
                        >
                            <option>Economy - ₹49/day</option>
                            <option>Compact - ₹69/day</option>
                            <option>Premium - ₹149/day</option>
                            <option>Luxury - ₹299/day</option>
                        </select>
                    </div>
                    
                    <button 
                        onClick={handleFindCars}
                        disabled={!isFormValid()}
                        className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black py-3 sm:py-4 rounded font-medium text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Find cars
                    </button>
                    
                    <div className="text-center pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-xs text-black dark:text-gray-500">Free cancellation • Full insurance • 24/7 support</p>
                    </div>
                </div>
            </div>
            
            <CarsModal 
                isOpen={showCarsModal} 
                onClose={() => setShowCarsModal(false)} 
            />
        </div>
    )
}