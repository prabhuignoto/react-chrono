import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'path';

/**
 * Modern Playwright Integration Test Configuration
 * - Tests the built library package in a real React app
 * - Validates build artifacts work correctly
 * - Ensures package can be consumed by external apps
 * - Cross-browser validation of built package
 *
 * These tests:
 * 1. Build the library (dist/)
 * 2. Install built package in demo app via file: protocol
 * 3. Launch demo app in real browser
 * 4. Validate timeline renders and functions correctly
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

  /* Single worker for integration tests to avoid port conflicts */
  workers: 1,

  /* Reporter to use - enhanced for CI */
  reporter: process.env.CI
    ? [
        ['blob', { outputDir: 'blob-report-integration' }],
        ['github'],
        ['html', { outputFolder: 'playwright-report-integration', open: 'never' }],
        ['junit', { outputFile: 'test-results-integration/results.xml' }],
      ]
    : [
        ['html', { outputFolder: 'playwright-report-integration', open: 'on-failure' }],
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

  /* Configure expect() for web-first assertions */
  expect: {
    /* Maximum time expect() should wait for the condition to be met. */
    timeout: 10000,
  },

  /* Configure projects for major browsers - Cross-browser validation of built package */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // WebKit can be flaky in integration tests, enable if needed
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Run the demo app dev server before starting the tests */
  webServer: {
    command: 'pnpm dev',
    cwd: resolve(__dirname, 'tests/integration/demo-app'),
    url: 'http://localhost:5555',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    /* Better health check and logging */
    retries: 3,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results-integration/',

  /* Maximum time one test can run for */
  timeout: 60 * 1000, // 60 seconds for integration tests (longer than E2E)

  /* Maximum time the whole test suite can run */
  globalTimeout: 10 * 60 * 1000, // 10 minutes
});
