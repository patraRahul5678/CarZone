import { useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    return formData.name.trim() !== '' &&
           formData.email.trim() !== '' &&
           formData.message.trim() !== ''
  }
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            About CarZone
          </h1>
          <p className="text-xl text-black dark:text-gray-400 max-w-3xl mx-auto">
            Your trusted partner for car rentals in Bhubaneswar and Cuttack. 
            We make car sharing simple, affordable, and convenient.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Our Mission</h2>
            <p className="text-black dark:text-gray-400 mb-4">
              At CarZone, we believe everyone should have access to reliable transportation. 
              Our mission is to connect car owners with renters, creating a sustainable 
              and efficient car-sharing ecosystem.
            </p>
            <p className="text-black dark:text-gray-400">
              We're committed to providing safe, clean, and well-maintained vehicles 
              while offering competitive pricing and exceptional customer service.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Why Choose CarZone?</h3>
            <ul className="space-y-3 text-black dark:text-gray-400">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3"></span>
                Wide selection of vehicles
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3"></span>
                Competitive hourly & daily rates
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3"></span>
                24/7 customer support
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3"></span>
                Easy booking process
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3"></span>
                Verified car owners
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-black dark:text-white mb-2">500+</div>
            <div className="text-black dark:text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black dark:text-white mb-2">50+</div>
            <div className="text-black dark:text-gray-400">Available Cars</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black dark:text-white mb-2">2</div>
            <div className="text-black dark:text-gray-400">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black dark:text-white mb-2">24/7</div>
            <div className="text-black dark:text-gray-400">Support Available</div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Car Rental</h3>
              <p className="text-black dark:text-gray-400">
                Rent cars by the hour, day, or longer periods with flexible pricing options.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">List Your Car</h3>
              <p className="text-black dark:text-gray-400">
                Earn money by listing your car on our platform when you're not using it.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-1.106-1.106A6.003 6.003 0 004 10c0 .639.1 1.255.283 1.836l1.555-1.555zM6.117 6.117l1.394 1.394a4.006 4.006 0 012.963.001l1.394-1.394A5.989 5.989 0 0010 4c-.657 0-1.297.097-1.883.283z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">24/7 Support</h3>
              <p className="text-black dark:text-gray-400">
                Round-the-clock customer support to help you with any questions or issues.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6 text-center">Get in Touch</h2>
          <p className="text-black dark:text-gray-400 mb-8 text-center">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="input"
                  rows={4}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold text-black dark:text-white mb-4">Contact Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-5 h-5 text-black dark:text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Email</h4>
                    <p className="text-black dark:text-gray-400">carzonerentalbbsr@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-5 h-5 text-black dark:text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Phone</h4>
                    <p className="text-black dark:text-gray-400">+91 7377000711</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-5 h-5 text-black dark:text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Office</h4>
                    <p className="text-black dark:text-gray-400">Bhubaneswar & Cuttack, Odisha</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-5 h-5 text-black dark:text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Support Hours</h4>
                    <p className="text-black dark:text-gray-400">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}