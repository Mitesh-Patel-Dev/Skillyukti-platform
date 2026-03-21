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
    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank'>('upi');
    const [upiId, setUpiId] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
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
        
        // Basic validation
        if (!withdrawAmount || withdrawAmount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        if (wallet && withdrawAmount > wallet.balance) {
            toast.error('Insufficient balance');
            return;
        }

        // Payout detail validation
        if (paymentMethod === 'upi' && !upiId.trim()) {
            toast.error('Please enter your UPI ID');
            return;
        }
        if (paymentMethod === 'bank') {
            if (!accountHolderName.trim() || !accountNumber.trim() || !ifscCode.trim()) {
                toast.error('Please fill all bank details');
                return;
            }
        }

        setSubmitting(true);
        try {
            await api.post('/wallet/withdraw', { 
                amount: withdrawAmount,
                paymentMethod,
                upiId: paymentMethod === 'upi' ? upiId : undefined,
                accountHolderName: paymentMethod === 'bank' ? accountHolderName : undefined,
                accountNumber: paymentMethod === 'bank' ? accountNumber : undefined,
                ifscCode: paymentMethod === 'bank' ? ifscCode : undefined,
            });
            toast.success('Withdrawal request submitted!');
            setAmount('');
            setUpiId('');
            setAccountHolderName('');
            setAccountNumber('');
            setIfscCode('');
            
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
                            <form onSubmit={handleWithdraw} className="space-y-6">
                                {/* Amount Input */}
                                <div>
                                    <label className="text-sm text-dark-200 mb-1.5 block">Amount to Withdraw (₹)</label>
                                    <div className="flex gap-4">
                                        <div className="relative flex-1">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="Enter amount"
                                                min={1}
                                                max={wallet?.balance || 0}
                                                className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setAmount(String(wallet?.balance || 0))}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary-400 font-medium hover:text-primary-300 transition-colors"
                                            >
                                                MAX
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method Selection */}
                                <div>
                                    <label className="text-sm text-dark-200 mb-3 block">Payout Method</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('upi')}
                                            className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                                                paymentMethod === 'upi'
                                                    ? 'bg-primary-500/10 border-primary-500 text-primary-400'
                                                    : 'bg-dark-700/30 border-white/5 text-dark-300 hover:border-white/10'
                                            }`}
                                        >
                                            <div className={`w-2 h-2 rounded-full ${paymentMethod === 'upi' ? 'bg-primary-400' : 'bg-dark-500'}`} />
                                            <span className="font-medium text-sm">UPI ID</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('bank')}
                                            className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                                                paymentMethod === 'bank'
                                                    ? 'bg-primary-500/10 border-primary-500 text-primary-400'
                                                    : 'bg-dark-700/30 border-white/5 text-dark-300 hover:border-white/10'
                                            }`}
                                        >
                                            <div className={`w-2 h-2 rounded-full ${paymentMethod === 'bank' ? 'bg-primary-400' : 'bg-dark-500'}`} />
                                            <span className="font-medium text-sm">Bank Transfer</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Conditional Fields */}
                                {paymentMethod === 'upi' ? (
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                        <label className="text-sm text-dark-200 mb-1.5 block">UPI ID</label>
                                        <input
                                            type="text"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            placeholder="e.g. rahul@upi"
                                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                        <div>
                                            <label className="text-sm text-dark-200 mb-1.5 block">Account Holder Name</label>
                                            <input
                                                type="text"
                                                value={accountHolderName}
                                                onChange={(e) => setAccountHolderName(e.target.value)}
                                                placeholder="e.g. Rahul Sharma"
                                                className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-dark-200 mb-1.5 block">Account Number</label>
                                                <input
                                                    type="text"
                                                    value={accountNumber}
                                                    onChange={(e) => setAccountNumber(e.target.value)}
                                                    placeholder="1234567890"
                                                    className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-dark-200 mb-1.5 block">IFSC Code</label>
                                                <input
                                                    type="text"
                                                    value={ifscCode}
                                                    onChange={(e) => setIfscCode(e.target.value)}
                                                    placeholder="HDFC0001234"
                                                    className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all uppercase"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting || !amount}
                                    className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/20 disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    {submitting ? 'Processing Request...' : 'Submit Withdrawal Request'}
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
