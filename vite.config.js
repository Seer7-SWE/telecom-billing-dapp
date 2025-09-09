import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import express from "express";
import path from "node:path";
import backendApp, { initBackend } from "./backend/app.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "express-backend-middleware",
        configureServer(server) {
          initBackend().catch((e) =>
            console.error("Backend init failed:", e)
          );
          const api = express();
          api.use("/", backendApp);
          server.middlewares.use("/api", api);
        },
      },
    ],
    define: {
      "process.env": env,
    },
    root: path.resolve(process.cwd(), "frontend"),
    server: {
      port: Number(env.PORT) || 5173,
      host: true,
      // Optional: if you want to switch to proxy instead of Express, use this:
      // proxy: {
      //   "/api": "http://localhost:8888",
      // },
    },
    build: {
      outDir: "dist",
    },
  };
});
