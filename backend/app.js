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

// Initialize backend (DB)
let initialized = false;
export async function initBackend() {
  if (!initialized) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("❌ MONGO_URI missing. Please set in .env or Netlify UI.");
      throw new Error("MONGO_URI not set");
    }
    await connectDB(uri);
    initialized = true;
    console.log("✅ Backend initialized with MongoDB");
  }
}

export default app;
