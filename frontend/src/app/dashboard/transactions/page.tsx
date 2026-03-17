'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { WalletTransaction } from '@/types';

export default function TransactionsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        const fetchTransactions = async () => {
            try {
                const { data } = await api.get('/wallet/transactions');
                setTransactions(data);
            } catch {
                console.error('Failed to load transactions');
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchTransactions();
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
                        <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
                        <p className="text-dark-200 mb-8">Your complete transaction history.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass rounded-2xl overflow-hidden"
                    >
                        {transactions.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="text-lg font-semibold text-white mb-2">No transactions yet</h3>
                                <p className="text-dark-300 text-sm">Your commissions and withdrawals will appear here.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {transactions.map((tx, index) => (
                                    <motion.div
                                        key={tx._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                tx.type === 'commission'
                                                    ? 'bg-accent-green/10 text-accent-green'
                                                    : 'bg-red-500/10 text-red-400'
                                            }`}>
                                                {tx.type === 'commission' ? (
                                                    <ArrowUpRight className="w-5 h-5" />
                                                ) : (
                                                    <ArrowDownRight className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-white font-medium text-sm capitalize">{tx.type}</div>
                                                <div className="text-dark-300 text-xs">{tx.description || '—'}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-semibold ${
                                                tx.amount > 0 ? 'text-accent-green' : 'text-red-400'
                                            }`}>
                                                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                                            </div>
                                            <div className="text-dark-400 text-xs">
                                                {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'short', year: 'numeric',
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
        </>
    );
}
