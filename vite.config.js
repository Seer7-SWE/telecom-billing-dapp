// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      isDev && {
        name: "dev-express-backend",
        configureServer: async (server) => {
          const express = await import("express");
          const backendAppModule = await import("./backend/app.js");
          const app = express.default();
          const backendApp = backendAppModule.default;
          const initBackend = backendAppModule.initBackend;

          await initBackend();
          app.use("/", backendApp);
          server.middlewares.use("/api", app);
        },
      },
    ].filter(Boolean),
    root: path.resolve(process.cwd(), "frontend"),
    server: {
      port: Number(env.PORT) || 5173,
      host: true,
    },
    build: {
      outDir: "dist",
    },
  };
});
