import express from "express";
import bodyParser from "body-parser";
import plansRouter from "./routes/plans.js";
import usageRouter from "./routes/usage.js";
import paymentsRouter from "./routes/payments.js";

const app = express();

app.use(bodyParser.json());

// ✅ Mount routers
app.use("/plans", plansRouter);
app.use("/usage", usageRouter);
app.use("/payments", paymentsRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ status: "ok from backend" });
});

export async function initBackend() {
  console.log("Backend initialized ✅");
}

export default app;
