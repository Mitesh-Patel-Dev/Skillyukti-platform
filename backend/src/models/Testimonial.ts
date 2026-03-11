import mongoose, { Document, Schema } from 'mongoose';

// ─── Testimonial Interface ───
export interface ITestimonial extends Document {
    name: string;
    avatar: string;
    role: string;
    content: string;
    rating: number;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ─── Testimonial Schema ───
const testimonialSchema = new Schema<ITestimonial>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            default: 'Student',
        },
        content: {
            type: String,
            required: [true, 'Review content is required'],
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
        },
        featured: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
