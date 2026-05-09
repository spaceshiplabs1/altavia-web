import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'site',
  server: {
    port: 5173,
    open: '/index.html'
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'site/index.html'),
        soluciones:  resolve(__dirname, 'site/soluciones.html'),
        nosotros:    resolve(__dirname, 'site/nosotros.html'),
        referidos:   resolve(__dirname, 'site/referidos.html'),
        privacidad:  resolve(__dirname, 'site/privacidad.html'),
        terminos:    resolve(__dirname, 'site/terminos.html'),
      }
    }
  }
});
