'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Receipt, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { WalletTransaction } from '@/types';

export default function TransactionsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'commission' | 'withdrawal'>('all');

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) {
            api.get('/wallet/transactions').then(({ data }) => setTransactions(data)).catch(() => {}).finally(() => setLoading(false));
        }
    }, [user, authLoading, router]);

    const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

    if (authLoading || loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Receipt className="w-6 h-6 text-accent-orange" /> Wallet Transactions
            </motion.h1>

            {/* Filter tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-2 mb-6">
                {(['all', 'commission', 'withdrawal'] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-primary-600 text-white' : 'glass text-dark-200 hover:text-white'}`}>
                        {f}
                    </button>
                ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="p-12 text-center">
                        <Receipt className="w-10 h-10 text-dark-400 mx-auto mb-3" />
                        <p className="text-dark-300">No transactions found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    {['Date','Type','Description','Amount','Status'].map(h => (
                                        <th key={h} className="text-left text-dark-300 text-xs font-medium py-3 px-5">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(tx => (
                                    <tr key={tx._id} className="border-b border-white/5 hover:bg-white/2">
                                        <td className="py-4 px-5 text-dark-300 text-xs whitespace-nowrap">
                                            {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tx.type === 'commission' ? 'bg-accent-green/10 text-accent-green' : 'bg-orange-400/10 text-orange-400'}`}>
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-dark-200 text-sm">{tx.description}</td>
                                        <td className="py-4 px-5">
                                            <span className={`font-bold ${tx.type === 'commission' ? 'text-accent-green' : 'text-red-400'}`}>
                                                {tx.type === 'commission' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${tx.status === 'completed' ? 'text-accent-green' : 'text-yellow-400'}`}>
                                                {tx.status === 'completed' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                                {tx.status}
                                            </span>
                                        </td>
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
