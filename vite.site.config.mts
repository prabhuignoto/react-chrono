import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import tsconfig from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'dist_site',
    sourcemap: true,
  },
  plugins: [vanillaExtractPlugin(), react(), tsconfig()],
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
    open: true,
    host: true,
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@models': '/src/models',
      '@utils': '/src/utils',
    },
  },
});


