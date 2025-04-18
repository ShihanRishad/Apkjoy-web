import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        download: resolve(__dirname, 'download/index.html'),
        help: resolve(__dirname, 'help/index.html')
      }
    }
  }
});
