import Link from 'next/link';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-dark-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">Skillyukti</span>
                        </div>
                        <p className="text-dark-200 text-sm leading-relaxed mb-4">
                            Empowering the next generation of digital entrepreneurs with
                            practical, industry-ready skills.
                        </p>
                        <div className="flex gap-3">
                            {['twitter', 'instagram', 'youtube', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-9 h-9 rounded-lg glass hover:bg-white/10 flex items-center justify-center transition-all text-dark-200 hover:text-white text-xs uppercase font-bold"
                                >
                                    {social.charAt(0).toUpperCase()}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'All Courses', href: '/courses' },
                                { label: 'About Us', href: '/#instructor' },
                                { label: 'Testimonials', href: '/#testimonials' },
                                { label: 'Contact', href: '#' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-200 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Privacy Policy', href: '/privacy-policy' },
                                { label: 'Terms & Conditions', href: '/terms' },
                                { label: 'Refund Policy', href: '/refund-policy' },
                                { label: 'Disclaimer', href: '/terms' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-200 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2.5 text-dark-200 text-sm">
                                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                support@skillyukti.com
                            </li>
                            <li className="flex items-center gap-2.5 text-dark-200 text-sm">
                                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                +91 98765 43210
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
                        © {new Date().getFullYear()} Skillyukti. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
