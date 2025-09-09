// backend/app.js
import "dotenv/config"; // local .env only; Netlify uses env vars from UI
import express from "express";
import bodyParser from "body-parser";
import plansRouter from "./routes/plans.js";
import usageRouter from "./routes/usage.js";
import paymentsRouter from "./routes/payments.js";

const app = express();
app.use(bodyParser.json());

// Mount everything under /api/... so normalized path matches
app.use("/api/plans", plansRouter);
app.use("/api/usage", usageRouter);
app.use("/api/payments", paymentsRouter);

// Health check
app.get("/api", (req, res) => {
  res.json({ status: "ok from backend" });
});

export async function initBackend() {
  // Keep this fast and idempotent. Logging is helpful to confirm init ran.
  console.log("Backend initialized (initBackend) — ready.");
}

export default app;
