'use client';

import { motion } from 'framer-motion';
import { Award, Users, Rocket } from 'lucide-react';

export default function InstructorSection() {
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
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-3xl blur-3xl" />
                            {/* Photo container */}
                            <div className="relative glass rounded-3xl overflow-hidden w-full h-full flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple mx-auto mb-6 flex items-center justify-center">
                                        <span className="text-5xl">👨‍🏫</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Rahul Sharma</h3>
                                    <p className="text-primary-300 font-medium">Founder & Lead Instructor</p>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -right-4 glass rounded-2xl p-3 flex items-center gap-2"
                            >
                                <Award className="w-5 h-5 text-accent-orange" />
                                <span className="text-sm font-semibold text-white">10+ Years</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-4 -left-4 glass rounded-2xl p-3 flex items-center gap-2"
                            >
                                <Users className="w-5 h-5 text-accent-green" />
                                <span className="text-sm font-semibold text-white">10,000+ Students</span>
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
                                Rahul Sharma is a serial digital entrepreneur who has built
                                multiple 7-figure online businesses. With over 10 years of
                                experience in digital marketing, freelancing, and AI
                                automation, he has trained 10,000+ students across India.
                            </p>
                            <p>
                                His mission is simple: to empower every aspiring
                                entrepreneur with practical, actionable skills that
                                actually work in today&apos;s digital economy. No fluff,
                                no theory — just real strategies that produce real
                                results.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-8">
                            <div className="glass rounded-xl p-4 text-center">
                                <Rocket className="w-5 h-5 text-primary-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">50+</div>
                                <div className="text-xs text-dark-200">Courses</div>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Users className="w-5 h-5 text-accent-green mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">10K+</div>
                                <div className="text-xs text-dark-200">Students</div>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <Award className="w-5 h-5 text-accent-orange mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">4.8</div>
                                <div className="text-xs text-dark-200">Avg Rating</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
