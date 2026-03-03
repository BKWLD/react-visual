import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for the demo app
export default defineConfig({
  plugins: [react()],
  root: "demo",
  base: "./",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
