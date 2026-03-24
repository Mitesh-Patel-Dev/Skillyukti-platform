'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, BarChart3, User, Link2, Shield, Package,
    ArrowDownCircle, Receipt, CreditCard, Trophy, LifeBuoy,
    Menu, X, LogOut, ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';

const navItems = [
    { label: 'My Courses',           href: '/dashboard/courses',      icon: BookOpen },
    { label: 'Affiliate Dashboard',  href: '/dashboard',              icon: BarChart3 },
    { label: 'My Profile',           href: '/dashboard/profile',      icon: User },
    { label: 'Affiliate Link',       href: '/dashboard/affiliate',    icon: Link2 },
    { label: 'KYC / Bank Details',   href: '/dashboard/kyc',          icon: Shield },
    { label: 'My Plan',              href: '/dashboard/my-plan',      icon: Package },
    { label: 'Withdrawal Request',   href: '/dashboard/withdraw',     icon: ArrowDownCircle },
    { label: 'Wallet Transactions',  href: '/dashboard/transactions', icon: Receipt },
    { label: 'Payout Transactions',  href: '/dashboard/payouts',      icon: CreditCard },
    { label: 'Leaderboard',          href: '/dashboard/leaderboard',  icon: Trophy },
    { label: 'Support',              href: '/dashboard/support',      icon: LifeBuoy },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* User Info */}
            <div className="p-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
                        <p className="text-dark-300 text-xs truncate">{user?.referralCode}</p>
                    </div>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto py-3 px-2">
                {navItems.map((item) => {
                    const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all group ${
                                active
                                    ? 'bg-primary-600/20 text-primary-300 border border-primary-500/20'
                                    : 'text-dark-200 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary-400' : 'text-dark-400 group-hover:text-white'}`} />
                            <span className="truncate">{item.label}</span>
                            {active && <ChevronRight className="w-3 h-3 ml-auto text-primary-400" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-white/5">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-sm font-medium text-dark-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-16 flex">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-16 bottom-0 border-r border-white/5 bg-dark-900/80 backdrop-blur-xl z-30">
                    <SidebarContent />
                </aside>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                                onClick={() => setSidebarOpen(false)}
                            />
                            <motion.aside
                                initial={{ x: -280 }}
                                animate={{ x: 0 }}
                                exit={{ x: -280 }}
                                transition={{ type: 'spring', damping: 25 }}
                                className="fixed left-0 top-0 bottom-0 w-72 bg-dark-900 border-r border-white/5 z-50 lg:hidden flex flex-col"
                            >
                                <div className="flex items-center justify-between p-4 border-b border-white/5">
                                    <span className="text-white font-semibold">Dashboard</span>
                                    <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-white/10">
                                        <X className="w-5 h-5 text-dark-200" />
                                    </button>
                                </div>
                                <SidebarContent />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 lg:ml-64 min-h-screen">
                    {/* Mobile menu button */}
                    <div className="lg:hidden p-4 border-b border-white/5 flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl glass hover:bg-white/10 transition-colors"
                        >
                            <Menu className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-white font-semibold">Dashboard</span>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
