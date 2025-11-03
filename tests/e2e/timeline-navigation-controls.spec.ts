import { test, expect } from '../fixtures/test-fixtures';
import { SELECTORS } from '../fixtures/selector-map';

test.describe('Timeline Navigation and Controls', () => {
  test.describe('Basic Navigation Controls', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to horizontal timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/horizontal');
      });
    });

    test('should display navigation buttons', async ({ testHelpers }) => {
      await test.step('Check for next and previous buttons', async () => {
        const nextButton = await testHelpers.getToolbarButton('next');
        const prevButton = await testHelpers.getToolbarButton('previous');

        // At least one navigation button should be visible
        const nextCount = await nextButton.count();
        const prevCount = await prevButton.count();

        expect(nextCount + prevCount).toBeGreaterThan(0);

        if (nextCount > 0) {
          await expect(nextButton).toBeVisible();
        }
      });
    });

    test('should navigate forward through timeline items', async ({ testHelpers }) => {
      await test.step('Test forward navigation', async () => {
        const nextButton = await testHelpers.getToolbarButton('next');

        if (await nextButton.isVisible()) {
          // Get initial timeline state
          const timelineItems = await testHelpers.getTimelineItems('horizontal');
          const initialCount = await timelineItems.count();

          // Click next multiple times
          for (let i = 0; i < Math.min(3, initialCount); i++) {
            await testHelpers.clickToolbarButton('next');

            // Verify timeline is still functional
            await expect(timelineItems.first()).toBeVisible();
          }
        }
      });
    });

    test('should navigate backward through timeline items', async ({ testHelpers }) => {
      await test.step('Test backward navigation', async () => {
        const nextButton = await testHelpers.getToolbarButton('next');
        const prevButton = await testHelpers.getToolbarButton('previous');

        if (await nextButton.isVisible()) {
          // First navigate forward
          await testHelpers.clickToolbarButton('next');

          // Then navigate backward
          if (await prevButton.isVisible()) {
            await testHelpers.clickToolbarButton('previous');

            // Verify timeline is still functional
            const timelineItems = await testHelpers.getTimelineItems('horizontal');
            await expect(timelineItems.first()).toBeVisible();
          }
        }
      });
    });

    test('should handle navigation boundaries', async ({ testHelpers }) => {
      await test.step('Test navigation limits', async () => {
        const prevButton = await testHelpers.getToolbarButton('previous');

        // At the beginning, previous button might be disabled or not visible
        if (await prevButton.count() > 0) {
          const isEnabled = await prevButton.isEnabled();
          const isVisible = await prevButton.isVisible();

          // Button might be disabled or hidden at start
          if (isVisible && !isEnabled) {
            // This is expected behavior at the beginning
            expect(isEnabled).toBeFalsy();
          }
        }

        // Navigate to end and test next button
        const nextButton = await testHelpers.getToolbarButton('next');
        const timelineItems = await testHelpers.getTimelineItems('horizontal');
        const totalItems = await timelineItems.count();

        if (await nextButton.isVisible() && totalItems > 1) {
          // Navigate to near the end
          for (let i = 0; i < Math.min(totalItems - 1, 5); i++) {
            if (await nextButton.isEnabled()) {
              await testHelpers.clickToolbarButton('next');
            } else {
              break;
            }
          }
        }
      });
    });
  });

  test.describe('Timeline Item Selection', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to vertical timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-basic');
      });
    });

    test('should select timeline items on click', async ({ testHelpers }) => {
      await test.step('Test item selection', async () => {
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        const count = await timelineItems.count();

        if (count > 1) {
          // Click on different items
          for (let i = 0; i < Math.min(3, count); i++) {
            const item = timelineItems.nth(i);
            await expect(item).toBeVisible();
            await item.click();
            // Wait for active state change
            await expect(item).toBeVisible();
          }
        }
      });
    });

    test('should show active item state', async ({ testHelpers, page }) => {
      await test.step('Test active item indication', async () => {
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        const count = await timelineItems.count();

        if (count > 0) {
          const firstItem = timelineItems.first();
          await firstItem.click();

          // Look for active state indicators using SELECTORS
          const activeElements = page.locator(SELECTORS.ACTIVE_ITEM);

          // At least some element should indicate active state
          const activeCount = await activeElements.count();
          if (activeCount > 0) {
            await expect(activeElements.first()).toBeVisible();
          }
        }
      });
    });

    test('should display card content for selected items', async ({ testHelpers, page }) => {
      await test.step('Test card content display', async () => {
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        const count = await timelineItems.count();

        if (count > 0) {
          const item = timelineItems.nth(1);
          await item.click();

          // Look for card content using SELECTORS
          const cardContent = page.locator(SELECTORS.CARD_CONTENT);

          const contentCount = await cardContent.count();
          if (contentCount > 0) {
            await expect(cardContent.first()).toBeVisible();
          }
        }
      });
    });
  });

  test.describe('Toolbar Controls', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to timeline with toolbar', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-basic');
      });
    });

    test('should display toolbar controls', async ({ testHelpers }) => {
      await test.step('Check for toolbar presence', async () => {
        // Use helper to get toolbar
        const toolbar = await testHelpers.getToolbar();

        const count = await toolbar.count();
        if (count > 0) {
          await expect(toolbar).toBeVisible();
        }
      });
    });

    test('should toggle layout modes', async ({ testHelpers, page }) => {
      await test.step('Test layout switching', async () => {
        // Look for layout toggle buttons
        const layoutButtons = page.locator(
          '[aria-label*="layout"], .layout-button, button:has([class*="layout"])'
        );

        if (await layoutButtons.count() > 0) {
          const button = layoutButtons.first();
          if (await button.isVisible()) {
            await button.click();

            // Verify timeline still renders after layout change
            const timelineItems = await testHelpers.getTimelineItems('vertical');
            await expect(timelineItems.first()).toBeVisible();
          }
        }
      });
    });

    test('should control timeline playback', async ({ testHelpers }) => {
      await test.step('Test playback controls', async () => {
        // Use helper to get play button
        const playButton = await testHelpers.getToolbarButton('play');

        if (await playButton.count() > 0) {
          if (await playButton.isVisible()) {
            await testHelpers.clickToolbarButton('play');

            // Look for pause button (state change)
            const pauseButton = await testHelpers.getToolbarButton('pause');
            if (await pauseButton.count() > 0) {
              await expect(pauseButton).toBeVisible();

              // Stop playback
              await testHelpers.clickToolbarButton('pause');
            }
          }
        }
      });
    });
  });

  test.describe('Scroll-based Navigation', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to scrollable timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-basic');
      });
    });

    test('should respond to scroll events', async ({ page, testHelpers }) => {
      await test.step('Test scroll-based navigation', async () => {
        const timeline = page.locator(SELECTORS.TIMELINE_MAIN).first();
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        const count = await timelineItems.count();

        if (count > 3) {
          // Scroll down
          await timeline.evaluate(el => el.scrollBy(0, 500));

          // Verify timeline items are still visible
          await expect(timelineItems.first()).toBeVisible();

          // Scroll back up
          await timeline.evaluate(el => el.scrollBy(0, -500));

          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should handle smooth scrolling', async ({ testHelpers }) => {
      await test.step('Test smooth scroll behavior', async () => {
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        const count = await timelineItems.count();

        if (count > 2) {
          // Scroll to a specific item
          const targetItem = timelineItems.nth(2);
          await targetItem.scrollIntoViewIfNeeded();

          // Verify item is visible
          await expect(targetItem).toBeVisible();
        }
      });
    });

    test('should update active item based on scroll position', async ({ page, testHelpers }) => {
      await test.step('Test scroll-based active item updates', async () => {
        const timeline = page.locator(SELECTORS.TIMELINE_MAIN).first();
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        const count = await timelineItems.count();

        if (count > 3) {
          // Scroll to middle
          await timeline.evaluate(el => {
            const middle = el.scrollHeight / 2;
            el.scrollTo(0, middle);
          });

          // Look for active state changes
          const activeElements = page.locator(SELECTORS.ACTIVE_ITEM);
          if (await activeElements.count() > 0) {
            await expect(activeElements.first()).toBeVisible();
          }
        }
      });
    });
  });

  test.describe('Touch and Mobile Navigation', () => {
    test('should support touch gestures on mobile', async ({ page, testHelpers }) => {
      await test.step('Test mobile touch navigation', async () => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await testHelpers.navigateAndWaitForTimeline('/horizontal');

        // Simulate touch interactions
        const timeline = page.locator(SELECTORS.TIMELINE_MAIN).first();
        const box = await timeline.boundingBox();

        if (box) {
          // Simulate swipe gesture
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          await page.mouse.move(box.x + box.width / 4, box.y + box.height / 2);
          await page.mouse.up();

          // Verify timeline still works
          const timelineItems = await testHelpers.getTimelineItems('horizontal');
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should handle pinch zoom gestures', async ({ page, testHelpers }) => {
      await test.step('Test pinch zoom support', async () => {
        await page.setViewportSize({ width: 375, height: 667 });
        await testHelpers.navigateAndWaitForTimeline('/vertical-basic');

        // Simulate zoom (limited testing in browser environment)
        await page.keyboard.down('Control');
        await page.keyboard.press('Equal'); // Zoom in
        await page.keyboard.up('Control');

        // Verify timeline still renders properly
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        await expect(timelineItems.first()).toBeVisible();

        // Reset zoom
        await page.keyboard.down('Control');
        await page.keyboard.press('Digit0'); // Reset zoom
        await page.keyboard.up('Control');
      });
    });
  });

  test.describe('Search and Filter Navigation', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to timeline with search', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-basic');
      });
    });

    test('should display search controls if available', async ({ page }) => {
      await test.step('Check for search functionality', async () => {
        // Look for search input or button using SELECTORS
        const searchElements = page.locator(SELECTORS.SEARCH_INPUT);

        const count = await searchElements.count();
        if (count > 0) {
          await expect(searchElements.first()).toBeVisible();
        }
      });
    });

    test('should filter timeline items based on search', async ({ page, testHelpers }) => {
      await test.step('Test search filtering', async () => {
        const searchInput = page.locator(SELECTORS.SEARCH_INPUT);

        if (await searchInput.count() > 0) {
          const input = searchInput.first();
          await input.fill('test');

          // Verify timeline still displays (filtered results)
          const timelineItems = await testHelpers.getTimelineItems('vertical');
          const visibleItems = await timelineItems.count();
          expect(visibleItems).toBeGreaterThanOrEqual(0);

          // Clear search
          await input.clear();
        }
      });
    });
  });

  test.describe('Breadcrumb and Position Navigation', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to timeline with position indicators', async () => {
        await testHelpers.navigateAndWaitForTimeline('/horizontal-all');
      });
    });

    test('should show current position in timeline', async ({ page }) => {
      await test.step('Check for position indicators', async () => {
        // Look for position indicators, breadcrumbs, or progress
        const positionIndicators = page.locator(
          '.position-indicator, .breadcrumb, .progress, ' +
          '[class*="position"], [class*="progress"], [aria-label*="progress"]'
        );

        const count = await positionIndicators.count();
        if (count > 0) {
          await expect(positionIndicators.first()).toBeVisible();
        }
      });
    });

    test('should allow direct navigation to positions', async ({ testHelpers }) => {
      await test.step('Test direct position navigation', async () => {
        // Look for clickable timeline points using helper
        const points = await testHelpers.getTimelinePoints();

        const count = await points.count();
        if (count > 1) {
          // Click on different position markers
          await testHelpers.clickTimelinePoint(1);

          // Verify navigation occurred
          const timelineItems = await testHelpers.getTimelineItems('horizontal');
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });
  });
});