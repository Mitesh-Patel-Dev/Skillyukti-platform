'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Search, Mail, BookOpen, Calendar,
    ChevronDown, ChevronUp, BarChart3,
} from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface StudentCourse {
    _id: string;
    title: string;
    slug: string;
}

interface Student {
    _id: string;
    name: string;
    email: string;
    enrolledCourses: StudentCourse[];
    createdAt: string;
}

interface StudentProgress {
    _id: string;
    courseId: { _id: string; title: string; slug: string; totalLessons: number };
    completedLessons: string[];
    progressPercentage: number;
}

interface DetailCourse {
    _id: string;
    title: string;
    slug: string;
    thumbnail: string;
    price: number;
    totalLessons: number;
}

interface StudentDetail {
    student: Omit<Student, 'enrolledCourses'> & { enrolledCourses: DetailCourse[] };
    progress: StudentProgress[];
}

export default function AdminStudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [detailCache, setDetailCache] = useState<{ [id: string]: StudentDetail }>({});
    const [detailLoading, setDetailLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const { data } = await api.get('/admin/students');
            setStudents(data);
        } catch {
            toast.error('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = async (id: string) => {
        if (expandedId === id) {
            setExpandedId(null);
            return;
        }
        setExpandedId(id);

        if (!detailCache[id]) {
            setDetailLoading(id);
            try {
                const { data } = await api.get(`/admin/students/${id}`);
                setDetailCache((prev) => ({ ...prev, [id]: data }));
            } catch {
                toast.error('Failed to load student details');
            } finally {
                setDetailLoading(null);
            }
        }
    };

    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Students</h1>
                    <p className="text-dark-200 text-sm mt-1">
                        {students.length} registered students
                    </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-300" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-dark-300 text-sm focus:outline-none focus:border-primary-500/50 transition-all"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="glass rounded-xl h-16 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Student
                                    </th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Courses
                                    </th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="text-right p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((student) => (
                                    <StudentRow
                                        key={student._id}
                                        student={student}
                                        isExpanded={expandedId === student._id}
                                        detail={detailCache[student._id]}
                                        isDetailLoading={detailLoading === student._id}
                                        onToggle={() => toggleExpand(student._id)}
                                    />
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-12 text-center text-dark-300"
                                        >
                                            {search
                                                ? 'No students match your search.'
                                                : 'No students registered yet.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function StudentRow({
    student,
    isExpanded,
    detail,
    isDetailLoading,
    onToggle,
}: {
    student: Student;
    isExpanded: boolean;
    detail?: StudentDetail;
    isDetailLoading: boolean;
    onToggle: () => void;
}) {
    return (
        <>
            <tr
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={onToggle}
            >
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {student.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-medium">{student.name}</span>
                    </div>
                </td>
                <td className="p-4">
                    <div className="flex items-center gap-1.5 text-dark-100">
                        <Mail className="w-3.5 h-3.5 text-dark-300" />
                        {student.email}
                    </div>
                </td>
                <td className="p-4">
                    <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-primary-400" />
                        <span className="text-white font-medium">
                            {student.enrolledCourses?.length || 0}
                        </span>
                    </div>
                </td>
                <td className="p-4">
                    <div className="flex items-center gap-1.5 text-dark-300">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(student.createdAt).toLocaleDateString()}
                    </div>
                </td>
                <td className="p-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-white/10 text-dark-200 hover:text-white transition-all">
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                </td>
            </tr>

            {/* Expanded Detail */}
            <AnimatePresence>
                {isExpanded && (
                    <tr>
                        <td colSpan={5} className="p-0">
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 py-5 bg-dark-800/40 border-b border-white/5">
                                    {isDetailLoading ? (
                                        <div className="flex items-center gap-3 text-dark-300">
                                            <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                                            Loading details...
                                        </div>
                                    ) : detail ? (
                                        <div>
                                            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                                <BarChart3 className="w-4 h-4 text-primary-400" />
                                                Enrolled Courses & Progress
                                            </h4>
                                            {detail.student.enrolledCourses.length === 0 ? (
                                                <p className="text-dark-300 text-sm">
                                                    No courses enrolled yet.
                                                </p>
                                            ) : (
                                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                    {detail.student.enrolledCourses.map((course) => {
                                                        const prog = detail.progress.find(
                                                            (p) => String((p.courseId as any)?._id || p.courseId) === course._id
                                                        );
                                                        const pct = prog?.progressPercentage || 0;
                                                        return (
                                                            <div
                                                                key={course._id}
                                                                className="bg-dark-700/50 rounded-xl p-4 border border-white/5"
                                                            >
                                                                <p className="text-white text-sm font-medium mb-2 truncate">
                                                                    {course.title}
                                                                </p>
                                                                <div className="flex items-center justify-between text-xs mb-1.5">
                                                                    <span className="text-dark-300">
                                                                        {prog?.completedLessons?.length || 0}/
                                                                        {course.totalLessons} lessons
                                                                    </span>
                                                                    <span className="text-primary-400 font-medium">
                                                                        {pct}%
                                                                    </span>
                                                                </div>
                                                                <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full transition-all duration-500"
                                                                        style={{ width: `${pct}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </motion.div>
                        </td>
                    </tr>
                )}
            </AnimatePresence>
        </>
    );
}
