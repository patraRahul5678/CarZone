import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 py-12 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            
                            <h3 className="text-lg font-bold text-black dark:text-white">CarZone</h3>
                        </Link>
                        <p className="text-black dark:text-gray-400 text-sm">
                            Your trusted car rental partner in Bhubaneswar and Cuttack. Simple, reliable, and affordable.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-black dark:text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-black dark:text-gray-400">
                            <li><Link to="/" className="hover:text-gray-600 dark:hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-gray-600 dark:hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-black dark:text-white mb-4">Contact</h4>
                        <div className="space-y-2 text-sm text-black dark:text-gray-400">
                            <p>
                                <a href="tel:+917377000711" className="hover:text-gray-600 dark:hover:text-white transition-colors">
                                    +91 7377000711
                                </a>
                            </p>
                            <p>
                                <a href="mailto:carzonerentalbbsr@gmail.com" className="hover:text-gray-600 dark:hover:text-white transition-colors">
                                    carzonerentalbbsr@gmail.com
                                </a>
                            </p>
                            <p>Bhubaneswar & Cuttack, Odisha</p>
                            <p>24/7 Support Available</p>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-100 dark:border-gray-700 pt-8 text-center">
                    <p className="text-sm text-black dark:text-gray-400">
                        © {new Date().getFullYear()} CarZone Rentals. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}