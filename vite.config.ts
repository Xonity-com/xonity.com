import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Public base path. GitHub Pages serves a project repo from a subpath
 * (`/<repo>/`), so CI passes VITE_BASE; everything else defaults to root.
 */
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: false,
  },
})
