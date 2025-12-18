# Troubleshooting 404 Error

If you're getting `Hosted AI error (404)`, follow these steps:

## Step 1: Verify Route File Exists

Make sure `app/api/chat/route.js` exists in your project:
```
seo-chatbot/
  app/
    api/
      chat/
        route.js  ← This file must exist
```

## Step 2: Check Git Status

```bash
cd seo-chatbot
git status
```

Make sure `app/api/chat/route.js` is **not** in `.gitignore` and is **tracked by git**.

## Step 3: Commit and Push

```bash
git add app/api/chat/route.js
git commit -m "Add chat API route"
git push
```

## Step 4: Verify Vercel Deployment

1. Go to your Vercel project dashboard
2. Check **Deployments** tab
3. Look for the latest deployment
4. Click on it to see build logs
5. Check for any errors during build

## Step 5: Test the Endpoint Directly

After deployment, test if the route exists:

```bash
# Test endpoint (should return JSON)
curl https://seo-chatbot.vercel.app/api/test

# Test chat endpoint (should return error about missing question, not 404)
curl -X POST https://seo-chatbot.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"test"}'
```

**Expected results:**
- `/api/test` → `{"status":"ok",...}` (200 OK)
- `/api/chat` → `{"error":"Missing question"}` (400) OR `{"error":"GEMINI_API_KEY missing"}` (500)

**If you get 404:**
- The route file isn't deployed
- Check Vercel build logs for errors
- Make sure you're deploying the correct branch

## Step 6: Check Vercel Project Settings

1. **Settings** → **General**
   - **Framework Preset**: Should be "Next.js"
   - **Root Directory**: Should be `./` (or leave empty)
   - **Build Command**: Should be `next build` (auto-detected)
   - **Output Directory**: Should be `.next` (auto-detected)

2. **Settings** → **Environment Variables**
   - `GEMINI_API_KEY` = Your key (required)
   - `GEMINI_MODEL` = `gemini-2.0-flash` (optional)

## Step 7: Force Redeploy

If the route still doesn't work:

1. In Vercel dashboard → **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for build to complete
5. Test again

## Step 8: Check File Structure in Vercel

If still not working, check what files Vercel actually sees:

1. Go to **Deployments** → Latest deployment
2. Click **"View Function Logs"** or **"View Build Logs"**
3. Look for any errors about missing files

## Common Issues

### Issue: Route file not in repo
**Fix**: Make sure `app/api/chat/route.js` is committed and pushed

### Issue: Wrong Next.js version
**Fix**: The project uses Next.js 14 (App Router). Make sure your Vercel project is using Next.js 14+

### Issue: Build failing silently
**Fix**: Check Vercel build logs for TypeScript/import errors

### Issue: Route in wrong location
**Fix**: For Next.js App Router, route must be at `app/api/chat/route.js` (not `pages/api/chat.js`)

## Quick Fix: Recreate Route File

If nothing works, try recreating the route:

1. Delete `app/api/chat/route.js` (if it exists)
2. Copy the route file from the extension folder:
   ```bash
   cp seo_audit_browser_extension/vercel_ai_proxy/NEXTJS_APP_ROUTER_route.js \
      seo-chatbot/app/api/chat/route.js
   ```
3. Commit and push:
   ```bash
   git add app/api/chat/route.js
   git commit -m "Recreate chat route"
   git push
   ```
4. Wait for Vercel to redeploy

