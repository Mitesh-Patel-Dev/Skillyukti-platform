'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Clock, ArrowDownCircle, Plus, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { WithdrawalRequest } from '@/types';

export default function WithdrawPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [wallet, setWallet] = useState<any>(null);
    const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ amount: '', paymentMethod: 'upi', upiId: '', accountHolderName: '', accountNumber: '', ifscCode: '' });

    const loadData = async () => {
        const [w, r] = await Promise.all([api.get('/wallet'), api.get('/wallet/withdrawals')]);
        setWallet(w.data); setWithdrawals(r.data);
    };

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) loadData().catch(() => {});
    }, [user, authLoading, router]);

    const totalPending = withdrawals.filter(w => w.status === 'pending').reduce((s, w) => s + w.amount, 0);
    const totalPaid    = withdrawals.filter(w => w.status === 'approved').reduce((s, w) => s + w.amount, 0);

    const handleSubmit = async () => {
        if (!form.amount || Number(form.amount) <= 0) { toast.error('Enter a valid amount'); return; }
        setSubmitting(true);
        try {
            await api.post('/wallet/withdraw', {
                amount: Number(form.amount),
                paymentMethod: form.paymentMethod,
                upiId: form.upiId,
                accountHolderName: form.accountHolderName,
                accountNumber: form.accountNumber,
                ifscCode: form.ifscCode,
            });
            toast.success('Withdrawal request submitted!');
            setShowForm(false);
            setForm({ amount: '', paymentMethod: 'upi', upiId: '', accountHolderName: '', accountNumber: '', ifscCode: '' });
            loadData();
        } catch (e: any) {
            toast.error(e?.response?.data?.message || 'Failed to submit request');
        } finally { setSubmitting(false); }
    };

    const statusIcon = (s: string) => s === 'approved' ? <CheckCircle className="w-4 h-4 text-accent-green" /> : s === 'rejected' ? <XCircle className="w-4 h-4 text-red-400" /> : <Clock className="w-4 h-4 text-yellow-400" />;
    const statusColor = (s: string) => s === 'approved' ? 'text-accent-green bg-accent-green/10' : s === 'rejected' ? 'text-red-400 bg-red-400/10' : 'text-yellow-400 bg-yellow-400/10';

    if (authLoading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    return (
        <div className="max-w-3xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <ArrowDownCircle className="w-6 h-6 text-accent-purple" /> Withdrawal Request
            </motion.h1>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: 'Available Balance', value: wallet?.balance || 0, icon: Wallet, gradient: 'from-violet-600 to-purple-500' },
                    { label: 'Total Withdrawn',   value: wallet?.totalWithdrawn || 0, icon: TrendingUp, gradient: 'from-emerald-600 to-teal-500' },
                    { label: 'Pending Amount',    value: totalPending, icon: Clock, gradient: 'from-orange-500 to-amber-500' },
                ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${s.gradient} shadow-lg`}>
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/10 -translate-y-3 translate-x-3" />
                        <s.icon className="w-5 h-5 text-white/80 mb-2" />
                        <div className="text-xl font-bold text-white">₹{s.value.toLocaleString()}</div>
                        <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Request Button / Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-6 mb-6">
                {!showForm ? (
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-400 transition-all">
                        <Plus className="w-4 h-4" /> Make Withdrawal Request
                    </button>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-base font-semibold text-white">Withdrawal Request</h2>
                        <div>
                            <label className="text-sm text-dark-200 mb-1.5 block">Amount (₹)</label>
                            <input type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} max={wallet?.balance || 0} placeholder={`Max ₹${(wallet?.balance || 0).toLocaleString()}`}
                                className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/50" />
                        </div>
                        <div>
                            <label className="text-sm text-dark-200 mb-1.5 block">Payment Method</label>
                            <div className="flex gap-3">
                                {['upi', 'bank'].map(m => (
                                    <button key={m} onClick={() => setForm(p => ({ ...p, paymentMethod: m }))}
                                        className={`flex-1 py-3 rounded-xl text-sm font-medium uppercase transition-all ${form.paymentMethod === m ? 'bg-primary-600 text-white' : 'glass text-dark-200 hover:text-white'}`}>
                                        {m === 'upi' ? '📱 UPI' : '🏦 Bank Transfer'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {form.paymentMethod === 'upi' ? (
                            <div>
                                <label className="text-sm text-dark-200 mb-1.5 block">UPI ID</label>
                                <input value={form.upiId} onChange={e => setForm(p => ({ ...p, upiId: e.target.value }))} placeholder="name@upi"
                                    className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/50" />
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-3 gap-3">
                                {[['accountHolderName','Account Holder Name'],['accountNumber','Account Number'],['ifscCode','IFSC Code']].map(([k,l]) => (
                                    <div key={k}>
                                        <label className="text-sm text-dark-200 mb-1.5 block">{l}</label>
                                        <input value={(form as any)[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/50" />
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex gap-3 pt-2">
                            <button onClick={handleSubmit} disabled={submitting} className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-400 transition-all disabled:opacity-60">
                                {submitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                            <button onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl glass text-dark-200 hover:text-white transition-colors">Cancel</button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* History Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-white/5"><h2 className="text-base font-semibold text-white">Withdrawal History</h2></div>
                {withdrawals.length === 0 ? (
                    <div className="p-10 text-center text-dark-300 text-sm">No withdrawal requests yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead><tr className="border-b border-white/5">{['Amount','Method','Status','Date'].map(h => <th key={h} className="text-left text-dark-300 text-xs font-medium py-3 px-5">{h}</th>)}</tr></thead>
                            <tbody>
                                {withdrawals.map(w => (
                                    <tr key={w._id} className="border-b border-white/5 hover:bg-white/2">
                                        <td className="py-4 px-5 text-white font-semibold">₹{w.amount.toLocaleString()}</td>
                                        <td className="py-4 px-5 text-dark-200 text-sm uppercase">{w.paymentMethod}</td>
                                        <td className="py-4 px-5">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColor(w.status)}`}>
                                                {statusIcon(w.status)} {w.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-dark-300 text-xs">{new Date(w.createdAt).toLocaleDateString('en-IN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
