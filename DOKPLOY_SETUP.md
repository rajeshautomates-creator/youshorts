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

## 2. Frontend Service
In the Dokploy UI:

- **Root Directory**: `/` (Leave as default or set to `/`)
- **Docker Path**: `frontend.Dockerfile`  <-- (Note the name change)
- **Build Context**: `.`

### Environment Variables
- `PORT`: 4040
- `NEXT_PUBLIC_API_URL`: Your backend URL

---

## Troubleshooting
If you kept **Root Directory** = `backend` in your previous attempt, the build will fail because the `Dockerfile` inside `backend/` is different from the one in the root.

**RECOMMENDED:** Set **Root Directory** to `/` and use the settings above. It is the most reliable way for monorepos in Dokploy.
