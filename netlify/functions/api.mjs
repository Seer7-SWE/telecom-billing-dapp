import serverless from "serverless-http";
import app, { initBackend } from "../../backend/app.js";

// Ensure DB etc. initialized once
await initBackend();

export const handler = serverless(app);
