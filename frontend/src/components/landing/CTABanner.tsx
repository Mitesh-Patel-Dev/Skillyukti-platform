'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTABanner() {
    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7 }}
                    className="relative overflow-hidden rounded-3xl"
                >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-accent-purple animate-gradient" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

                    <div className="relative py-16 sm:py-20 px-8 sm:px-16 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-medium text-white/90">
                                Limited Time Offer — Save up to 50%
                            </span>
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            Ready to Transform Your Career?
                        </h2>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                            Join 10,000+ students who are already building their dream
                            careers. Get lifetime access to all courses.
                        </p>

                        <Link
                            href="/courses"
                            className="glow-btn inline-flex items-center gap-2 bg-white text-dark-800 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/90 transition-all"
                        >
                            Start Learning Today
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
