import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default {
  plugins: [
    react(),
    dts(),
    externalizeDeps()
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"], // Just export ES6 modules
      fileName: 'index',
    },
  },
} as const;
