// backend/app.js
import "dotenv/config"; // load environment variables from .env for local development
import express from "express";
import bodyParser from "body-parser";

// Import routers
import plansRouter from "./routes/plans.js";
import usageRouter from "./routes/usage.js";
import paymentsRouter from "./routes/payments.js";

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount routes under /api/ to ensure all endpoints are prefixed with /api
app.use("/api/plans", plansRouter);   // Plan-related routes
app.use("/api/usage", usageRouter);   // Usage-related routes
app.use("/api/payments", paymentsRouter);  // Payment-related routes

// Health check endpoint
app.get("/api", (req, res) => {
  res.json({ status: "ok from backend" });
});

// Global error handler to catch unhandled errors and prevent server crashes
app.use((err, req, res, next) => {
  console.error("Unhandled backend error:", err); // log error to console
  res.status(500).json({
    error: err?.message || "Internal Server Error", // send a readable error message
    // Provide the stack trace in non-production environments to aid debugging
    stack: process.env.NODE_ENV !== "production" ? err?.stack : undefined,
  });
});

// Async backend initialization function (for database connections, migrations, etc.)
export async function initBackend() {
  // Keep this initialization fast and idempotent
  console.log("Backend initialized (initBackend) — ready.");
  // You can add any async tasks here (e.g., database migrations, cache warmup)
}

export default app;
