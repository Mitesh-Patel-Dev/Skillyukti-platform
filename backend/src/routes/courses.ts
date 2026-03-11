import { Router, Request, Response } from 'express';
import Course from '../models/Course';
import Lesson from '../models/Lesson';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * GET /api/courses
 * Get all published courses
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
        const courses = await Course.find({ published: true })
            .select('-lessons')
            .sort({ createdAt: -1 });
        res.json(courses);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * GET /api/courses/featured
 * Get featured courses for landing page
 */
router.get('/featured', async (_req: Request, res: Response): Promise<void> => {
    try {
        const courses = await Course.find({ published: true, featured: true })
            .select('-lessons')
            .limit(6)
            .sort({ createdAt: -1 });
        res.json(courses);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * GET /api/courses/:slug
 * Get single course by slug (with lesson list but no video URLs unless enrolled)
 */
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        // Get lessons without video URLs (public view)
        const lessons = await Lesson.find({ courseId: course._id })
            .select('-videoUrl')
            .sort({ order: 1 });

        res.json({ ...course.toObject(), curriculum: lessons });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * GET /api/courses/:slug/lessons
 * Get course lessons with video URLs (protected - enrolled users only)
 */
router.get(
    '/:slug/lessons',
    protect,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const course = await Course.findOne({ slug: req.params.slug });
            if (!course) {
                res.status(404).json({ message: 'Course not found' });
                return;
            }

            // Check if user is enrolled or is admin
            const isEnrolled = req.user?.enrolledCourses.some(
                (courseId) => courseId.toString() === course._id.toString()
            );
            const isAdmin = req.user?.role === 'admin';

            if (!isEnrolled && !isAdmin) {
                res.status(403).json({ message: 'You must enroll in this course to access lessons' });
                return;
            }

            // Return full lessons with video URLs
            const lessons = await Lesson.find({ courseId: course._id }).sort({ order: 1 });
            res.json(lessons);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }
);

export default router;
