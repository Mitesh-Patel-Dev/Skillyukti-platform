const mongoose = require('mongoose');
require('dotenv').config();

// Database URI from .env
const uri = process.env.MONGODB_URI || 'mongodb+srv://miteshgpatel2212_db_user:Mitesh2212@ac-f2x4e00.gggjvmg.mongodb.net/skillyukti?retryWrites=true&w=majority';

async function resetStats() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        const db = mongoose.connection;
        
        console.log('Resetting enrolledCount and totalLessons for all courses...');
        const result = await db.collection('courses').updateMany({}, { 
            $set: { 
                enrolledCount: 0,
                totalLessons: 0,
                lessons: [], // Also clear lesson references to match totalLessons: 0
                rating: 5.0  // Set a fresh perfect rating for new start
            } 
        });

        // Also clean up the lessons collection to avoid orphan data
        console.log('Cleaning up lessons collection...');
        const lessonResult = await db.collection('lessons').deleteMany({});

        console.log(`Success! Updated ${result.modifiedCount} courses.`);
        console.log(`Deleted ${lessonResult.deletedCount} lessons.`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error resetting statistics:', error);
        process.exit(1);
    }
}

resetStats();
