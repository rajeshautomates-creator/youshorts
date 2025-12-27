import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import * as aiService from '../services/ai.service.js';
import * as voiceService from '../services/voice.service.js';
import * as videoService from '../services/video.service.js';
import prisma from '../utils/prisma.js';

export const generateScriptHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { topic, language } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        const script = await aiService.generateScript(topic, language);

        // Save story to DB
        const story = await prisma.story.create({
            data: {
                title: topic,
                script: script || '',
                language: language,
                userId: userId,
            }
        });

        res.json({ success: true, story });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const generateVoiceHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { script, storyId } = req.body;
        const voicePath = await voiceService.generateVoice(script);

        // Update or track if needed
        res.json({ success: true, voicePath });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createVideoHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { audioPath, backgroundPath, storyId } = req.body;
        const outputPath = `uploads/videos/video_${storyId}_${Date.now()}.mp4`;

        // Start background job (conceptually)
        // For now, doing it synchronously
        await videoService.createVideo(audioPath, backgroundPath, outputPath);

        const video = await prisma.video.create({
            data: {
                storyId,
                status: 'COMPLETED',
                videoUrl: outputPath
            }
        });

        res.json({ success: true, video });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getVideoStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const video = await prisma.video.findUnique({
            where: { id }
        });
        res.json({ success: true, video });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const publishVideoHandler = async (req: AuthRequest, res: Response) => {
    try {
        const { videoId, platform } = req.body;

        // This is a placeholder for actual publishing logic (YouTube API)
        // For now, we log the attempt
        const log = await prisma.publishLog.create({
            data: {
                videoId,
                status: 'ATTEMPTED',
                message: `Publishing to ${platform || 'YouTube'}`
            }
        });

        res.json({ success: true, message: 'Publishing initiated', log });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};
