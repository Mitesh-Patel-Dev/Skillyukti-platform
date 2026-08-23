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
                            {/* Photo container Founder's */}
                            <div className="relative glass rounded-[2.5rem] overflow-hidden w-full h-full flex flex-col items-center justify-center p-8 sm:p-10">
                                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full justify-center">
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsImageOpen(true)}
                                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple p-[3px] shrink-0 shadow-2xl cursor-pointer relative group"
                                    >
                                        <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                            <span className="text-white text-sm font-semibold tracking-wider">VIEW</span>
                                        </div>
                                        <div className="w-full h-full rounded-full overflow-hidden bg-dark-800 border-4 border-dark-900/50">
                                            <img src="/co-founder.jpeg" alt="Milan Chauhan" className="w-full h-full object-cover object-top" />
                                        </div>
                                    </motion.div>
                                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                        <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight whitespace-nowrap">
                                            Milan Chauhan
                                        </h3>
                                        <p className="text-primary-300 font-medium text-lg sm:text-xl mt-2 whitespace-nowrap">
                                            Co-Founder
                                        </p>
                                    </div>
                                </div>
                            </div>

                            
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
                            Meet Your Co-Founder
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">
                            Learn from a{' '}
                            <span className="gradient-text-accent">Digital Growth & Marketing Expert</span>
                        </h2>
                        <div className="space-y-4 text-dark-100 leading-relaxed">
                            <p>
                                As the Co-Founder, Milan Chauhan is dedicated to helping students 
                                build successful online careers through practical digital skills. 
                                From affiliate marketing and AI tools to freelancing and online business
                                strategies, he focuses on teaching methods that create real earning opportunities.
                            </p>
                            <p>
                                His mission is to make quality digital education accessible to everyone by 
                                providing step-by-step guidance, real-world case studies, and actionable strategies. 
                                Every course is designed to help learners gain confidence, build sustainable income 
                                streams, and succeed in today's digital economy.
                            </p>
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
                            <img src="/co-founder.jpeg" alt="Milan Chauhan" className="w-full h-full object-cover object-top" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
