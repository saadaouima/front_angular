import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@angular/core', '@angular/common', '@angular/platform-browser']
  },
  build: {
    target: 'es2022'
  },
  esbuild: {
    target: 'es2022'
  }
});
