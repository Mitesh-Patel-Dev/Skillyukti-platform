'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function PayoutsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [payouts, setPayouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) {
            // Approved withdrawals = payout transactions
            api.get('/wallet/withdrawals').then(({ data }) => {
                setPayouts(data.filter((w: any) => w.status === 'approved'));
            }).catch(() => {}).finally(() => setLoading(false));
        }
    }, [user, authLoading, router]);

    const TDS_RATE = 0.10;
    const SERVICE_RATE = 0.02;

    const getAmounts = (amount: number) => {
        const tds = Math.round(amount * TDS_RATE);
        const service = Math.round(amount * SERVICE_RATE);
        const final = amount - tds - service;
        return { tds, service, final };
    };

    if (authLoading || loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    return (
        <div className="max-w-5xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-400" /> Payout Transactions
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl overflow-hidden">
                {payouts.length === 0 ? (
                    <div className="p-12 text-center">
                        <CreditCard className="w-10 h-10 text-dark-400 mx-auto mb-3" />
                        <p className="text-dark-300">No approved payouts yet.</p>
                        <p className="text-dark-400 text-sm mt-1">Withdrawal requests that are approved by admin will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    {['Date','Amount','TDS (10%)','Service (2%)','Final Amount','Mode','Details','Remark'].map(h => (
                                        <th key={h} className="text-left text-dark-300 text-xs font-medium py-3 px-4 whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {payouts.map(p => {
                                    const { tds, service, final } = getAmounts(p.amount);
                                    return (
                                        <tr key={p._id} className="border-b border-white/5 hover:bg-white/2">
                                            <td className="py-4 px-4 text-dark-300 text-xs whitespace-nowrap">
                                                {new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric'})}
                                            </td>
                                            <td className="py-4 px-4 text-white font-semibold">₹{p.amount.toLocaleString()}</td>
                                            <td className="py-4 px-4 text-red-400 text-sm">-₹{tds.toLocaleString()}</td>
                                            <td className="py-4 px-4 text-orange-400 text-sm">-₹{service.toLocaleString()}</td>
                                            <td className="py-4 px-4 text-accent-green font-bold">₹{final.toLocaleString()}</td>
                                            <td className="py-4 px-4 text-dark-200 text-sm uppercase">{p.paymentMethod}</td>
                                            <td className="py-4 px-4 text-dark-300 text-xs">{p.upiId || p.accountNumber || '—'}</td>
                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center gap-1 text-xs text-accent-green"><CheckCircle className="w-3 h-3" /> Paid</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

            {payouts.length > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-dark-400 text-xs mt-4">
                    * TDS (10%) and Service Charge (2%) are deducted from each payout as per platform policy.
                </motion.p>
            )}
        </div>
    );
}
