import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';
import { env } from '../config/env.js';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: role || 'USER'
            }
        });

        res.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ success: true, token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    // Logic to get profile from token (after middleware)
    res.json({ success: true, message: 'Profile endpoint' });
};
