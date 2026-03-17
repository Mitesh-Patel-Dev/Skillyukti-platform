import { Router, Request, Response } from 'express';
import { protect } from '../middleware/auth';

const router = Router();

/**
 * GET /api/referral/link
 * Get current user's referral code and link
 */
router.get('/link', protect, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }

        const referralLink = `${process.env.FRONTEND_URL || 'https://skillyukti.com'}?ref=${user.referralCode}`;

        res.json({
            referralCode: user.referralCode,
            referralLink,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

export default router;
