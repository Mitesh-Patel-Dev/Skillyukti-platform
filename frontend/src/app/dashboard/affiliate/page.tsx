'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Copy, Check, Link2, Share2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AffiliateLinkPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [referralData, setReferralData] = useState<{ referralCode: string; referralLink: string } | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) {
            api.get('/referral/link').then(({ data }) => setReferralData(data)).catch(() => {});
            api.get('/courses').then(({ data }) => setCourses(data)).catch(() => {});
        }
    }, [user, authLoading, router]);

    const copy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        toast.success('Copied!');
        setTimeout(() => setCopied(null), 2000);
    };

    const generateCourseLink = () => {
        if (!selectedCourse || !referralData) return;
        const course = courses.find(c => c._id === selectedCourse);
        if (!course) return;
        const link = `https://skillyukti.com/courses/${course.slug}?ref=${referralData.referralCode}`;
        copy(link, 'course');
    };

    if (authLoading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    return (
        <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Link2 className="w-6 h-6 text-primary-400" /> Affiliate Link
                </h1>
                <p className="text-dark-300 text-sm mt-1">Share your link and earn 80% commission on every sale!</p>
            </motion.div>

            {/* How it works */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3 mb-6">
                {[['🔗','Share Link','Share your unique referral link'],['🛒','They Buy','They purchase any course'],['💰','You Earn','80% goes to your wallet']].map(([e,t,d]) => (
                    <div key={t} className="glass rounded-xl p-4 text-center">
                        <div className="text-2xl mb-1">{e}</div>
                        <p className="text-white text-xs font-semibold mb-0.5">{t}</p>
                        <p className="text-dark-400 text-xs">{d}</p>
                    </div>
                ))}
            </motion.div>

            {/* Referral Code + Link */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 mb-6 space-y-4">
                <h2 className="text-base font-semibold text-white flex items-center gap-2"><Share2 className="w-4 h-4 text-primary-400" /> Your Details</h2>

                {[
                    { label: 'Referral Code', value: referralData?.referralCode || '', key: 'code', mono: true },
                    { label: 'Referral Link', value: referralData?.referralLink || '', key: 'link', mono: false },
                ].map(item => (
                    <div key={item.key}>
                        <label className="text-sm text-dark-200 mb-1.5 block">{item.label}</label>
                        <div className="flex items-center gap-2">
                            <div className={`flex-1 bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-sm truncate ${item.mono ? 'font-mono text-primary-300 text-lg tracking-widest' : 'text-white'}`}>
                                {item.value || '—'}
                            </div>
                            <button
                                onClick={() => copy(item.value, item.key)}
                                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    copied === item.key ? 'bg-accent-green/20 text-accent-green' : 'bg-primary-600 text-white hover:bg-primary-500'
                                }`}
                            >
                                {copied === item.key ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                            </button>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Course-specific link */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-6">
                <h2 className="text-base font-semibold text-white mb-4">Generate Course-Specific Link</h2>
                <div className="flex gap-3">
                    <select
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                        className="flex-1 bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/50"
                    >
                        <option value="">Select a course...</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                    <button
                        onClick={generateCourseLink}
                        disabled={!selectedCourse}
                        className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                            copied === 'course' ? 'bg-accent-green/20 text-accent-green' : 'bg-primary-600 text-white hover:bg-primary-500 disabled:opacity-40'
                        }`}
                    >
                        {copied === 'course' ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Generate & Copy</>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
