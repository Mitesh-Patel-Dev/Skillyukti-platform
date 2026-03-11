'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const courseSlug = searchParams.get('course');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center max-w-md mx-4"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-6"
            >
                <CheckCircle className="w-10 h-10 text-accent-green" />
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-3">Payment Successful! 🎉</h1>
            <p className="text-dark-100 text-lg mb-8">
                Your course has been unlocked. Start learning now!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {courseSlug && (
                    <Link
                        href={`/dashboard/course/${courseSlug}`}
                        className="glow-btn bg-gradient-to-r from-accent-green to-accent-cyan text-white px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        Start Learning
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                )}
                <Link
                    href="/dashboard"
                    className="glass hover:bg-white/10 text-white px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                    Go to Dashboard
                </Link>
            </div>
        </motion.div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent-green/10 rounded-full blur-[120px]" />

            <Suspense
                fallback={
                    <div className="relative z-10 text-center">
                        <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto" />
                    </div>
                }
            >
                <PaymentSuccessContent />
            </Suspense>
        </div>
    );
}
