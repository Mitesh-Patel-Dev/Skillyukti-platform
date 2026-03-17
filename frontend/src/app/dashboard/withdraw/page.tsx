'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { Wallet, WithdrawalRequest } from '@/types';
import toast from 'react-hot-toast';

export default function WithdrawPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        const fetchData = async () => {
            try {
                const [walletRes, withdrawalsRes] = await Promise.all([
                    api.get('/wallet'),
                    api.get('/wallet/withdrawals'),
                ]);
                setWallet(walletRes.data);
                setWithdrawals(withdrawalsRes.data);
            } catch {
                console.error('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchData();
    }, [user, authLoading, router]);

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        const withdrawAmount = Number(amount);
        if (!withdrawAmount || withdrawAmount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        if (wallet && withdrawAmount > wallet.balance) {
            toast.error('Insufficient balance');
            return;
        }
        setSubmitting(true);
        try {
            await api.post('/wallet/withdraw', { amount: withdrawAmount });
            toast.success('Withdrawal request submitted!');
            setAmount('');
            // Refresh data
            const [walletRes, withdrawalsRes] = await Promise.all([
                api.get('/wallet'),
                api.get('/wallet/withdrawals'),
            ]);
            setWallet(walletRes.data);
            setWithdrawals(withdrawalsRes.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to submit withdrawal');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400"><Clock className="w-3 h-3" /> Pending</span>;
            case 'approved':
                return <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green"><CheckCircle className="w-3 h-3" /> Approved</span>;
            case 'rejected':
                return <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400"><XCircle className="w-3 h-3" /> Rejected</span>;
            default:
                return null;
        }
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

    const hasPending = withdrawals.some((w) => w.status === 'pending');

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-bold text-white mb-2">Withdraw Funds</h1>
                        <p className="text-dark-200 mb-8">Request a payout from your wallet balance.</p>
                    </motion.div>

                    {/* Withdrawal Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass rounded-2xl p-6 mb-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-white">New Withdrawal</h2>
                            <div className="text-sm text-dark-200">
                                Available: <span className="text-primary-400 font-semibold">₹{wallet?.balance?.toLocaleString() || 0}</span>
                            </div>
                        </div>

                        {hasPending ? (
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-yellow-300 text-sm">
                                ⏳ You have a pending withdrawal request. Please wait for admin approval before submitting another.
                            </div>
                        ) : (
                            <form onSubmit={handleWithdraw} className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className="text-sm text-dark-200 mb-1.5 block">Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        min={1}
                                        max={wallet?.balance || 0}
                                        className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setAmount(String(wallet?.balance || 0))}
                                    className="glass px-4 py-3 rounded-xl text-primary-400 text-sm font-medium hover:bg-white/10 transition-colors"
                                >
                                    Max
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || !amount}
                                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-primary-500 transition-colors disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    {submitting ? 'Submitting...' : 'Withdraw'}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Withdrawal History */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Withdrawal History</h2>
                        <div className="glass rounded-2xl overflow-hidden">
                            {withdrawals.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="text-4xl mb-4">💸</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">No withdrawals yet</h3>
                                    <p className="text-dark-300 text-sm">Your withdrawal requests will appear here.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {withdrawals.map((req, index) => (
                                        <motion.div
                                            key={req._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center justify-between p-5"
                                        >
                                            <div>
                                                <div className="text-white font-semibold">₹{req.amount.toLocaleString()}</div>
                                                <div className="text-dark-400 text-xs">
                                                    {new Date(req.createdAt).toLocaleDateString('en-IN', {
                                                        day: 'numeric', month: 'short', year: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {getStatusBadge(req.status)}
                                                {req.adminNote && req.adminNote !== 'Approved' && req.adminNote !== 'Rejected' && (
                                                    <div className="text-dark-400 text-xs mt-1">{req.adminNote}</div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
