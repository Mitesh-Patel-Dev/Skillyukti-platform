'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Plus, Pencil, Trash2, X, Save,
    Play, GripVertical, Video, FileText,
} from 'lucide-react';
import api from '@/lib/api';
import { Lesson, Course } from '@/types';
import toast from 'react-hot-toast';

const emptyForm = {
    title: '',
    description: '',
    videoUrl: '',
    videoProvider: 'vimeo' as 'vimeo' | 'bunny',
    duration: '0:00',
    order: 1,
    section: 'General',
    isFree: false,
};

export default function AdminLessonsPage({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = use(params);
    const router = useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, [courseId]);

    const fetchData = async () => {
        try {
            const [coursesRes, lessonsRes] = await Promise.all([
                api.get('/admin/courses'),
                api.get(`/admin/courses/${courseId}/lessons`),
            ]);
            const found = coursesRes.data.find((c: Course) => c._id === courseId);
            setCourse(found || null);
            setLessons(lessonsRes.data);
        } catch {
            toast.error('Failed to load course data');
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setEditId(null);
        setForm({
            ...emptyForm,
            order: lessons.length + 1,
        });
        setShowModal(true);
    };

    const openEdit = (lesson: Lesson) => {
        setEditId(lesson._id);
        setForm({
            title: lesson.title,
            description: lesson.description,
            videoUrl: lesson.videoUrl,
            videoProvider: lesson.videoProvider,
            duration: lesson.duration,
            order: lesson.order,
            section: lesson.section,
            isFree: lesson.isFree,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editId) {
                const { data } = await api.put(`/admin/lessons/${editId}`, form);
                setLessons((prev) =>
                    prev.map((l) => (l._id === editId ? data : l)).sort((a, b) => a.order - b.order)
                );
                toast.success('Lesson updated');
            } else {
                const { data } = await api.post('/admin/lessons', {
                    ...form,
                    courseId,
                });
                setLessons((prev) => [...prev, data].sort((a, b) => a.order - b.order));
                toast.success('Lesson added');
            }
            setShowModal(false);
        } catch {
            toast.error('Failed to save lesson');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this lesson? This cannot be undone.')) return;
        try {
            await api.delete(`/admin/lessons/${id}`);
            setLessons((prev) => prev.filter((l) => l._id !== id));
            toast.success('Lesson deleted');
        } catch {
            toast.error('Failed to delete lesson');
        }
    };

    // Group lessons by section
    const sections = lessons.reduce<{ [section: string]: Lesson[] }>((acc, lesson) => {
        const key = lesson.section || 'General';
        if (!acc[key]) acc[key] = [];
        acc[key].push(lesson);
        return acc;
    }, {});

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-8 w-64 bg-dark-700 rounded-lg animate-pulse" />
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="glass rounded-xl h-16 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <Link
                    href="/admin/courses"
                    className="p-2 rounded-lg hover:bg-white/10 text-dark-300 hover:text-white transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">
                        {course?.title || 'Course'} — Lessons
                    </h1>
                    <p className="text-dark-200 text-sm mt-0.5">
                        {lessons.length} lessons · {Object.keys(sections).length} section{Object.keys(sections).length !== 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-500 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Lesson
                </button>
            </div>

            {/* Lesson List by Section */}
            {lessons.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center mt-6">
                    <Video className="w-12 h-12 text-dark-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                        No lessons yet
                    </h3>
                    <p className="text-dark-200">
                        Start building your course by adding the first lesson.
                    </p>
                </div>
            ) : (
                <div className="space-y-6 mt-6">
                    {Object.entries(sections).map(([sectionName, sectionLessons]) => (
                        <div key={sectionName}>
                            <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary-400" />
                                {sectionName}
                            </h3>
                            <div className="glass rounded-2xl overflow-hidden">
                                {sectionLessons.map((lesson, idx) => (
                                    <div
                                        key={lesson._id}
                                        className={`flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors ${idx < sectionLessons.length - 1
                                                ? 'border-b border-white/5'
                                                : ''
                                            }`}
                                    >
                                        <div className="text-dark-400">
                                            <GripVertical className="w-4 h-4" />
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-dark-600 flex items-center justify-center text-dark-200 text-xs font-bold flex-shrink-0">
                                            {lesson.order}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium text-sm truncate">
                                                {lesson.title}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-dark-300 mt-0.5">
                                                <span className="flex items-center gap-1">
                                                    <Play className="w-3 h-3" />
                                                    {lesson.duration}
                                                </span>
                                                <span className="capitalize">
                                                    {lesson.videoProvider}
                                                </span>
                                                {lesson.isFree && (
                                                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold uppercase">
                                                        Free
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 flex-shrink-0">
                                            <button
                                                onClick={() => openEdit(lesson)}
                                                className="p-2 rounded-lg hover:bg-white/10 text-dark-200 hover:text-white transition-all"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(lesson._id)}
                                                className="p-2 rounded-lg hover:bg-red-500/15 text-dark-200 hover:text-red-400 transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="glass border border-white/10 rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white">
                                    {editId ? 'Edit Lesson' : 'Add Lesson'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-dark-300 hover:text-white transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs text-dark-300 mb-1.5">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({ ...form, title: e.target.value })
                                        }
                                        placeholder="Lesson title"
                                        className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-dark-300 mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({ ...form, description: e.target.value })
                                        }
                                        placeholder="Brief description of this lesson"
                                        className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-400 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-dark-300 mb-1.5">
                                        Video URL *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.videoUrl}
                                        onChange={(e) =>
                                            setForm({ ...form, videoUrl: e.target.value })
                                        }
                                        placeholder="https://vimeo.com/... or bunny CDN URL"
                                        className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-400"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-dark-300 mb-1.5">
                                            Video Provider
                                        </label>
                                        <select
                                            value={form.videoProvider}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    videoProvider: e.target
                                                        .value as 'vimeo' | 'bunny',
                                                })
                                            }
                                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50"
                                        >
                                            <option value="vimeo">Vimeo</option>
                                            <option value="bunny">Bunny CDN</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-dark-300 mb-1.5">
                                            Duration
                                        </label>
                                        <input
                                            type="text"
                                            value={form.duration}
                                            onChange={(e) =>
                                                setForm({ ...form, duration: e.target.value })
                                            }
                                            placeholder="10:30"
                                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-dark-300 mb-1.5">
                                            Section
                                        </label>
                                        <input
                                            type="text"
                                            value={form.section}
                                            onChange={(e) =>
                                                setForm({ ...form, section: e.target.value })
                                            }
                                            placeholder="e.g. Module 1: Basics"
                                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-dark-300 mb-1.5">
                                            Order
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={form.order}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    order: parseInt(e.target.value) || 1,
                                                })
                                            }
                                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isFree"
                                        checked={form.isFree}
                                        onChange={(e) =>
                                            setForm({ ...form, isFree: e.target.checked })
                                        }
                                        className="w-4 h-4 rounded border-white/20 bg-dark-700 text-primary-500 focus:ring-primary-500/30"
                                    />
                                    <label
                                        htmlFor="isFree"
                                        className="text-sm text-dark-100"
                                    >
                                        Free preview lesson
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-2.5 rounded-xl border border-white/10 text-dark-200 text-sm font-medium hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-500 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {saving
                                            ? 'Saving...'
                                            : editId
                                                ? 'Update'
                                                : 'Add Lesson'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
