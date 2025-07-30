/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild",
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
  },
});
