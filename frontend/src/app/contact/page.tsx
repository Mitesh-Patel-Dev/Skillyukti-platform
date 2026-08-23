'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 flex flex-col">
            <Navbar />
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-24 flex-1 w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                        Get in <span className="gradient-text-accent">Touch</span>
                    </h1>
                    <p className="text-lg text-dark-100 max-w-2xl mx-auto leading-relaxed">
                        Have questions? Need support? We are here to help. Reach out to our team and we'll ensure you get the assistance you need.
                    </p>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
                        <div className="glass rounded-3xl p-8 flex flex-col items-start card-hover group transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-primary-500/20 group-hover:bg-primary-500/40 transition-colors flex items-center justify-center mb-6">
                                <Mail className="w-7 h-7 text-primary-400 group-hover:text-primary-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-orange-400 mb-3">Email Us</h3>
                            <p className="text-dark-200 mb-6 flex-1 text-sm leading-relaxed">
                                Best for general inquiries, partnership opportunities, and non-urgent support. We aim to reply within 24 hours.
                            </p>
                           <a
                              href="https://mail.google.com/mail/?view=cm&fs=1&to=helpskillyukti@gmail.com"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                              >
                              📧 Email Us
                             </a>
                        </div>
                        
                        <div className="glass rounded-3xl p-8 flex flex-col items-start card-hover group transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-accent-purple/20 group-hover:bg-accent-purple/40 transition-colors flex items-center justify-center mb-6">
                                <Phone className="w-7 h-7 text-accent-purple group-hover:text-accent-pink" />
                            </div>
                            <h3 className="text-2xl font-bold text-orange-400 mb-3">Call Us</h3>
                            <p className="text-dark-200 mb-6 flex-1 text-sm leading-relaxed">
                                Need immediate assistance with enrollment or billing? Give us a call during our dedicated support hours.
                            </p>
                           <a href="tel:+91 9044471702"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                 📞 Call Us
                            </a>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 lg:col-span-1 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/10 rounded-full blur-[40px] pointer-events-none" />
                        <div>
                            <h3 className="text-xl font-bold text-orange-400 mb-6">Support Information</h3>
                            
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <Clock className="w-6 h-6 text-accent-green shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-green-400 font-semibold mb-1">Working Hours</h4>
                                        <p className="text-sm text-dark-200">Mon - Sat: 9:00 AM - 6:00 PM (IST)</p>
                                        <p className="text-sm text-dark-200">Sunday: Closed</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <MapPin className="w-6 h-6 text-accent-orange shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-orange-300 font-semibold mb-1">Office Location</h4>
                                        <p className="text-sm text-dark-200 leading-relaxed">
                                            Skillyukti Head Quarter<br />
                                            Mumbai, Maharashtra<br />
                                            India 400001
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <h4 className="text-sm font-semibold text-orange-300 mb-4">Connect on Social</h4>
                        <div className="flex gap-1">
                              {[
                                {
                                  name: "Twitter",
                                  link: "https://x.com/khushabunm",
                                },
                                {
                                  name: "LinkedIn",
                                  link: "https://www.linkedin.com/in/khushabu-chauhan-b3079a360/",
                                },
                                {
                                  name: "Instagram",
                                  link: "https://www.instagram.com/skillyukti1?igsh=bDdzcTlqdHE3a2Ji",
                                },
                              ].map((social) => (
                                <a
                                  key={social.name}
                                  href={social.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-semibold text-dark-200 hover:text-orange-400 glass px-4 py-2 rounded-xl transition-all hover:bg-white/10"
                                >
                                  {social.name}
                                </a>
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
