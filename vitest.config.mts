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
      enabled: false,
      exclude: [
        // Type definitions and configuration files
        '**/*.d.ts',
        '**/*.config.{js,ts,mjs}',
        '**/tsconfig.json',
        '**/eslintrc.js',
        '**/eslint.config.*',
        '**/prettierrc',
        '**/postcss.config.js',
        '**/tailwind.config.js',
        '**/babel.config.js',
        '**/webpack.config.js',
        '**/rollup.config.*',
        '**/vite.config.*',
        '**/vitest.config.*',

        // Build and cache directories
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
        '**/cache/**',
        '**/test-build/**',
        '**/dist_site/**',

        // Documentation and assets
        '**/public/**',
        '**/readme-assets/**',
        '**/docs/**',

        // Test setup and configuration
        '**/test-setup.{js,ts}',
        '**/cypress/**',
        '**/test/**',

        // Source files that don't need coverage
        'src/components/index.tsx',
        'src/components/GlobalContext.tsx',
        'src/react-chrono.ts',
        'src/index.tsx',
        'src/demo/**',
        'src/examples/**',
        'src/models/**',
        'src/components/icons/**',
        'src/types/**',
        'src/styles/**',

        // Other common exclusions
        '**/.git/**',
        '**/.github/**',
        '**/.vscode/**',
        '**/.husky/**',
        '**/scripts/**',
      ],
      provider: 'v8',
      reporter: ['lcov', 'clover', 'html'],
      reportsDirectory: './coverage',
    },
    environment: 'jsdom',
    globals: true,
    include: [
      './src/components/**/*.test.{tsx,ts}',
      './src/utils/**/*.test.{tsx,ts}',
      './src/hooks/**/*.test.{tsx,ts}',
    ],
    minWorkers: 2,
    setupFiles: './src/test-setup.js',
    silent: false,
    update: true,
  },
});
