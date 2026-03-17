'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex-1 w-full">
                <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
                    Contact <span className="gradient-text-accent">Us</span>
                </h1>
                <p className="text-center text-dark-200 mb-12">
                    Have questions? We are here to help. Reach out to our support team and we will get back to you!
                </p>
                
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="glass rounded-3xl p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-6">
                            <Mail className="w-8 h-8 text-primary-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                        <p className="text-dark-200 mb-4">Send us an email anytime, and we'll reply within 24 hours.</p>
                        <a href="mailto:support@skillyukti.com" className="text-primary-400 font-medium hover:text-primary-300">support@skillyukti.com</a>
                    </div>
                    
                    <div className="glass rounded-3xl p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-accent-purple/20 flex items-center justify-center mb-6">
                            <Phone className="w-8 h-8 text-accent-purple" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                        <p className="text-dark-200 mb-4">Available strictly for support requests from 9 AM - 6 PM (IST).</p>
                        <a href="tel:+919876543210" className="text-primary-400 font-medium hover:text-primary-300">+91 98765 43210</a>
                    </div>

                    <div className="glass rounded-3xl p-8 flex flex-col items-center text-center sm:col-span-2">
                        <div className="w-16 h-16 rounded-full bg-accent-green/20 flex items-center justify-center mb-6">
                            <MapPin className="w-8 h-8 text-accent-green" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Office Location</h3>
                        <p className="text-dark-200">
                            Mumbai, Maharashtra<br/>
                            India
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
