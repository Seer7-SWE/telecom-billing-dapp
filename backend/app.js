import express from "express";
import bodyParser from "body-parser";
import plansRouter from "./routes/plans.js";
import usageRouter from "./routes/usage.js";
import paymentsRouter from "./routes/payments.js";

const app = express();

app.use(bodyParser.json());

// ✅ Mount routers immediately
app.use("/plans", plansRouter);
app.use("/usage", usageRouter);
app.use("/payments", paymentsRouter);

// ✅ Always available health check
app.get("/", (req, res) => {
  res.json({ status: "ok from backend" });
});

export async function initBackend() {
  // Example: connect Supabase or run migrations
  console.log("Backend initialized ✅");
}

export default app;
