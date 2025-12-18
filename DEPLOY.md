# Deploy SEO Chatbot to Vercel

## Step 1: Initialize Git (if not already done)

```bash
cd seo-chatbot
git init
git add .
git commit -m "Initial commit: SEO Chatbot API"
```

## Step 2: Push to GitHub/GitLab/Bitbucket

Create a new repository and push:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your `seo-chatbot` repository
4. **Project Name**: `seo-chatbot` (or any name you prefer)
5. **Framework Preset**: Next.js (auto-detected)
6. **Root Directory**: `./` (default)
7. Click **"Deploy"**

### Option B: Via Vercel CLI

```bash
npm install -g vercel
cd seo-chatbot
vercel
# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: seo-chatbot
# - Directory: ./
# - Override settings? No
vercel --prod
```

## Step 4: Set Environment Variables

After deployment, go to your Vercel project:

1. **Settings** → **Environment Variables**
2. Add these variables:

   | Variable | Value | Required |
   |----------|-------|----------|
   | `GEMINI_API_KEY` | Your Gemini API key | ✅ Yes |
   | `GEMINI_MODEL` | `gemini-2.0-flash` | ❌ Optional |
   | `ALLOWED_ORIGINS` | (leave empty or add extension ID) | ❌ Optional |

3. **Important**: After adding variables, **redeploy** the project:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment → **"Redeploy"**

## Step 5: Get Your Deployment URL

After deployment, your API will be available at:
- `https://seo-chatbot.vercel.app/api/chat` (or your custom domain)

## Step 6: Update Extension (if needed)

The extension is already configured to use:
- `https://seo-chatbot.vercel.app/api/chat`

If your Vercel project name is different, update it in extension Options.

## Step 7: Test the API

```bash
curl -X POST https://seo-chatbot.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"Say OK","context":{"url":"https://example.com"}}'
```

Expected response: `{"answer":"OK..."}`

## Troubleshooting

- **404 Error**: Make sure `/app/api/chat/route.js` exists and is deployed
- **500 "GEMINI_API_KEY missing"**: Set the environment variable in Vercel and redeploy
- **CORS errors**: Set `ALLOWED_ORIGINS` to your Chrome extension ID (find it in `chrome://extensions`)

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update extension Options with new URL

