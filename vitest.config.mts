/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfig from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vanillaExtractPlugin({
      identifiers: 'debug',
      // Fix for Vitest transformResult bug with Vanilla Extract
      emitCssInSsr: true,
    }),
    react(),
    tsconfig()
  ],
  test: {
    coverage: {
      clean: true,
      enabled: !!process.env.CI,
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
      './src/**/*.test.{tsx,ts}',
      './src/components/**/*.test.{tsx,ts}',
      './src/utils/**/*.test.{tsx,ts}',
      './src/hooks/**/*.test.{tsx,ts}',
      './tests/integration/**/*.test.{tsx,ts}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      // Exclude integration tests that require build/setup
      // These should be run separately with their specific test commands
      './tests/integration/demo-app.e2e.test.ts', // Run with: pnpm test:e2e
      './tests/integration/build-output.test.ts', // Run with: pnpm build && pnpm test tests/integration/build-output.test.ts
    ],
    minWorkers: 2,
    setupFiles: './src/test-setup.js',
    silent: false,
    update: true,
    // Use threads pool to avoid Vanilla Extract transform issues
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        isolate: true,
      },
    },
  },
});
