## 🛑 FIXING THE "502 BAD GATEWAY" ERROR

If your frontend shows a 502 error, follow these 3 steps exactly:

### Step 1: Fix the Service Port (CRITICAL)
Dokploy defaults to port 3000, but our app uses **4040**.
1. In Dokploy, go to your **Frontend Service**.
2. Click on the **Domains** or **Network** tab.
3. Find the **Service Port** setting and change it to `4040`.
4. Click **Save**.

### Step 2: Fix Environment Variable Formatting
Your current settings have spaces that will break the app.
1. Go to the **Environment** tab.
2. Change: `PORT =4040` ❌ 
3. To: `PORT=4040` ✅ (NO SPACES around the `=`)

### Step 3: Fix the API URL
Next.js needs the FULL URL of your backend to communicate from the browser.
1. Go to the **Environment** tab.
2. Change: `NEXT_PUBLIC_API_URL=/api` ❌
3. To: `NEXT_PUBLIC_API_URL=https://api.shorts.rajeshautomates.in` ✅ (Use the full domain including https)

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

## 🆘 Still getting 502 Bad Gateway? (Last Resort)

If you've updated the code and settings but still see 502:

1. **Check Dokploy Logs:** Look at the "Logs" tab for the Frontend.
   - If you see `✓ Ready on 0.0.0.0:4040`, the app is PERFECT. The issue is definitely the **Service Port** in Dokploy Domains tab.
2. **Re-Add Environment Variables:** Delete the `PORT` and `NEXT_PUBLIC_API_URL` variables and re-add them one by one. Ensure there is **NOTHING** in the input field except the value. No extra spaces at the end, no line breaks.
3. **Check Build Status:** Ensure the latest deployment actually finished and says "SUCCESS". If it says "FAILED", click it to see why.

**I have updated the code to use the "Standalone" build mode.** This is the official Next.js recommendation for Docker. It makes the deployment much more stable.
