import serverless from "serverless-http";
import app, { initBackend } from "../../backend/app.js";


let handler;

export const handler = async (event, context) => {
  if (!handler) {
    await initBackend(); // connect Mongo once
    handler = serverless(app);
  }
  return handler(event, context);
};
// Ensure DB etc. initialized once
// await initBackend();

// export async function handler(event, context) {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'OK' }),
//   };
// }

