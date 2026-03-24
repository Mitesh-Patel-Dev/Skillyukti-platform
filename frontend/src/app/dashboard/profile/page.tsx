'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, CheckCircle, Upload } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ImageUpload from '@/components/admin/ImageUpload';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { user, loading: authLoading, updateUser } = useAuth();
    const router = useRouter();
    const [sponsor, setSponsor] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: '', email: '', phone: '', gender: '',
        address: '', city: '', state: '', pincode: '',
        avatar: '',
    });

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) {
            setForm({
                name: (user as any).name || '',
                email: (user as any).email || '',
                phone: (user as any).phone || '',
                gender: (user as any).gender || '',
                address: (user as any).address || '',
                city: (user as any).city || '',
                state: (user as any).state || '',
                pincode: (user as any).pincode || '',
                avatar: (user as any).avatar || '',
            });
            api.get('/auth/sponsor').then(({ data }) => setSponsor(data.sponsor)).catch(() => {});
        }
    }, [user, authLoading, router]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const { data } = await api.put('/auth/profile', form);
            updateUser(data.user);
            toast.success('Profile updated successfully!');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to update profile');
        } finally { setSaving(false); }
    };

    if (authLoading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    const field = (label: string, key: keyof typeof form, type = 'text', readOnly = false) => (
        <div>
            <label className="text-sm text-dark-200 mb-1.5 block">{label}</label>
            <input
                type={type}
                value={form[key]}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                readOnly={readOnly}
                className={`w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/50 transition-colors ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <User className="w-6 h-6 text-primary-400" /> My Profile
            </motion.h1>

            {/* Sponsor Info */}
            {sponsor && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 mb-6">
                    <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent-green" /> Sponsor Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><p className="text-dark-300 text-xs mb-1">Sponsor Name</p><p className="text-white text-sm font-medium">{sponsor.name}</p></div>
                        <div><p className="text-dark-300 text-xs mb-1">Sponsor Email</p><p className="text-white text-sm font-medium">{sponsor.email}</p></div>
                        <div><p className="text-dark-300 text-xs mb-1">Sponsor Code</p><p className="text-primary-300 text-sm font-mono font-bold">{sponsor.referralCode}</p></div>
                        <div><p className="text-dark-300 text-xs mb-1">Sponsor Phone</p><p className="text-white text-sm font-medium">{sponsor.phone || '—'}</p></div>
                    </div>
                </motion.div>
            )}

            {/* Personal Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-white/10">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-600/30 to-accent-purple/30 overflow-hidden border-2 border-primary-500/20">
                            {form.avatar ? (
                                <img src={form.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary-400 font-bold text-3xl">
                                    {form.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-base font-semibold text-white mb-1">Profile Photo</h2>
                        <p className="text-dark-300 text-xs mb-4">Recommended: Square image, max 2MB</p>
                        <ImageUpload 
                            value={form.avatar} 
                            onChange={(url) => setForm(prev => ({ ...prev, avatar: url }))} 
                        />
                    </div>
                </div>

                <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-400" /> Personal Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {field('Full Name', 'name')}
                    {field('Email Address', 'email', 'email', true)}
                    {field('Phone Number', 'phone', 'tel')}
                    <div>
                        <label className="text-sm text-dark-200 mb-1.5 block">Gender</label>
                        <select
                            value={form.gender}
                            onChange={e => setForm(prev => ({ ...prev, gender: e.target.value }))}
                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/50 transition-colors"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <h3 className="text-sm font-semibold text-dark-200 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Address
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="sm:col-span-2">{field('Address', 'address')}</div>
                    {field('City', 'city')}
                    {field('State', 'state')}
                    {field('Pincode', 'pincode')}
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-400 transition-all disabled:opacity-60"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </motion.div>
        </div>
    );
}
