import { defineConfig } from 'vite';

export default defineConfig({
  root: 'site',
  server: {
    port: 5173,
    open: '/index.html'
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
