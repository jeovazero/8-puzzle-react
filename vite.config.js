import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '/src/components'),
      '@lib': path.resolve(__dirname, '/src/lib'),
      '@assets': path.resolve(__dirname, '/src/assets')
    }
  }
})
