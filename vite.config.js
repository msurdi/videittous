import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
// import crossOriginIsolation from "vite-plugin-cross-origin-isolation";

const crossOriginIsolation = () => ({
  name: "configure-server",

  configureServer(server) {
    server.middlewares.use((_req, res, next) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      next();
    });
  },
});

export default defineConfig({
  plugins: [vue(), crossOriginIsolation()],
});
