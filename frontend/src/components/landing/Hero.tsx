'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, Users, BookOpen, TrendingUp } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="absolute top-1/4 left-1/4 max-w-[384px] w-[60vw] h-96 bg-primary-600/20 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 max-w-[320px] w-[50vw] h-80 bg-accent-purple/15 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90vw] w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[150px]" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-accent-orange" />
                        <span className="text-sm text-dark-50 font-medium">
                            Trusted by 10,000+ Students Across India
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
                    >
                        Learn{' '}
                        <span className="gradient-text-accent">High Income</span>
                        <br />
                        Digital Skills
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg sm:text-xl text-dark-100 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Build your online business and start earning online. Master
                        freelancing, digital marketing, AI automation, and e-commerce
                        with our industry-leading courses.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link
                            href="/courses"
                            className="glow-btn group bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            Enroll Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="group glass hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-lg font-semibold flex items-center gap-2 w-full sm:w-auto justify-center transition-all">
                            <Play className="w-5 h-5" />
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                <Users className="w-4 h-4 text-primary-400" />
                                <span className="text-2xl sm:text-3xl font-bold text-white">10K+</span>
                            </div>
                            <p className="text-xs sm:text-sm text-dark-200">Students</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                <BookOpen className="w-4 h-4 text-accent-green" />
                                <span className="text-2xl sm:text-3xl font-bold text-white">50+</span>
                            </div>
                            <p className="text-xs sm:text-sm text-dark-200">Courses</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                <TrendingUp className="w-4 h-4 text-accent-orange" />
                                <span className="text-2xl sm:text-3xl font-bold text-white">95%</span>
                            </div>
                            <p className="text-xs sm:text-sm text-dark-200">Success Rate</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
        </section>
    );
}
