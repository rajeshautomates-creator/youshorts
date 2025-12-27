import OpenAI from 'openai';
import { env } from '../config/env.js';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

export const generateScript = async (topic: string, language: string) => {
    const prompt = `Write a viral YouTube Shorts script about "${topic}" in ${language}. 
  The script should be under 60 seconds, engaging, and follow a 9:16 vertical storytelling format.
  Include visual cues in brackets like [Visual: ...].
  Language: ${language === 'Odia' ? 'Odia' : 'Hindi'}.`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'You are a viral YouTube Shorts script writer.' },
            { role: 'user', content: prompt },
        ],
    });

    return response.choices[0]?.message.content || '';
};
