'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Banknote, Clock, CheckCircle, XCircle } from 'lucide-react';
import api from '@/lib/api';
import { WithdrawalRequest, User } from '@/types';
import toast from 'react-hot-toast';

export default function AdminWithdrawalsPage() {
    const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const fetchRequests = async () => {
        try {
            const { data } = await api.get('/admin/withdrawals');
            setRequests(data);
        } catch {
            console.error('Failed to load withdrawals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        setProcessingId(id);
        try {
            await api.post(`/admin/withdrawals/${id}/${action}`);
            toast.success(`Withdrawal ${action}d!`);
            fetchRequests();
        } catch (error: any) {
            toast.error(error.response?.data?.message || `Failed to ${action}`);
        } finally {
            setProcessingId(null);
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

    const pendingCount = requests.filter((r) => r.status === 'pending').length;
    const totalApproved = requests
        .filter((r) => r.status === 'approved')
        .reduce((sum, r) => sum + r.amount, 0);

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
            <h1 className="text-2xl font-bold text-white mb-2">Withdrawal Requests</h1>
            <p className="text-dark-200 text-sm mb-8">Review and manage user withdrawal requests.</p>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="glass rounded-2xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{pendingCount}</div>
                        <div className="text-dark-300 text-sm">Pending Requests</div>
                    </div>
                </div>
                <div className="glass rounded-2xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center">
                        <Banknote className="w-6 h-6 text-accent-green" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">₹{totalApproved.toLocaleString()}</div>
                        <div className="text-dark-300 text-sm">Total Approved</div>
                    </div>
                </div>
            </div>

            {/* Requests Table */}
            <div className="glass rounded-2xl overflow-hidden">
                {requests.length === 0 ? (
                    <div className="p-12 text-center">
                        <Banknote className="w-12 h-12 text-dark-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No withdrawal requests</h3>
                        <p className="text-dark-300 text-sm">Requests will appear here when users request payouts.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">User</th>
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Amount</th>
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Payout Details</th>
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Date</th>
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Status</th>
                                <th className="text-left text-dark-200 text-xs font-medium uppercase tracking-wider py-4 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {requests.map((req) => {
                                const reqUser = typeof req.userId === 'object' ? req.userId as User : null;
                                return (
                                    <tr key={req._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="text-white text-sm font-medium">{reqUser?.name || '—'}</div>
                                            <div className="text-dark-400 text-xs">{reqUser?.email || ''}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-white font-semibold">₹{req.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            {req.paymentMethod === 'upi' ? (
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-primary-400 uppercase font-bold tracking-wider mb-0.5">UPI ID</span>
                                                    <span className="text-white text-sm">{req.upiId}</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[10px] text-accent-green uppercase font-bold tracking-wider mb-0.5">BANK TRANSFER</span>
                                                    <div className="text-white text-sm font-medium">{req.accountHolderName}</div>
                                                    <div className="text-dark-300 text-xs">Acc: {req.accountNumber}</div>
                                                    <div className="text-dark-400 text-[10px]">IFSC: {req.ifscCode}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-dark-300 text-sm">
                                            {new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="py-4 px-6">{getStatusBadge(req.status)}</td>
                                        <td className="py-4 px-6">
                                            {req.status === 'pending' ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleAction(req._id, 'approve')}
                                                        disabled={processingId === req._id}
                                                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-accent-green/10 text-accent-green hover:bg-accent-green/20 transition-colors disabled:opacity-50"
                                                    >
                                                        <CheckCircle className="w-3 h-3" /> Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req._id, 'reject')}
                                                        disabled={processingId === req._id}
                                                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                                    >
                                                        <XCircle className="w-3 h-3" /> Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-dark-400 text-xs">{req.adminNote || '—'}</span>
                                            )}
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
