'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Users, BookOpen, BarChart3, DollarSign,
    TrendingUp, ArrowUpRight, Clock,
} from 'lucide-react';
import api from '@/lib/api';
import { AdminStats, Order } from '@/types';

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentPayments, setRecentPayments] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, paymentsRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/payments'),
                ]);
                setStats(statsRes.data);
                setRecentPayments(paymentsRes.data.slice(0, 8));
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-dark-700 rounded-lg animate-pulse" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="glass rounded-2xl h-32 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    const statCards = stats
        ? [
            { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
            { label: 'Active Courses', value: stats.totalCourses, icon: BookOpen, color: 'from-emerald-500 to-emerald-600', change: '+3' },
            { label: 'Total Orders', value: stats.totalOrders, icon: BarChart3, color: 'from-violet-500 to-violet-600', change: '+8%' },
            { label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-amber-500 to-amber-600', change: '+23%' },
        ]
        : [];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-dark-200 text-sm mt-1">Welcome back — here&apos;s your platform overview.</p>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass rounded-2xl p-5 relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full opacity-10 -translate-y-4 translate-x-4`} />
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                            <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                        <div className="flex items-center justify-between">
                            <span className="text-dark-200 text-sm">{stat.label}</span>
                            <span className="text-accent-green text-xs flex items-center gap-0.5">
                                <TrendingUp className="w-3 h-3" /> {stat.change}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Create Course', href: '/admin/courses/new', color: 'bg-primary-600/10 hover:bg-primary-600/20 text-primary-300 border-primary-500/20' },
                    { label: 'View Students', href: '/admin/students', color: 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border-emerald-500/20' },
                    { label: 'View Payments', href: '/admin/payments', color: 'bg-amber-600/10 hover:bg-amber-600/20 text-amber-300 border-amber-500/20' },
                ].map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className={`flex items-center justify-between px-5 py-4 rounded-xl border text-sm font-medium transition-all ${action.color}`}
                    >
                        {action.label}
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                ))}
            </div>

            {/* Recent Payments */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Recent Payments</h2>
                    <Link href="/admin/payments" className="text-primary-400 text-sm hover:text-primary-300 transition-colors">
                        View all →
                    </Link>
                </div>
                <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Student</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Course</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Amount</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Status</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPayments.map((p) => (
                                    <tr key={p._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 text-white">{(p.userId as any)?.name || 'N/A'}</td>
                                        <td className="p-4 text-dark-100">{(p.courseId as any)?.title || 'N/A'}</td>
                                        <td className="p-4 text-white font-medium">₹{p.amount.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.status === 'paid' ? 'bg-emerald-500/15 text-emerald-400' : p.status === 'failed' ? 'bg-red-500/15 text-red-400' : 'bg-yellow-500/15 text-yellow-400'
                                                }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-dark-300 flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(p.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {recentPayments.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-dark-300">No payments yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
