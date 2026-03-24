'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function LeaderboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [leaders, setLeaders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) {
            // Try to fetch referral leaderboard from referral route
            api.get('/referral/leaderboard').then(({ data }) => setLeaders(data)).catch(() => setLeaders([])).finally(() => setLoading(false));
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    const medalColor = (i: number) => i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-700' : 'text-dark-400';

    return (
        <div className="max-w-2xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" /> Leaderboard
            </motion.h1>

            <p className="text-dark-300 text-sm mb-6">Top affiliates ranked by total earnings this month.</p>

            {leaders.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-12 text-center">
                    <Trophy className="w-12 h-12 text-dark-300 mx-auto mb-4" />
                    <p className="text-dark-300">Leaderboard data will appear here once affiliates start earning.</p>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl overflow-hidden">
                    {leaders.map((l, i) => (
                        <div key={l._id || i} className={`flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 ${l._id === user?._id ? 'bg-primary-600/10' : 'hover:bg-white/2'}`}>
                            <Medal className={`w-5 h-5 ${medalColor(i)}`} />
                            <span className="text-dark-300 text-sm w-5 text-center font-bold">{i + 1}</span>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-purple/30 flex items-center justify-center text-white font-bold text-sm">
                                {l.name?.charAt(0) || '?'}
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-sm font-medium">{l.name} {l._id === user?._id && <span className="text-primary-400 text-xs">(You)</span>}</p>
                                <p className="text-dark-400 text-xs">{l.referralCode}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-accent-green font-bold text-sm">₹{(l.totalEarnings || 0).toLocaleString()}</p>
                                <p className="text-dark-400 text-xs">{l.referralCount || 0} referrals</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
