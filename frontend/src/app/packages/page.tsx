'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle, Zap } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/landing/Footer';
import api from '@/lib/api';
import { loadRazorpayScript } from '@/lib/razorpay';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

interface Package {
    _id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
}

export default function PackagesPage() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data } = await api.get('/payment/packages');
                setPackages(data);
            } catch (error) {
                console.error('Failed to load packages:', error);
                toast.error('Failed to load packages');
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();

        // Capture referral code if present in URL
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const ref = params.get('ref');
            if (ref) {
                localStorage.setItem('referralCode', ref.toUpperCase());
            }
        }
    }, []);

    const handleBuyNow = async (pkg: Package) => {
        if (!user) {
            toast.error('Please login to purchase a package');
            router.push('/login?redirect=/packages');
            return;
        }

        setProcessingId(pkg._id);
        
        try {
            // Load Razorpay script
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                toast.error('Razorpay SDK failed to load. Please check your connection.');
                setProcessingId(null);
                return;
            }

            // Create Order
            const referralCode = typeof window !== 'undefined' ? localStorage.getItem('referralCode') : null;
            const { data } = await api.post('/payment/create-order', {
                productId: pkg._id,
                ...(referralCode ? { referralCode } : {}),
            });

            // Configure Razorpay Options
            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'Skillyukti',
                description: pkg.name,
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
                        toast.loading('Verifying payment...', { id: 'verify-payment' });
                        
                        // Verify Payment
                        await api.post('/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        toast.success('Payment successful! Package unlocked.', { id: 'verify-payment' });
                        
                        // Clear referral code after successful purchase
                        localStorage.removeItem('referralCode');
                        
                        // Redirect to success page or dashboard
                        router.push('/dashboard/courses');
                    } catch (error: any) {
                        console.error('Payment Verification failed:', error);
                        toast.error(error.response?.data?.message || 'Payment verification failed', { id: 'verify-payment' });
                    }
                },
                modal: {
                    ondismiss: () => {
                        setProcessingId(null);
                    },
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (error: any) {
            console.error('Order creation failed:', error);
            toast.error(error.response?.data?.message || 'Failed to initiate payment');
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-900 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-16 bg-dark-900 flex flex-col">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex-1 w-full relative">
                {/* Background Decorations */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="text-center mb-16 relative z-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
                        Choose Your <span className="gradient-text-accent">Package</span>
                    </h1>
                    <p className="text-dark-200 text-lg max-w-2xl mx-auto">
                        Elevate your skills and unlock endless opportunities. Select the package that best fits your goals and start learning today.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {packages.map((pkg, index) => {
                        const isPopular = pkg.name.toLowerCase().includes('standard');
                        return (
                            <motion.div
                                key={pkg._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative glass rounded-3xl p-8 flex flex-col h-full card-hover ${
                                    isPopular ? 'border-primary-500/50 shadow-[0_0_30px_rgba(92,124,250,0.15)] lg:-translate-y-4' : 'border-white/10'
                                }`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full text-xs font-bold text-white tracking-wider uppercase shadow-lg flex items-center gap-1">
                                        <Zap className="w-3 h-3 fill-current" /> Most Popular
                                    </div>
                                )}
                                
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                    <p className="text-dark-200 text-sm h-10">{pkg.description}</p>
                                </div>
                                
                                <div className="mb-8 flex items-baseline gap-2">
                                    <span className="text-4xl font-extrabold text-white">₹{pkg.price.toLocaleString()}</span>
                                    {/* <span className="text-dark-300 line-through text-sm">₹{Math.round(pkg.price * 1.5).toLocaleString()}</span> */}
                                </div>

                                <ul className="space-y-4 mb-10 flex-1">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-dark-100">
                                            <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleBuyNow(pkg)}
                                    disabled={processingId === pkg._id}
                                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                                        isPopular
                                            ? 'glow-btn bg-gradient-to-r from-primary-600 to-primary-500 text-white'
                                            : 'bg-dark-700 hover:bg-dark-600 text-white border border-white/5'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {processingId === pkg._id ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        'Buy Now'
                                    )}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </main>
    );
}
