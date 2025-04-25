import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/index.css";`
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@mui/material", "@emotion/react", "@emotion/styled"],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
