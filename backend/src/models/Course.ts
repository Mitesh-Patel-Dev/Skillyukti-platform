import mongoose, { Document, Schema } from 'mongoose';

// ─── Course Interface ───
export interface ICourse extends Document {
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    originalPrice: number;
    thumbnail: string;
    instructor: {
        name: string;
        bio: string;
        avatar: string;
    };
    category: string;
    lessons: mongoose.Types.ObjectId[];
    totalDuration: string;
    totalLessons: number;
    published: boolean;
    featured: boolean;
    enrolledCount: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

// ─── Course Schema ───
const courseSchema = new Schema<ICourse>(
    {
        title: {
            type: String,
            required: [true, 'Course title is required'],
            trim: true,
            maxlength: [120, 'Title cannot exceed 120 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Course description is required'],
        },
        shortDescription: {
            type: String,
            required: [true, 'Short description is required'],
            maxlength: [200, 'Short description cannot exceed 200 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        originalPrice: {
            type: Number,
            default: 0,
        },
        thumbnail: {
            type: String,
            default: '/images/course-placeholder.jpg',
        },
        instructor: {
            name: { type: String, default: 'Instructor' },
            bio: { type: String, default: '' },
            avatar: { type: String, default: '' },
        },
        category: {
            type: String,
            default: 'General',
        },
        lessons: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lesson',
            },
        ],
        totalDuration: {
            type: String,
            default: '0h 0m',
        },
        totalLessons: {
            type: Number,
            default: 0,
        },
        published: {
            type: Boolean,
            default: false,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        enrolledCount: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 4.5,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

// Create slug from title before saving
courseSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

// courseSchema.index({ slug: 1 });
courseSchema.index({ published: 1, featured: 1 });

export default mongoose.model<ICourse>('Course', courseSchema);
