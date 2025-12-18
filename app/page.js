// Minimal landing page for the API
export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui", maxWidth: "600px", margin: "0 auto" }}>
      <h1>SEO Chatbot API</h1>
      <p>This is the API proxy for the SEO Audit Chrome Extension.</p>
      <p>Endpoint: <code>POST /api/chat</code></p>
    </div>
  );
}

