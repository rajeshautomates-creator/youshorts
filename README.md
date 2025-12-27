# YouTube Shorts Automation App

Production-ready full-stack YouTube Shorts automation app with Admin Panel.

## Stacks
- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (Prisma ORM)
- **AI:** OpenAI (Script), ElevenLabs (Voice)
- **Video:** FFmpeg

## Setup Instructions

### Local Development
1. **Backend:**
   ```bash
   cd backend
   npm install
   # Update .env with your API keys
   npx prisma db push
   npm run dev
   ```
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open [http://localhost:4040](http://localhost:4040)

### Deployment with Dokploy

1. **Self-host Dokploy** on your VPS.
2. **Setup a New Project** in Dokploy.
3. **Database:**
   - Create a PostgreSQL service in Dokploy (Internal).
   - Note the connection string.
4. **Backend Service:**
   - Connect your GitHub repo.
   - **Settings:**
     - **Root Directory**: `backend`
     - **Docker Path**: `Dockerfile`
     - **Build Context**: `backend` (or leave empty if Root Directory is set)
   - Add environment variables:
     - `DATABASE_URL`: Your Dokploy Postgres URL.
     - `JWT_SECRET`: Random string.
     - `OPENAI_API_KEY`: your-key.
     - `ELEVENLABS_API_KEY`: your-key.
     - `PORT`: 5000
5. **Frontend Service:**
   - Connect the same repo.
   - **Settings:**
     - **Root Directory**: `frontend`
     - **Docker Path**: `Dockerfile`
     - **Build Context**: `frontend`
   - Add environment variables:
     - `NEXT_PUBLIC_API_URL`: Your backend domain (e.g., `https://api.yourdomain.com`).
     - `PORT`: 4040
   - Set the domain for the frontend.

## Features
- **Script Generation:** Generate viral scripts in Odia or Hindi.
- **Voiceover:** High-quality AI voice using ElevenLabs.
- **Video Assembly:** Automated vertical video (9:16) creation.
- **Admin Panel:** Monitor jobs, videos, and metrics.
- **Super Admin:** Role-based access for system management.
