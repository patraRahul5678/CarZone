import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function Navigation() {
    const { theme, toggleTheme } = useTheme()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const handleToggle = () => {
        toggleTheme()
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const isLoggedIn = localStorage.getItem('token')

    const ThemeIcon = () => (
        theme === 'dark' ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
        )
    )

    return (
        <nav className="fixed top-0 w-full z-50 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 transition-colors duration-200">
            <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-3 md:py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-black dark:bg-white rounded flex items-center justify-center">
                            <span className="text-white dark:text-black font-bold text-base md:text-lg">C</span>
                        </div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white">CarZone</h1>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <a href="#home" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium transition-colors duration-200">Rent</a>
                        <a href="#pricing" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium transition-colors duration-200">Fleet</a>
                        
                        {isLoggedIn && (
                            <div className="relative">
                                <button 
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium transition-colors duration-200"
                                >
                                    My Account
                                </button>
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
                                        <a href="/my-rentals" className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">My Rentals</a>
                                        <a href="/my-cars" className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">My Cars</a>
                                        <button 
                                            onClick={() => {
                                                localStorage.removeItem('token')
                                                window.location.reload()
                                            }}
                                            className="block w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <button 
                            onClick={handleToggle}
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                            aria-label="Toggle theme"
                            type="button"
                        >
                            <ThemeIcon />
                        </button>
                        
                        {!isLoggedIn && (
                            <button className="bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black px-4 md:px-6 py-2 rounded font-medium transition-all duration-200">
                                Sign up
                            </button>
                        )}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-2 sm:gap-3">
                        <button 
                            onClick={handleToggle}
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                            aria-label="Toggle theme"
                            type="button"
                        >
                            <ThemeIcon />
                        </button>
                        
                        <button 
                            onClick={toggleMobileMenu}
                            className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors duration-200"
                            aria-label="Toggle menu"
                            type="button"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900">
                    <div className="px-4 sm:px-6 md:px-8 py-4 space-y-3 md:space-y-4">
                        <a href="#home" className="block text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium py-2 transition-colors duration-200">Rent</a>
                        <a href="#pricing" className="block text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium py-2 transition-colors duration-200">Fleet</a>
                        
                        {isLoggedIn ? (
                            <>
                                <a href="/my-rentals" className="block text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium py-2 transition-colors duration-200">My Rentals</a>
                                <a href="/my-cars" className="block text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium py-2 transition-colors duration-200">My Cars</a>
                                <button 
                                    onClick={() => {
                                        localStorage.removeItem('token')
                                        window.location.reload()
                                    }}
                                    className="block w-full text-left text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium py-2 transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black px-6 py-3 rounded font-medium transition-all duration-200 mt-4">
                                Sign up
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}