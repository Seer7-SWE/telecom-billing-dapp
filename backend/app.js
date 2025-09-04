import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";

import plansRoutes from "./routes/plans.js";
import usageRoutes from "./routes/usage.js";
import paymentsRoutes from "./routes/payments.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/plans", plansRoutes);
app.use("/usage", usageRoutes);
app.use("/payments", paymentsRoutes);

// Initialize backend (DB, etc.)
export async function initBackend() {
  await connectDB();
  console.log("✅ Backend initialized inside Vite middleware");
}

export default app;
