import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Fallback para index.html para SPAs
    // Isso garante que todas as rotas sejam tratadas pelo React
    strictPort: false,
  },
  preview: {
    port: 5173,
    // Em produção, todas as rotas devem apontar para index.html
    strictPort: false,
  },
  build: {
    // Configurações de build para SPA
    rollupOptions: {
      output: {
        manualChunks: undefined, // Mantém tudo em um único chunk para SPA simples
      },
    },
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(
      process.env.VITE_API_URL || "http://localhost:5014"
    ),
  },
});
