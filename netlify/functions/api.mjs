import serverless from "serverless-http";
import app, { initBackend } from "../../backend/app.js";

let serverlessHandler;

export async function handler(event, context) {
  console.log("➡️ API Event Path:", event.path); // 👀 log incoming
  if (!serverlessHandler) {
    await initBackend();
    serverlessHandler = serverless(app);
  }
  return serverlessHandler(event, context);
}
