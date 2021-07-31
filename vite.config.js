import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";

export default defineConfig({
  plugins: [vue(), crossOriginIsolation()],
});
