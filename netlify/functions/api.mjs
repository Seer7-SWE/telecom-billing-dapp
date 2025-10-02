// netlify/functions/api.mjs
import serverless from "serverless-http";
import app, { initBackend } from "../../backend/app.js";

let serverlessHandler;

export async function handler(event, context) {
  console.log("INCOMING EVENT PATH:", event.path, "rawPath:", event.rawPath);

  // Normalize path
  let p = event.path || event.rawPath || "";
  p = p.replace(/^\/\.netlify\/functions\/api/, "");
  const idx = p.indexOf("/api/");
  if (idx !== -1 && idx !== 0) p = p.slice(idx);
  if (!p.startsWith("/")) p = "/" + p;
  event.path = p;
  console.log("NORMALIZED PATH:", event.path);

  if (!serverlessHandler) {
    await initBackend(); // safe to be no-op or lightweight
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
