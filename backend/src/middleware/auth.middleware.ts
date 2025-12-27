import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export const authorize = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};
