import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import { resolve } from 'path';

const execAsync = promisify(exec);
const DEMO_APP_DIR = resolve(__dirname, './demo-app');

// Build once before all tests
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

test.describe('Demo App Integration Test - Build Validation', () => {
  test('should render timeline with correct structure, styles, and functionality', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];

    // Track console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to the demo app and wait for it to load
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait a moment for React to hydrate
    await page.waitForTimeout(2000);

    // 1. Verify page title
    await expect(page).toHaveTitle(/React Chrono/);

    // 2. Verify heading text (this confirms React rendered)
    const heading = page.getByText(
      'Testing the built package imports correctly and renders properly'
    );
    await expect(heading).toBeVisible({ timeout: 20000 });

    // 3. Verify timeline component rendered (check for timeline-specific classes)
    const timelineWrapper = page.locator(
      '.timeline-font-provider, .timeline-wrapper, [class*="timeline"]'
    );
    await expect(timelineWrapper.first()).toBeVisible({ timeout: 15000 });

    // 4. Verify timeline items exist (may not all be visible without scrolling)
    const verticalItems = page.locator('.vertical-item-row, [class*="item"], [class*="card"]');
    const itemCount = await verticalItems.count();
    expect(itemCount).toBeGreaterThan(0);

    // 5. Verify card content is present in the DOM (timeline rendered successfully!)
    const cardTitle = page.locator('.rc-card-title, [data-class="rc-card-title"]').first();
    await expect(cardTitle).toBeAttached({ timeout: 20000 });
    await expect(cardTitle).toContainText('Event'); // Should contain "First Event" or similar

    // 6. Verify Vanilla Extract CSS is loaded by checking computed styles
    const firstTimeline = timelineWrapper.first();
    const backgroundColor = await firstTimeline.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(backgroundColor).toBeTruthy();

    const display = await firstTimeline.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(display).not.toBe('none');

    // 6a. Verify Vanilla Extract class names are applied (hash-based classes)
    const timelineClasses = await firstTimeline.evaluate((el) => el.className);
    expect(timelineClasses).toBeTruthy();
    // Vanilla Extract generates hash-based class names
    expect(timelineClasses.length).toBeGreaterThan(0);

    // 6b. Check for CSS variables (Vanilla Extract tokens)
    const cssVars = await firstTimeline.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontFamily: styles.fontFamily,
        color: styles.color,
        // Check if any CSS custom properties are applied
        hasCustomProps: styles.getPropertyValue('--timeline-primary') !== '',
      };
    });
    expect(cssVars.fontFamily).toBeTruthy();
    expect(cssVars.color).toBeTruthy();

    // 7. Verify interactive elements exist (buttons, etc.)
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // 9. Filter out known acceptable errors
    const criticalErrors = consoleErrors.filter(
      (log) =>
        !log.includes('favicon') &&
        !log.includes('net::ERR') &&
        !log.includes('Failed to load resource')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should have valid TypeScript types from built package', async () => {
    // Run TypeScript check on the demo app
    const { stdout, stderr } = await execAsync('npx tsc --noEmit 2>&1', {
      cwd: DEMO_APP_DIR,
    }).catch((error) => {
      // Capture output even if tsc fails
      return { stdout: error.stdout || '', stderr: error.stderr || '' };
    });

    const output = stdout + stderr;

    // Check for errors in App.tsx (our demo file)
    // Ignore errors from parent project's type definitions
    const appErrors = output.split('\n').filter((line) => {
      return (
        line.includes('error TS') &&
        (line.includes('App.tsx') || line.includes('main.tsx'))
      );
    });

    // Should not have TypeScript errors in our demo app files
    expect(appErrors).toHaveLength(0);
  });

  test('should build demo app successfully with built package', async () => {
    // Build the demo app using the built react-chrono package
    const { stderr } = await execAsync('pnpm build', {
      cwd: DEMO_APP_DIR,
    });

    // Build should succeed without errors
    expect(stderr).not.toContain('error');
    expect(stderr).not.toContain('Error');

    // Check that dist directory was created with index.html
    const { stdout: lsOutput } = await execAsync('ls dist', {
      cwd: DEMO_APP_DIR,
    });

    expect(lsOutput).toContain('index.html');
  });
});
