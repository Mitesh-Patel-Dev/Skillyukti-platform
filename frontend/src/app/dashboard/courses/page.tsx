'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Play, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';

export default function MyCoursesPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [courses, setCourses] = useState<any[]>([]);
    const [progresses, setProgresses] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        if (user) {
            api.get('/auth/me').then(async ({ data }) => {
                const cs = data.enrolledCourses || [];
                setCourses(cs);
                const pm: Record<string, any> = {};
                for (const c of cs) {
                    try { const { data: p } = await api.get(`/progress/${c._id}`); pm[c._id] = p; } catch { pm[c._id] = { progressPercentage: 0 }; }
                }
                setProgresses(pm);
            }).catch(() => {}).finally(() => setLoading(false));
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;

    return (
        <div className="max-w-5xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary-400" /> My Courses
            </motion.h1>

            {courses.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-12 text-center">
                    <BookOpen className="w-12 h-12 text-dark-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No courses yet</h3>
                    <p className="text-dark-200 mb-6">Start your learning journey today.</p>
                    <Link href="/courses" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold">
                        Browse Courses <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {courses.map((course: any, i) => {
                        const prog = progresses[course._id];
                        const pct = prog?.progressPercentage || 0;
                        return (
                            <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                                <Link href={`/dashboard/course/${course.slug}`}>
                                    <div className="glass card-hover rounded-2xl overflow-hidden group">
                                        <div className="h-32 relative overflow-hidden">
                                            {course.thumbnail ? (
                                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary-900/50 to-dark-700 flex items-center justify-center">
                                                    <span className="text-4xl">📚</span>
                                                </div>
                                            )}
                                            {pct === 100 && (
                                                <div className="absolute top-2 right-2 bg-accent-green text-white text-xs px-2 py-1 rounded-full font-bold">Completed</div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-primary-300 transition-colors">{course.title}</h3>
                                            <div className="mb-3">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-dark-300">Progress</span>
                                                    <span className="text-primary-400 font-medium">{pct}%</span>
                                                </div>
                                                <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                                                        className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full" />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-dark-400 text-xs">{prog?.completedLessons?.length || 0}/{course.totalLessons} lessons</span>
                                                <span className="text-primary-400 text-xs font-semibold flex items-center gap-1"><Play className="w-3 h-3" /> Continue</span>
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
    );
}
