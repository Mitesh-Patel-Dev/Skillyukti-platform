'use client';

import { motion } from 'framer-motion';
import {
    Settings, Shield, Globe, Palette,
    Mail, Bell, Database,
} from 'lucide-react';

export default function AdminSettingsPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Settings</h1>
                    <p className="text-dark-200 text-sm mt-1">
                        Platform configuration and preferences.
                    </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Settings Groups */}
            <div className="grid gap-5">
                {/* Platform Info */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-primary-400" />
                        Platform Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-dark-300 mb-1.5">
                                Platform Name
                            </label>
                            <input
                                type="text"
                                value="Skillyukti"
                                disabled
                                className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white/50 text-sm cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-dark-300 mb-1.5">
                                Support Email
                            </label>
                            <input
                                type="email"
                                value="support@skillyukti.com"
                                disabled
                                className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white/50 text-sm cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        {
                            icon: Shield,
                            label: 'Security',
                            desc: 'JWT authentication, bcrypt hashing, role-based access',
                            color: 'from-emerald-500 to-emerald-600',
                            status: 'Active',
                        },
                        {
                            icon: Palette,
                            label: 'Theme',
                            desc: 'Dark glassmorphism UI with gradient accents',
                            color: 'from-violet-500 to-violet-600',
                            status: 'Dark Mode',
                        },
                        {
                            icon: Database,
                            label: 'Database',
                            desc: 'MongoDB with Mongoose ODM',
                            color: 'from-emerald-500 to-teal-600',
                            status: 'Connected',
                        },
                        {
                            icon: Mail,
                            label: 'Notifications',
                            desc: 'Email notifications for purchases',
                            color: 'from-blue-500 to-blue-600',
                            status: 'Coming Soon',
                        },
                        {
                            icon: Bell,
                            label: 'Webhooks',
                            desc: 'Razorpay payment webhooks',
                            color: 'from-amber-500 to-amber-600',
                            status: 'Coming Soon',
                        },
                        {
                            icon: Globe,
                            label: 'Domain',
                            desc: 'Custom domain configuration',
                            color: 'from-pink-500 to-pink-600',
                            status: 'Coming Soon',
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass rounded-2xl p-5"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div
                                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                                >
                                    <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${item.status === 'Active' || item.status === 'Connected' || item.status === 'Dark Mode'
                                            ? 'bg-emerald-500/15 text-emerald-400'
                                            : 'bg-yellow-500/15 text-yellow-400'
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                            <h3 className="text-white font-medium text-sm mb-1">
                                {item.label}
                            </h3>
                            <p className="text-dark-300 text-xs leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Danger Zone */}
                <div className="glass rounded-2xl p-6 border border-red-500/10">
                    <h2 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-400" />
                        Danger Zone
                    </h2>
                    <p className="text-dark-300 text-sm mb-4">
                        These actions are irreversible. Please proceed with caution.
                    </p>
                    <div className="flex gap-3">
                        <button
                            disabled
                            className="px-4 py-2 rounded-xl border border-red-500/20 text-red-400/50 text-sm font-medium cursor-not-allowed"
                        >
                            Reset All Data
                        </button>
                        <button
                            disabled
                            className="px-4 py-2 rounded-xl border border-red-500/20 text-red-400/50 text-sm font-medium cursor-not-allowed"
                        >
                            Delete All Courses
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
