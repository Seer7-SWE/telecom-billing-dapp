// backend/app.js
import "dotenv/config"; // loads .env for local dev; safe on Netlify too (no file)
import express from "express";
import bodyParser from "body-parser";
import plansRouter from "./routes/plans.js";
import usageRouter from "./routes/usage.js";
import paymentsRouter from "./routes/payments.js";

const app = express();
app.use(bodyParser.json());

// Mount routers at /api/...
app.use("/api/plans", plansRouter);
app.use("/api/usage", usageRouter);
app.use("/api/payments", paymentsRouter);

// Health check
app.get("/api", (req, res) => {
  res.json({ status: "ok from backend" });
});

export async function initBackend() {
  // leave room to init anything server-side. Keep fast and idempotent.
  console.log("Backend init (Supabase client will use env vars).");
}

export default app;
