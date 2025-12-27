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
    console.error('❌ Invalid environment variables:', JSON.stringify(parsed.error.format(), null, 2));
    console.error('\n💡 TIP: If you are seeing this in Dokploy, make sure you have added these variables in the "Environment Variables" tab of your service.');
    console.error('Required: DATABASE_URL, JWT_SECRET, OPENAI_API_KEY, ELEVENLABS_API_KEY\n');
    process.exit(1);
}

export const env = parsed.data;
