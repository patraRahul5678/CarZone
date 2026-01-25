import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields')
            return
        }

        setIsSubmitting(true)
        
        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                toast.success('Message sent successfully! We\'ll get back to you soon.')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                })
            } else {
                throw new Error('Failed to send message')
            }
        } catch (error) {
            toast.error('Failed to send message. Please try again or contact us directly.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="bg-white dark:bg-black py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                        Get in touch
                    </h2>
                    <p className="text-lg text-black dark:text-gray-400">
                        Have questions? We're here to help.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white dark:bg-black rounded p-8 border border-gray-100 dark:border-gray-800">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <input 
                            className="input" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name *" 
                            required
                        />
                        <input 
                            className="input" 
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email *" 
                            required
                        />
                        <input 
                            className="input" 
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone" 
                        />
                        <input 
                            className="input" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject" 
                        />
                    </div>
                    <textarea 
                        className="input mb-6" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message *" 
                        rows={4}
                        required
                    />
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                </form>
                
                <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
                    <div>
                        <h4 className="font-bold text-black dark:text-white mb-2">Call us</h4>
                        <p className="text-black dark:text-gray-400">+91 7377000711</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-black dark:text-white mb-2">Email us</h4>
                        <p className="text-black dark:text-gray-400">carzonerentalbbsr@gmail.com</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-black dark:text-white mb-2">Support</h4>
                        <p className="text-black dark:text-gray-400">24/7 Customer Service</p>
                    </div>
                </div>
            </div>
        </section>
    )
}