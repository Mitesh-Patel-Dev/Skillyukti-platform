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
    // One-time reset for course stats (Remove after first run)
    const performReset = async () => {
        try {
            const Course = require('./models/Course').default;
            const Lesson = require('./models/Lesson').default;
            const Progress = require('./models/Progress').default;
            
            console.log('🚀 [ONE-TIME RESET] Starting...');
            await Course.updateMany({}, {
                $set: {
                    enrolledCount: 0,
                    totalLessons: 0,
                    lessons: [],
                    rating: 5.0
                }
            });
            await Lesson.deleteMany({});
            await Progress.deleteMany({});
            console.log('✅ [ONE-TIME RESET] Completed successfully!');
        } catch (err: any) {
            console.error('❌ [ONE-TIME RESET] Failed:', err.message);
        }
    };
    performReset();
});

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://skillyukti.com',
    'https://www.skillyukti.com',
    'http://localhost:3000',
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
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
