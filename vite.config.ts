import vue from '@vitejs/plugin-vue';
import path from 'path';
import {
  defineConfig
} from 'vite';

const appDir = path.resolve(__dirname, 'src', 'vue');

export default defineConfig({
  root: appDir,
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
