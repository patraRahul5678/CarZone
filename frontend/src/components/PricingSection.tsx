export default function PricingSection() {
    const pricingTiers = [
        {
            name: "Economy",
            hourly: 50,
            daily: 1200,
            features: ["Basic insurance", "24/7 support", "Free cancellation"],
            popular: false
        },
        {
            name: "Premium",
            hourly: 120,
            daily: 2500,
            features: ["Full insurance", "GPS navigation", "Premium support", "Free cancellation"],
            popular: true
        },
        {
            name: "Luxury",
            hourly: 300,
            daily: 7500,
            features: ["Comprehensive insurance", "Concierge service", "Priority support", "Free cancellation"],
            popular: false
        }
    ]

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

    return (
        <section id="pricing" className="bg-white dark:bg-black py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-black dark:text-gray-400 mb-8">
                        No hidden fees. No surprises. Choose the plan that works for you.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div 
                            key={index} 
                            className={`relative bg-white dark:bg-black rounded-lg p-6 border transition-all duration-200 ${
                                tier.popular 
                                    ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20 scale-105' 
                                    : 'border-gray-200 dark:border-gray-800'
                            } card-shadow hover:shadow-lg`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white mb-2">{tier.name}</h3>
                                <div className="text-3xl font-bold text-black dark:text-white mb-1">
                                    ₹{tier.hourly}<span className="text-lg font-normal text-black dark:text-gray-400">/hour</span>
                                </div>
                                <div className="text-lg text-black dark:text-gray-400">
                                    ₹{tier.daily}/day
                                </div>
                            </div>
                            
                            <ul className="space-y-3 mb-6">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-sm text-black dark:text-gray-300">
                                        <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            
                            <button 
                                onClick={scrollToBooking}
                                className={`w-full py-3 rounded font-medium transition-all duration-200 ${
                                    tier.popular
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                        : 'bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black'
                                }`}
                            >
                                Book {tier.name}
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 max-w-4xl mx-auto">
                        <h3 className="text-xl font-bold text-black dark:text-white mb-4">All plans include:</h3>
                        <div className="grid md:grid-cols-4 gap-4 text-sm text-black dark:text-gray-400">
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Fuel included
                            </div>
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                No security deposit
                            </div>
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Flexible timing
                            </div>
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Clean & sanitized
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}