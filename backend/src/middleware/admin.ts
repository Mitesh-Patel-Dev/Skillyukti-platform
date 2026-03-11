import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check if user has admin role.
 * Must be used AFTER the protect middleware.
 */
export const adminOnly = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
    }
};
