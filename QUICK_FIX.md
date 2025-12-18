# Quick Fix for 404 Error

## Immediate Steps

### 1. Verify the route file exists locally:
```bash
cd seo-chatbot
ls -la app/api/chat/route.js
```

Should show the file exists.

### 2. Check if it's in git:
```bash
git status
```

If `app/api/chat/route.js` shows as "untracked" or "modified", add it:
```bash
git add app/api/chat/route.js
git commit -m "Add chat API route"
git push
```

### 3. Test locally (optional):
```bash
npm install
npm run dev
```

Then test:
```bash
curl http://localhost:3000/api/test
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{"question":"test"}'
```

### 4. Force Vercel to redeploy:

**Option A: Via Vercel Dashboard**
1. Go to your Vercel project
2. **Deployments** tab
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**

**Option B: Via Git**
```bash
# Make a small change to trigger redeploy
echo "# Redeploy trigger" >> README.md
git add README.md
git commit -m "Trigger redeploy"
git push
```

### 5. Verify deployment:

After redeploy, test:
```bash
# Should return: {"status":"ok",...}
curl https://seo-chatbot.vercel.app/api/test

# Should return: {"error":"Missing question"} (400) or {"error":"GEMINI_API_KEY missing"} (500)
# NOT 404!
curl -X POST https://seo-chatbot.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"test"}'
```

## If Still Getting 404

### Check Vercel Build Logs:

1. Go to Vercel dashboard
2. **Deployments** → Latest deployment
3. Click on the deployment
4. Check **"Build Logs"**
5. Look for errors like:
   - "Cannot find module"
   - "File not found"
   - TypeScript errors

### Verify Project Structure in Vercel:

1. In Vercel dashboard → **Settings** → **General**
2. Check **Root Directory** - should be empty or `./`
3. Check **Framework Preset** - should be "Next.js"

### Last Resort - Recreate Project:

If nothing works, create a fresh Vercel project:

1. Delete current Vercel project (or use a new name)
2. Create new project in Vercel
3. Import your `seo-chatbot` repo
4. Set environment variables
5. Deploy

