import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import express from "express";
import path from "node:path";
import backendApp, { initBackend } from "./backend/app.js";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "express-backend-middleware",
      configureServer(server) {
        initBackend().catch((e) => console.error("Backend init failed:", e));
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
