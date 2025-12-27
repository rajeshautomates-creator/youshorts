# Dokploy Deployment Guide (CRITICAL)

To deploy this monorepo in Dokploy, you MUST follow these settings exactly. Failure to set the **Root Directory** correctly will cause build errors.

---

## 1. Backend Service
In the Dokploy UI, create a **Nixpacks** or **Docker** service:

- **Root Directory**: `backend`  <-- (CRITICAL: Set this to "backend")
- **Docker Path**: `Dockerfile`  <-- (This is the file inside /backend)
- **Build Context**: `backend`   <-- (CRITICAL: Context must match Root Dir)

### Environment Variables
- `DATABASE_URL`: Your Postgres connection string.
- `JWT_SECRET`: Random complex string.
- `OPENAI_API_KEY`: Your API key.
- `ELEVENLABS_API_KEY`: Your API key.
- `PORT`: 5000

---

## 2. Frontend Service
In the Dokploy UI:

- **Root Directory**: `frontend` <-- (CRITICAL: Set this to "frontend")
- **Docker Path**: `Dockerfile`  <-- (This is the file inside /frontend)
- **Build Context**: `frontend`  <-- (CRITICAL: Context must match Root Dir)

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Your backend URL (e.g. `https://api.myapp.com`)
- `PORT`: 4040

---

## Why did my build fail?
If you see an error like `COPY backend/prisma not found`, it means Dokploy is trying to use the **root** of the repository as the build context. 

**Solution:** Ensure both **Root Directory** and **Build Context** are set to the specific folder (`backend` or `frontend`). I have deleted the root Dockerfiles to prevent this confusion.
