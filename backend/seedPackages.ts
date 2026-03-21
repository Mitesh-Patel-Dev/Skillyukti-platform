import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from './src/models/Package';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        
        const packagesToSeed = [
            { name: 'Starter Package', price: 499, description: 'Kickstart your learning journey.', features: ['Access to basic courses', 'Community Support'] },
            { name: 'Basic Package', price: 999, description: 'Essential skills for freelancers.', features: ['Access to basic courses', 'Freelancing modules', 'Community Support'] },
            { name: 'Standard Package', price: 1999, description: 'Comprehensive training.', features: ['Access to standard courses', 'Live Q&A sessions', 'Community Support'] },
            { name: 'Pro Package', price: 3999, description: 'Advanced strategies for pros.', features: ['Access to all advanced courses', '1-on-1 Mentorship', 'Community Support'] },
            { name: 'VIP Package', price: 7999, description: 'The ultimate VIP experience.', features: ['Access to all courses', '1-on-1 Mentorship', 'VIP Support', 'Certification'] },
        ];

        for (const pkg of packagesToSeed) {
            await Package.findOneAndUpdate(
                { name: pkg.name },
                { $set: pkg },
                { upsert: true, new: true }
            );
        }

        console.log('Packages seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding packages:', error);
        process.exit(1);
    }
};

seed();
