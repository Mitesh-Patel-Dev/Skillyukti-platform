'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, EyeOff, Pencil, Trash2, GraduationCap, Play } from 'lucide-react';
import api from '@/lib/api';
import { Course } from '@/types';
import toast from 'react-hot-toast';

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const { data } = await api.get('/admin/courses');
            setCourses(data);
        } catch {
            toast.error('Failed to load courses');
        } finally {
            setLoading(false);
        }
    };

    const togglePublish = async (course: Course) => {
        try {
            const { data } = await api.put(`/admin/courses/${course._id}`, { published: !course.published });
            setCourses(courses.map((c) => (c._id === course._id ? data : c)));
            toast.success(data.published ? 'Course published' : 'Course unpublished');
        } catch {
            toast.error('Failed to update');
        }
    };

    const deleteCourse = async (id: string) => {
        if (!confirm('Delete this course and all its lessons? This cannot be undone.')) return;
        try {
            await api.delete(`/admin/courses/${id}`);
            setCourses(courses.filter((c) => c._id !== id));
            toast.success('Course deleted');
        } catch {
            toast.error('Failed to delete');
        }
    };

    const filtered = courses.filter((c) =>
        (c.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (c.category?.toLowerCase() || '').includes(search.toLowerCase())
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Courses</h1>
                    <p className="text-dark-200 text-sm mt-1">{courses.length} total courses</p>
                </div>
                <Link
                    href="/admin/courses/new"
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-500 transition-colors"
                >
                    <Plus className="w-4 h-4" /> New Course
                </Link>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-300" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title or category..."
                    className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-dark-300 text-sm focus:outline-none focus:border-primary-500/50 transition-all"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => <div key={i} className="glass rounded-xl h-16 animate-pulse" />)}
                </div>
            ) : (
                <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Course</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Category</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Price</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Lessons</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Students</th>
                                    <th className="text-left p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Status</th>
                                    <th className="text-right p-4 text-dark-300 font-medium text-xs uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((course) => (
                                    <tr key={course._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-900/60 to-dark-600 flex items-center justify-center">
                                                    <GraduationCap className="w-5 h-5 text-primary-400" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{course.title}</p>
                                                    <p className="text-dark-300 text-xs mt-0.5">{course.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-dark-600 text-dark-100">{course.category}</span>
                                        </td>
                                        <td className="p-4 text-white font-medium">₹{course.price.toLocaleString()}</td>
                                        <td className="p-4 text-dark-100">{course.totalLessons}</td>
                                        <td className="p-4 text-dark-100">{course.enrolledCount}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${course.published ? 'bg-emerald-500/15 text-emerald-400' : 'bg-yellow-500/15 text-yellow-400'
                                                }`}>
                                                {course.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/admin/lessons/${course._id}`}
                                                    className="p-2 rounded-lg hover:bg-primary-600/15 text-dark-200 hover:text-primary-300 transition-all"
                                                    title="Manage Lessons"
                                                >
                                                    <Play className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/courses/${course._id}`}
                                                    className="p-2 rounded-lg hover:bg-white/10 text-dark-200 hover:text-white transition-all"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => togglePublish(course)}
                                                    className="p-2 rounded-lg hover:bg-white/10 text-dark-200 hover:text-white transition-all"
                                                    title={course.published ? 'Unpublish' : 'Publish'}
                                                >
                                                    {course.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => deleteCourse(course._id)}
                                                    className="p-2 rounded-lg hover:bg-red-500/15 text-dark-200 hover:text-red-400 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="p-12 text-center text-dark-300">
                                            {search ? 'No courses match your search.' : 'No courses yet. Create your first course!'}
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
