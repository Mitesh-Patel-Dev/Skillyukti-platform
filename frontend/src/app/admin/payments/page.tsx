'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard, Search, Clock, Filter,
    DollarSign, TrendingUp,
} from 'lucide-react';
import api from '@/lib/api';
import { Order } from '@/types';
import toast from 'react-hot-toast';

type StatusFilter = 'all' | 'paid' | 'created' | 'failed';

export default function AdminPaymentsPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/admin/payments');
            setOrders(data);
        } catch {
            toast.error('Failed to load payments');
        } finally {
            setLoading(false);
        }
    };

    const filtered = orders.filter((o) => {
        const matchesSearch =
            (o.userId as any)?.name?.toLowerCase().includes(search.toLowerCase()) ||
            (o.userId as any)?.email?.toLowerCase().includes(search.toLowerCase()) ||
            (o.courseId as any)?.title?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || o.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = orders
        .filter((o) => o.status === 'paid')
        .reduce((sum, o) => sum + o.amount, 0);

    const totalPaid = orders.filter((o) => o.status === 'paid').length;
    const totalPending = orders.filter((o) => o.status === 'created').length;

    const statusFilters: { label: string; value: StatusFilter; count: number }[] = [
        { label: 'All', value: 'all', count: orders.length },
        { label: 'Paid', value: 'paid', count: totalPaid },
        { label: 'Pending', value: 'created', count: totalPending },
        { label: 'Failed', value: 'failed', count: orders.filter((o) => o.status === 'failed').length },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Payments</h1>
                    <p className="text-dark-200 text-sm mt-1">
                        {orders.length} total orders
                    </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-2xl p-5"
                >
                    <DollarSign className="w-8 h-8 text-amber-400 mb-2" />
                    <div className="text-2xl font-bold text-white">
                        ₹{totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-dark-200 text-sm">Total Revenue</div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-2xl p-5"
                >
                    <TrendingUp className="w-8 h-8 text-emerald-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{totalPaid}</div>
                    <div className="text-dark-200 text-sm">Successful Payments</div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass rounded-2xl p-5"
                >
                    <Clock className="w-8 h-8 text-yellow-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{totalPending}</div>
                    <div className="text-dark-200 text-sm">Pending Orders</div>
                </motion.div>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-300" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by student or course..."
                        className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-dark-300 text-sm focus:outline-none focus:border-primary-500/50 transition-all"
                    />
                </div>
                <div className="flex gap-1.5 bg-dark-700/50 border border-white/10 rounded-xl p-1">
                    {statusFilters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setStatusFilter(f.value)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${statusFilter === f.value
                                    ? 'bg-primary-600/20 text-primary-300 border border-primary-500/20'
                                    : 'text-dark-200 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            {f.label} ({f.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="glass rounded-xl h-16 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Student
                                    </th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Payment ID
                                    </th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="p-4">
                                            <div>
                                                <p className="text-white font-medium">
                                                    {(order.userId as any)?.name || 'N/A'}
                                                </p>
                                                <p className="text-dark-300 text-xs mt-0.5">
                                                    {(order.userId as any)?.email || ''}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-dark-100">
                                            {(order.courseId as any)?.title || 'N/A'}
                                        </td>
                                        <td className="p-4 text-white font-medium">
                                            ₹{order.amount.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.status === 'paid'
                                                        ? 'bg-emerald-500/15 text-emerald-400'
                                                        : order.status === 'failed'
                                                            ? 'bg-red-500/15 text-red-400'
                                                            : 'bg-yellow-500/15 text-yellow-400'
                                                    }`}
                                            >
                                                {order.status === 'created' ? 'pending' : order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-dark-300 text-xs font-mono">
                                            {order.razorpayPaymentId || '—'}
                                        </td>
                                        <td className="p-4 text-dark-300">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-12 text-center text-dark-300"
                                        >
                                            {search || statusFilter !== 'all'
                                                ? 'No payments match your filters.'
                                                : 'No payments yet.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
