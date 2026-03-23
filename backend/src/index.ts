import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

// Route imports
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import orderRoutes from './routes/orders';
import progressRoutes from './routes/progress';
import adminRoutes from './routes/admin';
import testimonialRoutes from './routes/testimonials';
import referralRoutes from './routes/referral';
import walletRoutes from './routes/wallet';
import paymentRoutes from './routes/payment';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().then(() => {
    // ONE-TIME FULL DATA RESET (for client handover)
    const performFullReset = async () => {
        try {
            console.log('🧹 [CLEANUP] Starting full data reset...');
            
            const Order = require('./models/Order').default;
            const User = require('./models/User').default;
            const Wallet = require('./models/Wallet').default;
            const WalletTransaction = require('./models/WalletTransaction').default;
            const WithdrawalRequest = require('./models/WithdrawalRequest').default;
            const Progress = require('./models/Progress').default;
            const Course = require('./models/Course').default;
            const Lesson = require('./models/Lesson').default;

            // 1. Clear all transactional data
            const orders = await Order.deleteMany({});
            const wallets = await Wallet.deleteMany({});
            const txs = await WalletTransaction.deleteMany({});
            const withdrawals = await WithdrawalRequest.deleteMany({});
            const progress = await Progress.deleteMany({});
            
            console.log(`🗑️ Deleted: ${orders.deletedCount} orders, ${wallets.deletedCount} wallets, ${txs.deletedCount} transactions`);
            console.log(`🗑️ Deleted: ${withdrawals.deletedCount} withdrawals, ${progress.deletedCount} progress records`);

            // 2. Clear all users EXCEPT admin
            const users = await User.deleteMany({ email: { $ne: 'admin@skillyukti.com' } });
            console.log(`👤 Deleted: ${users.deletedCount} test users`);

            // 3. Reset all courses to 0 stats
            const courseRes = await Course.updateMany({}, {
                $set: {
                    enrolledCount: 0,
                    rating: 5.0,
                    totalLessons: 0,
                    lessons: []
                }
            });
            
            // 4. Clear all lessons (they will be re-added or were also test data)
            const lessonRes = await Lesson.deleteMany({});
            console.log(`📚 Reset ${courseRes.modifiedCount} courses and deleted ${lessonRes.deletedCount} lessons`);

            console.log('✅ [CLEANUP] Full data reset completed successfully!');
        } catch (err: any) {
            console.error('❌ [CLEANUP] Reset failed:', err.message);
        }
    };
    
    // Call reset - IMPORTANT: Remove or comment out after one successful run in production
    performFullReset();
});

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://skillyukti.com',
    'https://www.skillyukti.com',
    'http://localhost:3000',
    'http://localhost:3001',
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        // Allow listed origins
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // Allow any Vercel preview deployments
        if (origin.endsWith('.vercel.app')) return callback(null, true);
        // Allow any skillyukti subdomain
        if (origin.endsWith('skillyukti.com')) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ───
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/payment', paymentRoutes);

// ─── Health Check ───
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Skillyukti API is running' });
});


// ─── Error Handler ───
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// ─── Start Server ───
app.listen(PORT, () => {
    console.log(`🚀 Skillyukti API running on port ${PORT}`);
});

export default app;
