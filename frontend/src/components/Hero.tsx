import { useState } from 'react'
import BookingCard from './BookingCard'
import ListCarForm from './ListCarForm'

export default function Hero() {
    const [showListCarForm, setShowListCarForm] = useState(false)
    const [highlightBooking, setHighlightBooking] = useState(false)

    const handleRentCarClick = () => {
        setHighlightBooking(true)
        setTimeout(() => setHighlightBooking(false), 3000)
    }
    return (
        <section id="home" className="bg-white dark:bg-black pt-20 pb-16 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[80vh]">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 md:mb-6 leading-tight">
                            Rent a car with CarZone
                        </h1>
                        <p className="text-lg sm:text-xl md:text-xl text-black dark:text-gray-400 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
                            Book a car, pick it up, and drive. Choose from multiple vehicle types and find one that fits your needs.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 justify-center lg:justify-start">
                            <button 
                                onClick={handleRentCarClick}
                                className="btn-primary text-sm md:text-base"
                            >
                                Rent a car
                            </button>
                            <button 
                                onClick={() => setShowListCarForm(true)}
                                className="btn-secondary text-sm md:text-base"
                            >
                                List your car
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-6 md:gap-8 text-sm text-black dark:text-gray-500 justify-center lg:justify-start">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                                Available 24/7
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                                Fully insured
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-8 lg:mt-0">
                        <div className={`transition-all duration-500 ${highlightBooking ? 'ring-4 ring-blue-500 ring-opacity-50 scale-105' : ''}`}>
                            <BookingCard />
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 md:mt-16 text-center">
                    <img 
                        src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Car" 
                        className="mx-auto max-w-sm md:max-w-md w-full h-40 md:h-48 object-cover rounded card-shadow"
                    />
                </div>
            </div>
            
            {showListCarForm && (
                <ListCarForm 
                    isOpen={showListCarForm} 
                    onClose={() => setShowListCarForm(false)} 
                />
            )}
        </section>
    )
}