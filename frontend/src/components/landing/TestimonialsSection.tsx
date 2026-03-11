'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    const [current, setCurrent] = useState(0);

    // Auto-advance slider
    useEffect(() => {
        if (testimonials.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const prev = () =>
        setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    const next = () =>
        setCurrent((c) => (c + 1) % testimonials.length);

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-24 relative" id="testimonials">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-accent-green text-sm font-semibold uppercase tracking-wider">
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
                        What Our <span className="gradient-text-accent">Students Say</span>
                    </h2>
                    <p className="text-dark-100 text-lg max-w-2xl mx-auto">
                        Real results from real students who transformed their careers.
                    </p>
                </motion.div>

                {/* Slider */}
                <div className="relative max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="glass rounded-3xl p-8 sm:p-12 text-center"
                        >
                            <Quote className="w-10 h-10 text-primary-500/30 mx-auto mb-6" />

                            <p className="text-lg sm:text-xl text-dark-50 leading-relaxed mb-8 italic">
                                &ldquo;{testimonials[current].content}&rdquo;
                            </p>

                            {/* Stars */}
                            <div className="flex items-center justify-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonials[current].rating
                                            ? 'text-yellow-500 fill-yellow-500'
                                            : 'text-dark-400'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Avatar & Name */}
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-bold text-lg">
                                    {testimonials[current].name.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-white">
                                        {testimonials[current].name}
                                    </h4>
                                    <p className="text-sm text-dark-200">
                                        {testimonials[current].role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Nav Arrows */}
                    <button
                        onClick={prev}
                        className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-16 glass hover:bg-white/10 rounded-full p-2.5 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-16 glass hover:bg-white/10 rounded-full p-2.5 transition-all"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${i === current
                                    ? 'bg-primary-500 w-8'
                                    : 'bg-dark-400 hover:bg-dark-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
