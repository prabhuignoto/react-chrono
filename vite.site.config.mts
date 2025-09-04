import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import tsconfig from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'dist_site',
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    exclude: ['@vanilla-extract/css', '@vanilla-extract/dynamic'],
  },
  plugins: [
    vanillaExtractPlugin({ 
      identifiers: process.env.NODE_ENV === 'production' ? 'short' : 'debug',
    }),
    react({
      include: "**/*.{jsx,tsx}",
    }),
    tsconfig({
      projects: ['./tsconfig.dev.json']
    }),
  ],
  root: './',
  server: {
    port: 4444,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: process.platform === 'win32',
      ignored: [
        'node_modules',
        'dist',
        'dist_site',
        'build',
        'public',
        'package.json',
        'package-lock.json',
        'tsconfig.json',
        'vite.config.mts',
        'yarn.lock',
        'pnpm-lock.yaml',
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


