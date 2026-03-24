'use client';

import { motion } from 'framer-motion';
import { LifeBuoy, Mail, MessageCircle, Phone } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <LifeBuoy className="w-6 h-6 text-blue-400" /> Support
            </motion.h1>
            <p className="text-dark-300 text-sm mb-8">Need help? Reach out to us through any of the channels below.</p>

            <div className="grid gap-4">
                {[
                    { icon: Mail, label: 'Email Support', value: 'support@skillyukti.com', note: 'Response within 24 hours', color: 'text-blue-400', gradient: 'from-blue-600/20 to-blue-500/10' },
                    { icon: MessageCircle, label: 'WhatsApp Support', value: 'Chat on WhatsApp', note: 'Available 10am – 6pm IST', color: 'text-accent-green', gradient: 'from-accent-green/20 to-teal-500/10' },
                    { icon: Phone, label: 'Phone Support', value: '+91 XXXXX XXXXX', note: 'Available Mon–Sat', color: 'text-orange-400', gradient: 'from-orange-500/20 to-amber-500/10' },
                ].map((item, i) => (
                    <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className={`glass rounded-2xl p-5 flex items-center gap-4 bg-gradient-to-r ${item.gradient}`}>
                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0`}>
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div>
                            <p className="text-dark-200 text-xs">{item.label}</p>
                            <p className="text-white font-semibold text-sm">{item.value}</p>
                            <p className="text-dark-400 text-xs mt-0.5">{item.note}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-6 mt-6">
                <h2 className="text-base font-semibold text-white mb-4">Send a Message</h2>
                <div className="space-y-3">
                    <input type="text" placeholder="Subject" className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none placeholder:text-dark-400" />
                    <textarea rows={4} placeholder="Describe your issue..." className="w-full bg-dark-700/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none placeholder:text-dark-400 resize-none" />
                    <button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-xl font-semibold hover:from-primary-500 hover:to-primary-400 transition-all">
                        Send Message
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
