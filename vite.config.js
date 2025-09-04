import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import express from "express";
import path from "node:path";

// Import backend app (Express Router) & DB initializer
import backendApp, { initBackend } from "./backend/app.js";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "express-backend-middleware",
      configureServer(server) {
        // Initialize DB and ethers bindings once
        initBackend().catch((e) =>
          console.error("❌ Backend init failed:", e)
        );

        // Mount backend express app on /api
        const api = express();
        api.use("/", backendApp);
        server.middlewares.use("/api", api);
      },
    },
  ],
  root: path.resolve(process.cwd(), "frontend"),
  server: {
    port: Number(process.env.PORT) || 5173,
    host: true,
  },
  build: {
    outDir: "dist",
  },
});
