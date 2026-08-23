import Link from 'next/link';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import { label } from 'framer-motion/client';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-dark-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img 
                                src="/logo.png" 
                                alt="Skillyukti" 
                                className="h-14 w-auto object-contain"
                            />
                        </div>
                        <p className="text-dark-200 text-sm leading-relaxed">
                            Empowering the next generation of digital entrepreneurs with
                            practical, industry-ready skills.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-orange-400  font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Home', href:'/#'}, 
                                { label: 'All Courses', href: '/courses' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Testimonials', href: '/testimonials' },
                                { label: 'Contact', href: '/contact' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-200 hover:text-orange-400 text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-orange-400 font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Privacy Policy', href: '/privacy-policy' },
                                { label: 'Terms & Conditions', href: '/terms' },
                                { label: 'Refund Policy', href: '/refund-policy' },
                                { label: 'Disclaimer', href: '/disclaimer' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-200 hover:text-orange-400 text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-orange-400 font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2.5 text-dark-200 text-sm">
                                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                <a
                              href="https://mail.google.com/mail/?view=cm&fs=1&to=helpskillyukti@gmail.com"
                              className="flex items-center gap-2.5 text-dark-200 text-sm"
                              >
                              helpskillyukti@gmail.com
                             </a>
                            </li>
                            <li className="flex items-center gap-2.5 text-dark-200 text-sm">
                                <a href="tel:+91 9044471702"
                                className="flex items-start gap-2.5 text-dark-200 text-sm"
                                >
                                 📞+91 9044471702
                            </a>
                            </li>
                            <li className="flex items-start gap-2.5 text-dark-200 text-sm">
                                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                                Mumbai, India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/5 mt-12 pt-8 text-center">
                    <p className="text-dark-300 text-sm">
                        &copy;{new Date().getFullYear()} Skillyukti. All rights reserved. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Managed By: Engr. Adarsh Vishwakarma
                    </p>
                </div>
            </div>
        </footer>
    );
}
