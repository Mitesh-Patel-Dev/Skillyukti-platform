'use client';

import { motion } from 'framer-motion';
import { UserPlus, BookOpen, Target, DollarSign } from 'lucide-react';

const steps = [
    {
        icon: UserPlus,
        title: 'Join the Training',
        description: 'Sign up and get instant access to our comprehensive course library.',
        color: 'from-primary-500 to-primary-600',
        glow: 'rgba(92, 124, 250, 0.3)',
    },
    {
        icon: BookOpen,
        title: 'Learn Proven Strategies',
        description: 'Follow our step-by-step frameworks used by 10,000+ successful students.',
        color: 'from-accent-purple to-primary-500',
        glow: 'rgba(132, 94, 247, 0.3)',
    },
    {
        icon: Target,
        title: 'Generate Leads',
        description: 'Apply what you learn to attract clients and build your audience.',
        color: 'from-accent-cyan to-accent-green',
        glow: 'rgba(34, 184, 207, 0.3)',
    },
    {
        icon: DollarSign,
        title: 'Start Earning',
        description: 'Monetize your skills and build a sustainable online income stream.',
        color: 'from-accent-green to-accent-orange',
        glow: 'rgba(81, 207, 102, 0.3)',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 relative" id="how-it-works">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/10 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-accent-cyan text-sm font-semibold uppercase tracking-wider">
                        How It Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
                        Your Path to{' '}
                        <span className="gradient-text-accent">Success</span>
                    </h2>
                    <p className="text-dark-100 text-lg max-w-2xl mx-auto">
                        A simple 4-step framework to transform your career and start
                        earning online.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="glass card-hover rounded-2xl p-6 text-center relative group"
                        >
                            {/* Step Number */}
                            <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.03] leading-none">
                                {index + 1}
                            </div>

                            {/* Icon */}
                            <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}
                                style={{ boxShadow: `0 8px 30px ${step.glow}` }}
                            >
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-dark-200 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
