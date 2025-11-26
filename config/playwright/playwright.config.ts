import { defineConfig, devices } from '@playwright/test';

/**
 * Modern Playwright E2E Configuration
 * - Cross-browser testing (Chromium, Firefox, WebKit)
 * - Optimized for CI/CD with parallel execution
 * - Enhanced error reporting with traces and videos
 * - Web-first assertions with smart auto-waiting
 *
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',

  /* Match only .spec.ts files (exclude .test.ts for Vitest) */
  testMatch: '**/*.spec.ts',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only - helps with flaky tests */
  retries: process.env.CI ? 2 : 0,

  /* Optimize parallel execution - 50% locally, 2 workers on CI for stability */
  workers: process.env.CI ? 2 : '80%',

  /* Reporter to use - enhanced for CI with blob reporter */
  reporter: process.env.CI
    ? [
        ['blob', { outputDir: 'blob-report' }], // For CI artifacts
        ['github'], // GitHub Actions annotations
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/results.xml' }],
      ]
    : [
        ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
        ['list'],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4444',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on retry */
    video: 'retain-on-failure',

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10000,

    /* Navigation timeout */
    navigationTimeout: 30000,

    /* Web-first assertions timeout - modern Playwright best practice */
    // This ensures expect() assertions have proper timeout
  },

  /* Configure expect() for web-first assertions */
  expect: {
    /* Maximum time expect() should wait for the condition to be met. */
    timeout: 10000,
  },

  /* Configure projects for major browsers - Cross-browser testing enabled */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // Optional: Uncomment for additional browser coverage
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // Mobile testing (uncomment if needed)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 7'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 14'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:4444',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    /* Better health check - wait for server to respond properly */
    retries: 3,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  /* Maximum time the whole test suite can run */
  globalTimeout: 60 * 60 * 1000, // 1 hour

  /* Global setup and teardown (uncomment if needed) */
  // globalSetup: require.resolve('./tests/global-setup'),
  // globalTeardown: require.resolve('./tests/global-teardown'),
});