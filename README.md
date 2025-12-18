# SEO Chatbot API

API proxy for the SEO Audit Chrome Extension. This Next.js project provides a serverless endpoint that proxies requests to Google Gemini API, keeping API keys secure on the server.

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub** (or GitLab/Bitbucket):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Project name: `seo-chatbot`

3. **Set Environment Variables**:
   - In Vercel project settings → Environment Variables, add:
     - `GEMINI_API_KEY` = Your Gemini API key
     - `GEMINI_MODEL` = `gemini-2.0-flash` (optional)
     - `ALLOWED_ORIGINS` = Leave empty (allows all) or set to your Chrome extension ID

4. **Deploy** - Vercel will auto-deploy

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
cd seo-chatbot
vercel
# Follow prompts, then:
vercel --prod
```

## Environment Variables

Set these in Vercel project settings:

- **`GEMINI_API_KEY`** (required): Your Google Gemini API key
- **`GEMINI_MODEL`** (optional): Model name, default is `gemini-2.0-flash`
- **`ALLOWED_ORIGINS`** (optional): Comma-separated list of allowed origins for CORS

## API Endpoint

After deployment, your endpoint will be:
- `https://seo-chatbot.vercel.app/api/chat` (or your custom domain)

### Request Format

```json
{
  "question": "How to fix missing alt tags?",
  "context": {
    "url": "https://example.com",
    "score": 75,
    "issues": [...],
    "keywordIdeas": [...],
    "htmlHeadSnippet": "...",
    "htmlBodySnippet": "...",
    "visibleText": "..."
  },
  "modelHint": "gemini-2.0-flash"
}
```

### Response Format

```json
{
  "answer": "To fix missing alt tags..."
}
```

## Local Development

```bash
npm install
npm run dev
```

API will be available at `http://localhost:3000/api/chat`

## Security Notes

- API keys are stored in Vercel environment variables (never in code)
- CORS is configured to allow Chrome extension origins
- All requests are serverless (no persistent state)

