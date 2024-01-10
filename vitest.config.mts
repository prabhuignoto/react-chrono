/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import tsconfig from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfig()],
  test: {
    coverage: {
      // clean: true,
      enabled: true,
      provider: 'v8',
      reporter: ['lcov', 'clover', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/*.d.ts',
        'src/components/index.tsx',
        'src/components/GlobalContext.tsx',
        'src/react-chrono.ts',
        'src/index.tsx',
        'src/demo/**',
        'src/examples/**',
        'src/models/**',
        'src/components/icons/**',
        '**/*.config.js',
        'eslintrc.js',
      ],
    },
    environment: 'jsdom',
    globals: true,
    include: [
      './src/components/**/*.test.{tsx,ts}',
      './src/utils/**/*.test.{tsx,ts}',
    ],
    minWorkers: 2,
    setupFiles: './src/test-setup.js',
    silent: true,
    update: true,
  },
});
