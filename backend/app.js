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
let initialized = false;
export async function initBackend() {
  if (!initialized) {
    if (process.env.MONGO_URI) {
      await connectDB();
    } else {
      console.log("⚠️ Skipping DB init (MONGO_URI not set). Using mock mode.");
    }
    initialized = true;
  }
}

export default app;
