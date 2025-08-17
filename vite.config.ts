import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    sourcemap: mode !== 'production',
    minify: mode === 'production' ? 'terser' : false,
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
        drop_console: mode === 'production',
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.warn'] : []
      },
      mangle: {
        safari10: true
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
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
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': mode === 'production' 
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
      : "default-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' ws: wss:"
  },
  host: mode === 'development' ? 'localhost' : false,
  port: 5173,
  strictPort: false
},
preview: {
  port: 4173,
  headers: {
    'Cache-Control': 'public, max-age=600',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  }
}
}));