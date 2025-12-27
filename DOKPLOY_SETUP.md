# Dokploy Deployment Guide (REVISED)

Follow these steps to deploy correctly. I have restored the root Dockerfiles to make this easier.

---

## 1. Backend Service
In the Dokploy UI:

- **Root Directory**: `/` (Leave as default or set to `/`)
- **Docker Path**: `Dockerfile`
- **Build Context**: `.` 

### Environment Variables
- `PORT`: 5000
- `DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`, `ELEVENLABS_API_KEY`

---

## Environment Variables Checklist

### 1. Backend Service
Go to **Environment Variables** tab in your Dokploy Backend service and add these:
- `DATABASE_URL`: `postgresql://postgres:password@host:5432/db` (Use your Dokploy Postgres Internal URL)
- `JWT_SECRET`: A long random string (e.g., `df8g7h9jk0l1m2n3o4p5q6r7s8t9u0v1`)
- `OPENAI_API_KEY`: Your OpenAI API key (Starts with `sk-...`)
- `ELEVENLABS_API_KEY`: Your ElevenLabs API key
- `PORT`: `5000` (NO spaces before or after the `=`)

### 2. Frontend Service
Go to **Environment Variables** tab in your Dokploy Frontend service and add these:
- `NEXT_PUBLIC_API_URL`: `https://api.yourdomain.com` (CRITICAL: Use the FULL URL, not just `/api`. This must be your backend domain.)
- `PORT`: `4040` (NO spaces before or after the `=`)

---

## ⚠️ Important Note on Formatting
In the Dokploy environment tab, ensure there is **NO SPACE** around the equals sign. 
- **Correct:** `PORT=4040`
- **Incorrect:** `PORT = 4040`

## Troubleshooting "Invalid environment variables"
If the backend logs show "Invalid environment variables", it means one of the required keys above is missing or undefined in the Dokploy dashboard. **Dokploy does not automatically read your local .env file**; you must copy-paste each variable into the Dokploy UI.
