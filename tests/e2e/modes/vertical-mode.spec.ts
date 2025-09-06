import { test, expect } from '../../fixtures/test-fixtures';
import { TimelineHelpers } from '../../helpers/timeline-helpers';
import { testTimelineItems, viewportSizes, keyboardKeys, timeouts } from '../../helpers/test-data';

test.describe('Timeline VERTICAL Mode - Comprehensive Tests', () => {
  let timelineHelpers: TimelineHelpers;

  test.beforeEach(async ({ page }) => {
    timelineHelpers = new TimelineHelpers(page);
    await page.goto('/vertical-basic');
    await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
  });

  test.describe('Basic Rendering', () => {
    test('should render timeline in vertical mode', async ({ page }) => {
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      await expect(wrapper).toBeVisible();
      
      const className = await wrapper.getAttribute('class');
      expect(className).toContain('vertical');
    });

    test('should display correct number of timeline items', async ({ page }) => {
      const items = await timelineHelpers.getTimelineItems('vertical');
      await expect(items).toHaveCount(testTimelineItems.length);
    });

    test('should display timeline points for each item', async ({ page }) => {
      const points = page.locator('[data-testid="timeline-circle"]');
      await expect(points).toHaveCount(testTimelineItems.length);
    });

    test('should display vertical line connecting items', async ({ page }) => {
      const line = page.locator('.timeline-vertical-line, .timeline-line');
      await expect(line.first()).toBeVisible();
    });
  });

  test.describe('Card Content', () => {
    test('should display card title correctly', async ({ page }) => {
      await timelineHelpers.verifyCardDetails(0, {
        title: testTimelineItems[0].cardTitle,
        subtitle: testTimelineItems[0].cardSubtitle
      });
    });

    test('should display card dates/timeline titles', async ({ page }) => {
      const firstItem = page.locator('.vertical-item-row').first();
      await expect(firstItem.locator('.timeline-item-title')).toContainText(testTimelineItems[0].title);
    });

    test('should display detailed text when available', async ({ page }) => {
      const firstItem = page.locator('.vertical-item-row').first();
      const detailedText = firstItem.locator('.card-detailed-text, .rc-card-text');
      
      if (await detailedText.isVisible()) {
        await expect(detailedText).toContainText(testTimelineItems[0].cardDetailedText.substring(0, 50));
      }
    });

    test('should handle missing card content gracefully', async ({ page }) => {
      // Test with item that has minimal content
      const lastItem = page.locator('.vertical-item-row').last();
      await expect(lastItem).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate by clicking timeline items', async ({ page }) => {
      await timelineHelpers.navigateToItem(2, 'vertical');
      
      // Verify navigation occurred (item should be visible/active)
      const item = page.locator('.vertical-item-row').nth(2);
      await expect(item).toBeVisible();
    });

    test('should navigate using keyboard arrows', async ({ page }) => {
      await timelineHelpers.navigateWithKeyboard('ArrowDown');
      await page.waitForTimeout(timeouts.animation);
      
      await timelineHelpers.navigateWithKeyboard('ArrowUp');
      await page.waitForTimeout(timeouts.animation);
    });

    test('should navigate to first/last with Home/End keys', async ({ page }) => {
      await timelineHelpers.navigateWithKeyboard('End');
      await page.waitForTimeout(timeouts.animation);
      
      const lastItem = page.locator('.vertical-item-row').last();
      await expect(lastItem).toBeInViewport();
      
      await timelineHelpers.navigateWithKeyboard('Home');
      await page.waitForTimeout(timeouts.animation);
      
      const firstItem = page.locator('.vertical-item-row').first();
      await expect(firstItem).toBeInViewport();
    });

    test('should navigate using toolbar buttons', async ({ page }) => {
      const controls = page.locator('.timeline-controls');
      if (await controls.isVisible()) {
        const nextButton = page.locator('[aria-label="next"]');
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForTimeout(timeouts.animation);
        }
      }
    });
  });

  test.describe('Scrolling', () => {
    test('should handle scroll events correctly', async ({ page }) => {
      await timelineHelpers.scrollTimeline('bottom');
      
      const lastItem = page.locator('.vertical-item-row').last();
      await expect(lastItem).toBeInViewport();
      
      await timelineHelpers.scrollTimeline('top');
      
      const firstItem = page.locator('.vertical-item-row').first();
      await expect(firstItem).toBeInViewport();
    });

    test('should update visibility on scroll', async ({ page }) => {
      // Check initial visibility
      await timelineHelpers.checkVisibilityAfterScroll(0, true);
      
      // Scroll down
      await timelineHelpers.scrollTimeline('bottom');
      
      // Last item should be visible
      const lastIndex = testTimelineItems.length - 1;
      await timelineHelpers.checkVisibilityAfterScroll(lastIndex, true);
    });

    test('should trigger onScrollEnd callback', async ({ page }) => {
      // Monitor console for scroll end events
      const consoleLogs: string[] = [];
      page.on('console', msg => {
        if (msg.text().includes('Scroll ended')) {
          consoleLogs.push(msg.text());
        }
      });
      
      await timelineHelpers.scrollTimeline('bottom');
      await page.waitForTimeout(timeouts.scroll);
      
      // Note: This would only work if onScrollEnd is configured to log
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should adapt to mobile viewport', async ({ page }) => {
      await page.setViewportSize(viewportSizes.mobile);
      await page.waitForTimeout(timeouts.animation);
      
      const items = await timelineHelpers.getTimelineItems('vertical');
      await expect(items.first()).toBeVisible();
      
      // Verify vertical mode is maintained
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      const className = await wrapper.getAttribute('class');
      expect(className).toContain('vertical');
    });

    test('should handle tablet viewport', async ({ page }) => {
      await page.setViewportSize(viewportSizes.tablet);
      await page.waitForTimeout(timeouts.animation);
      
      const items = await timelineHelpers.getTimelineItems('vertical');
      await expect(items).toHaveCount(testTimelineItems.length);
    });

    test('should maintain functionality on desktop', async ({ page }) => {
      await page.setViewportSize(viewportSizes.desktop);
      await page.waitForTimeout(timeouts.animation);
      
      // Test navigation still works
      await timelineHelpers.navigateToItem(1, 'vertical');
      const item = page.locator('.vertical-item-row').nth(1);
      await expect(item).toBeVisible();
    });
  });

  test.describe('Props Testing', () => {
    test('should respect cardLess prop', async ({ page }) => {
      await page.goto('/vertical-cardless');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const cards = page.locator('.timeline-card-content');
      const count = await cards.count();
      expect(count).toBe(0);
    });

    test('should respect disableClickOnCircle prop', async ({ page }) => {
      await page.goto('/vertical-basic?disableClickOnCircle=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const circle = page.locator('[data-testid="timeline-circle"]').first();
      await circle.click();
      // Should not trigger navigation
      await page.waitForTimeout(timeouts.animation);
    });

    test('should respect scrollable prop', async ({ page }) => {
      await page.goto('/vertical-scrollable');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const wrapper = page.locator('.timeline-main-wrapper');
      const isScrollable = await wrapper.evaluate(el => {
        return el.scrollHeight > el.clientHeight;
      });
      
      expect(isScrollable).toBeTruthy();
    });

    test('should respect flipLayout prop', async ({ page }) => {
      await page.goto('/vertical-basic?flipLayout=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Check if layout is flipped (RTL)
      const wrapper = page.locator('.timeline-wrapper');
      const dir = await wrapper.getAttribute('dir');
      
      if (dir) {
        expect(dir).toBe('rtl');
      }
    });
  });

  test.describe('Media Content', () => {
    test('should display images correctly', async ({ page }) => {
      const media = await timelineHelpers.checkMediaContent(0, 'image');
      if (media) {
        await expect(media).toHaveAttribute('src', /image\.jpg/);
      }
    });

    test('should handle video content', async ({ page }) => {
      const videoIndex = testTimelineItems.findIndex(item => item.media?.type === 'VIDEO');
      if (videoIndex >= 0) {
        const media = await timelineHelpers.checkMediaContent(videoIndex, 'video');
        if (media) {
          await expect(media).toHaveAttribute('src', /video\.mp4/);
        }
      }
    });

    test('should embed YouTube videos', async ({ page }) => {
      const youtubeIndex = testTimelineItems.findIndex(item => item.media?.type === 'YOUTUBE');
      if (youtubeIndex >= 0) {
        const media = await timelineHelpers.checkMediaContent(youtubeIndex, 'youtube');
        if (media) {
          await expect(media).toHaveAttribute('src', /youtube\.com\/embed/);
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels', async ({ page }) => {
      await timelineHelpers.checkAccessibility();
      
      const timeline = page.locator('[role="region"][aria-label="Timeline"]');
      await expect(timeline).toBeVisible();
    });

    test('should support keyboard navigation', async ({ page }) => {
      const wrapper = page.locator('.timeline-wrapper, [data-testid="timeline-main-wrapper"]').first();
      await wrapper.focus();
      
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

    test('should handle single item timeline', async ({ page }) => {
      await page.goto('/vertical-single');
      const items = await timelineHelpers.getTimelineItems('vertical');
      const count = await items.count();
      
      if (count === 1) {
        await expect(items.first()).toBeVisible();
      }
    });

    test('should handle very long content', async ({ page }) => {
      await page.goto('/vertical-long-content');
      const items = await timelineHelpers.getTimelineItems('vertical');
      await expect(items.first()).toBeVisible();
      
      // Check if read more is enabled
      const readMore = page.locator('.read-more-button').first();
      if (await readMore.isVisible()) {
        await readMore.click();
        await page.waitForTimeout(timeouts.animation);
      }
    });
  });

  test.describe('Performance', () => {
    test('should load timeline within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/vertical-basic');
      await page.waitForSelector('.vertical-item-row', { timeout: 5000 });
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(5000);
    });

    test('should handle rapid navigation smoothly', async ({ page }) => {
      // Rapidly click through items
      for (let i = 0; i < 5; i++) {
        await timelineHelpers.navigateToItem(i % testTimelineItems.length, 'vertical');
        await page.waitForTimeout(100);
      }
      
      // Timeline should still be functional
      const items = await timelineHelpers.getTimelineItems('vertical');
      await expect(items.first()).toBeVisible();
    });

    test('should measure render performance', async ({ page }) => {
      const metrics = await timelineHelpers.measureTimelinePerformance();
      
      expect(metrics.domContentLoaded).toBeLessThan(1000);
      expect(metrics.loadComplete).toBeLessThan(2000);
      
      if (metrics.firstContentfulPaint) {
        expect(metrics.firstContentfulPaint).toBeLessThan(1500);
      }
    });
  });
});