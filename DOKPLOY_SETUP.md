# 🚀 FINAL DEPLOYMENT CHECKLIST

If your app is not working, it is 100% because of one of these settings. Please follow this exactly.

---

## 🛑 PART 1: Backend Fix (Critical)
Your backend is crashing because variables are missing. Go to **Backend Service > Environment** and add these:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@host:5432/db
JWT_SECRET=any_long_random_string_here
OPENAI_API_KEY=sk-your-key-here
ELEVENLABS_API_KEY=your-key-here
```

**⚠️ IMPORTANT:**
- **NO SPACES** around the `=` (e.g., `PORT=5000` is CORRECT, `PORT = 5000` is WRONG).
- For `DATABASE_URL`, use the **Internal URL** of your Postgres service in Dokploy.

---

## 🛑 PART 2: Frontend Fix (Fixes 502 Error)
Go to **Frontend Service** and do these two things:

### 1. Match the Service Port
- Go to the **Domains** or **Network** tab.
- Change **Service Port** from `3000` to `4040`.
- Click **Save**.

### 2. Set API Environment Variables
Go to the **Environment** tab and add:
```env
PORT=4040
NEXT_PUBLIC_API_URL=https://api.shorts.rajeshautomates.in
```
*(Replace the URL with your ACTUAL backend domain including https)*

---

## 🆘 Still getting 502 Bad Gateway?
1. **Check Dokploy Logs:** Go to the "Logs" tab for the Frontend.
   - If you see `✓ Ready on 0.0.0.0:4040`, the app is working perfectly! The 502 is then definitely the **Service Port** in the Domains tab.
2. **Re-deploy:** After saving settings, click the **Deploy** button again to apply the new environment variables.
