'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Copy, Link2, Share2, Users, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AffiliatePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [referralData, setReferralData] = useState<{ referralCode: string; referralLink: string } | null>(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        const fetchData = async () => {
            try {
                const { data } = await api.get('/referral/link');
                setReferralData(data);
            } catch {
                toast.error('Failed to load referral data');
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchData();
    }, [user, authLoading, router]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    if (authLoading || loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-24 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-bold text-white mb-2">Affiliate Program</h1>
                        <p className="text-dark-200 mb-8">Share your link, earn 80% commission on every sale!</p>
                    </motion.div>

                    {/* How It Works */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass rounded-2xl p-6 mb-6"
                    >
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Share2 className="w-5 h-5 text-primary-400" /> How It Works
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="glass rounded-xl p-4 text-center">
                                <div className="text-3xl mb-2">🔗</div>
                                <h3 className="text-white font-medium text-sm mb-1">1. Share Your Link</h3>
                                <p className="text-dark-300 text-xs">Share your unique referral link with friends</p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <div className="text-3xl mb-2">🛒</div>
                                <h3 className="text-white font-medium text-sm mb-1">2. They Purchase</h3>
                                <p className="text-dark-300 text-xs">They buy a course using your link</p>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <div className="text-3xl mb-2">💰</div>
                                <h3 className="text-white font-medium text-sm mb-1">3. You Earn 80%</h3>
                                <p className="text-dark-300 text-xs">Commission added to your wallet instantly</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Referral Link */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-2xl p-6 mb-6"
                    >
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Link2 className="w-5 h-5 text-primary-400" /> Your Referral Link
                        </h2>

                        <div className="space-y-4">
                            {/* Referral Code */}
                            <div>
                                <label className="text-sm text-dark-200 mb-1.5 block">Referral Code</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-lg tracking-wider">
                                        {referralData?.referralCode || '—'}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(referralData?.referralCode || '')}
                                        className="glass px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                                        title="Copy code"
                                    >
                                        <Copy className="w-5 h-5 text-primary-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Referral Link */}
                            <div>
                                <label className="text-sm text-dark-200 mb-1.5 block">Referral Link</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-primary-300 text-sm truncate">
                                        {referralData?.referralLink || '—'}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(referralData?.referralLink || '')}
                                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                                            copied
                                                ? 'bg-accent-green/20 text-accent-green'
                                                : 'bg-primary-600 text-white hover:bg-primary-500'
                                        }`}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" /> Copy Link
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid sm:grid-cols-2 gap-4"
                    >
                        <a href="/dashboard/wallet" className="glass rounded-2xl p-5 card-hover block">
                            <h3 className="text-white font-semibold mb-1">💳 My Wallet</h3>
                            <p className="text-dark-300 text-sm">Check your balance and earnings</p>
                        </a>
                        <a href="/dashboard/withdraw" className="glass rounded-2xl p-5 card-hover block">
                            <h3 className="text-white font-semibold mb-1">💸 Withdraw</h3>
                            <p className="text-dark-300 text-sm">Request a payout from your earnings</p>
                        </a>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
