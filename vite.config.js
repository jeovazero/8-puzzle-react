import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { defineConfig } from 'vite'
import viteSvgIcons from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: '[name]'
    })
  ],
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
