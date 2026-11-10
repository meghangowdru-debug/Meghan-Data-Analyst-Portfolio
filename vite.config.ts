import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH } = loadEnv(mode, process.cwd(), "");
  return {
    base: VITE_BASE_PATH || "/",
    plugins: [react(), tailwindcss()],
  };
});
