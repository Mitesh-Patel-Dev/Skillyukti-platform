import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * Generate JWT token
 */
const generateToken = (id: string, role: string): string => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '7d',
    });
};

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email' });
            return;
        }

        // Create new user
        const user = await User.create({ name, email, password });

        // Return user data with token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString(), user.role),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user and include password for comparison
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            enrolledCourses: user.enrolledCourses,
            token: generateToken(user._id.toString(), user.role),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', protect, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id).populate('enrolledCourses');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

export default router;
