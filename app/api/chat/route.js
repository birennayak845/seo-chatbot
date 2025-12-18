// SEO Audit Extension - Chat API Route
// Handles chatbot requests from the Chrome extension

export async function POST(req) {
  // CORS headers
  const origin = req.headers.get("origin") || "";
  const allowed = process.env.ALLOWED_ORIGINS || "";
  
  const headers = {
    "Access-Control-Allow-Origin": allowed.trim() 
      ? (allowed.split(",").map(s => s.trim()).includes(origin) ? origin : "*")
      : (origin || "*"),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Vary": "Origin",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server not configured: GEMINI_API_KEY missing" },
      { status: 500, headers }
    );
  }

  try {
    const body = await req.json();
    const { question, context, modelHint } = body || {};
    
    if (!question) {
      return Response.json(
        { error: "Missing question" },
        { status: 400, headers }
      );
    }

    const model = (modelHint || process.env.GEMINI_MODEL || "gemini-2.0-flash").replace(/^models\//i, "");

    const ctx = context || {};
    const truncate = (s, max) => {
      const t = String(s || "");
      return t.length > max ? t.slice(0, max) : t;
    };

    const prompt = [
      "You are an expert Technical SEO + Performance + Content assistant.",
      "Use the audit metrics + HTML snippets + visible text to give precise, actionable recommendations.",
      "When generating content, provide multiple options with character counts and a recommended pick.",
      "Output format: Diagnosis, Impact, Fix steps, Example code/content, References (URLs).",
      ctx.url ? `Page URL: ${ctx.url}` : "",
      ctx.score != null ? `Audit score: ${ctx.score}` : "",
      Array.isArray(ctx.issues) && ctx.issues.length
        ? `Top issues:\n${ctx.issues.slice(0, 10).map((i) => `- ${i.title}: ${i.description}`).join("\n")}`
        : "",
      Array.isArray(ctx.keywordIdeas) && ctx.keywordIdeas.length
        ? `Keyword ideas:\n${ctx.keywordIdeas
            .slice(0, 12)
            .map((k) => `- ${k.term} (count=${k.count}, missingInTitleH1Meta=${k.missingInCriticalTags})`)
            .join("\n")}`
        : "",
      ctx.htmlHeadSnippet ? `HTML <head> snippet:\n${truncate(ctx.htmlHeadSnippet, 9000)}` : "",
      ctx.htmlBodySnippet ? `HTML <body> snippet (truncated):\n${truncate(ctx.htmlBodySnippet, 12000)}` : "",
      ctx.visibleText ? `Visible text sample (truncated):\n${truncate(ctx.visibleText, 16000)}` : "",
      Array.isArray(ctx.resources) && ctx.resources.length
        ? `References:\n${ctx.resources.slice(0, 10).map((r) => `- ${r.title}: ${r.url}`).join("\n")}`
        : "",
      "",
      `User question:\n${String(question)}`
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 900 }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok) {
      return Response.json(
        {
          error: `Gemini error (${resp.status})`,
          details: data
        },
        { status: resp.status, headers }
      );
    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join("\n") ||
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    return Response.json({ answer }, { headers });
  } catch (e) {
    return Response.json(
      { error: `Server error: ${String(e?.message || e)}` },
      { status: 500, headers }
    );
  }
}

