import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const postcssConfig = require('../style/postcss.config.js');

const SERVER_IGNORED_FILES = [
  'node_modules',
  'dist',
  'dist_site',
  'build',
  'public',
  'package.json',
  'package-lock.json',
  'bun.lock',
  'tsconfig.json',
  'vite.config.mts',
  'vite.site.config.mts',
  'config/build/vite.config.mts',
  'config/build/vite.site.config.mts',
  'yarn.lock',
];

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const reactPlugin = react({
    include: '**/*.{jsx,tsx}',
    babel: {
      plugins: isProduction ? ['babel-plugin-jsx-remove-data-test-id'] : [],
    },
  });

  return {
    build: {
      outDir: 'dist_site',
      sourcemap: true,
      esbuild: {
        drop: ['console', 'debugger'],
      },
    },
    css: {
      devSourcemap: true,
      postcss: postcssConfig,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime'],
      exclude: ['@vanilla-extract/css', '@vanilla-extract/dynamic'],
    },
    plugins: [
      vanillaExtractPlugin({
        identifiers: isProduction ? 'short' : 'debug',
      }),
      reactPlugin,
      tsconfigPaths({
        projects: ['./tsconfig.dev.json'],
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
        ignored: SERVER_IGNORED_FILES,
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
  };
});
