import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PRODUCTION_CONFIG } from './src/config/production';
/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    sourcemap: process.env.NODE_ENV !== 'production' && !PRODUCTION_CONFIG.BUILD.SOURCE_MAPS,
    minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framework: ['@supabase/supabase-js'],
          charts: ['chart.js', 'react-chartjs-2'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          ui: ['@headlessui/react'],
          utils: ['zod', 'dompurify'],
          security: ['bcryptjs', 'jose']
        },
      },
    },
    target: 'es2022',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.warn'] : []
      },
      mangle: {
        safari10: true
      }
    },
    chunkSizeWarningLimit: PRODUCTION_CONFIG.PERFORMANCE.BUNDLE_SIZE_LIMIT / 1024,
    assetsInlineLimit: 4096, // 4KB
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js', 'zod']
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    },
    host: process.env.NODE_ENV === 'development' ? 'localhost' : false,
    port: 5173,
    strictPort: false
  },
  preview: {
    port: 4173,
    headers: {
      'Cache-Control': 'public, max-age=600' // 10 minutes for preview
    }
  }
});
