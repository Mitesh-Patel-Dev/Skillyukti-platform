'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Play, CheckCircle, ChevronLeft, Download, BookOpen,
    Lock, FileText, ArrowRight, Circle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Course, Lesson, Progress } from '@/types';
import Navbar from '@/components/layout/Navbar';
import toast from 'react-hot-toast';

export default function LessonPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const { user, isEnrolled, loading: authLoading } = useAuth();
    const slug = params.slug as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [progress, setProgress] = useState<Progress | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // Get course info
                const { data: courseData } = await api.get(`/courses/${slug}`);
                setCourse(courseData);

                // Get full lessons (with video URLs)
                const { data: lessonsData } = await api.get(`/courses/${slug}/lessons`);
                setLessons(lessonsData);
                if (lessonsData.length > 0) {
                    setCurrentLesson(lessonsData[0]);
                }

                // Get progress
                try {
                    const { data: progressData } = await api.get(`/progress/${courseData._id}`);
                    setProgress(progressData);

                    // Resume from last lesson
                    if (progressData.lastLessonId) {
                        const lastLesson = lessonsData.find(
                            (l: Lesson) => l._id === progressData.lastLessonId
                        );
                        if (lastLesson) setCurrentLesson(lastLesson);
                    }
                } catch {
                    // No progress yet
                }
            } catch (error: any) {
                if (error.response?.status === 403) {
                    toast.error('You need to enroll in this course first');
                    router.push(`/courses/${slug}`);
                }
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [slug, user, authLoading, router]);

    const markComplete = async (lessonId: string) => {
        if (!course) return;
        try {
            const { data } = await api.post('/progress', {
                courseId: course._id,
                lessonId,
            });
            setProgress(data);
            toast.success('Lesson marked as complete!');
        } catch {
            toast.error('Failed to update progress');
        }
    };

    const isLessonCompleted = (lessonId: string) => {
        return progress?.completedLessons?.includes(lessonId) || false;
    };

    // Get video embed URL
    const getEmbedUrl = (lesson: Lesson) => {
        if (lesson.videoProvider === 'vimeo') {
            // Extract video ID if full URL provided
            const vimeoMatch = lesson.videoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
            if (vimeoMatch) {
                return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1&title=0&byline=0&portrait=0`;
            }
            return lesson.videoUrl + '?dnt=1&title=0&byline=0&portrait=0';
        }
        return lesson.videoUrl;
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!course || !currentLesson) return null;

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-16">
                <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
                    {/* Video Player Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Back Link */}
                        <div className="px-6 py-3 border-b border-white/5">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 text-dark-200 hover:text-white text-sm transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back to Dashboard
                            </Link>
                        </div>

                        {/* Video */}
                        <div className="w-full bg-black aspect-video">
                            <iframe
                                src={getEmbedUrl(currentLesson)}
                                className="w-full h-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                style={{ border: 'none' }}
                                title={currentLesson.title}
                            />
                        </div>

                        {/* Lesson Info */}
                        <div className="p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-xl font-bold text-white mb-1">
                                        {currentLesson.title}
                                    </h1>
                                    <p className="text-dark-200 text-sm">{currentLesson.description}</p>
                                </div>
                                <button
                                    onClick={() => markComplete(currentLesson._id)}
                                    disabled={isLessonCompleted(currentLesson._id)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isLessonCompleted(currentLesson._id)
                                            ? 'bg-accent-green/20 text-accent-green cursor-default'
                                            : 'bg-primary-600 text-white hover:bg-primary-500'
                                        }`}
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    {isLessonCompleted(currentLesson._id) ? 'Completed' : 'Mark Complete'}
                                </button>
                            </div>

                            {/* Resources */}
                            {currentLesson.resources && currentLesson.resources.length > 0 && (
                                <div className="glass rounded-xl p-4 mt-4">
                                    <h3 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-primary-400" />
                                        Downloadable Resources
                                    </h3>
                                    <div className="space-y-2">
                                        {currentLesson.resources.map((resource) => (
                                            <a
                                                key={resource.name}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm transition-colors"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                {resource.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Lesson List */}
                    <div className="w-full lg:w-80 xl:w-96 border-l border-white/5 bg-dark-800/50 overflow-y-auto">
                        <div className="p-4 border-b border-white/5">
                            <h2 className="text-white font-semibold text-sm">{course.title}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full transition-all"
                                        style={{ width: `${progress?.progressPercentage || 0}%` }}
                                    />
                                </div>
                                <span className="text-xs text-dark-200">
                                    {progress?.progressPercentage || 0}%
                                </span>
                            </div>
                        </div>

                        <div className="p-2">
                            {lessons.map((lesson, index) => (
                                <button
                                    key={lesson._id}
                                    onClick={() => setCurrentLesson(lesson)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${currentLesson._id === lesson._id
                                            ? 'bg-primary-600/20 border border-primary-500/30'
                                            : 'hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex-shrink-0">
                                        {isLessonCompleted(lesson._id) ? (
                                            <CheckCircle className="w-5 h-5 text-accent-green" />
                                        ) : currentLesson._id === lesson._id ? (
                                            <Play className="w-5 h-5 text-primary-400" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-dark-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${currentLesson._id === lesson._id ? 'text-primary-300' : 'text-white'
                                            }`}>
                                            {index + 1}. {lesson.title}
                                        </p>
                                        <p className="text-xs text-dark-300">{lesson.duration}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
