import { defineConfig, devices } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
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
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-ct-report', open: 'never' }],
    ['json', { outputFile: 'test-results/ct-results.json' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

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