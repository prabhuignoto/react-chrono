/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      cleanOnRerun: true,
      enabled: true,
      exclude: ['./src/components/**/*.test.tsx'],
      excludeNodeModules: true,
      include: ['./src/components/**/*.tsx'],
      provider: 'c8',
      reporter: ['text', 'html', 'lcov', 'json'],
    },
    environment: 'jsdom',
    globals: true,
    include: ['./src/components/**/*.test.tsx'],
    maxThreads: 12,
    minThreads: 5,
    setupFiles: './src/test-setup.js',
    silent: true,
    threads: true,
    update: true,
  },
});
