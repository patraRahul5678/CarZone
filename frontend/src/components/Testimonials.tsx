export default function Testimonials() {
    const testimonials = [
        {
            name: "Rajesh Patel",
            role: "Software Engineer",
            location: "Bhubaneswar",
            text: "CarZone made my daily commute from Patia to Infocity so convenient. Clean cars and affordable rates!",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Priya Sharma",
            role: "Marketing Manager",
            location: "Cuttack",
            text: "Perfect for weekend trips to Puri and Konark. Always have great cars available in Cuttack!",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Amit Kumar",
            role: "Business Owner",
            location: "Bhubaneswar",
            text: "Excellent service for client meetings across Bhubaneswar. Professional and reliable every time.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    ]

    return (
        <section className="bg-white dark:bg-black py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                        What our customers say
                    </h2>
                    <p className="text-lg text-black dark:text-gray-400">Join thousands of satisfied customers</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white dark:bg-black p-6 rounded card-shadow border border-gray-100 dark:border-gray-800 transition-colors duration-200">
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-black dark:text-white fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                    </svg>
                                ))}
                            </div>
                            
                            <p className="text-black dark:text-gray-300 mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>
                            
                            <div className="flex items-center">
                                <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h4 className="font-bold text-black dark:text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-black dark:text-gray-400">{testimonial.role}</p>
                                    <p className="text-xs text-black dark:text-gray-500">{testimonial.location}, Odisha</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}