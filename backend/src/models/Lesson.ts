import mongoose, { Document, Schema } from 'mongoose';

// ─── Lesson Interface ───
export interface ILesson extends Document {
    title: string;
    description: string;
    videoUrl: string;
    videoProvider: 'vimeo' | 'bunny';
    duration: string;
    order: number;
    section: string;
    courseId: mongoose.Types.ObjectId;
    resources: { name: string; url: string }[];
    isFree: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ─── Lesson Schema ───
const lessonSchema = new Schema<ILesson>(
    {
        title: {
            type: String,
            required: [true, 'Lesson title is required'],
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        videoUrl: {
            type: String,
            required: [true, 'Video URL is required'],
        },
        videoProvider: {
            type: String,
            enum: ['vimeo', 'bunny'],
            default: 'vimeo',
        },
        duration: {
            type: String,
            default: '0:00',
        },
        order: {
            type: Number,
            required: true,
        },
        section: {
            type: String,
            default: 'General',
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        resources: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        isFree: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

lessonSchema.index({ courseId: 1, order: 1 });

export default mongoose.model<ILesson>('Lesson', lessonSchema);
