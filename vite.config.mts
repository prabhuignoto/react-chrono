import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfig from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'dist_site',
  },
  plugins: [react(), tsconfig()],
  root: './',
  server: {
    port: 4444,
    watch: {
      ignored: [
        'node_modules',
        'dist',
        'build',
        'public',
        'package.json',
        'package-lock.json',
        'tsconfig.json',
        'vite.config.mts',
        'yarn.lock',
      ],
    },
  },
});
