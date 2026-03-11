import { Router, Request, Response } from 'express';
import Progress from '../models/Progress';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * GET /api/progress/:courseId
 * Get user's progress for a specific course
 */
router.get(
    '/:courseId',
    protect,
    async (req: Request, res: Response): Promise<void> => {
        try {
            let progress = await Progress.findOne({
                userId: req.user?._id,
                courseId: req.params.courseId,
            }).populate('completedLessons', 'title order');

            if (!progress) {
                // Return empty progress if none exists
                res.json({
                    completedLessons: [],
                    progressPercentage: 0,
                    lastLessonId: null,
                });
                return;
            }

            res.json(progress);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
);

/**
 * POST /api/progress
 * Mark a lesson as complete and update progress
 */
router.post(
    '/',
    protect,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { courseId, lessonId } = req.body;

            // Get total lesson count for the course
            const totalLessons = await Lesson.countDocuments({ courseId });

            // Find or create progress
            let progress = await Progress.findOne({
                userId: req.user?._id,
                courseId,
            });

            if (!progress) {
                progress = await Progress.create({
                    userId: req.user?._id,
                    courseId,
                    completedLessons: [lessonId],
                    lastLessonId: lessonId,
                    progressPercentage: Math.round((1 / totalLessons) * 100),
                });
            } else {
                // Add lesson to completed if not already there
                if (!progress.completedLessons.includes(lessonId)) {
                    progress.completedLessons.push(lessonId);
                }
                progress.lastLessonId = lessonId;
                progress.progressPercentage = Math.round(
                    (progress.completedLessons.length / totalLessons) * 100
                );
                await progress.save();
            }

            res.json(progress);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
);

export default router;
