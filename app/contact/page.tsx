"use client";
import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' | null }>({
        message: '',
        type: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/riciru', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setSubmitStatus({
                    message: 'Thank you! Your message has been sent successfully.',
                    type: 'success'
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            setSubmitStatus({
                message: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return ( 
        <div className="container mx-auto px-4 my-30 py-8">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
            <div>
                {submitStatus.type && (
                    <div className={`mb-4 p-3 rounded ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {submitStatus.message}
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1">Message</label>
                        <textarea 
                            id="message" 
                            rows={4} 
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-3">Email: info@lumbinilions.com</p>
                <p className="mb-3">Phone: +977 123 456 7890</p>
                <p className="mb-3">Address: Lumbini, Nepal</p>
                <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/lumbinilions" className="hover:text-blue-600">Facebook</a>
                    <a href="#" className="hover:text-blue-400">Twitter</a>
                    <a href="https://www.instagram.com/lumbinilions/" className="hover:text-pink-600">Instagram</a>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}
 
export default ContactPage;