/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
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
