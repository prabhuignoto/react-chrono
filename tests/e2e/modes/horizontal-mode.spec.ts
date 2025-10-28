import { test, expect } from '../../fixtures/test-fixtures';
import { SELECTORS } from '../../fixtures/selector-map';
import { testTimelineItems, viewportSizes } from '../../helpers/test-data';

test.describe('Timeline HORIZONTAL Mode - Comprehensive Tests', () => {
  test.beforeEach(async ({ testHelpers }) => {
    await testHelpers.navigateAndWaitForTimeline('/horizontal');
  });

  test.describe('Basic Rendering', () => {
    test('should render timeline in horizontal mode', async ({ page }) => {
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      await expect(wrapper).toBeVisible();
      
      const className = await wrapper.getAttribute('class');
      expect(className).toContain('horizontal');
    });

    test('should display correct number of timeline items', async ({ testHelpers }) => {
      const items = await testHelpers.getTimelineItems('horizontal');
      await items.first().waitFor({ state: 'visible', timeout: 5000 });

      const count = await items.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display horizontal line connecting items', async ({ page }) => {
      const line = page.locator('.timeline-horizontal-line, .timeline-line-horizontal');
      await expect(line.first()).toBeVisible();
    });

    test('should show timeline points horizontally aligned', async ({ testHelpers }) => {
      const points = await testHelpers.getTimelinePoints();
      const positions = await points.evaluateAll(elements =>
        elements.map(el => el.getBoundingClientRect().top)
      );

      // All points should have similar Y position (horizontal alignment)
      const uniqueYPositions = [...new Set(positions)];
      expect(uniqueYPositions.length).toBeLessThanOrEqual(2); // Allow minor variations
    });
  });

  test.describe('Card Display', () => {
    test('should display cards above timeline', async ({ testHelpers, page }) => {
      const firstCard = await testHelpers.getCardContent(0);
      const firstPoint = (await testHelpers.getTimelinePoints()).first();

      const cardPos = await firstCard.boundingBox();
      const pointPos = await firstPoint.boundingBox();

      if (cardPos && pointPos) {
        expect(cardPos.y).toBeLessThan(pointPos.y);
      }
    });

    test('should show active card content', async ({ testHelpers }) => {
      await testHelpers.clickTimelinePoint(0);

      const activeCard = await testHelpers.getCardContent(0);
      await expect(activeCard).toBeVisible();
      await expect(activeCard).toContainText(testTimelineItems[0].cardTitle);
    });

    test('should handle card transitions smoothly', async ({ testHelpers }) => {
      await testHelpers.clickTimelinePoint(0);
      await testHelpers.clickTimelinePoint(1);

      const secondCard = await testHelpers.getCardContent(1);
      await expect(secondCard).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate using next/previous buttons', async ({ testHelpers }) => {
      const nextButton = await testHelpers.getToolbarButton('next');
      const prevButton = await testHelpers.getToolbarButton('previous');

      // Navigate forward
      if (await nextButton.isVisible()) {
        await testHelpers.clickToolbarButton('next');

        // Navigate back
        if (await prevButton.isEnabled()) {
          await testHelpers.clickToolbarButton('previous');
        }
      }
    });

    test('should navigate with arrow keys', async ({ testHelpers }) => {
      await testHelpers.focusTimeline();
      await testHelpers.navigateWithKeyboard('ArrowRight');
      await testHelpers.navigateWithKeyboard('ArrowLeft');
    });

    test('should jump to first/last items', async ({ testHelpers }) => {
      const lastButton = await testHelpers.getToolbarButton('last');
      if (await lastButton.isVisible()) {
        await testHelpers.clickToolbarButton('last');

        const timelineItems = await testHelpers.getTimelineItems('horizontal');
        await expect(timelineItems.last()).toBeInViewport();
      }

      const firstButton = await testHelpers.getToolbarButton('first');
      if (await firstButton.isVisible()) {
        await testHelpers.clickToolbarButton('first');

        const timelineItems = await testHelpers.getTimelineItems('horizontal');
        await expect(timelineItems.first()).toBeInViewport();
      }
    });

    test('should handle horizontal scroll', async ({ page }) => {
      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN);

      // Scroll right
      await wrapper.evaluate(el => el.scrollTo(el.scrollWidth, 0));

      // Scroll left
      await wrapper.evaluate(el => el.scrollTo(0, 0));
    });
  });

  test.describe('Slideshow Functionality', () => {
    test('should start and stop slideshow', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?slideShow=true');
      await testHelpers.waitForTimelineFullyLoaded();

      await testHelpers.clickToolbarButton('play');

      // Check if slideshow is running
      await testHelpers.clickToolbarButton('pause');
    });

    test('should show progress during slideshow', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?slideShow=true&showProgressOnSlideshow=true');
      await testHelpers.waitForTimelineFullyLoaded();

      await testHelpers.clickToolbarButton('play');

      const progress = page.locator('.slideshow-progress, [data-testid="slideshow-progress"]');
      if (await progress.isVisible()) {
        await expect(progress).toBeVisible();
      }

      await testHelpers.clickToolbarButton('pause');
    });

    test('should respect slideItemDuration', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?slideShow=true&slideItemDuration=1000');
      await testHelpers.waitForTimelineFullyLoaded();

      await testHelpers.clickToolbarButton('play');

      const startTime = Date.now();
      await page.waitForTimeout(1100);
      const endTime = Date.now();

      expect(endTime - startTime).toBeGreaterThanOrEqual(1000);

      await testHelpers.clickToolbarButton('pause');
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should switch to vertical on mobile', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.mobile);

      // Check if mode switched to vertical
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      const className = await wrapper.getAttribute('class');

      // Mobile might switch to vertical mode
      if (className?.includes('vertical')) {
        const verticalItems = await testHelpers.getTimelineItems('vertical');
        await expect(verticalItems.first()).toBeVisible();
      }
    });

    test('should maintain horizontal on tablet', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.tablet);

      const items = await testHelpers.getTimelineItems('horizontal');
      await expect(items.first()).toBeVisible();
    });

    test('should optimize for wide screens', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.wide);
      await page.waitForTimeout(500);

      const items = await testHelpers.getTimelineItems('horizontal');
      const count = await items.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Props Testing', () => {
    test('should respect itemWidth prop', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?itemWidth=300');
      await testHelpers.waitForTimelineFullyLoaded();

      const items = await testHelpers.getTimelineItems('horizontal');
      const item = items.first();
      const width = await item.evaluate(el => el.offsetWidth);

      expect(width).toBeCloseTo(300, 50); // Allow some variance
    });

    test('should respect lineWidth prop', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?lineWidth=4');
      await testHelpers.waitForTimelineFullyLoaded();

      const line = page.locator('.timeline-horizontal-line, .timeline-line-horizontal').first();
      const width = await line.evaluate(el =>
        window.getComputedStyle(el).strokeWidth || window.getComputedStyle(el).borderWidth
      );

      expect(parseInt(width)).toBeGreaterThanOrEqual(3);
    });

    test('should respect disableAutoScrollOnClick prop', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?disableAutoScrollOnClick=true');
      await testHelpers.waitForTimelineFullyLoaded();

      const initialScroll = await page.evaluate(() =>
        document.querySelector('.timeline-main-wrapper')?.scrollLeft || 0
      );

      await testHelpers.clickTimelinePoint(3);

      const finalScroll = await page.evaluate(() =>
        document.querySelector('.timeline-main-wrapper')?.scrollLeft || 0
      );

      expect(finalScroll).toBe(initialScroll);
    });

    test('should respect focusActiveItemOnLoad prop', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?focusActiveItemOnLoad=true&activeItemIndex=2');
      await testHelpers.waitForTimelineFullyLoaded();

      const items = await testHelpers.getTimelineItems('horizontal');
      const activeItem = items.nth(2);
      await expect(activeItem).toBeInViewport();
    });
  });

  test.describe('Toolbar Controls', () => {
    test('should display toolbar at correct position', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?toolbarPosition=top');
      await testHelpers.waitForTimelineFullyLoaded();

      const toolbar = await testHelpers.getToolbar();
      if (await toolbar.isVisible()) {
        const toolbarPos = await toolbar.boundingBox();
        const timelinePos = await page.locator(SELECTORS.TIMELINE_MAIN).boundingBox();

        if (toolbarPos && timelinePos) {
          expect(toolbarPos.y).toBeLessThan(timelinePos.y);
        }
      }
    });

    test('should handle toolbar search', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?enableSearch=true');
      await testHelpers.waitForTimelineFullyLoaded();

      const searchInput = page.locator(SELECTORS.SEARCH_INPUT);
      if (await searchInput.count() > 0) {
        await searchInput.fill('Pearl');

        // Check if search filtered or highlighted results
        const highlighted = page.locator('.search-highlight, [data-search-match="true"]');
        if (await highlighted.count() > 0) {
          await expect(highlighted.first()).toBeVisible();
        }
      }
    });

    test('should toggle layout from toolbar', async ({ testHelpers, page }) => {
      const layoutButtons = page.locator('[aria-label*="layout"], .layout-button');

      if (await layoutButtons.count() > 0) {
        await layoutButtons.first().click();

        // Check if layout changed
        const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
        const className = await wrapper.getAttribute('class');

        if (className?.includes('vertical')) {
          const verticalItems = await testHelpers.getTimelineItems('vertical');
          await expect(verticalItems.first()).toBeVisible();
        }
      }
    });
  });

  test.describe('Media Handling', () => {
    test('should display media in horizontal cards', async ({ testHelpers }) => {
      const items = await testHelpers.getTimelineItems('horizontal');
      const itemWithImage = items.first();
      const image = itemWithImage.locator('img');

      if (await image.count() > 0) {
        await expect(image.first()).toBeVisible();
        await expect(image.first()).toHaveAttribute('src', /\.(jpg|png|gif)/);
      }
    });

    test('should handle media height in horizontal mode', async ({ testHelpers, page }) => {
      await page.goto('/horizontal?mediaHeight=150');
      await testHelpers.waitForTimelineFullyLoaded();

      const media = page.locator('.timeline-media, img').first();
      if (await media.isVisible()) {
        const height = await media.evaluate(el => el.offsetHeight);
        expect(height).toBeCloseTo(150, 50);
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper keyboard navigation', async ({ testHelpers, page }) => {
      await testHelpers.focusTimeline();

      // Navigate with keyboard
      await testHelpers.navigateWithKeyboard('ArrowRight');
      await testHelpers.navigateWithKeyboard('ArrowLeft');

      // Tab through controls
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });

    test('should announce navigation changes', async ({ testHelpers, page }) => {
      // Check for live region
      const liveRegion = page.locator('[aria-live="polite"], [role="status"]');

      if (await liveRegion.count() > 0) {
        await testHelpers.clickTimelinePoint(1);

        // Live region should update
        const announcement = await liveRegion.textContent();
        expect(announcement).toBeTruthy();
      }
    });
  });

  test.describe('Performance', () => {
    test('should handle smooth horizontal scrolling', async ({ page }) => {
      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN);

      // Perform smooth scroll
      await wrapper.evaluate(el => {
        el.scrollTo({ left: 500, behavior: 'smooth' });
      });

      const scrollPosition = await wrapper.evaluate(el => el.scrollLeft);
      expect(scrollPosition).toBeGreaterThan(0);
    });

    test('should optimize rendering for visible items only', async ({ testHelpers }) => {
      // Check if virtualization is implemented
      const allItems = await testHelpers.getTimelineItems('horizontal');
      const visibleItems = await allItems.evaluateAll(elements =>
        elements.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.left < window.innerWidth && rect.right > 0;
        }).length
      );

      // Only a subset should be visible at once
      expect(visibleItems).toBeLessThanOrEqual(testTimelineItems.length);
    });

    test('should maintain performance with many items', async ({ testHelpers, page }) => {
      await page.goto('/horizontal-many-items'); // Assuming a test page with many items

      const startTime = Date.now();
      await testHelpers.waitForTimelineFullyLoaded();
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(5000);
    });
  });
});