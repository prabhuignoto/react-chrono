import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import { resolve } from 'path';

const execAsync = promisify(exec);
const DEMO_APP_DIR = resolve(__dirname, './demo-app');
const DEMO_APP_URL = 'http://localhost:5174';

test.describe('Demo App Integration Test', () => {
  test.beforeAll(async () => {
    // Build the library first
    console.log('Building react-chrono library...');
    await execAsync('pnpm build', {
      cwd: resolve(__dirname, '../../'),
    });

    // Install dependencies in demo app
    console.log('Installing demo app dependencies...');
    await execAsync('pnpm install --no-frozen-lockfile', {
      cwd: DEMO_APP_DIR,
    });
  });

  test('should import and render Chrono component from built package', async ({
    page,
  }) => {
    // Start the demo app dev server in the background
    const devServer = exec('pnpm dev', { cwd: DEMO_APP_DIR });

    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      // Navigate to the demo app
      await page.goto(DEMO_APP_URL, { waitUntil: 'networkidle' });

      // Check that the page title is correct
      await expect(page).toHaveTitle(/React Chrono/);

      // Check that the timeline component is rendered
      const timeline = page.locator('[data-testid="timeline-component"]');
      await expect(timeline).toBeVisible();

      // Check that timeline items are rendered
      const timelineItems = page.locator('.vertical-item-row, .timeline-item');
      await expect(timelineItems.first()).toBeVisible({ timeout: 10000 });

      // Check that the first card title is visible
      const firstCardTitle = page.getByText('First Event');
      await expect(firstCardTitle).toBeVisible();

      // Verify no console errors occurred
      const consoleLogs: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleLogs.push(msg.text());
        }
      });

      await page.waitForTimeout(2000);

      // Filter out known acceptable errors (like network errors in test environment)
      const criticalErrors = consoleLogs.filter(
        (log) =>
          !log.includes('favicon') && // Ignore favicon errors
          !log.includes('net::ERR') && // Ignore network errors
          !log.includes('Failed to load resource') // Ignore resource loading errors
      );

      expect(criticalErrors).toHaveLength(0);
    } finally {
      // Kill the dev server
      devServer.kill();
    }
  });

  test('should have valid TypeScript types from built package', async () => {
    // Run TypeScript check on the demo app
    const { stdout, stderr } = await execAsync('npx tsc --noEmit', {
      cwd: DEMO_APP_DIR,
    });

    // TypeScript should not report any errors
    expect(stderr).not.toContain('error TS');
    expect(stdout).not.toContain('error TS');
  });

  test('should build demo app successfully', async () => {
    // Build the demo app
    const { stdout, stderr } = await execAsync('pnpm build', {
      cwd: DEMO_APP_DIR,
    });

    // Build should succeed without errors
    expect(stderr).not.toContain('error');
    expect(stderr).not.toContain('Error');

    // Check that dist directory was created
    const { stdout: lsOutput } = await execAsync('ls dist', {
      cwd: DEMO_APP_DIR,
    });

    expect(lsOutput).toContain('index.html');
  });
});
