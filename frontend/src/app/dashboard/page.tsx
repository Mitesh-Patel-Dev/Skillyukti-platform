'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    TrendingUp, IndianRupee, Calendar, Clock, BarChart3, Wallet, ArrowRight, User, Package,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';

interface Stats {
    today: number; last7d: number; last30d: number;
    allTime: number; balance: number; withdrawn: number;
}

const statCards = [
    { key: 'today',    label: "Today's Income",        icon: Clock,       gradient: 'from-violet-600 to-purple-500' },
    { key: 'last7d',   label: 'Last 7 Days Income',    icon: Calendar,    gradient: 'from-blue-600 to-cyan-500' },
    { key: 'last30d',  label: 'Last 30 Days Income',   icon: TrendingUp,  gradient: 'from-emerald-600 to-teal-500' },
    { key: 'allTime',  label: 'Total Earning',         icon: BarChart3,   gradient: 'from-orange-500 to-amber-500' },
    { key: 'balance',  label: 'Available Balance',     icon: Wallet,      gradient: 'from-pink-600 to-rose-500' },
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
            {/* Header - Desktop */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hidden sm:block mb-8">
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

            {/* Mobile Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:hidden mb-5"
            >
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-primary-600/30 to-accent-purple/20 rounded-2xl p-4 mb-4 border border-primary-500/20">
                    <h1 className="text-lg font-bold text-white">
                        Welcome, <span className="text-primary-300">{user?.name?.split(' ')[0]}</span>! 👋
                    </h1>
                    <p className="text-dark-300 text-xs mt-1">
                        ID: <span className="text-white font-mono">{user?._id?.slice(-8).toUpperCase()}</span> · Code: <span className="text-primary-300 font-mono font-bold">{(user as any)?.referralCode}</span>
                    </p>
                </div>

                {/* Profile Info Card */}
                <div className="glass rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary-500/10" />
                    <div className="absolute -right-2 -bottom-4 w-16 h-16 rounded-full bg-accent-purple/10" />

                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-purple overflow-hidden border-2 border-primary-500/30 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-7 h-7" />
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 relative z-10">
                        <h2 className="text-white font-bold text-base truncate">{user?.name}</h2>
                        <div className="mt-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-primary-600 to-accent-purple text-white uppercase tracking-wide">
                                <Package className="w-3 h-3" />
                                {pkg}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid - 2x2 on mobile, responsive on larger screens */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br ${card.gradient} shadow-lg ${
                            /* Make the last card (balance) span full width on mobile if odd count */
                            i === statCards.length - 1 && statCards.length % 2 !== 0 ? 'col-span-2 sm:col-span-1' : ''
                        }`}
                    >
                        <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white/10 -translate-y-4 translate-x-4" />
                        <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 mb-2 sm:mb-3" />
                        <div className="text-xl sm:text-2xl font-bold text-white">
                            {loading ? '...' : `₹${(stats?.[card.key] || 0).toLocaleString()}`}
                        </div>
                        <div className="text-white/70 text-[10px] sm:text-xs mt-1 leading-tight">{card.label}</div>
                        <Link href="/dashboard/transactions" className="mt-2 sm:mt-3 flex items-center gap-1 text-white/60 hover:text-white text-[10px] sm:text-xs transition-colors">
                            View details <ArrowRight className="w-3 h-3" />
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        { label: 'Affiliate Link', sub: 'Share & Earn', href: '/dashboard/affiliate', emoji: '🔗' },
                        { label: 'Withdrawal',     sub: 'Request Payout', href: '/dashboard/withdraw',  emoji: '💸' },
                        { label: 'Transactions',   sub: 'View History',   href: '/dashboard/transactions', emoji: '📋' },
                        { label: 'My Courses',     sub: 'Continue Learning', href: '/dashboard/courses', emoji: '📚' },
                    ].map((a) => (
                        <Link key={a.href} href={a.href} className="glass rounded-2xl p-4 sm:p-5 card-hover block group">
                            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{a.emoji}</div>
                            <h3 className="text-white font-semibold text-xs sm:text-sm group-hover:text-primary-300 transition-colors">{a.label}</h3>
                            <p className="text-dark-300 text-[10px] sm:text-xs mt-1">{a.sub}</p>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* Passive Income Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl border border-accent-purple/20 bg-accent-purple/5"
            >
                <div className="flex items-center gap-2 mb-1">
                    <IndianRupee className="w-4 h-4 text-accent-purple" />
                    <span className="text-white font-semibold text-sm">Passive Income</span>
                </div>
                <p className="text-dark-300 text-xs sm:text-sm">
                    Earn <span className="text-accent-green font-bold">80% commission</span> on every sale made through your referral link. 
                    Total withdrawn: <span className="text-white font-bold">₹{(stats?.withdrawn || 0).toLocaleString()}</span>
                </p>
            </motion.div>
        </div>
    );
}
