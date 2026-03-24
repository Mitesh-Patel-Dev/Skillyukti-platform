import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Wallet from '../models/Wallet';
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
        const { name, phone, email, password, referralCode } = req.body;

        if (!phone) {
            res.status(400).json({ message: 'Phone number is required' });
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email' });
            return;
        }

        // Look up referrer by referral code
        let referredBy;
        if (referralCode) {
            const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });
            if (referrer) {
                referredBy = referrer._id;
            }
        }

        // Create new user
        const user = await User.create({ name, phone, email, password, referredBy });

        // Auto-create wallet for new user
        await Wallet.create({ userId: user._id });

        // Return user data with token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            referralCode: user.referralCode,
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
            phone: user.phone,
            enrolledCourses: user.enrolledCourses,
            referralCode: user.referralCode,
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
/**
 * PUT /api/auth/profile
 * Update current user's personal information
 */
router.put('/profile', protect, async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone, gender, address, city, state, pincode, avatar } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            { $set: { name, phone, gender, address, city, state, pincode, avatar } },
            { new: true, runValidators: true }
        );
        if (!user) { res.status(404).json({ message: 'User not found' }); return; }
        res.json({ message: 'Profile updated successfully', user });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * PUT /api/auth/kyc
 * Save bank / UPI details
 */
router.put('/kyc', protect, async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountHolderName, accountNumber, ifscCode, bankName, upiId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            { $set: { bankDetails: { accountHolderName, accountNumber, ifscCode, bankName, upiId } } },
            { new: true }
        );
        if (!user) { res.status(404).json({ message: 'User not found' }); return; }
        res.json({ message: 'Bank details saved successfully', bankDetails: user.bankDetails });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * GET /api/auth/sponsor
 * Get the current user's sponsor (referrer) info
 */
router.get('/sponsor', protect, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id).populate('referredBy', 'name email phone referralCode');
        res.json({ sponsor: user?.referredBy || null });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

export default router;
