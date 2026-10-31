'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Users, Rocket, X } from 'lucide-react';

export default function InstructorSection() {
    const [isImageOpen, setIsImageOpen] = useState(false);

    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-[500px] lg:max-w-[540px] mx-auto">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-[2.5rem] blur-3xl opacity-50" />
                           {/* Photo Frame */}
                            <div className="relative glass rounded-[2.5rem] overflow-hidden w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 hover:border-blue-500 transition-colors duration-300">
                            
                                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 w-full justify-center">
                            
                                    {/* Founder Image Frame */}
                                    <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => setIsImageOpen(true)}
                                        className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 cursor-pointer group"
                                    >
                            
                                        {/* Gradient Border */}
                                        <div
                                            className="absolute -inset-[3px] bg-gradient-to-br from-primary-500 via-blue-500 to-accent-purple"
                                            style={{
                                                borderRadius: "42% 58% 60% 40% / 42% 40% 60% 58%"
                                            }}
                                        />

                                        {/* White Frame */}
                                        <div
                                            className="absolute inset-0 bg-white p-[4px] overflow-hidden"
                                            style={{
                                                borderRadius: "42% 58% 60% 40% / 42% 40% 60% 58%"
                                            }}
                                        >

                                            {/* Image Container */}
                                            <div
                                                className="relative w-full h-full overflow-hidden bg-dark-800"
                                                style={{
                                                    borderRadius: "inherit"
                                                }}
                                            >

                                                <img
                                                    src="/founder.jpeg"
                                                    alt="Khushabu Chauhan"
                                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                                />

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white text-xs font-semibold tracking-wider">
                                                        VIEW
                                                    </span>
                                                </div>
                            
                                            </div>
                                        </div>

                                        {/* Decorative Accent */}
                                        <div className="absolute -top-2 -right-2 flex gap-1.5 rotate-[-25deg] pointer-events-none">
                                            <span className="w-2 h-5 rounded-full bg-purple-500" />
                                            <span className="w-2 h-5 rounded-full bg-blue-500 translate-y-1.5" />
                                            <span className="w-2 h-5 rounded-full bg-cyan-400 translate-y-3" />
                                        </div>

                                    </motion.div>

                                    {/* Founder Details */}
                                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">

                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight whitespace-nowrap">
                                             Khushabu Chauhan
                                         </h3>
                            
                                        <p className="text-primary-300 font-medium text-base sm:text-lg mt-2">
                                            Founder & CEO
                                        </p>
                            
                                        {/* Gradient Underline */}
                                        <div className="w-28 h-1 rounded-full bg-gradient-to-r from-accent-purple to-cyan-400 mt-4" />
                            
                                    </div>

                                </div>

                            </div>

                            {/* Floating badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-6 -right-6 lg:-right-8 glass rounded-2xl px-5 py-3.5 flex items-center gap-2.5 shadow-2xl border border-white/5"
                            >
                                <Award className="w-5 h-5 text-accent-orange" />
                                <span className="text-sm font-bold text-white">5+ Years</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-6 -left-6 lg:-left-8 glass rounded-2xl px-5 py-3.5 flex items-center gap-2.5 shadow-2xl border border-white/5"
                            >
                                <Users className="w-5 h-5 text-accent-green" />
                                <span className="text-sm font-bold text-white">1000+ Students</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-accent-purple text-sm font-semibold uppercase tracking-wider">
                            Meet Your Instructor
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">
                            Learn from an{' '}
                            <span className="gradient-text-accent">Industry Expert</span>
                        </h2>
                        <div className="space-y-4 text-dark-100 leading-relaxed">
                            <p>
                                Khushabu Chauhan is a serial digital entrepreneur who has built
                                multiple 7-figure online businesses. With over 5+ years of
                                experience in digital marketing, freelancing, and AI
                                automation, she has trained 1000+ students across India.
                            </p>
                            <p>
                                Her mission is simple: to empower every aspiring
                                entrepreneur with practical, actionable skills that
                                actually work in today&apos;s digital economy. No fluff,
                                no theory — just real strategies that produce real
                                results.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-8">
                            <div className="glass rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:scale-105
                                            hover:shadow-lg hover:shadow-blue-500/20 hover:bg-white/10">
                                <Rocket className="w-5 h-5 text-primary-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">50+</div>
                                <div className="text-xs text-dark-200">Courses</div>
                            </div>
                            <div className="glass rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:scale-105
                                            hover:shadow-lg hover:shadow-blue-500/20 hover:bg-white/10">
                                <Users className="w-5 h-5 text-accent-green mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">1K+</div>
                                <div className="text-xs text-dark-200">Students</div>
                            </div>
                            <div className="glass rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:scale-105
                                            hover:shadow-lg hover:shadow-blue-500/20 hover:bg-white/10">
                                <Award className="w-5 h-5 text-accent-orange mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">4.8</div>
                                <div className="text-xs text-dark-200">Avg Rating</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Image Modal */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsImageOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-lg w-full aspect-[4/5] sm:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-dark-800"
                        >
                            <button
                                onClick={() => setIsImageOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2.5 bg-dark-900/50 hover:bg-dark-900 text-white rounded-full backdrop-blur-md transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <img src="/founder.jpeg" alt="Khushabu Chauhan" className="w-full h-full object-cover object-top" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
