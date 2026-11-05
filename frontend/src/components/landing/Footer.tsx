import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
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

                        <p className="text-slate-600 text-sm leading-relaxed">
                            Empowering the next generation of digital entrepreneurs
                            with practical, industry-ready skills.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-blue-600 font-semibold mb-4">
                            Quick Links
                        </h4>

                        <ul className="space-y-2.5">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'All Courses', href: '/courses' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Testimonials', href: '/testimonials' },
                                { label: 'Contact', href: '/contact' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-blue-600 font-semibold mb-4">
                            Legal
                        </h4>

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
                                        className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-blue-600 font-semibold mb-4">
                            Contact Us
                        </h4>

                        <ul className="space-y-3">

                            {/* Email */}
                            <li className="flex items-center gap-2.5 text-sm">
                                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />

                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=helpskillyukti@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 hover:text-blue-600 transition-colors break-all"
                                >
                                    helpskillyukti@gmail.com
                                </a>
                            </li>

                            {/* Phone */}
                            <li className="flex items-center gap-2.5 text-sm">
                                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />

                                <a
                                    href="tel:+919044471702"
                                    className="text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                    +91 9044471702
                                </a>
                            </li>

                            {/* Location */}
                            <li className="flex items-start gap-2.5 text-slate-600 text-sm">
                                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />

                                <span>Mumbai, India</span>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-slate-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

                        <p className="text-slate-500 text-sm">
                            &copy; {new Date().getFullYear()} Skillyukti.
                            All rights reserved.
                        </p>

                        <p className="text-slate-500 text-sm">
                            Managed By:{' '}
                            <a
                                href="https://www.linkedin.com/in/adarshvishwakarma93/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-800 font-medium hover:text-blue-600 transition-colors"
                            >
                                Engr. Adarsh Vishwakarma
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
}
