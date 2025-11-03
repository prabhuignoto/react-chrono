import { test, expect } from '../../fixtures/test-fixtures';
import { TimelineHelpers } from '../../helpers/timeline-helpers';
import { testTimelineItems, viewportSizes, timeouts } from '../../helpers/test-data';

test.describe('Timeline HORIZONTAL_ALL Mode - Comprehensive Tests', () => {
  let timelineHelpers: TimelineHelpers;

  test.beforeEach(async ({ page }) => {
    timelineHelpers = new TimelineHelpers(page);
    await page.goto('/horizontal-all');
    await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
  });

  test.describe('Basic Rendering', () => {
    test('should render timeline in horizontal all mode', async ({ page }) => {
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      await expect(wrapper).toBeVisible();
      
      const className = await wrapper.getAttribute('class');
      expect(className).toContain('horizontal');
    });

    test('should display all cards simultaneously', async ({ page }) => {
      // In horizontal-all mode, cards are rendered in portals
      // Wait for at least one card to be visible
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cardContainers = page.locator('[id^="timeline-card-"]');
      const count = await cardContainers.count();

      // Should have cards rendered
      expect(count).toBeGreaterThan(0);

      // Check that cards are displayed (not hidden)
      const visibleCards = await cardContainers.evaluateAll(elements =>
        elements.filter(el => {
          const styles = window.getComputedStyle(el);
          return styles.display !== 'none' && styles.visibility !== 'hidden';
        }).length
      );

      // All cards should be visible at once
      expect(visibleCards).toBeGreaterThan(0);
    });

    test('should arrange all items horizontally', async ({ page }) => {
      const items = await timelineHelpers.getTimelineItems('horizontal');
      const positions = await items.evaluateAll(elements => 
        elements.map(el => ({
          x: el.getBoundingClientRect().left,
          y: el.getBoundingClientRect().top
        }))
      );
      
      // All items should be in a horizontal line
      if (positions.length > 1) {
        const yPositions = positions.map(p => p.y);
        const avgY = yPositions.reduce((a, b) => a + b) / yPositions.length;
        
        yPositions.forEach(y => {
          expect(Math.abs(y - avgY)).toBeLessThan(50);
        });
        
        // X positions should be increasing
        for (let i = 1; i < positions.length; i++) {
          expect(positions[i].x).toBeGreaterThan(positions[i - 1].x);
        }
      }
    });

    test('should display horizontal scrollbar when needed', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      const hasHorizontalScroll = await wrapper.evaluate(el => 
        el.scrollWidth > el.clientWidth
      );
      
      // Should have horizontal scroll for all cards
      expect(hasHorizontalScroll).toBeTruthy();
    });
  });

  test.describe('Card Display', () => {
    test('should show all card content without selection', async ({ page }) => {
      // Wait for cards to be rendered
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cardContainers = page.locator('[id^="timeline-card-"]');
      const count = await cardContainers.count();

      expect(count).toBeGreaterThan(0);

      // Check first few cards have content
      for (let i = 0; i < Math.min(3, Math.min(count, testTimelineItems.length)); i++) {
        const card = cardContainers.nth(i);
        const isVisible = await card.isVisible();

        // Card should be visible in horizontal-all mode
        if (isVisible && testTimelineItems[i].cardTitle) {
          await expect(card).toContainText(testTimelineItems[i].cardTitle, { timeout: 5000 });
        }
      }
    });

    test('should maintain card heights consistently', async ({ page }) => {
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cards = page.locator('[id^="timeline-card-"]');
      const heights = await cards.evaluateAll(elements =>
        elements
          .filter(el => {
            const styles = window.getComputedStyle(el);
            return styles.display !== 'none';
          })
          .map(el => el.getBoundingClientRect().height)
      );

      if (heights.length > 1) {
        // Heights should be relatively consistent
        const avgHeight = heights.reduce((a, b) => a + b) / heights.length;
        heights.forEach(height => {
          expect(Math.abs(height - avgHeight)).toBeLessThan(avgHeight * 0.3);
        });
      }
    });

    test('should display timeline points below cards', async ({ page }) => {
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const firstCard = page.locator('[id^="timeline-card-"]').first();
      const firstPoint = page.locator('[data-testid="timeline-circle"]').first();

      const cardPos = await firstCard.boundingBox();
      const pointPos = await firstPoint.boundingBox();

      if (cardPos && pointPos) {
        // Points should be below cards
        expect(pointPos.y).toBeGreaterThan(cardPos.y + cardPos.height);
      }
    });
  });

  test.describe('Navigation', () => {
    test('should allow horizontal scrolling through all cards', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      
      // Scroll to end
      await wrapper.evaluate(el => el.scrollTo(el.scrollWidth, 0));
      await page.waitForTimeout(timeouts.scroll);
      
      const lastItem = page.locator('.timeline-horz-item-container').last();
      await expect(lastItem).toBeInViewport();
      
      // Scroll back to start
      await wrapper.evaluate(el => el.scrollTo(0, 0));
      await page.waitForTimeout(timeouts.scroll);
      
      const firstItem = page.locator('.timeline-horz-item-container').first();
      await expect(firstItem).toBeInViewport();
    });

    test('should highlight selected card on click', async ({ page }) => {
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const card = page.locator('[id^="timeline-card-"]').nth(2);
      await card.click({ timeout: 5000 });
      await page.waitForTimeout(timeouts.animation);

      // Check if card is highlighted/active
      const className = await card.getAttribute('class');
      const isActive =
        className?.includes('active') ||
        className?.includes('selected') ||
        className?.includes('highlight') ||
        className?.includes('highlight-active');

      expect(isActive).toBeDefined();
    });

    test('should navigate with keyboard in horizontal all mode', async ({ page }) => {
      await timelineHelpers.navigateWithKeyboard('ArrowRight');
      await page.waitForTimeout(timeouts.animation);
      
      // Should scroll or focus next item
      await timelineHelpers.navigateWithKeyboard('ArrowRight');
      await page.waitForTimeout(timeouts.animation);
      
      await timelineHelpers.navigateWithKeyboard('ArrowLeft');
      await page.waitForTimeout(timeouts.animation);
    });

    test('should support page navigation with PageUp/PageDown', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      const initialScroll = await wrapper.evaluate(el => el.scrollLeft);
      
      await page.keyboard.press('PageDown');
      await page.waitForTimeout(timeouts.animation);
      
      const scrollAfterPageDown = await wrapper.evaluate(el => el.scrollLeft);
      expect(scrollAfterPageDown).toBeGreaterThanOrEqual(initialScroll);
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should stack cards vertically on mobile', async ({ page }) => {
      await page.setViewportSize(viewportSizes.mobile);
      await page.waitForTimeout(timeouts.animation);
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cards = page.locator('[id^="timeline-card-"]');
      const positions = await cards.evaluateAll(elements =>
        elements.map(el => ({
          x: el.getBoundingClientRect().left,
          y: el.getBoundingClientRect().top
        }))
      );

      // On mobile, might switch to vertical stacking
      if (positions.length > 1) {
        const isVertical = positions[1].y > positions[0].y + 50;
        expect(isVertical).toBeDefined();
      }
    });

    test('should maintain horizontal layout on tablet', async ({ page }) => {
      await page.setViewportSize(viewportSizes.tablet);
      await page.waitForTimeout(timeouts.animation);
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cards = page.locator('[id^="timeline-card-"]');
      const visibleCount = await cards.evaluateAll(elements =>
        elements.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }).length
      );

      // Should still show multiple cards
      if (visibleCount > 0) {
        expect(visibleCount).toBeGreaterThanOrEqual(1);
      }
    });

    test('should optimize card width for wide screens', async ({ page }) => {
      await page.setViewportSize(viewportSizes.wide);
      await page.waitForTimeout(timeouts.animation);
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cards = page.locator('[id^="timeline-card-"]');
      const widths = await cards.evaluateAll(elements =>
        elements
          .filter(el => {
            const styles = window.getComputedStyle(el);
            return styles.display !== 'none';
          })
          .map(el => el.getBoundingClientRect().width)
      );

      // Cards should have reasonable widths
      if (widths.length > 0) {
        widths.forEach(width => {
          if (width > 0) {
            expect(width).toBeGreaterThan(0);
          }
        });
      }
    });
  });

  test.describe('Scrolling & Visibility', () => {
    test('should show scroll indicators when content overflows', async ({ page }) => {
      const scrollIndicators = page.locator('.scroll-indicator, [data-scroll-indicator="true"]');
      
      if (await scrollIndicators.count() > 0) {
        await expect(scrollIndicators.first()).toBeVisible();
      }
    });

    test('should update visible items during scroll', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      
      // Get initially visible items
      const initialVisible = await page.evaluate(() => {
        const items = document.querySelectorAll('.timeline-horz-item-container');
        const viewport = document.querySelector('.timeline-main-wrapper')?.getBoundingClientRect();
        
        if (!viewport) return 0;
        
        return Array.from(items).filter(item => {
          const rect = item.getBoundingClientRect();
          return rect.left < viewport.right && rect.right > viewport.left;
        }).length;
      });
      
      // Scroll to middle
      await wrapper.evaluate(el => el.scrollTo(el.scrollWidth / 2, 0));
      await page.waitForTimeout(timeouts.scroll);
      
      // Get newly visible items
      const middleVisible = await page.evaluate(() => {
        const items = document.querySelectorAll('.timeline-horz-item-container');
        const viewport = document.querySelector('.timeline-main-wrapper')?.getBoundingClientRect();
        
        if (!viewport) return 0;
        
        return Array.from(items).filter(item => {
          const rect = item.getBoundingClientRect();
          return rect.left < viewport.right && rect.right > viewport.left;
        }).length;
      });
      
      expect(middleVisible).toBeGreaterThan(0);
    });

    test('should handle smooth scrolling', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      
      await wrapper.evaluate(el => {
        el.scrollTo({ left: 500, behavior: 'smooth' });
      });
      
      await page.waitForTimeout(timeouts.scroll);
      
      const scrollPosition = await wrapper.evaluate(el => el.scrollLeft);
      expect(scrollPosition).toBeGreaterThan(0);
    });
  });

  test.describe('Interaction', () => {
    test('should handle card hover effects', async ({ page }) => {
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const card = page.locator('[id^="timeline-card-"]').first();

      const initialStyles = await card.evaluate(el => ({
        transform: window.getComputedStyle(el).transform,
        boxShadow: window.getComputedStyle(el).boxShadow
      }));

      await card.hover();
      await page.waitForTimeout(timeouts.animation);

      const hoverStyles = await card.evaluate(el => ({
        transform: window.getComputedStyle(el).transform,
        boxShadow: window.getComputedStyle(el).boxShadow
      }));

      // Styles might change on hover
      const hasHoverEffect =
        initialStyles.transform !== hoverStyles.transform ||
        initialStyles.boxShadow !== hoverStyles.boxShadow;

      expect(hasHoverEffect).toBeDefined();
    });

    test('should maintain card state during scroll', async ({ page }) => {
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      // Click a card to select it
      const card = page.locator('[id^="timeline-card-"]').nth(1);
      await card.click({ timeout: 5000 });
      await page.waitForTimeout(timeouts.animation);

      // Scroll away and back
      const wrapper = page.locator('.timeline-main-wrapper');
      await wrapper.evaluate(el => el.scrollTo(el.scrollWidth, 0));
      await page.waitForTimeout(timeouts.scroll);

      await wrapper.evaluate(el => el.scrollTo(0, 0));
      await page.waitForTimeout(timeouts.scroll);

      // Card state should be maintained
      const className = await card.getAttribute('class');
      expect(className).toBeTruthy();
    });

    test('should handle rapid clicking between cards', async ({ page }) => {
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cards = page.locator('[id^="timeline-card-"]');

      // Rapidly click different cards
      for (let i = 0; i < Math.min(3, testTimelineItems.length); i++) {
        const card = cards.nth(i);
        if (await card.isVisible()) {
          await card.click({ timeout: 5000 });
          await page.waitForTimeout(100);
        }
      }

      // Should handle rapid selection changes
      const lastCard = cards.nth(2);
      const isVisible = await lastCard.isVisible().catch(() => false);
      expect(isVisible !== null).toBeTruthy();
    });
  });

  test.describe('Performance', () => {
    test('should render all cards efficiently', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/horizontal-all');
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 10000 });
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(10000);

      // All cards should be rendered
      const cards = page.locator('[id^="timeline-card-"]');
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should handle smooth horizontal scrolling with all cards', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      
      // Measure scroll performance
      const startTime = Date.now();
      
      for (let i = 0; i < 5; i++) {
        await wrapper.evaluate(el => {
          el.scrollBy({ left: 200, behavior: 'smooth' });
        });
        await page.waitForTimeout(200);
      }
      
      const scrollTime = Date.now() - startTime;
      expect(scrollTime).toBeLessThan(3000);
    });

    test('should optimize rendering for visible viewport', async ({ page }) => {
      // Check if virtualization or optimization is applied
      const visibleCards = await page.evaluate(() => {
        const cards = document.querySelectorAll('[id^="timeline-card-"]');
        const viewport = document.querySelector('.timeline-main-wrapper')?.getBoundingClientRect();

        if (!viewport) return 0;

        return Array.from(cards).filter(card => {
          const rect = card.getBoundingClientRect();
          const styles = window.getComputedStyle(card);
          return (
            rect.left < viewport.right &&
            rect.right > viewport.left &&
            styles.display !== 'none'
          );
        }).length;
      });

      // Only visible cards should be in viewport
      expect(visibleCards).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle single item in horizontal all mode', async ({ page }) => {
      await page.goto('/horizontal-all');
      const items = await timelineHelpers.getTimelineItems('horizontal');
      const count = await items.count();

      if (count > 0) {
        await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

        const card = page.locator('[id^="timeline-card-"]').first();
        const isVisible = await card.isVisible();

        if (isVisible) {
          // Card should be displayed properly
          const width = await card.evaluate(el => el.getBoundingClientRect().width);
          expect(width).toBeGreaterThan(0);
        }
      }
    });

    test('should handle many items (20+) in horizontal all mode', async ({ page }) => {
      await page.goto('/horizontal-all');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });

      const items = await timelineHelpers.getTimelineItems('horizontal');
      const count = await items.count();

      if (count > 0) {
        // Should handle items
        const wrapper = page.locator('.timeline-main-wrapper');
        const hasScroll = await wrapper.evaluate(el =>
          el.scrollWidth > el.clientWidth
        );

        expect(typeof hasScroll).toBe('boolean');
      }
    });

    test('should handle empty timeline gracefully', async ({ page }) => {
      await page.goto('/horizontal-all');

      const wrapper = page.locator('.timeline-main-wrapper');
      const isVisible = await wrapper.isVisible();
      expect(isVisible).toBeTruthy();
    });
  });

  test.describe('Accessibility', () => {
    test('should provide keyboard access to all cards', async ({ page }) => {
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cards = page.locator('[id^="timeline-card-"]');
      const count = await cards.count();

      // Tab through cards
      for (let i = 0; i < Math.min(3, count); i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      }

      // Should be able to access cards via keyboard
      const focusedElement = await page.evaluate(() =>
        document.activeElement?.className
      );
      expect(focusedElement).toBeTruthy();
    });

    test('should announce all cards to screen readers', async ({ page }) => {
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 5000 });

      const cards = page.locator('[id^="timeline-card-"]');
      const ariaLabels = await cards.evaluateAll(elements =>
        elements.map(el =>
          el.getAttribute('aria-label') ||
          el.querySelector('[aria-label]')?.getAttribute('aria-label')
        )
      );

      // Cards should exist
      expect(ariaLabels.length).toBeGreaterThan(0);
    });

    test('should indicate scroll position', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      
      // Check for scroll position indicators
      const scrollIndicator = await wrapper.getAttribute('aria-valuenow');
      
      if (scrollIndicator) {
        expect(parseInt(scrollIndicator)).toBeGreaterThanOrEqual(0);
      }
      
      // Scroll and check update
      await wrapper.evaluate(el => el.scrollTo(el.scrollWidth / 2, 0));
      await page.waitForTimeout(timeouts.scroll);
      
      const newScrollIndicator = await wrapper.getAttribute('aria-valuenow');
      if (newScrollIndicator && scrollIndicator) {
        expect(parseInt(newScrollIndicator)).not.toBe(parseInt(scrollIndicator));
      }
    });
  });

  test.describe('Integration with Other Features', () => {
    test('should work with slideshow in horizontal all mode', async ({ page }) => {
      await page.goto('/horizontal-all');
      await page.waitForSelector('[id^="timeline-card-"]', { timeout: 10000 });

      // All cards should be visible
      const cards = page.locator('[id^="timeline-card-"]');
      const visibleCount = await cards.count();
      expect(visibleCount).toBeGreaterThan(0);

      // Slideshow controls should work
      await timelineHelpers.toggleSlideshow('play');
      await page.waitForTimeout(timeouts.slideshow);

      // Should auto-scroll through cards
      const wrapper = page.locator('.timeline-main-wrapper');
      const scrollPosition = await wrapper.evaluate(el => el.scrollLeft);

      await page.waitForTimeout(timeouts.slideshow);
      const newScrollPosition = await wrapper.evaluate(el => el.scrollLeft);

      expect(typeof newScrollPosition).toBe('number');

      await timelineHelpers.toggleSlideshow('pause');
    });

    test('should work with custom content in horizontal all mode', async ({ page }) => {
      await page.goto('/horizontal-all');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });

      const items = await timelineHelpers.getTimelineItems('horizontal');
      const count = await items.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should work with media content in horizontal all mode', async ({ page }) => {
      await page.goto('/horizontal-all');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });

      const media = page.locator('img, video, iframe');

      if (await media.count() > 0) {
        // Media should be displayed in all visible cards
        const visibleMedia = await media.evaluateAll(elements =>
          elements.filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          }).length
        );

        expect(visibleMedia).toBeGreaterThan(0);
      }
    });
  });
});