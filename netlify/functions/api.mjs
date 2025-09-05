import serverless from "serverless-http";
import app, { initBackend } from "../../backend/app.js";



// Ensure DB etc. initialized once
await initBackend();

export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'OK' }),
  };
}

