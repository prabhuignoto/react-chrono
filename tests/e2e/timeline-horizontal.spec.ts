import { test, expect } from '../fixtures/test-fixtures';
import { SELECTORS } from '../fixtures/selector-map';

test.describe('Chrono.Horizontal.Basic', () => {
  test.beforeEach(async ({ testHelpers }) => {
    await test.step('Navigate to horizontal timeline', async () => {
      await testHelpers.navigateAndWaitForTimeline('/horizontal');
    });
  });

  test('should display correct number of timeline items', async ({ page, testHelpers }) => {
    await test.step('Verify timeline items count', async () => {
      await testHelpers.assertElementCount('.timeline-horz-item-container', 10);
    });
  });

  test('should navigate through timeline items', async ({ testHelpers }) => {
    await test.step('Click next button', async () => {
      const nextButton = await testHelpers.getToolbarButton('next');
      await expect(nextButton).toBeVisible();
      await testHelpers.clickToolbarButton('next');
    });

    await test.step('Verify navigation occurred', async () => {
      const timelineItems = await testHelpers.getTimelineItems('horizontal');
      await expect(timelineItems.first()).toBeVisible();
    });

    await test.step('Click previous button', async () => {
      const prevButton = await testHelpers.getToolbarButton('previous');
      if (await prevButton.isVisible()) {
        await testHelpers.clickToolbarButton('previous');
      }
    });
  });

  test('should display card content on item click', async ({ testHelpers, page }) => {
    await test.step('Click on timeline item', async () => {
      await testHelpers.clickTimelinePoint(2);
    });

    await test.step('Verify card content exists', async () => {
      const cardContent = page.locator(SELECTORS.CARD_CONTENT);
      if (await cardContent.count() > 0) {
        await expect(cardContent.first()).toBeVisible();
      }
    });
  });

  test('should handle keyboard navigation', async ({ testHelpers }) => {
    await test.step('Focus on timeline', async () => {
      await testHelpers.focusTimeline();
    });

    await test.step('Navigate with arrow keys', async () => {
      await testHelpers.navigateWithKeyboard('ArrowRight');
      await testHelpers.navigateWithKeyboard('ArrowLeft');
      await testHelpers.navigateWithKeyboard('Home');
    });
  });

  test('should handle responsive behavior', async ({ page, testHelpers }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' },
    ];

    for (const viewport of viewports) {
      await test.step(`Test on ${viewport.name} viewport`, async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        // Verify timeline is still functional
        const timelineItems = await testHelpers.getTimelineItems('horizontal');
        await expect(timelineItems.first()).toBeVisible();
        const count = await timelineItems.count();
        expect(count).toBeGreaterThan(0);

        // Take screenshot for visual regression
        await testHelpers.takeScreenshot(`horizontal-timeline-${viewport.name}`);
      });
    }
  });

  test('should handle timeline controls', async ({ testHelpers, page }) => {
    await test.step('Test available controls', async () => {
      // Check for play button
      const playButton = await testHelpers.getToolbarButton('play');
      if (await playButton.count() > 0 && await playButton.isVisible()) {
        await testHelpers.clickToolbarButton('play');

        // Look for pause button
        const pauseButton = await testHelpers.getToolbarButton('pause');
        if (await pauseButton.count() > 0 && await pauseButton.isVisible()) {
          await testHelpers.clickToolbarButton('pause');
        }
      }

      // Check for other controls
      const fullscreenButton = page.locator('[aria-label*="fullscreen"], [data-testid*="fullscreen"]').first();
      if (await fullscreenButton.isVisible()) {
        await fullscreenButton.click();
      }
    });
  });

  test('should display timeline with media content', async ({ page, testHelpers }) => {
    await test.step('Navigate to horizontal timeline with media', async () => {
      await testHelpers.navigateAndWaitForTimeline('/horizontal-all');
    });

    await test.step('Verify media content', async () => {
      // Look for media elements
      const mediaElements = page.locator('img, video, iframe');
      const count = await mediaElements.count();

      if (count > 0) {
        await expect(mediaElements.first()).toBeVisible();
      }
    });

    await test.step('Test slideshow functionality', async () => {
      const playButton = await testHelpers.getToolbarButton('play');
      if (await playButton.count() > 0 && await playButton.isVisible()) {
        await testHelpers.clickToolbarButton('play');

        const pauseButton = await testHelpers.getToolbarButton('pause');
        if (await pauseButton.count() > 0 && await pauseButton.isVisible()) {
          await testHelpers.clickToolbarButton('pause');
        }
      }
    });

    await test.step('Test theme toggle if available', async () => {
      const themeToggle = page.locator(SELECTORS.DARK_MODE_TOGGLE);
      if (await themeToggle.count() > 0 && await themeToggle.first().isVisible()) {
        await themeToggle.first().click();
      }
    });
  });

  test('should trace user interactions', async ({ page, testHelpers }) => {
    // Start tracing manually for specific test
    await page.context().tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });

    try {
      await test.step('Perform complex interaction sequence', async () => {
        // Click through multiple items
        for (let i = 0; i < 5; i++) {
          await testHelpers.clickToolbarButton('next');
        }

        // Interact with card content
        const cardContent = page.locator(SELECTORS.CARD_CONTENT);
        if (await cardContent.count() > 0) {
          await cardContent.first().click();
        }

        // Use keyboard navigation
        await page.keyboard.press('Escape');
      });
    } finally {
      // Save trace
      await page.context().tracing.stop({
        path: 'test-results/trace-horizontal-timeline.zip'
      });
    }
  });
});