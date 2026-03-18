// ─── User Types ───
export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'admin';
    enrolledCourses: string[] | Course[];
    avatar?: string;
    referralCode?: string;
    referredBy?: string;
    createdAt: string;
}

// ─── Course Types ───
export interface Course {
    _id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    originalPrice: number;
    thumbnail: string;
    mobileThumbnail?: string;
    instructor: {
        name: string;
        bio: string;
        avatar: string;
    };
    category: string;
    features?: string[];
    lessons: string[];
    curriculum?: Lesson[];
    totalDuration: string;
    totalLessons: number;
    published: boolean;
    featured: boolean;
    enrolledCount: number;
    rating: number;
    createdAt: string;
}

// ─── Lesson Types ───
export interface Lesson {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    videoProvider: 'vimeo' | 'bunny';
    duration: string;
    order: number;
    section: string;
    courseId: string;
    resources: Resource[];
    isFree: boolean;
}

export interface Resource {
    name: string;
    url: string;
}

// ─── Order Types ───
export interface Order {
    _id: string;
    userId: string | User;
    courseId: string | Course;
    amount: number;
    currency: string;
    status: 'created' | 'paid' | 'failed';
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    referredBy?: string;
    createdAt: string;
}

// ─── Progress Types ───
export interface Progress {
    _id: string;
    userId: string;
    courseId: string;
    completedLessons: string[];
    lastLessonId?: string;
    progressPercentage: number;
}

// ─── Testimonial Types ───
export interface Testimonial {
    _id: string;
    name: string;
    avatar: string;
    role: string;
    content: string;
    rating: number;
    featured: boolean;
}

// ─── Auth Types ───
export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'admin';
    token: string;
    enrolledCourses?: string[];
    referralCode?: string;
}

// ─── Razorpay Types ───
export interface RazorpayOrderResponse {
    orderId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    keyId: string;
}

// ─── Admin Stats ───
export interface AdminStats {
    totalStudents: number;
    totalCourses: number;
    totalOrders: number;
    totalRevenue: number;
}

// ─── Wallet Types ───
export interface Wallet {
    _id: string;
    userId: string;
    balance: number;
    totalEarnings: number;
    totalWithdrawn: number;
}

// ─── Wallet Transaction Types ───
export interface WalletTransaction {
    _id: string;
    userId: string | User;
    type: 'commission' | 'withdrawal';
    amount: number;
    status: 'completed' | 'pending';
    orderId?: string;
    description: string;
    createdAt: string;
}

// ─── Withdrawal Request Types ───
export interface WithdrawalRequest {
    _id: string;
    userId: string | User;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    adminNote?: string;
    createdAt: string;
}
