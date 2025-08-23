import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  // Optimized dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@headlessui/react']
  },
  
  build: {
    target: 'es2015',
    minify: mode === 'production' ? 'terser' : false,
    sourcemap: mode !== 'production',
    
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          
          // UI libraries (separate chunk)
          ui: ['@headlessui/react', 'lucide-react', 'tailwind-merge'],
          
          // Chart libraries (large, separate chunk)
          charts: ['chart.js', 'react-chartjs-2', 'recharts'],
          
          // Utility libraries
          utils: ['zod', 'dompurify'],
          
          // Crypto and auth
          crypto: ['bcryptjs', 'jose'],
          
          // Supabase (separate for easy updates)
          supabase: ['@supabase/supabase-js'],
          
          // Analytics
          analytics: ['@vercel/analytics']
        }
      }
    },
    
    // Production-specific optimizations
    ...(mode === 'production' && {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.warn', 'console.info']
        },
        mangle: {
          safari10: true
        }
      }
    }),
    
    // Adjust chunk size warning limit
    chunkSizeWarningLimit: 500
  },
  
  server: {
    port: 5173,
    host: true
  },
  
  preview: {
    port: 4173,
    host: true,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '2.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __BUILD_TIMESTAMP__: JSON.stringify(new Date().toISOString()),
    global: 'globalThis'
  }
}))