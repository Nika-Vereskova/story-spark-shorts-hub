import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Static routes for pre-rendering
const staticRoutes = [
  '/',
  '/en/',
  '/sv/',
  '/ru/',
  '/en/about',
  '/sv/about', 
  '/ru/about',
  '/en/services',
  '/sv/services',
  '/ru/services',
  '/en/ai-services',
  '/sv/ai-services',
  '/ru/ai-services',
  '/en/contact',
  '/sv/contact',
  '/ru/contact',
  '/en/books',
  '/sv/books',
  '/ru/books',
  '/en/videos',
  '/sv/videos',
  '/ru/videos',
  '/en/ai-news',
  '/sv/ai-news',
  '/ru/ai-news',
  '/en/newsletter',
  '/sv/newsletter',
  '/ru/newsletter'
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  build: {
    target: 'es2020', // Target modern browsers to avoid transpiling supported features
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          supabase: ['@supabase/supabase-js'],
          routing: ['react-router-dom'],
        },
      },
    },
    // Performance optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // SEO and performance optimizations
  define: {
    __STATIC_ROUTES__: JSON.stringify(staticRoutes),
  },
}));
