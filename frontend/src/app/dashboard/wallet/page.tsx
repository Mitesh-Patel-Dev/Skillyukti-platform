'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, TrendingUp, ArrowDownCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { Wallet } from '@/types';
import Link from 'next/link';

export default function WalletPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        const fetchWallet = async () => {
            try {
                const { data } = await api.get('/wallet');
                setWallet(data);
            } catch {
                console.error('Failed to load wallet');
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchWallet();
    }, [user, authLoading, router]);

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
                        <h1 className="text-3xl font-bold text-white mb-2">My Wallet</h1>
                        <p className="text-dark-200 mb-8">Track your affiliate earnings and withdrawals.</p>
                    </motion.div>

                    {/* Stat Cards */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass rounded-2xl p-6"
                        >
                            <WalletIcon className="w-8 h-8 text-primary-400 mb-3" />
                            <div className="text-2xl font-bold text-white">₹{wallet?.balance?.toLocaleString() || 0}</div>
                            <div className="text-dark-200 text-sm">Available Balance</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass rounded-2xl p-6"
                        >
                            <TrendingUp className="w-8 h-8 text-accent-green mb-3" />
                            <div className="text-2xl font-bold text-white">₹{wallet?.totalEarnings?.toLocaleString() || 0}</div>
                            <div className="text-dark-200 text-sm">Total Earnings</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass rounded-2xl p-6"
                        >
                            <ArrowDownCircle className="w-8 h-8 text-accent-orange mb-3" />
                            <div className="text-2xl font-bold text-white">₹{wallet?.totalWithdrawn?.toLocaleString() || 0}</div>
                            <div className="text-dark-200 text-sm">Total Withdrawn</div>
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid sm:grid-cols-3 gap-4"
                    >
                        <Link href="/dashboard/transactions" className="glass rounded-2xl p-5 card-hover block">
                            <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                                📋 Transactions <ArrowRight className="w-4 h-4 text-primary-400" />
                            </h3>
                            <p className="text-dark-300 text-sm">View all your transaction history</p>
                        </Link>
                        <Link href="/dashboard/withdraw" className="glass rounded-2xl p-5 card-hover block">
                            <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                                💸 Withdraw <ArrowRight className="w-4 h-4 text-primary-400" />
                            </h3>
                            <p className="text-dark-300 text-sm">Request a payout</p>
                        </Link>
                        <Link href="/dashboard/affiliate" className="glass rounded-2xl p-5 card-hover block">
                            <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                                🔗 Affiliate Link <ArrowRight className="w-4 h-4 text-primary-400" />
                            </h3>
                            <p className="text-dark-300 text-sm">Share your referral link</p>
                        </Link>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
