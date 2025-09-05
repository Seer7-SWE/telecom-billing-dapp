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

let handler;

export async function handler(event, context) {
  if (!handler) {
    await initBackend();
    handler = serverless(app);
  }
  return handler(event, context);
}
