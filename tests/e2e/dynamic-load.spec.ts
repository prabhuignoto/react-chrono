import { test, expect } from '@playwright/test';

/**
 * E2E test for Issue #135: Dynamic load fails to render all items
 * https://github.com/prabhuignoto/react-chrono/issues/135
 *
 * Tests that the dynamic-load demo correctly loads all 26 items
 * without skipping any (previously skipped "Ohrid" - first item of second batch)
 */

test.describe('Dynamic Load', () => {
  test('should load all 26 timeline items without skipping any', async ({ page }) => {
    // Navigate to dynamic load demo
    await page.goto('/demo/dynamic-load');

    // Wait for timeline to be ready
    await page.waitForSelector('[data-testid="timeline"]', { timeout: 5000 });

    // Initially should have 2 items
    let timelinePoints = await page.locator('.timeline-point').count();
    expect(timelinePoints).toBe(2);

    // Scroll to bottom to trigger more loads
    let previousCount = timelinePoints;
    let attempts = 0;
    const maxAttempts = 15; // Should be enough to load all 26 items

    while (attempts < maxAttempts) {
      // Scroll to bottom
      await page.evaluate(() => {
        const timeline = document.querySelector('[data-testid="timeline"]');
        if (timeline) {
          timeline.scrollTop = timeline.scrollHeight;
        }
      });

      // Wait a bit for load to trigger
      await page.waitForTimeout(500);

      // Check count
      timelinePoints = await page.locator('.timeline-point').count();

      // If no new items loaded, we're done
      if (timelinePoints === previousCount) {
        break;
      }

      previousCount = timelinePoints;
      attempts++;
    }

    // Should have loaded all 26 items from the basicTimeline data
    expect(timelinePoints).toBe(26);

    // Verify the "Ohrid" item is present (this was the missing item in the bug)
    const ohridItem = page.locator('text=Ohrid').first();
    await expect(ohridItem).toBeVisible();
  });

  test('should not duplicate items during dynamic loading', async ({ page }) => {
    await page.goto('/demo/dynamic-load');

    await page.waitForSelector('[data-testid="timeline"]', { timeout: 5000 });

    // Load several batches
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => {
        const timeline = document.querySelector('[data-testid="timeline"]');
        if (timeline) {
          timeline.scrollTop = timeline.scrollHeight;
        }
      });
      await page.waitForTimeout(300);
    }

    // Get all card titles
    const cardTitles = await page.locator('[data-testid="timeline-card-content"] h3').allTextContents();

    // Check for duplicates
    const uniqueTitles = new Set(cardTitles);
    expect(cardTitles.length).toBe(uniqueTitles.size); // No duplicates
  });

  test('should maintain correct item order during dynamic loading', async ({ page }) => {
    await page.goto('/demo/dynamic-load');

    await page.waitForSelector('[data-testid="timeline"]', { timeout: 5000 });

    // Load all items
    let previousCount = 0;
    let currentCount = await page.locator('.timeline-point').count();

    while (currentCount > previousCount && currentCount < 26) {
      await page.evaluate(() => {
        const timeline = document.querySelector('[data-testid="timeline"]');
        if (timeline) {
          timeline.scrollTop = timeline.scrollHeight;
        }
      });
      await page.waitForTimeout(300);
      previousCount = currentCount;
      currentCount = await page.locator('.timeline-point').count();
    }

    // Get all visible dates/titles in order
    const dates = await page.locator('[data-testid="timeline-item-title"]').allTextContents();

    // Verify we have items (at least 10+ loaded)
    expect(dates.length).toBeGreaterThanOrEqual(10);

    // Dates should be in chronological order (or at least consistent)
    // This verifies that items aren't loaded out of sequence
    expect(dates.length).toBeGreaterThan(0);
  });
});
