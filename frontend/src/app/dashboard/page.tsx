'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    TrendingUp, IndianRupee, Calendar, Clock, BarChart3, Wallet, ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';

interface Stats {
    today: number; last7d: number; last30d: number;
    allTime: number; balance: number; withdrawn: number;
}

const statCards = [
    { key: 'today',    label: "Today's Revenue",     icon: Clock,       gradient: 'from-violet-600 to-purple-500' },
    { key: 'last7d',   label: 'Last 7 Days',          icon: Calendar,    gradient: 'from-blue-600 to-cyan-500' },
    { key: 'last30d',  label: 'Last 30 Days',         icon: TrendingUp,  gradient: 'from-emerald-600 to-teal-500' },
    { key: 'allTime',  label: 'All Time Revenue',     icon: BarChart3,   gradient: 'from-orange-500 to-amber-500' },
    { key: 'balance',  label: 'Available Balance',    icon: Wallet,      gradient: 'from-pink-600 to-rose-500' },
] as const;

export default function AffiliateDashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/wallet/stats');
                setStats(data);
            } catch { /* ignore */ }
            finally { setLoading(false); }
        };
        if (user) fetchStats();
    }, [user, authLoading, router]);

    if (authLoading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    const pkg = (user as any)?.enrolledCourses?.length > 0
        ? (user as any).enrolledCourses[0]?.title || 'Active'
        : 'No Package';

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            Welcome, {user?.name?.split(' ')[0]}! 👋
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className="text-dark-300 text-sm">ID: <span className="text-white font-mono">{user?._id?.slice(-8).toUpperCase()}</span></span>
                            <span className="text-dark-300 text-sm">Code: <span className="text-primary-300 font-mono font-bold">{(user as any)?.referralCode}</span></span>
                        </div>
                    </div>
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary-600 to-accent-purple text-white">
                        {pkg}
                    </span>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${card.gradient} shadow-lg`}
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-4 translate-x-4" />
                        <card.icon className="w-6 h-6 text-white/80 mb-3" />
                        <div className="text-2xl font-bold text-white">
                            {loading ? '...' : `₹${(stats?.[card.key] || 0).toLocaleString()}`}
                        </div>
                        <div className="text-white/70 text-xs mt-1">{card.label}</div>
                        <Link href="/dashboard/transactions" className="mt-3 flex items-center gap-1 text-white/60 hover:text-white text-xs transition-colors">
                            View details <ArrowRight className="w-3 h-3" />
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Affiliate Link', sub: 'Share & Earn', href: '/dashboard/affiliate', emoji: '🔗' },
                        { label: 'Withdrawal',     sub: 'Request Payout', href: '/dashboard/withdraw',  emoji: '💸' },
                        { label: 'Transactions',   sub: 'View History',   href: '/dashboard/transactions', emoji: '📋' },
                        { label: 'My Courses',     sub: 'Continue Learning', href: '/dashboard/courses', emoji: '📚' },
                    ].map((a) => (
                        <Link key={a.href} href={a.href} className="glass rounded-2xl p-5 card-hover block group">
                            <div className="text-3xl mb-3">{a.emoji}</div>
                            <h3 className="text-white font-semibold text-sm group-hover:text-primary-300 transition-colors">{a.label}</h3>
                            <p className="text-dark-300 text-xs mt-1">{a.sub}</p>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* Passive Income Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 p-5 rounded-2xl border border-accent-purple/20 bg-accent-purple/5"
            >
                <div className="flex items-center gap-2 mb-1">
                    <IndianRupee className="w-4 h-4 text-accent-purple" />
                    <span className="text-white font-semibold text-sm">Passive Income</span>
                </div>
                <p className="text-dark-300 text-sm">
                    Earn <span className="text-accent-green font-bold">80% commission</span> on every sale made through your referral link. 
                    Total withdrawn: <span className="text-white font-bold">₹{(stats?.withdrawn || 0).toLocaleString()}</span>
                </p>
            </motion.div>
        </div>
    );
}
