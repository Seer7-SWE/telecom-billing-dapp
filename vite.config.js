// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Only import backend in dev to avoid crashing the build
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Inject .env into process.env for backend usage
  Object.assign(process.env, env);

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
    ].filter(Boolean), // remove false plugins in production
    define: {
      "process.env": env,
    },
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
