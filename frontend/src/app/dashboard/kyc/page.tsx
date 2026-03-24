'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Save, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function KYCPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        upiId: '',
    });

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) {
            const bd = (user as any).bankDetails || {};
            setForm({
                accountHolderName: bd.accountHolderName || '',
                accountNumber: bd.accountNumber || '',
                ifscCode: bd.ifscCode || '',
                bankName: bd.bankName || '',
                upiId: bd.upiId || '',
            });
        }
    }, [user, authLoading, router]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/auth/kyc', form);
            toast.success('Bank details saved successfully!');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to save bank details');
        } finally { setSaving(false); }
    };

    if (authLoading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    const field = (label: string, key: keyof typeof form, placeholder = '') => (
        <div>
            <label className="text-sm text-dark-200 mb-1.5 block">{label}</label>
            <input
                type="text"
                value={form[key]}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/50 transition-colors placeholder:text-dark-400"
            />
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Shield className="w-6 h-6 text-accent-green" /> KYC / Bank Details
            </motion.h1>
            <p className="text-dark-300 text-sm mb-8">Your bank details are required to process withdrawal payouts.</p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 mb-6">
                <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary-400" /> Bank Account Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {field('Account Holder Name', 'accountHolderName', 'As per bank records')}
                    {field('Account Number', 'accountNumber', 'Enter account number')}
                    {field('IFSC Code', 'ifscCode', 'e.g. SBIN0001234')}
                    {field('Bank Name', 'bankName', 'e.g. State Bank of India')}
                </div>

                <div className="border-t border-white/5 pt-5 mb-6">
                    <h3 className="text-sm font-semibold text-dark-200 mb-4">UPI Details (Alternative)</h3>
                    {field('UPI ID', 'upiId', 'e.g. name@upi')}
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-accent-green/5 border border-accent-green/20 mb-6">
                    <Shield className="w-4 h-4 text-accent-green flex-shrink-0" />
                    <p className="text-dark-200 text-xs">Your bank details are encrypted and stored securely. They are only used for processing withdrawal payouts.</p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-accent-green/80 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-accent-green hover:to-teal-400 transition-all disabled:opacity-60"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Bank Details'}
                </button>
            </motion.div>
        </div>
    );
}
