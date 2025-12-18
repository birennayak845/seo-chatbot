// Simple test endpoint to verify deployment
export async function GET() {
  return Response.json({ 
    status: "ok", 
    message: "API routes are working",
    timestamp: new Date().toISOString()
  });
}

