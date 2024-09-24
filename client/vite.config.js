import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@components": "/src/components",
        "@context": "/src/context",
        "@layouts": "/src/layouts",
        "@pages": "/src/pages",
      },
    },
  };
});
