// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Define whether we're in production or not
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      isDev && {
        name: "dev-express-backend",
        configureServer: async (server) => {
          // Lazy-load backend during development to avoid bundling in production
          const express = await import("express");
          const backendAppModule = await import("./backend/app.js");
          const app = express.default();
          const backendApp = backendAppModule.default;
          const initBackend = backendAppModule.initBackend ?? (() => {});

          // Initialize the backend app (e.g., DB connections)
          await initBackend();

          // Use the backend app for the "/api" route
          app.use("/", backendApp);

          // Proxy the backend to the Vite server at /api
          server.middlewares.use("/api", app);
        },
      },
    ].filter(Boolean),
    
    // Specify the root directory for the frontend
    root: path.resolve(process.cwd(), "frontend"),

    // Development server settings
    server: {
      port: Number(env.PORT) || 5173, // Default port or from env
      host: true, // Expose server to local network
      proxy: {
        // Proxy API requests to the backend in development
        "/api": `http://localhost:${env.BACKEND_PORT || 5000}`, // Define BACKEND_PORT in .env for the backend server
      },
    },

    // Build settings
    build: {
      outDir: "dist", // Output directory stays under "frontend/dist"
    },
  };
});
