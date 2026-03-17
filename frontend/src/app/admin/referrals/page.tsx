'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, DollarSign, Users } from 'lucide-react';
import api from '@/lib/api';
import { WalletTransaction } from '@/types';

export default function AdminReferralsPage() {
    const [commissions, setCommissions] = useState<WalletTransaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.get('/admin/referrals');
                setCommissions(data);
            } catch {
                console.error('Failed to load referrals');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-dark-700 rounded-lg animate-pulse" />
                <div className="glass rounded-2xl h-64 animate-pulse" />
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-white mb-2">Referral Commissions</h1>
            <p className="text-dark-200 text-sm mb-8">Track all affiliate earnings across the platform.</p>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="glass rounded-2xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-accent-green" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">₹{totalCommissions.toLocaleString()}</div>
                        <div className="text-dark-300 text-sm">Total Commissions Paid</div>
                    </div>
                </div>
                <div className="glass rounded-2xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                        <Share2 className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{commissions.length}</div>
                        <div className="text-dark-300 text-sm">Total Referral Sales</div>
                    </div>
                </div>
            </div>

            {/* Commissions Table */}
            <div className="glass rounded-2xl overflow-hidden">
                {commissions.length === 0 ? (
                    <div className="p-12 text-center">
                        <Share2 className="w-12 h-12 text-dark-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No referral commissions yet</h3>
                        <p className="text-dark-300 text-sm">Commissions will appear here when users make sales through referral links.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Referrer</th>
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Commission</th>
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Description</th>
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {commissions.map((c) => {
                                const user = typeof c.userId === 'object' ? c.userId : null;
                                return (
                                    <tr key={c._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="text-white text-sm font-medium">{user?.name || '—'}</div>
                                            <div className="text-dark-400 text-xs">{user?.email || ''}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-accent-green font-semibold">+₹{c.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="py-4 px-6 text-dark-200 text-sm">{c.description}</td>
                                        <td className="py-4 px-6 text-dark-300 text-sm">
                                            {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    );
}
