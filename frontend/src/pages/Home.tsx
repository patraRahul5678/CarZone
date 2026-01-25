import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CarShowcase from '../components/CarShowcase'
import AvailableCars from '../components/AvailableCars'
import PricingSection from '../components/PricingSection'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
            <Navbar />
            <Hero />
            <CarShowcase />
            <ErrorBoundary>
                <AvailableCars />
            </ErrorBoundary>
            <PricingSection />
            <Testimonials />
            <ContactSection />
            <Footer />
        </div>
    )
}