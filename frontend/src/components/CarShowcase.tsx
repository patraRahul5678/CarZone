import { useState, useEffect } from 'react'
import { carAPI } from '../services/api'

interface Car {
  _id: string
  name: string
  category: string
  pricePerHour: number
  specifications: {
    seats: number
  }
  images: Array<{ url: string; alt: string }>
  availability: boolean
}

export default function CarShowcase() {
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCars()
    }, [])

    const fetchCars = async () => {
        try {
            const response = await carAPI.getCars()
            console.log('Full response:', response)
            if (response?.data) {
                const allCars = response.data.data || response.data || []
                console.log('Cars data:', allCars)
                const validCars = allCars.filter((car: any) => car && car._id)
                setCars(validCars.slice(0, 5))
            }
        } catch (error) {
            console.error('Error fetching cars:', error)
        } finally {
            setLoading(false)
        }
    }

    const scrollToBooking = () => {
        const homeSection = document.getElementById('home')
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' })
            
            const bookingCard = homeSection.querySelector('.booking-card')
            if (bookingCard) {
                bookingCard.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-50', 'scale-105')
                setTimeout(() => {
                    bookingCard.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50', 'scale-105')
                }, 3000)
            }
        }
    }

    if (loading) {
        return (
            <section className="bg-white dark:bg-black py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="text-black dark:text-white">Loading cars...</div>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-white dark:bg-black py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                        Choose your car
                    </h2>
                    <p className="text-lg text-black dark:text-gray-400">Select the vehicle that works best for your trip</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                    {cars.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-black dark:text-gray-400">No cars available at the moment.</p>
                            <p className="text-sm text-gray-500 mt-2">Please check back later.</p>
                        </div>
                    ) : (
                        cars.map((car) => (
                            <div 
                                key={car._id} 
                                onClick={scrollToBooking}
                                className="bg-white dark:bg-black rounded-lg p-4 card-shadow hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-800"
                            >
                                {car.images && car.images.length > 0 ? (
                                    <img 
                                        src={car.images[0].url} 
                                        alt={car.images[0].alt}
                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                                        <span className="text-gray-500 text-sm">No Image</span>
                                    </div>
                                )}
                                
                                <div className="space-y-2">
                                    <h3 className="text-base font-bold text-black dark:text-white truncate">{car.name}</h3>
                                    <p className="text-xs text-black dark:text-gray-400">{car.category}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-black dark:text-gray-500">{car.specifications.seats} seats</span>
                                        <div className="text-sm font-bold text-blue-600 dark:text-blue-400">₹{car.pricePerHour}/hr</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}