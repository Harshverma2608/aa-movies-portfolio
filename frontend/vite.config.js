import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],

    // Dev proxy — only used locally
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
        }
      }
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/framer-motion')) {
              return 'motion-vendor'
            }
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')
            ) {
              return 'react-vendor'
            }
          }
        }
      },
      chunkSizeWarningLimit: 1000,
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'react-router-dom']
    }
  }
})
