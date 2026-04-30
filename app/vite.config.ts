import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // You might need to install 'path' or use 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // This solves the "Buffer is not defined" error in the browser
    'global': 'window',
  },
  resolve: {
    alias: {
      // Force all libraries to use the same React instance
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'buffer',
      '@solana/wallet-adapter-react',
      '@solana/wallet-adapter-react-ui',
      '@solana/web3.js',
    ],
  },
  server: {
    port: 8710,
  }
})

