import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "../backend/static", // <-- así los assets van directo a la carpeta estática de Flask
  },
  base: "/static/", // <-- rutas absolutas para producción
});
