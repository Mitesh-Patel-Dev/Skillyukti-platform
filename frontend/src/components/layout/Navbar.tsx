'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, LogIn, UserPlus, LayoutDashboard, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'glass-strong shadow-lg shadow-black/20'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">Skillyukti</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            href="/packages"
                            className="text-dark-100 hover:text-white transition-colors text-sm font-medium"
                        >
                            Packages
                        </Link>
                        <Link
                            href="/courses"
                            className="text-dark-100 hover:text-white transition-colors text-sm font-medium"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/#how-it-works"
                            className="text-dark-100 hover:text-white transition-colors text-sm font-medium"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/testimonials"
                            className="text-dark-100 hover:text-white transition-colors text-sm font-medium"
                        >
                            Testimonials
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 text-dark-100 hover:text-white transition-colors text-sm font-medium"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                {user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-2 text-accent-purple hover:text-primary-300 transition-colors text-sm font-medium"
                                    >
                                        <Shield className="w-4 h-4" />
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 text-dark-100 hover:text-accent-pink transition-colors text-sm font-medium"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 text-dark-100 hover:text-white transition-colors text-sm font-medium px-4 py-2"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="glow-btn bg-gradient-to-r from-primary-600 to-accent-purple text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="lg:hidden text-white p-2"
                    >
                        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden glass-strong border-t border-white/5"
                    >
                        <div className="flex flex-col gap-2 p-4">
                            <Link href="/packages" className="text-dark-100 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMobileOpen(false)}>Packages</Link>
                            <Link href="/courses" className="text-dark-100 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMobileOpen(false)}>Courses</Link>
                            <Link href="/#how-it-works" className="text-dark-100 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMobileOpen(false)}>How It Works</Link>
                            <Link href="/testimonials" className="text-dark-100 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMobileOpen(false)}>Testimonials</Link>
                            {user ? (
                                <>
                                    <Link href="/dashboard" className="text-dark-100 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMobileOpen(false)}>Dashboard</Link>
                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="text-accent-purple py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMobileOpen(false)}>Admin Panel</Link>
                                    )}
                                    <button onClick={() => { logout(); setIsMobileOpen(false); }} className="text-left text-accent-pink py-2 px-3 rounded-lg hover:bg-white/5 transition-all">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-dark-100 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMobileOpen(false)}>Login</Link>
                                    <Link href="/register" className="bg-gradient-to-r from-primary-600 to-accent-purple text-white py-2.5 px-4 rounded-xl text-center font-semibold" onClick={() => setIsMobileOpen(false)}>Get Started</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
