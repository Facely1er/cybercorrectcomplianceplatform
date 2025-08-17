import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  
  // 🔧 Build Configuration
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false, // Disable in production for security
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', 'lucide-react'],
          charts: ['recharts'],
          utils: ['clsx', 'tailwind-merge']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },
  
  // 🔒 Development Server Security
  server: {
    host: 'localhost',
    port: 3000,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  
  // 📁 Path Resolution
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/modules': '/src/modules',
      '@/lib': '/src/lib',
      '@/types': '/src/types'
    }
  },
  
  // 🌍 Environment Variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})