'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, CreditCard, CheckCircle, ArrowLeft, BookOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { loadRazorpayScript } from '@/lib/razorpay';
import { Course, RazorpayOrderResponse } from '@/types';
import toast from 'react-hot-toast';
import Link from 'next/link';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const slug = params.slug as string;

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${slug}`);
                setCourse(data);
            } catch {
                toast.error('Course not found');
                router.push('/courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [slug, user, router]);

    const handlePayment = async () => {
        if (!course || !user) return;

        setProcessing(true);
        try {
            // Load Razorpay script
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                toast.error('Razorpay SDK failed to load');
                return;
            }

            // Create order
            const { data } = await api.post<RazorpayOrderResponse>('/orders/create', {
                courseId: course._id,
            });

            // Open Razorpay checkout
            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'Skillyukti',
                description: course.title,
                order_id: data.razorpayOrderId,
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: '#5c7cfa',
                },
                handler: async (response: any) => {
                    try {
                        // Verify payment
                        await api.post('/orders/verify', {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                        });

                        toast.success('Payment successful! Course unlocked.');
                        router.push('/payment-success?course=' + course.slug);
                    } catch {
                        toast.error('Payment verification failed');
                    }
                },
                modal: {
                    ondismiss: () => {
                        setProcessing(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Payment failed');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                </div>
            </>
        );
    }

    if (!course) return null;

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center gap-2 text-dark-200 hover:text-white text-sm mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to course
                    </Link>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Left - Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-3"
                        >
                            <div className="glass rounded-2xl p-8">
                                <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>

                                {/* Course Card */}
                                <div className="flex gap-4 p-4 bg-dark-700/50 rounded-xl mb-6">
                                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-600/30 to-accent-purple/30 flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-8 h-8 text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">{course.title}</h3>
                                        <p className="text-dark-200 text-sm">by {course.instructor.name}</p>
                                        <p className="text-dark-300 text-xs mt-1">
                                            {course.totalLessons} lessons · {course.totalDuration}
                                        </p>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-dark-100">
                                        <span>Course Price</span>
                                        <span>₹{course.originalPrice.toLocaleString()}</span>
                                    </div>
                                    {course.originalPrice > course.price && (
                                        <div className="flex justify-between text-accent-green">
                                            <span>Discount</span>
                                            <span>- ₹{(course.originalPrice - course.price).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-white/10 pt-3 flex justify-between">
                                        <span className="text-white font-semibold text-lg">Total</span>
                                        <span className="text-white font-bold text-2xl">₹{course.price.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={processing}
                                    className="glow-btn w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5" />
                                            Pay ₹{course.price.toLocaleString()}
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {/* Right - Security Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 space-y-4"
                        >
                            <div className="glass rounded-2xl p-6">
                                <Shield className="w-8 h-8 text-accent-green mb-3" />
                                <h3 className="text-white font-semibold mb-2">Secure Payment</h3>
                                <p className="text-dark-200 text-sm">
                                    Powered by Razorpay. Your payment information is encrypted and secure.
                                </p>
                            </div>

                            <div className="glass rounded-2xl p-6">
                                <h3 className="text-white font-semibold mb-3">What you get:</h3>
                                <ul className="space-y-2.5">
                                    {[
                                        'Lifetime course access',
                                        'All video lessons',
                                        'Downloadable resources',
                                        'Certificate of completion',
                                        'Community access',
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-dark-100 text-sm">
                                            <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </>
    );
}
