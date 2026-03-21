import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// ─── User Interface ───
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'admin';
    enrolledCourses: mongoose.Types.ObjectId[];
    enrolledPackages: mongoose.Types.ObjectId[];
    avatar?: string;
    referralCode: string;
    referredBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// ─── User Schema ───
const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student',
        },
        enrolledCourses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Course',
            },
        ],
        enrolledPackages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Package',
            },
        ],
        avatar: {
            type: String,
            default: '',
        },
        referralCode: {
            type: String,
            unique: true,
            sparse: true,
        },
        referredBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Auto-generate referral code before saving
userSchema.pre('save', async function (next) {
    // Generate referral code if not set
    if (!this.referralCode) {
        const namePart = this.name
            .toUpperCase()
            .replace(/[^A-Z]/g, '')
            .slice(0, 6);
        const randomPart = Math.floor(100 + Math.random() * 900);
        this.referralCode = `${namePart}${randomPart}`;
    }

    // Hash password if modified
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// export default mongoose.model<IUser>('User', userSchema);
export default mongoose.model<IUser>('User', userSchema);
