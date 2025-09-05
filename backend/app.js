import express from "express";
import cors from "cors";

import plansRoutes from "./routes/plans.js";
import usageRoutes from "./routes/usage.js";
import paymentsRoutes from "./routes/payments.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/plans", plansRoutes);
app.use("/usage", usageRoutes);
app.use("/payments", paymentsRoutes);

export async function initBackend() {
  console.log("✅ Backend initialized with Supabase");
}

export default app;
