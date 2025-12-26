import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getMetrics = async (req: Request, res: Response) => {
    try {
        const totalVideos = await prisma.video.count();
        const totalJobs = await prisma.job.count();
        const failedJobs = await prisma.job.count({ where: { status: 'FAILED' } });

        res.json({
            success: true,
            metrics: {
                totalVideos,
                totalJobs,
                failedJobs
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, jobs });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getVideos = async (req: Request, res: Response) => {
    try {
        const videos = await prisma.video.findMany({
            include: { story: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, videos });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateSettings = async (req: Request, res: Response) => {
    try {
        const { key, value } = req.body;
        const setting = await prisma.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });
        res.json({ success: true, setting });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
