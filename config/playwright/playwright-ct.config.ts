import { defineConfig, devices } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

/**
 * Modern Playwright Component Test Configuration
 * - Tests individual React components in isolation
 * - Cross-browser component testing (Chromium, Firefox, WebKit)
 * - Uses Vite for fast component mounting
 * - Supports Vanilla Extract CSS
 *
 * See https://playwright.dev/docs/test-components
 */
export default defineConfig({
  testDir: './tests/components',

  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',

  /* Maximum time one test can run for. */
  timeout: 10 * 1000,

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI for stability */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use - enhanced for CI */
  reporter: process.env.CI
    ? [
        ['blob', { outputDir: 'blob-report-ct' }],
        ['github'],
        ['html', { outputFolder: 'playwright-ct-report', open: 'never' }],
        ['json', { outputFile: 'test-results/ct-results.json' }],
      ]
    : [
        ['html', { outputFolder: 'playwright-ct-report', open: 'on-failure' }],
        ['list'],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,

    /* Vite config for component testing */
    ctViteConfig: {
      plugins: [vanillaExtractPlugin({ identifiers: 'debug' }), react()],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
          'components': resolve(__dirname, './src/components'),
          'hooks': resolve(__dirname, './src/hooks'),
          'utils': resolve(__dirname, './src/utils'),
          'models': resolve(__dirname, './src/models'),
        },
      },
    },
  },

  /* Configure expect() for web-first assertions */
  expect: {
    /* Maximum time expect() should wait for the condition to be met. */
    timeout: 10000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});