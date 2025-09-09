// netlify/functions/api.mjs
import serverless from "serverless-http";
import app, { initBackend } from "../../backend/app.js";

let serverlessHandler;

export async function handler(event, context) {
  // Debug logging (Netlify function logs)
  console.log("INCOMING EVENT PATH:", event.path, "rawPath:", event.rawPath);

  // Normalize path so Express receives paths like "/api/usage" or "/api/plans"
  let p = event.path || event.rawPath || "";

  // Remove Netlify function prefix if present
  p = p.replace(/^\/\.netlify\/functions\/api/, "");

  // If frontend accidentally requested "/dashboard/api/..." or "/something/api/..."
  // find the first occurrence of "/api/" and keep from there
  const idx = p.indexOf("/api/");
  if (idx !== -1 && idx !== 0) {
    p = p.slice(idx);
  }

  // Ensure leading slash
  if (!p.startsWith("/")) p = "/" + p;

  // Attach normalized path back to event so serverless-http forwards correctly
  event.path = p;
  console.log("NORMALIZED PATH:", event.path);

  if (!serverlessHandler) {
    // initBackend can be a no-op or initialize Supabase-related stuff if needed
    await initBackend();
    serverlessHandler = serverless(app);
  }

  try {
    return await serverlessHandler(event, context);
  } catch (err) {
    console.error("serverless handler error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "internal_server_error" }),
    };
  }
}
