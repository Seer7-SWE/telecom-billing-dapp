import express from "express";
import bodyParser from "body-parser";
import plansRouter from "./routes/plans.js";
import usageRouter from "./routes/usage.js";
import paymentsRouter from "./routes/payments.js";

const app = express();

app.use(bodyParser.json());

// ✅ Mount directly at root, not "/api"
app.use("/plans", plansRouter);
app.use("/usage", usageRouter);
app.use("/payments", paymentsRouter);

export async function initBackend() {
  // any Supabase setup etc.
  console.log("Backend initialized ✅");
  app.get("/", (req, res) => {
  res.json({ status: "ok from backend" });
});

}

export default app;
