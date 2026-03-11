import mongoose, { Document, Schema } from 'mongoose';

// ─── Progress Interface ───
export interface IProgress extends Document {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    completedLessons: mongoose.Types.ObjectId[];
    lastLessonId?: mongoose.Types.ObjectId;
    progressPercentage: number;
    createdAt: Date;
    updatedAt: Date;
}

// ─── Progress Schema ───
const progressSchema = new Schema<IProgress>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        completedLessons: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lesson',
            },
        ],
        lastLessonId: {
            type: Schema.Types.ObjectId,
            ref: 'Lesson',
        },
        progressPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for unique user-course progress
progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model<IProgress>('Progress', progressSchema);
