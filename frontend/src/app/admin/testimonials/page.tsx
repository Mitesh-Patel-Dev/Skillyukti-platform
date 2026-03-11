'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, Plus, Pencil, Trash2, X, Save, Eye, EyeOff,
} from 'lucide-react';
import api from '@/lib/api';
import { Testimonial } from '@/types';
import toast from 'react-hot-toast';

const emptyForm: Omit<Testimonial, '_id'> = {
    name: '',
    avatar: '',
    role: '',
    content: '',
    rating: 5,
    featured: true,
};

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data } = await api.get('/admin/testimonials');
            setTestimonials(data);
        } catch {
            toast.error('Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setEditId(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (t: Testimonial) => {
        setEditId(t._id);
        setForm({
            name: t.name,
            avatar: t.avatar,
            role: t.role,
            content: t.content,
            rating: t.rating,
            featured: t.featured,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editId) {
                const { data } = await api.put(`/admin/testimonials/${editId}`, form);
                setTestimonials((prev) =>
                    prev.map((t) => (t._id === editId ? data : t))
                );
                toast.success('Testimonial updated');
            } else {
                const { data } = await api.post('/admin/testimonials', form);
                setTestimonials((prev) => [data, ...prev]);
                toast.success('Testimonial created');
            }
            setShowModal(false);
        } catch {
            toast.error('Failed to save testimonial');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await api.delete(`/admin/testimonials/${id}`);
            setTestimonials((prev) => prev.filter((t) => t._id !== id));
            toast.success('Testimonial deleted');
        } catch {
            toast.error('Failed to delete');
        }
    };

    const toggleFeatured = async (t: Testimonial) => {
        try {
            const { data } = await api.put(`/admin/testimonials/${t._id}`, {
                featured: !t.featured,
            });
            setTestimonials((prev) =>
                prev.map((x) => (x._id === t._id ? data : x))
            );
            toast.success(data.featured ? 'Marked as featured' : 'Removed from featured');
        } catch {
            toast.error('Failed to update');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Testimonials</h1>
                    <p className="text-dark-200 text-sm mt-1">
                        {testimonials.length} total testimonials
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-500 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Testimonial
                </button>
            </div>

            {/* Cards Grid */}
            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="glass rounded-2xl h-52 animate-pulse"
                        />
                    ))}
                </div>
            ) : testimonials.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                    <Star className="w-12 h-12 text-dark-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                        No testimonials yet
                    </h3>
                    <p className="text-dark-200">
                        Add student testimonials to showcase on your landing page.
                    </p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass rounded-2xl p-5 relative group"
                        >
                            {/* Featured badge */}
                            {t.featured && (
                                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-semibold uppercase tracking-wider">
                                    Featured
                                </div>
                            )}

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < t.rating
                                                ? 'text-amber-400 fill-amber-400'
                                                : 'text-dark-500'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-dark-100 text-sm leading-relaxed mb-4 line-clamp-3">
                                &ldquo;{t.content}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    {t.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-white text-sm font-medium truncate">
                                        {t.name}
                                    </p>
                                    <p className="text-dark-300 text-xs truncate">
                                        {t.role}
                                    </p>
                                </div>
                            </div>

                            {/* Actions (visible on hover) */}
                            <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => toggleFeatured(t)}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-dark-300 hover:text-amber-400 transition-all"
                                    title={t.featured ? 'Remove from featured' : 'Mark as featured'}
                                >
                                    {t.featured ? (
                                        <EyeOff className="w-3.5 h-3.5" />
                                    ) : (
                                        <Eye className="w-3.5 h-3.5" />
                                    )}
                                </button>
                                <button
                                    onClick={() => openEdit(t)}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-dark-300 hover:text-white transition-all"
                                    title="Edit"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(t._id)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/15 text-dark-300 hover:text-red-400 transition-all"
                                    title="Delete"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </motion.div>
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
                            className="glass border border-white/10 rounded-2xl w-full max-w-lg p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white">
                                    {editId ? 'Edit Testimonial' : 'Add Testimonial'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-dark-300 hover:text-white transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-dark-300 mb-1.5">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({ ...form, name: e.target.value })
                                            }
                                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-dark-300 mb-1.5">
                                            Role / Title
                                        </label>
                                        <input
                                            type="text"
                                            value={form.role}
                                            onChange={(e) =>
                                                setForm({ ...form, role: e.target.value })
                                            }
                                            placeholder="e.g. Student, Freelancer"
                                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-dark-300 mb-1.5">
                                        Content *
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={form.content}
                                        onChange={(e) =>
                                            setForm({ ...form, content: e.target.value })
                                        }
                                        placeholder="What did the student say?"
                                        className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-400 resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-dark-300 mb-1.5">
                                            Avatar URL
                                        </label>
                                        <input
                                            type="text"
                                            value={form.avatar}
                                            onChange={(e) =>
                                                setForm({ ...form, avatar: e.target.value })
                                            }
                                            placeholder="https://..."
                                            className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 placeholder-dark-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-dark-300 mb-1.5">
                                            Rating
                                        </label>
                                        <div className="flex gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() =>
                                                        setForm({ ...form, rating: n })
                                                    }
                                                    className="p-0.5"
                                                >
                                                    <Star
                                                        className={`w-5 h-5 transition-colors ${n <= form.rating
                                                                ? 'text-amber-400 fill-amber-400'
                                                                : 'text-dark-500'
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={form.featured}
                                        onChange={(e) =>
                                            setForm({ ...form, featured: e.target.checked })
                                        }
                                        className="w-4 h-4 rounded border-white/20 bg-dark-700 text-primary-500 focus:ring-primary-500/30"
                                    />
                                    <label
                                        htmlFor="featured"
                                        className="text-sm text-dark-100"
                                    >
                                        Show on landing page (featured)
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
                                                : 'Create'}
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
