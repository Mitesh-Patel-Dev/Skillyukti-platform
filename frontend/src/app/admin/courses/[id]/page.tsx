'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Save, Image, User, Trash2, Play } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { Course } from '@/types';
import toast from 'react-hot-toast';

export default function EditCoursePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        shortDescription: '',
        price: 0,
        originalPrice: 0,
        thumbnail: '',
        mobileThumbnail: '',
        category: 'General',
        instructor: { name: '', bio: '', avatar: '' },
        features: [] as string[],
        published: false,
        featured: false,
        totalDuration: '0h 0m',
        rating: 4.5,
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/admin/courses`);
                const course = data.find((c: Course) => c._id === params.id);
                if (course) {
                    setForm({
                        title: course.title,
                        description: course.description,
                        shortDescription: course.shortDescription,
                        price: course.price,
                        originalPrice: course.originalPrice,
                        thumbnail: course.thumbnail,
                        mobileThumbnail: course.mobileThumbnail || '',
                        category: course.category,
                        features: course.features || [],
                        instructor: course.instructor || { name: '', bio: '', avatar: '' },
                        published: course.published,
                        featured: course.featured,
                        totalDuration: course.totalDuration || '0h 0m',
                        rating: course.rating || 4.5,
                    });
                } else {
                    toast.error('Course not found');
                    router.push('/admin/courses');
                }
            } catch {
                toast.error('Failed to load course');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [params.id, router]);

    const update = (field: string, value: any) => setForm({ ...form, [field]: value });
    const updateInstructor = (field: string, value: string) =>
        setForm({ ...form, instructor: { ...form.instructor, [field]: value } });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put(`/admin/courses/${params.id}`, form);
            toast.success('Course updated!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Delete this course permanently? This will also delete all its lessons.')) return;
        try {
            await api.delete(`/admin/courses/${params.id}`);
            toast.success('Course deleted');
            router.push('/admin/courses');
        } catch {
            toast.error('Failed to delete');
        }
    };

    if (loading) {
        return (
            <div className="space-y-6 max-w-4xl">
                <div className="h-6 w-32 bg-dark-700 rounded animate-pulse" />
                <div className="h-8 w-64 bg-dark-700 rounded-lg animate-pulse" />
                <div className="glass rounded-2xl h-64 animate-pulse" />
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link href="/admin/courses" className="inline-flex items-center gap-1.5 text-dark-200 hover:text-white text-sm mb-6 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to courses
            </Link>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white">Edit Course</h1>
                <Link
                    href={`/admin/lessons/${params.id}`}
                    className="flex items-center gap-2 glass text-primary-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-600/15 transition-colors border border-primary-500/20"
                >
                    <Play className="w-4 h-4" /> Manage Lessons
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                {/* Basic Info */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-5">Basic Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 block">Title <span className="text-red-400">*</span></label>
                            <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                        </div>
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 block">Short Description <span className="text-red-400">*</span></label>
                            <input type="text" value={form.shortDescription} onChange={(e) => update('shortDescription', e.target.value)} maxLength={200} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                        </div>
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 block">Full Description <span className="text-red-400">*</span></label>
                            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={5} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none resize-none transition-all" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-dark-100 mb-1.5 block">Category</label>
                                <input type="text" value={form.category} onChange={(e) => update('category', e.target.value)} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                            </div>
                            <div>
                                <label className="text-sm text-dark-100 mb-1.5 block">Total Duration</label>
                                <input type="text" value={form.totalDuration} onChange={(e) => update('totalDuration', e.target.value)} placeholder="e.g. 24h 30m" className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features (What you'll learn) */}
                <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-white">Features (What you'll learn)</h2>
                        <button
                            type="button"
                            onClick={() => update('features', [...form.features, ''])}
                            className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1"
                        >
                            + Add Feature
                        </button>
                    </div>
                    <div className="space-y-3">
                        {form.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold shrink-0">
                                    {index + 1}
                                </div>
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => {
                                        const newFeatures = [...form.features];
                                        newFeatures[index] = e.target.value;
                                        update('features', newFeatures);
                                    }}
                                    placeholder="e.g. Lifetime access to 50+ HD videos"
                                    className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newFeatures = form.features.filter((_, i) => i !== index);
                                        update('features', newFeatures);
                                    }}
                                    className="p-2 text-dark-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {form.features.length === 0 && (
                            <p className="text-sm text-dark-300 text-center py-4 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                                No features added yet. Click "Add Feature" to create one.
                            </p>
                        )}
                    </div>
                </div>

                {/* Pricing */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-5">Pricing</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 block">Selling Price (₹)</label>
                            <input type="number" value={form.price} onChange={(e) => update('price', Number(e.target.value))} min={0} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                        </div>
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 block">Original Price (₹)</label>
                            <input type="number" value={form.originalPrice} onChange={(e) => update('originalPrice', Number(e.target.value))} min={0} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                        </div>
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2"><Image className="w-5 h-5 text-primary-400" /> Thumbnails</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 flex items-center gap-2">Desktop Thumbnail URL (Fallback if no mobile)</label>
                            <input type="text" value={form.thumbnail} onChange={(e) => update('thumbnail', e.target.value)} placeholder="https://your-cdn.com/desktop-image.jpg" className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                            {form.thumbnail && (
                                <div className="mt-3">
                                    <img src={form.thumbnail} alt="Preview Desktop" className="w-40 h-24 object-cover rounded-lg border border-white/10" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 flex items-center gap-2">Mobile Thumbnail URL (Optional)</label>
                            <input type="text" value={form.mobileThumbnail} onChange={(e) => update('mobileThumbnail', e.target.value)} placeholder="https://your-cdn.com/mobile-image.jpg" className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                            <p className="text-dark-400 text-xs mt-1.5">This image will be used on smartphones. If empty, desktop thumbnail will be used.</p>
                            {form.mobileThumbnail && (
                                <div className="mt-3">
                                    <img src={form.mobileThumbnail} alt="Preview Mobile" className="h-32 object-contain aspect-[3/4] rounded-lg border border-white/10 bg-dark-800" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Instructor */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2"><User className="w-5 h-5 text-primary-400" /> Instructor</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 block">Name</label>
                            <input type="text" value={form.instructor.name} onChange={(e) => updateInstructor('name', e.target.value)} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                        </div>
                        <div>
                            <label className="text-sm text-dark-100 mb-1.5 block">Avatar URL</label>
                            <input type="text" value={form.instructor.avatar} onChange={(e) => updateInstructor('avatar', e.target.value)} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none transition-all" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-sm text-dark-100 mb-1.5 block">Bio</label>
                            <textarea value={form.instructor.bio} onChange={(e) => updateInstructor('bio', e.target.value)} rows={2} className="w-full bg-dark-700/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-primary-500/50 focus:outline-none resize-none transition-all" />
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-5">Status</h2>
                    <div className="flex items-center gap-8">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input type="checkbox" checked={form.published} onChange={(e) => update('published', e.target.checked)} className="w-4 h-4 rounded accent-primary-500" />
                            <span className="text-sm text-dark-100">Published</span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="w-4 h-4 rounded accent-primary-500" />
                            <span className="text-sm text-dark-100">Featured on homepage</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-primary-500 transition-colors disabled:opacity-50">
                            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link href="/admin/courses" className="glass text-dark-100 px-8 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                            Cancel
                        </Link>
                    </div>
                    <button type="button" onClick={handleDelete} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm hover:bg-red-500/10 px-4 py-2.5 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" /> Delete Course
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
