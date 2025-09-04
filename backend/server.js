import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./db.js";
import plansRoutes from "./routes/plans.js";
import usageRoutes from "./routes/usage.js";
import paymentsRoutes from "./routes/payments.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/plans", plansRoutes);
app.use("/api/usage", usageRoutes);
app.use("/api/payments", paymentsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
});
