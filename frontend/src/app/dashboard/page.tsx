'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    BookOpen, Play, Clock, BarChart3, ArrowRight,
    LayoutDashboard, LogOut, Award, Link2, Wallet, Receipt, ArrowDownCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Course, Progress } from '@/types';
import Navbar from '@/components/layout/Navbar';

export default function DashboardPage() {
    const { user, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [progresses, setProgresses] = useState<{ [courseId: string]: Progress }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const { data: userData } = await api.get('/auth/me');
                const courses = userData.enrolledCourses as Course[];
                setEnrolledCourses(courses);

                // Fetch progress for each course
                const progressMap: { [key: string]: Progress } = {};
                for (const course of courses) {
                    try {
                        const { data: prog } = await api.get(`/progress/${course._id}`);
                        progressMap[course._id] = prog;
                    } catch {
                        progressMap[course._id] = {
                            _id: '',
                            userId: '',
                            courseId: course._id,
                            completedLessons: [],
                            progressPercentage: 0,
                        };
                    }
                }
                setProgresses(progressMap);
            } catch (err) {
                console.error('Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user, authLoading, router]);

    if (authLoading || (!user && !authLoading)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome back, {user?.name?.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-dark-200">Continue learning and building your skills.</p>
                    </motion.div>

                    {/* Stats Cards */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass rounded-2xl p-6"
                        >
                            <BookOpen className="w-8 h-8 text-primary-400 mb-3" />
                            <div className="text-2xl font-bold text-white">{enrolledCourses.length}</div>
                            <div className="text-dark-200 text-sm">Enrolled Courses</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass rounded-2xl p-6"
                        >
                            <BarChart3 className="w-8 h-8 text-accent-green mb-3" />
                            <div className="text-2xl font-bold text-white">
                                {enrolledCourses.length > 0
                                    ? Math.round(
                                        Object.values(progresses).reduce(
                                            (sum, p) => sum + (p?.progressPercentage || 0),
                                            0
                                        ) / Math.max(enrolledCourses.length, 1)
                                    )
                                    : 0}
                                %
                            </div>
                            <div className="text-dark-200 text-sm">Average Progress</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass rounded-2xl p-6"
                        >
                            <Award className="w-8 h-8 text-accent-orange mb-3" />
                            <div className="text-2xl font-bold text-white">
                                {Object.values(progresses).filter((p) => p?.progressPercentage === 100).length}
                            </div>
                            <div className="text-dark-200 text-sm">Completed</div>
                        </motion.div>
                    </div>

                    {/* Affiliate Hub */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Affiliate Hub</h2>
                        <div className="grid sm:grid-cols-4 gap-3">
                            <Link href="/dashboard/affiliate" className="glass rounded-xl p-4 card-hover flex items-center gap-3">
                                <Link2 className="w-5 h-5 text-primary-400" />
                                <span className="text-white text-sm font-medium">Referral Link</span>
                            </Link>
                            <Link href="/dashboard/wallet" className="glass rounded-xl p-4 card-hover flex items-center gap-3">
                                <Wallet className="w-5 h-5 text-accent-green" />
                                <span className="text-white text-sm font-medium">My Wallet</span>
                            </Link>
                            <Link href="/dashboard/transactions" className="glass rounded-xl p-4 card-hover flex items-center gap-3">
                                <Receipt className="w-5 h-5 text-accent-orange" />
                                <span className="text-white text-sm font-medium">Transactions</span>
                            </Link>
                            <Link href="/dashboard/withdraw" className="glass rounded-xl p-4 card-hover flex items-center gap-3">
                                <ArrowDownCircle className="w-5 h-5 text-accent-purple" />
                                <span className="text-white text-sm font-medium">Withdraw</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* My Courses */}
                    <h2 className="text-xl font-bold text-white mb-6">My Courses</h2>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
                            ))}
                        </div>
                    ) : enrolledCourses.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass rounded-2xl p-12 text-center"
                        >
                            <BookOpen className="w-12 h-12 text-dark-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">No courses yet</h3>
                            <p className="text-dark-200 mb-6">
                                Start your learning journey by enrolling in a course.
                            </p>
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold"
                            >
                                Browse Courses <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrolledCourses.map((course, index) => {
                                const progress = progresses[course._id];
                                return (
                                    <motion.div
                                        key={course._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link href={`/dashboard/course/${course.slug}`}>
                                            <div className="glass card-hover rounded-2xl overflow-hidden group">
                                                <div className="h-32 bg-gradient-to-br from-primary-900/50 to-dark-700 flex items-center justify-center relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-accent-purple/10" />
                                                    <span className="text-4xl relative z-10">
                                                        {course.category === 'Digital Marketing' && '📊'}
                                                        {course.category === 'Freelancing' && '💼'}
                                                        {course.category === 'AI & Technology' && '🤖'}
                                                        {course.category === 'E-commerce' && '🛒'}
                                                    </span>
                                                </div>

                                                <div className="p-5">
                                                    <h3 className="text-white font-semibold mb-2 group-hover:text-primary-300 transition-colors">
                                                        {course.title}
                                                    </h3>

                                                    {/* Progress bar */}
                                                    <div className="mb-3">
                                                        <div className="flex justify-between text-xs mb-1.5">
                                                            <span className="text-dark-200">Progress</span>
                                                            <span className="text-primary-400 font-medium">
                                                                {progress?.progressPercentage || 0}%
                                                            </span>
                                                        </div>
                                                        <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${progress?.progressPercentage || 0}%` }}
                                                                transition={{ duration: 1, delay: 0.5 }}
                                                                className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-dark-300 text-xs">
                                                            {progress?.completedLessons?.length || 0}/{course.totalLessons} lessons
                                                        </span>
                                                        <span className="text-primary-400 text-sm font-semibold flex items-center gap-1">
                                                            <Play className="w-3.5 h-3.5" />
                                                            Continue
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
