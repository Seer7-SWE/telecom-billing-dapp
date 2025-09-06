import express from "express";
import bodyParser from "body-parser";
import plansRouter from "./routes/plans.js";
import usageRouter from "./routes/usage.js";
import paymentsRouter from "./routes/payments.js";

const app = express();

app.use(bodyParser.json());

// ✅ Mount with /api prefix
app.use("/api/plans", plansRouter);
app.use("/api/usage", usageRouter);
app.use("/api/payments", paymentsRouter);

// ✅ Health check
app.get("/api", (req, res) => {
  res.json({ status: "ok from backend" });
});

export async function initBackend() {
  console.log("Backend initialized ✅");
}

export default app;
