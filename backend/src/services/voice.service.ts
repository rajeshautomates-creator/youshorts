import axios from 'axios';
import { env } from '../config/env.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateVoice = async (text: string, voiceId: string = '21m00Tcm4TlvDq8ikWAM') => {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const response = await axios({
        method: 'post',
        url: url,
        data: {
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5,
            },
        },
        headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': env.ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
    });

    const fileName = `voice_${Date.now()}.mp3`;
    const uploadsDir = path.join(process.cwd(), 'uploads/audio');
    const filePath = path.join(uploadsDir, fileName);

    // Ensure directory exists
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    fs.writeFileSync(filePath, Buffer.from(response.data));
    return filePath;
};
