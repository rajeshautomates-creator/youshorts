# Dokploy Deployment Guide

To deploy this monorepo in Dokploy, follow these settings for each service:

---

## 1. Backend Service
In the Dokploy UI, go to your **Backend Service** -> **Deployment Tab** -> **General** (or Settings):

- **Root Directory**: `backend`
- **Docker Path**: `Dockerfile`
- **Build Context**: `backend` 

---

## 2. Frontend Service
In the Dokploy UI, go to your **Frontend Service** -> **Deployment Tab** -> **General** (or Settings):

- **Root Directory**: `frontend`
- **Docker Path**: `Dockerfile`
- **Build Context**: `frontend`

---

## Environment Variables Reminder

### Backend (.env)
- `DATABASE_URL`: postgresql://...
- `OPENAI_API_KEY`: ...
- `ELEVENLABS_API_KEY`: ...
- `JWT_SECRET`: ...
- `PORT`: 5000

### Frontend (.env)
- `NEXT_PUBLIC_API_URL`: https://your-backend-api.com
- `PORT`: 4040
