import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import CarsModal from './CarsModal'
import ListCarForm from './ListCarForm'
import LoginModal from './LoginModal'

export default function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showCarsModal, setShowCarsModal] = useState(false)
    const [showListCarForm, setShowListCarForm] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [activeButton, setActiveButton] = useState<'rent' | 'list' | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userRole = localStorage.getItem('userRole')
        setIsLoggedIn(!!token)
        setIsAdmin(!!token && userRole === 'admin')
    }, [])

    const handleToggle = () => {
        toggleTheme()
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleRentClick = () => {
        setActiveButton('rent')
        setShowCarsModal(true)
        setIsMobileMenuOpen(false)
    }

    const handleListClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true)
            return
        }
        setActiveButton('list')
        setShowListCarForm(true)
        setIsMobileMenuOpen(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userRole')
        setIsLoggedIn(false)
        setIsAdmin(false)
    }

    const handleCloseModals = () => {
        setShowCarsModal(false)
        setShowListCarForm(false)
        setShowLoginModal(false)
        setActiveButton(null)
    }

    const handleLoginSuccess = (userData: any) => {
        console.log('User logged in:', userData)
        localStorage.setItem('userRole', userData.role || 'user')
        setIsLoggedIn(true)
        setIsAdmin(userData.role === 'admin')
        setShowLoginModal(false)
    }

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
        <nav className="sticky top-0 w-full z-50 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 transition-colors duration-200">
            <div className="px-4 sm:px-6 md:px-8 lg:px-16">
                <div className="flex justify-between items-center">

                    <Link to="/">
                        <img className='w-18 h-18 md:w-30 md:h-29' src="../gg.png" alt="CarZone" />
                    </Link>

                    {/* Desktop Menu (lg and up) */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <button
                            onClick={handleRentClick}
                            className={`font-medium transition-all duration-200 px-3 py-1 rounded ${activeButton === 'rent'
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            Rent
                        </button>
                        <button
                            onClick={handleListClick}
                            className={`font-medium transition-all duration-200 px-3 py-1 rounded ${activeButton === 'list'
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            List
                        </button>
                        <Link
                            to="/about"
                            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium transition-colors duration-200"
                        >
                            About
                        </Link>

                        <button
                            onClick={handleToggle}
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                            aria-label="Toggle theme"
                            type="button"
                        >
                            <ThemeIcon />
                        </button>

                        {isAdmin ? (
                            <Link
                                to="/admin"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded font-medium transition-all duration-200"
                            >
                                Admin
                            </Link>
                        ) : isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 md:px-6 py-2 rounded font-medium transition-all duration-200 text-red-700 hover:text-red-800"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="px-4 md:px-6 py-2 rounded font-medium transition-all duration-200 text-red-700"
                            >
                                Sign up
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button (md and below) */}
                    <div className="lg:hidden flex items-center gap-2">
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
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="px-4 sm:px-6 md:px-8 py-4 space-y-3">
                        <button
                            onClick={handleRentClick}
                            className={`block w-full text-left font-medium py-2 transition-all duration-200 px-3 rounded ${activeButton === 'rent'
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            Rent
                        </button>
                        <button
                            onClick={handleListClick}
                            className={`block w-full text-left font-medium py-2 transition-all duration-200 px-3 rounded ${activeButton === 'list'
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            List
                        </button>
                        <Link
                            to="/about"
                            className="block text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium py-2 transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        {isAdmin ? (
                            <Link
                                to="/admin"
                                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded font-medium transition-all duration-200 text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Admin Dashboard
                            </Link>
                        ) : isLoggedIn ? (
                            <button
                                onClick={() => {
                                    handleLogout()
                                    setIsMobileMenuOpen(false)
                                }}
                                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium transition-all duration-200"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setShowLoginModal(true)
                                    setIsMobileMenuOpen(false)
                                }}
                                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium transition-all duration-200"
                            >
                                Sign up
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Modals */}
            <CarsModal
                isOpen={showCarsModal}
                onClose={handleCloseModals}
            />

            <ListCarForm
                isOpen={showListCarForm}
                onClose={handleCloseModals}
            />

            <LoginModal
                isOpen={showLoginModal}
                onClose={handleCloseModals}
                onLoginSuccess={handleLoginSuccess}
            />
        </nav>
    )
}