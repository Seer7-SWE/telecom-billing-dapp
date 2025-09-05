// import serverless from "serverless-http";
// import app, { initBackend } from "../../backend/app.js";



// // Ensure DB etc. initialized once
// await initBackend();

// export async function handler(event, context) {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'OK' }),
//   };
// }

import serverless from "serverless-http";
import app, { initBackend } from "../../backend/app.js";

// cache the serverless-wrapped app
let serverlessHandler;

export async function handler(event, context) {
  if (!serverlessHandler) {
    await initBackend();
    serverlessHandler = serverless(app);
  }
  return serverlessHandler(event, context);
}
