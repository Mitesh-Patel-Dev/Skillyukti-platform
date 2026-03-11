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
import { performSeed } from './utils/seeder';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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

// ─── Health Check ───
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Skillyukti API is running' });
});

// ─── Temporary Seeding Route (Delete after use) ───
app.get('/api/seed', async (_req, res) => {
    try {
        const result = await performSeed();
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
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
