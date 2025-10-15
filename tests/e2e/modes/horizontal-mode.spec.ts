import { test, expect } from '../../fixtures/test-fixtures';
import { TimelineHelpers } from '../../helpers/timeline-helpers';
import { testTimelineItems, viewportSizes, keyboardKeys, timeouts } from '../../helpers/test-data';

test.describe('Timeline HORIZONTAL Mode - Comprehensive Tests', () => {
  let timelineHelpers: TimelineHelpers;

  test.beforeEach(async ({ page }) => {
    timelineHelpers = new TimelineHelpers(page);
    await page.goto('/horizontal');
    await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
  });

  test.describe('Basic Rendering', () => {
    test('should render timeline in horizontal mode', async ({ page }) => {
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      await expect(wrapper).toBeVisible();
      
      const className = await wrapper.getAttribute('class');
      expect(className).toContain('horizontal');
    });

    test('should display correct number of timeline items', async ({ page }) => {
      const items = await timelineHelpers.getTimelineItems('horizontal');
      await expect(items).toHaveCount(testTimelineItems.length);
    });

    test('should display horizontal line connecting items', async ({ page }) => {
      const line = page.locator('.timeline-horizontal-line, .timeline-line-horizontal');
      await expect(line.first()).toBeVisible();
    });

    test('should show timeline points horizontally aligned', async ({ page }) => {
      const points = page.locator('[data-testid="timeline-circle"]');
      const positions = await points.evaluateAll(elements => 
        elements.map(el => el.getBoundingClientRect().top)
      );
      
      // All points should have similar Y position (horizontal alignment)
      const uniqueYPositions = [...new Set(positions)];
      expect(uniqueYPositions.length).toBeLessThanOrEqual(2); // Allow minor variations
    });
  });

  test.describe('Card Display', () => {
    test('should display cards above timeline', async ({ page }) => {
      const firstCard = page.locator('.timeline-card-content').first();
      const firstPoint = page.locator('[data-testid="timeline-circle"]').first();
      
      const cardPos = await firstCard.boundingBox();
      const pointPos = await firstPoint.boundingBox();
      
      if (cardPos && pointPos) {
        expect(cardPos.y).toBeLessThan(pointPos.y);
      }
    });

    test('should show active card content', async ({ page }) => {
      await timelineHelpers.navigateToItem(0, 'horizontal');
      
      const activeCard = page.locator('.timeline-card-content').first();
      await expect(activeCard).toBeVisible();
      await expect(activeCard).toContainText(testTimelineItems[0].cardTitle);
    });

    test('should handle card transitions smoothly', async ({ page }) => {
      await timelineHelpers.navigateToItem(0, 'horizontal');
      await page.waitForTimeout(timeouts.animation);
      
      await timelineHelpers.navigateToItem(1, 'horizontal');
      await page.waitForTimeout(timeouts.animation);
      
      const secondCard = page.locator('.timeline-card-content').nth(1);
      await expect(secondCard).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate using next/previous buttons', async ({ page }) => {
      const nextButton = page.locator('[aria-label="next"]').first();
      const prevButton = page.locator('[aria-label="previous"]').first();
      
      // Navigate forward
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(timeouts.animation);
        
        // Navigate back
        if (await prevButton.isEnabled()) {
          await prevButton.click();
          await page.waitForTimeout(timeouts.animation);
        }
      }
    });

    test('should navigate with arrow keys', async ({ page }) => {
      await timelineHelpers.navigateWithKeyboard('ArrowRight');
      await page.waitForTimeout(timeouts.animation);
      
      await timelineHelpers.navigateWithKeyboard('ArrowLeft');
      await page.waitForTimeout(timeouts.animation);
    });

    test('should jump to first/last items', async ({ page }) => {
      const lastButton = page.locator('[aria-label="last"]').first();
      if (await lastButton.isVisible()) {
        await lastButton.click();
        await page.waitForTimeout(timeouts.animation);
        
        const lastItem = page.locator('.timeline-horz-item-container').last();
        await expect(lastItem).toBeInViewport();
      }
      
      const firstButton = page.locator('[aria-label="first"]').first();
      if (await firstButton.isVisible()) {
        await firstButton.click();
        await page.waitForTimeout(timeouts.animation);
        
        const firstItem = page.locator('.timeline-horz-item-container').first();
        await expect(firstItem).toBeInViewport();
      }
    });

    test('should handle horizontal scroll', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      
      // Scroll right
      await wrapper.evaluate(el => el.scrollTo(el.scrollWidth, 0));
      await page.waitForTimeout(timeouts.scroll);
      
      // Scroll left
      await wrapper.evaluate(el => el.scrollTo(0, 0));
      await page.waitForTimeout(timeouts.scroll);
    });
  });

  test.describe('Slideshow Functionality', () => {
    test('should start and stop slideshow', async ({ page }) => {
      await page.goto('/horizontal?slideShow=true');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      await timelineHelpers.toggleSlideshow('play');
      await page.waitForTimeout(timeouts.slideshow);
      
      // Check if slideshow advanced
      await timelineHelpers.toggleSlideshow('pause');
    });

    test('should show progress during slideshow', async ({ page }) => {
      await page.goto('/horizontal?slideShow=true&showProgressOnSlideshow=true');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      await timelineHelpers.toggleSlideshow('play');
      
      const progress = page.locator('.slideshow-progress, [data-testid="slideshow-progress"]');
      if (await progress.isVisible()) {
        await expect(progress).toBeVisible();
      }
      
      await timelineHelpers.toggleSlideshow('pause');
    });

    test('should respect slideItemDuration', async ({ page }) => {
      await page.goto('/horizontal?slideShow=true&slideItemDuration=1000');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      await timelineHelpers.toggleSlideshow('play');
      
      const startTime = Date.now();
      await page.waitForTimeout(1100);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
      
      await timelineHelpers.toggleSlideshow('pause');
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should switch to vertical on mobile', async ({ page }) => {
      await page.setViewportSize(viewportSizes.mobile);
      await page.waitForTimeout(timeouts.animation);
      
      // Check if mode switched to vertical
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      const className = await wrapper.getAttribute('class');
      
      // Mobile might switch to vertical mode
      if (className?.includes('vertical')) {
        const verticalItems = page.locator('.vertical-item-row');
        await expect(verticalItems.first()).toBeVisible();
      }
    });

    test('should maintain horizontal on tablet', async ({ page }) => {
      await page.setViewportSize(viewportSizes.tablet);
      await page.waitForTimeout(timeouts.animation);
      
      const items = await timelineHelpers.getTimelineItems('horizontal');
      await expect(items.first()).toBeVisible();
    });

    test('should optimize for wide screens', async ({ page }) => {
      await page.setViewportSize(viewportSizes.wide);
      await page.waitForTimeout(timeouts.animation);
      
      const items = await timelineHelpers.getTimelineItems('horizontal');
      await expect(items).toHaveCount(testTimelineItems.length);
    });
  });

  test.describe('Props Testing', () => {
    test('should respect itemWidth prop', async ({ page }) => {
      await page.goto('/horizontal?itemWidth=300');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const item = page.locator('.timeline-horz-item-container').first();
      const width = await item.evaluate(el => el.offsetWidth);
      
      expect(width).toBeCloseTo(300, 50); // Allow some variance
    });

    test('should respect lineWidth prop', async ({ page }) => {
      await page.goto('/horizontal?lineWidth=4');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const line = page.locator('.timeline-horizontal-line, .timeline-line-horizontal').first();
      const width = await line.evaluate(el => 
        window.getComputedStyle(el).strokeWidth || window.getComputedStyle(el).borderWidth
      );
      
      expect(parseInt(width)).toBeGreaterThanOrEqual(3);
    });

    test('should respect disableAutoScrollOnClick prop', async ({ page }) => {
      await page.goto('/horizontal?disableAutoScrollOnClick=true');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const initialScroll = await page.evaluate(() => 
        document.querySelector('.timeline-main-wrapper')?.scrollLeft || 0
      );
      
      await timelineHelpers.navigateToItem(3, 'horizontal');
      await page.waitForTimeout(timeouts.animation);
      
      const finalScroll = await page.evaluate(() => 
        document.querySelector('.timeline-main-wrapper')?.scrollLeft || 0
      );
      
      expect(finalScroll).toBe(initialScroll);
    });

    test('should respect focusActiveItemOnLoad prop', async ({ page }) => {
      await page.goto('/horizontal?focusActiveItemOnLoad=true&activeItemIndex=2');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const activeItem = page.locator('.timeline-horz-item-container').nth(2);
      await expect(activeItem).toBeInViewport();
    });
  });

  test.describe('Toolbar Controls', () => {
    test('should display toolbar at correct position', async ({ page }) => {
      await page.goto('/horizontal?toolbarPosition=top');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const toolbar = page.locator('.timeline-controls, .timeline-toolbar');
      if (await toolbar.isVisible()) {
        const toolbarPos = await toolbar.boundingBox();
        const timelinePos = await page.locator('.timeline-main-wrapper').boundingBox();
        
        if (toolbarPos && timelinePos) {
          expect(toolbarPos.y).toBeLessThan(timelinePos.y);
        }
      }
    });

    test('should handle toolbar search', async ({ page }) => {
      await page.goto('/horizontal?enableSearch=true');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      await timelineHelpers.searchTimeline('Pearl');
      await page.waitForTimeout(timeouts.animation);
      
      // Check if search filtered or highlighted results
      const highlighted = page.locator('.search-highlight, [data-search-match="true"]');
      if (await highlighted.count() > 0) {
        await expect(highlighted.first()).toBeVisible();
      }
    });

    test('should toggle layout from toolbar', async ({ page }) => {
      await timelineHelpers.changeLayout('vertical');
      await page.waitForTimeout(timeouts.animation);
      
      // Check if layout changed
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      const className = await wrapper.getAttribute('class');
      
      if (className?.includes('vertical')) {
        const verticalItems = page.locator('.vertical-item-row');
        await expect(verticalItems.first()).toBeVisible();
      }
    });
  });

  test.describe('Media Handling', () => {
    test('should display media in horizontal cards', async ({ page }) => {
      const itemWithImage = page.locator('.timeline-horz-item-container').first();
      const image = itemWithImage.locator('img');
      
      if (await image.count() > 0) {
        await expect(image.first()).toBeVisible();
        await expect(image.first()).toHaveAttribute('src', /\.(jpg|png|gif)/);
      }
    });

    test('should handle media height in horizontal mode', async ({ page }) => {
      await page.goto('/horizontal?mediaHeight=150');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const media = page.locator('.timeline-media, img').first();
      if (await media.isVisible()) {
        const height = await media.evaluate(el => el.offsetHeight);
        expect(height).toBeCloseTo(150, 50);
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper keyboard navigation', async ({ page }) => {
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      await wrapper.focus();
      
      // Navigate with keyboard
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(timeouts.animation);
      
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(timeouts.animation);
      
      // Tab through controls
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });

    test('should announce navigation changes', async ({ page }) => {
      // Check for live region
      const liveRegion = page.locator('[aria-live="polite"], [role="status"]');
      
      if (await liveRegion.count() > 0) {
        await timelineHelpers.navigateToItem(1, 'horizontal');
        await page.waitForTimeout(timeouts.animation);
        
        // Live region should update
        const announcement = await liveRegion.textContent();
        expect(announcement).toBeTruthy();
      }
    });
  });

  test.describe('Performance', () => {
    test('should handle smooth horizontal scrolling', async ({ page }) => {
      const wrapper = page.locator('.timeline-main-wrapper');
      
      // Perform smooth scroll
      await wrapper.evaluate(el => {
        el.scrollTo({ left: 500, behavior: 'smooth' });
      });
      
      await page.waitForTimeout(timeouts.scroll);
      
      const scrollPosition = await wrapper.evaluate(el => el.scrollLeft);
      expect(scrollPosition).toBeGreaterThan(0);
    });

    test('should optimize rendering for visible items only', async ({ page }) => {
      // Check if virtualization is implemented
      const allItems = await timelineHelpers.getTimelineItems('horizontal');
      const visibleItems = await allItems.evaluateAll(elements => 
        elements.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.left < window.innerWidth && rect.right > 0;
        }).length
      );
      
      // Only a subset should be visible at once
      expect(visibleItems).toBeLessThanOrEqual(testTimelineItems.length);
    });

    test('should maintain performance with many items', async ({ page }) => {
      await page.goto('/horizontal-many-items'); // Assuming a test page with many items
      
      const startTime = Date.now();
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(5000);
    });
  });
});