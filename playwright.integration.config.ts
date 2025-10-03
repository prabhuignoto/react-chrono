import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'path';

/**
 * Playwright configuration for integration tests
 * Tests the built library package in a demo React app
 */
export default defineConfig({
  testDir: './tests/integration',
  testMatch: '**/*.e2e.test.ts', // Only run E2E tests, not vitest tests
  /* Run tests in files in parallel */
  fullyParallel: false, // Sequential for integration tests to avoid port conflicts
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Single worker for integration tests */
  workers: 1,
  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report-integration', open: 'never' }],
    ['list'],
  ],
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5555',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on retry */
    video: 'retain-on-failure',

    /* Maximum time each action such as `click()` can take */
    actionTimeout: 10000,

    /* Navigation timeout */
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run the demo app dev server before starting the tests */
  webServer: {
    command: 'pnpm dev',
    cwd: resolve(__dirname, 'tests/integration/demo-app'),
    url: 'http://localhost:5555',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results-integration/',

  /* Maximum time one test can run for */
  timeout: 60 * 1000, // 60 seconds for integration tests

  /* Maximum time the whole test suite can run */
  globalTimeout: 10 * 60 * 1000, // 10 minutes
});
