'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { User, AuthResponse } from '@/types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, phone: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isEnrolled: (courseId: string) => boolean;
    updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login
    const login = async (email: string, password: string) => {
        const { data } = await api.post<AuthResponse & { phone: string }>('/auth/login', { email, password });
        const userData: User = {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
            enrolledCourses: data.enrolledCourses || [],
            referralCode: data.referralCode,
            createdAt: new Date().toISOString(),
        };

        setUser(userData);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Register
    const register = async (name: string, phone: string, email: string, password: string) => {
        // Include referral code from localStorage if present
        const referralCode = typeof window !== 'undefined' ? localStorage.getItem('referral_code') : null;
        const { data } = await api.post<AuthResponse & { phone: string }>('/auth/register', {
            name, phone, email, password,
            ...(referralCode ? { referralCode } : {}),
        });
        const userData: User = {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            phone: data.phone,
            enrolledCourses: data.enrolledCourses || [],
            referralCode: data.referralCode,
            createdAt: new Date().toISOString(),
        };

        setUser(userData);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // Check if user is enrolled in a course
    const isEnrolled = (courseId: string): boolean => {
        if (!user) return false;
        return (user.enrolledCourses as string[]).includes(courseId);
    };

    const updateUser = (data: Partial<User>) => {
        if (!user) return;
        const newUser = { ...user, ...data };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider
            value={{ user, token, loading, login, register, logout, isEnrolled, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
