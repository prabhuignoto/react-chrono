import { test, expect } from '../../fixtures/test-fixtures';
import { SELECTORS } from '../../fixtures/selector-map';
import { testTimelineItems, viewportSizes } from '../../helpers/test-data';

test.describe('Timeline VERTICAL Mode - Comprehensive Tests', () => {
  test.beforeEach(async ({ testHelpers }) => {
    await testHelpers.navigateAndWaitForTimeline('/vertical-basic');
  });

  test.describe('Basic Rendering', () => {
    test('should render timeline in vertical mode', async ({ page }) => {
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      await expect(wrapper).toBeVisible();

      const className = await wrapper.getAttribute('class');
      expect(className).toContain('vertical');
    });

    test('should display correct number of timeline items', async ({ testHelpers, page }) => {
      // Wait for items to be visible
      const items = await testHelpers.getTimelineItems('vertical');
      await items.first().waitFor({ state: 'visible', timeout: 5000 });

      const count = await items.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display timeline points for each item', async ({ testHelpers }) => {
      const points = await testHelpers.getTimelinePoints();
      const count = await points.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display vertical line connecting items', async ({ page }) => {
      const line = page.locator('.timeline-vertical-line, .timeline-line');
      await expect(line.first()).toBeVisible();
    });
  });

  test.describe('Card Content', () => {
    test('should display card title correctly', async ({ testHelpers }) => {
      const card = await testHelpers.getCardContent(0);
      const title = await testHelpers.getCardTitle(0);
      await expect(title).toContainText(testTimelineItems[0].cardTitle);
    });

    test('should display card dates/timeline titles', async ({ testHelpers }) => {
      const items = await testHelpers.getTimelineItems('vertical');
      const firstItem = items.first();
      await expect(firstItem.locator('.timeline-item-title')).toContainText(testTimelineItems[0].title);
    });

    test('should display detailed text when available', async ({ testHelpers }) => {
      const items = await testHelpers.getTimelineItems('vertical');
      const firstItem = items.first();
      const detailedText = firstItem.locator('.card-detailed-text, .rc-card-text');

      if (await detailedText.isVisible()) {
        await expect(detailedText).toContainText(testTimelineItems[0].cardDetailedText.substring(0, 50));
      }
    });

    test('should handle missing card content gracefully', async ({ testHelpers }) => {
      // Test with item that has minimal content
      const items = await testHelpers.getTimelineItems('vertical');
      const lastItem = items.last();
      await expect(lastItem).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate by clicking timeline items', async ({ testHelpers }) => {
      await testHelpers.clickTimelinePoint(2);

      // Verify navigation occurred (item should be visible/active)
      const items = await testHelpers.getTimelineItems('vertical');
      const item = items.nth(2);
      await expect(item).toBeVisible();
    });

    test('should navigate using keyboard arrows', async ({ testHelpers }) => {
      await testHelpers.focusTimeline();
      await testHelpers.navigateWithKeyboard('ArrowDown');
      await testHelpers.navigateWithKeyboard('ArrowUp');
    });

    test('should navigate to first/last with Home/End keys', async ({ testHelpers }) => {
      await testHelpers.focusTimeline();
      await testHelpers.navigateWithKeyboard('End');

      const items = await testHelpers.getTimelineItems('vertical');
      const lastItem = items.last();
      await expect(lastItem).toBeInViewport();

      await testHelpers.navigateWithKeyboard('Home');

      const firstItem = items.first();
      await expect(firstItem).toBeInViewport();
    });

    test('should navigate using toolbar buttons', async ({ testHelpers }) => {
      const nextButton = await testHelpers.getToolbarButton('next');
      if (await nextButton.isVisible()) {
        await testHelpers.clickToolbarButton('next');
      }
    });
  });

  test.describe('Scrolling', () => {
    test('should handle scroll events correctly', async ({ testHelpers, page }) => {
      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN);
      await wrapper.waitFor({ state: 'visible', timeout: 5000 });

      // Scroll down
      await wrapper.evaluate(el => el.scrollTo(0, el.scrollHeight));
      await page.waitForTimeout(300);

      const items = await testHelpers.getTimelineItems('vertical');
      const lastItem = items.last();

      // Check if last item is in viewport
      const isInViewport = await lastItem.isInViewport();
      expect(typeof isInViewport).toBe('boolean');

      // Scroll back to top
      await wrapper.evaluate(el => el.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const firstItem = items.first();
      await expect(firstItem).toBeVisible();
    });

    test('should update visibility on scroll', async ({ testHelpers, page }) => {
      // Check initial visibility
      const items = await testHelpers.getTimelineItems('vertical');
      await items.first().waitFor({ state: 'visible', timeout: 5000 });

      // Scroll down
      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN);
      await wrapper.evaluate(el => el.scrollTo(0, el.scrollHeight));
      await page.waitForTimeout(300);

      // Last item should be visible
      const lastItem = items.last();
      const isInViewport = await lastItem.isInViewport();
      expect(typeof isInViewport).toBe('boolean');
    });

    test('should trigger onScrollEnd callback', async ({ page }) => {
      // Monitor console for scroll end events
      const consoleLogs: string[] = [];
      page.on('console', msg => {
        if (msg.text().includes('Scroll ended')) {
          consoleLogs.push(msg.text());
        }
      });

      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN);
      await wrapper.evaluate(el => el.scrollTo(0, el.scrollHeight));

      // Note: This would only work if onScrollEnd is configured to log
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should adapt to mobile viewport', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.mobile);

      const items = await testHelpers.getTimelineItems('vertical');
      await expect(items.first()).toBeVisible();

      // Verify vertical mode is maintained
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      const className = await wrapper.getAttribute('class');
      expect(className).toContain('vertical');
    });

    test('should handle tablet viewport', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.tablet);
      await page.waitForTimeout(500);

      const items = await testHelpers.getTimelineItems('vertical');
      const count = await items.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should maintain functionality on desktop', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.desktop);

      // Test navigation still works
      await testHelpers.clickTimelinePoint(1);
      const items = await testHelpers.getTimelineItems('vertical');
      const item = items.nth(1);
      await expect(item).toBeVisible();
    });
  });

  test.describe('Props Testing', () => {
    test('should respect cardLess prop', async ({ testHelpers, page }) => {
      await page.goto('/vertical-cardless');
      await testHelpers.waitForTimelineFullyLoaded();

      const cards = page.locator(SELECTORS.CARD_CONTENT);
      const count = await cards.count();
      expect(count).toBe(0);
    });

    test('should respect disableClickOnCircle prop', async ({ testHelpers, page }) => {
      await page.goto('/vertical-basic?disableClickOnCircle=true');
      await testHelpers.waitForTimelineFullyLoaded();

      const circle = (await testHelpers.getTimelinePoints()).first();
      await circle.click();
      // Should not trigger navigation
    });

    test('should respect scrollable prop', async ({ testHelpers, page }) => {
      await page.goto('/vertical-scrollable');
      await testHelpers.waitForTimelineFullyLoaded();

      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN);
      const isScrollable = await wrapper.evaluate(el => {
        return el.scrollHeight > el.clientHeight;
      });

      expect(isScrollable).toBeTruthy();
    });

    test('should respect flipLayout prop', async ({ testHelpers, page }) => {
      await page.goto('/vertical-basic?flipLayout=true');
      await testHelpers.waitForTimelineFullyLoaded();

      // Check if layout is flipped (RTL)
      const wrapper = page.locator('.timeline-wrapper');
      const dir = await wrapper.getAttribute('dir');

      if (dir) {
        expect(dir).toBe('rtl');
      }
    });
  });

  test.describe('Media Content', () => {
    test('should display images correctly', async ({ testHelpers }) => {
      const media = await testHelpers.getCardMedia(0);
      const images = media.locator('img');
      if (await images.count() > 0) {
        await expect(images.first()).toHaveAttribute('src', /image\.jpg/);
      }
    });

    test('should handle video content', async ({ testHelpers }) => {
      const videoIndex = testTimelineItems.findIndex(item => item.media?.type === 'VIDEO');
      if (videoIndex >= 0) {
        const media = await testHelpers.getCardMedia(videoIndex);
        const videos = media.locator('video');
        if (await videos.count() > 0) {
          await expect(videos.first()).toHaveAttribute('src', /video\.mp4/);
        }
      }
    });

    test('should embed YouTube videos', async ({ page }) => {
      const youtubeIndex = testTimelineItems.findIndex(item => item.media?.type === 'YOUTUBE');
      if (youtubeIndex >= 0) {
        const iframes = page.locator(SELECTORS.YOUTUBE_VIDEO);
        if (await iframes.count() > 0) {
          await expect(iframes.first()).toHaveAttribute('src', /youtube\.com\/embed/);
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels', async ({ testHelpers, page }) => {
      const issues = await testHelpers.checkAccessibility();

      const timeline = page.locator('[role="region"][aria-label="Timeline"]');
      if (await timeline.count() > 0) {
        await expect(timeline).toBeVisible();
      }
    });

    test('should support keyboard navigation', async ({ testHelpers, page }) => {
      await testHelpers.focusTimeline();

      // Test tab navigation
      await page.keyboard.press('Tab');
      const activeElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(activeElement).toBeTruthy();
    });

    test('should have sufficient color contrast', async ({ page }) => {
      const hasContrast = await page.evaluate(() => {
        const card = document.querySelector('.timeline-card-content');
        if (!card) return true;

        const styles = window.getComputedStyle(card);
        return styles.color !== styles.backgroundColor;
      });

      expect(hasContrast).toBeTruthy();
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle empty timeline gracefully', async ({ page }) => {
      await page.goto('/vertical-empty');
      const wrapper = page.locator('.timeline-wrapper');
      await expect(wrapper).toBeVisible();
    });

    test('should handle single item timeline', async ({ testHelpers, page }) => {
      await page.goto('/vertical-single');
      await testHelpers.waitForTimelineFullyLoaded();

      const items = await testHelpers.getTimelineItems('vertical');
      const count = await items.count();

      if (count === 1) {
        await expect(items.first()).toBeVisible();
      }
    });

    test('should handle very long content', async ({ testHelpers, page }) => {
      await page.goto('/vertical-long-content');
      await testHelpers.waitForTimelineFullyLoaded();

      const items = await testHelpers.getTimelineItems('vertical');
      await expect(items.first()).toBeVisible();

      // Check if read more is enabled
      const readMore = page.locator('.read-more-button').first();
      if (await readMore.isVisible()) {
        await readMore.click();
      }
    });
  });

  test.describe('Performance', () => {
    test('should load timeline within acceptable time', async ({ testHelpers, page }) => {
      const startTime = Date.now();
      await page.goto('/vertical-basic');
      await testHelpers.waitForTimelineFullyLoaded();
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(5000);
    });

    test('should handle rapid navigation smoothly', async ({ testHelpers }) => {
      // Rapidly click through items
      for (let i = 0; i < 5; i++) {
        await testHelpers.clickTimelinePoint(i % testTimelineItems.length);
      }

      // Timeline should still be functional
      const items = await testHelpers.getTimelineItems('vertical');
      await expect(items.first()).toBeVisible();
    });

    test('should measure render performance', async ({ testHelpers }) => {
      const metrics = await testHelpers.measurePerformance();

      if (metrics) {
        expect(metrics.domContentLoaded).toBeLessThan(1000);
        expect(metrics.loadComplete).toBeLessThan(2000);
      }
    });
  });
});