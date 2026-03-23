'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, BookOpen, GraduationCap, Users,
    CreditCard, Star, Settings, LogOut, ChevronRight,
    Share2, Banknote,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/courses', label: 'Courses', icon: BookOpen },
    { href: '/admin/students', label: 'Students', icon: Users },
    { href: '/admin/payments', label: 'Payments', icon: CreditCard },
    { href: '/admin/referrals', label: 'Referrals', icon: Share2 },
    { href: '/admin/withdrawals', label: 'Withdrawals', icon: Banknote },
    { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900">
                <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            </div>
        );
    }

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen flex bg-dark-900">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-dark-800/60 flex flex-col fixed h-full z-30">
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2.5">
                        <img 
                            src="/logo.png" 
                            alt="Skillyukti" 
                            className="h-10 w-auto object-contain"
                        />
                        <div>
                            <span className="text-[10px] text-dark-300 uppercase tracking-widest">Admin Panel</span>
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${active
                                        ? 'bg-primary-600/15 text-primary-300 border border-primary-500/20'
                                        : 'text-dark-200 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <link.icon className={`w-[18px] h-[18px] ${active ? 'text-primary-400' : 'text-dark-300 group-hover:text-dark-100'}`} />
                                {link.label}
                                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-primary-500/50" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Logout */}
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white text-xs font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-dark-300 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { logout(); router.push('/'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-dark-200 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
