/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import tsconfig from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfig()],
  test: {
    coverage: {
      clean: true,
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'lcov', 'clover', 'cobertura'],
      reportsDirectory: './coverage',
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
