import { Request, Response } from 'express';
import * as aiService from '../services/ai.service';
import * as voiceService from '../services/voice.service';
import * as videoService from '../services/video.service';
import prisma from '../utils/prisma';

export const generateScriptHandler = async (req: Request, res: Response) => {
    try {
        const { topic, language, userId } = req.body;
        const script = await aiService.generateScript(topic, language);

        // Save story to DB
        const story = await prisma.story.create({
            data: {
                title: topic,
                script: script || '',
                language: language,
                userId: userId || 'default-user', // Fallback for now
            }
        });

        res.json({ success: true, story });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const generateVoiceHandler = async (req: Request, res: Response) => {
    try {
        const { script, storyId } = req.body;
        const voicePath = await voiceService.generateVoice(script);

        // Update or track if needed
        res.json({ success: true, voicePath });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createVideoHandler = async (req: Request, res: Response) => {
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

export const getVideoStatus = async (req: Request, res: Response) => {
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
