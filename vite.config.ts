import vue from '@vitejs/plugin-vue';
import path from 'path';
import {
  defineConfig
} from 'vite';

const srcDir = path.resolve(__dirname, 'src');
const appDir = path.resolve(__dirname, 'src', 'vue');

export default defineConfig({
  root: appDir,
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
  build: {
    outDir: './dist',
    ssr: false,
    minify: 'esbuild',
    emptyOutDir: true,
    sourcemap: process.env.mode === 'production',
  },
  plugins: [
    vue(),
  ],
});
