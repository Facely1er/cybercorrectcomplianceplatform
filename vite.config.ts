import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  
  // Build Configuration
  base: '/',
  
  build: {
    target: 'esnext',
    minify: true,
    sourcemap: false, // Disable in production for security
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          charts: ['chart.js', 'react-chartjs-2'],
          utils: ['clsx', 'tailwind-merge']
        }
      }
    }
  },
  
  server: {
    port: 3000,
    host: true
  },
  
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    global: 'globalThis'
  }
})