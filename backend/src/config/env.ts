import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('5000'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    OPENAI_API_KEY: z.string(),
    ELEVENLABS_API_KEY: z.string(),
    YOUTUBE_API_KEY: z.string().optional(),
    REDIS_URL: z.string().default('redis://localhost:6379'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
}

export const env = parsed.data;
