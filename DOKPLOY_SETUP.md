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

- **Root Directory**: `/`
- **Docker Path**: `frontend.Dockerfile`
- **Build Context**: `.`

### CRITICAL: Port Configuration
In Dokploy, go to **Network** or **Domain** settings for the Frontend:
- **Service Port**: `4040` (You MUST set this to 4040, otherwise you will get a 502 Bad Gateway error).

### Environment Variables
- `PORT`: 4040
- `NEXT_PUBLIC_API_URL`: Your backend URL

---

## Troubleshooting "502 Bad Gateway"
If your domain shows "502 Bad Gateway":
1. **Check Service Port:** Ensure the service port in Dokploy is set to `4040` for the frontend.
2. **Check Logs:** View the logs in Dokploy. If you see "Next.js started on 0.0.0.0:4040", then the app is fine, and the issue is the Dokploy port setting.
3. **I have updated the code:** I've added a fix to ensure Next.js listens on all interfaces (`0.0.0.0`). Please pull and redeploy.
