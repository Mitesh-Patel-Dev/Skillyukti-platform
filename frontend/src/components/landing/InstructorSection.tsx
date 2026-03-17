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
                            <div className="relative glass rounded-[2.5rem] overflow-hidden w-full h-full flex flex-col items-center justify-center p-6">
                                <div className="flex flex-col xl:flex-row items-center gap-6 xl:gap-8 w-full justify-center">
                                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple p-[3px] shrink-0 shadow-2xl">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-dark-800 border-4 border-dark-900/50">
                                            <img src="/images/founder.jpg" alt="Khushabu Chauhan" className="w-full h-full object-cover object-top" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                                        <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
                                            Khushabu<br className="hidden sm:block" />Chauhan
                                        </h3>
                                        <p className="text-primary-300 font-semibold text-lg leading-snug">
                                            Founder & Lead<br className="hidden sm:block" />Instructor
                                        </p>
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
                                <span className="text-sm font-bold text-white">10+ Years</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-6 -left-6 lg:-left-8 glass rounded-2xl px-5 py-3.5 flex items-center gap-2.5 shadow-2xl border border-white/5"
                            >
                                <Users className="w-5 h-5 text-accent-green" />
                                <span className="text-sm font-bold text-white">10,000+ Students</span>
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
                                multiple 7-figure online businesses. With over 10 years of
                                experience in digital marketing, freelancing, and AI
                                automation, she has trained 10,000+ students across India.
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
