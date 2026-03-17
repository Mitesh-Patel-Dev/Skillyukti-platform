import { Router, Request, Response } from 'express';
import Wallet from '../models/Wallet';
import WalletTransaction from '../models/WalletTransaction';
import WithdrawalRequest from '../models/WithdrawalRequest';
import { protect } from '../middleware/auth';

const router = Router();

// All wallet routes require authentication
router.use(protect);

/**
 * GET /api/wallet
 * Get current user's wallet
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        let wallet = await Wallet.findOne({ userId: req.user?._id });

        // Auto-create wallet if it doesn't exist
        if (!wallet) {
            wallet = await Wallet.create({ userId: req.user?._id });
        }

        res.json(wallet);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * GET /api/wallet/transactions
 * Get current user's wallet transactions
 */
router.get('/transactions', async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await WalletTransaction.find({ userId: req.user?._id })
            .populate('orderId', 'amount courseId')
            .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * POST /api/wallet/withdraw
 * Submit a withdrawal request
 */
router.post('/withdraw', async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            res.status(400).json({ message: 'Invalid withdrawal amount' });
            return;
        }

        // Check wallet balance
        const wallet = await Wallet.findOne({ userId: req.user?._id });
        if (!wallet || wallet.balance < amount) {
            res.status(400).json({ message: 'Insufficient wallet balance' });
            return;
        }

        // Check for pending withdrawal requests
        const pendingRequest = await WithdrawalRequest.findOne({
            userId: req.user?._id,
            status: 'pending',
        });
        if (pendingRequest) {
            res.status(400).json({ message: 'You already have a pending withdrawal request' });
            return;
        }

        // Create withdrawal request
        const request = await WithdrawalRequest.create({
            userId: req.user?._id,
            amount,
        });

        res.status(201).json({
            message: 'Withdrawal request submitted. Admin will review it shortly.',
            request,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

/**
 * GET /api/wallet/withdrawals
 * Get current user's withdrawal requests
 */
router.get('/withdrawals', async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await WithdrawalRequest.find({ userId: req.user?._id })
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

export default router;
