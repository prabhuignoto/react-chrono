import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfig from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'dist_site',
    // Adding sourcemap for better debugging
    sourcemap: true,
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
    // Adding open option to automatically open the browser
    open: true,
  },
  // Adding resolve.alias for better path management
  resolve: {
    alias: {
      '@components': '/src/components',
      '@models': '/src/models',
      '@utils': '/src/utils',
    },
  },
})
