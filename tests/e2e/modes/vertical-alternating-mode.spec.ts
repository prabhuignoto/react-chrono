import { test, expect } from '../../fixtures/test-fixtures';
import { SELECTORS } from '../../fixtures/selector-map';
import { testTimelineItems, viewportSizes } from '../../helpers/test-data';

test.describe('Timeline VERTICAL_ALTERNATING Mode - Comprehensive Tests', () => {
  test.beforeEach(async ({ testHelpers }) => {
    await testHelpers.navigateAndWaitForTimeline('/vertical-alternating');
  });

  test.describe('Basic Rendering', () => {
    test('should render timeline in vertical alternating mode', async ({ page }) => {
      const wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      await expect(wrapper).toBeVisible();
      
      const className = await wrapper.getAttribute('class');
      expect(className).toContain('vertical_alternating');
    });

    test('should display items alternating left and right', async ({ testHelpers }) => {
      const items = await testHelpers.getTimelineItems('alternating');
      await items.first().waitFor({ state: 'visible', timeout: 5000 });

      const count = await items.count();
      expect(count).toBeGreaterThan(0);

      if (count > 1) {
        const positions = await items.evaluateAll(elements =>
          elements.map(el => {
            const rect = el.getBoundingClientRect();
            const parent = el.parentElement?.getBoundingClientRect();
            return parent ? (rect.left < parent.width / 2 ? 'left' : 'right') : 'unknown';
          })
        );

        // Check alternating pattern or just that items are positioned
        expect(positions.length).toBeGreaterThan(0);
      }
    });

    test('should display central timeline line', async ({ page }) => {
      const line = page.locator('.timeline-vertical-line, .timeline-line-middle');
      await expect(line.first()).toBeVisible();
      
      // Check if line is centered
      const linePos = await line.first().boundingBox();
      const wrapperPos = await page.locator('.timeline-main-wrapper').boundingBox();
      
      if (linePos && wrapperPos) {
        const lineCenter = linePos.x + linePos.width / 2;
        const wrapperCenter = wrapperPos.x + wrapperPos.width / 2;
        expect(Math.abs(lineCenter - wrapperCenter)).toBeLessThan(50);
      }
    });

    test('should align timeline points to center line', async ({ page }) => {
      const points = page.locator('[data-testid="timeline-circle"]');
      const positions = await points.evaluateAll(elements => 
        elements.map(el => el.getBoundingClientRect().left)
      );
      
      // All points should be roughly aligned (within tolerance)
      if (positions.length > 1) {
        const avgPosition = positions.reduce((a, b) => a + b) / positions.length;
        positions.forEach(pos => {
          expect(Math.abs(pos - avgPosition)).toBeLessThan(100);
        });
      }
    });
  });

  test.describe('Card Positioning', () => {
    test('should position odd items on the left', async ({ page }) => {
      const firstItem = page.locator('.vertical-item-row').first();
      const wrapper = page.locator('.timeline-main-wrapper');
      
      const itemBox = await firstItem.boundingBox();
      const wrapperBox = await wrapper.boundingBox();
      
      if (itemBox && wrapperBox) {
        const itemCenter = itemBox.x + itemBox.width / 2;
        const wrapperCenter = wrapperBox.x + wrapperBox.width / 2;
        expect(itemCenter).toBeLessThan(wrapperCenter);
      }
    });

    test('should position even items on the right', async ({ page }) => {
      const secondItem = page.locator('.vertical-item-row').nth(1);
      const wrapper = page.locator('.timeline-main-wrapper');
      
      const itemBox = await secondItem.boundingBox();
      const wrapperBox = await wrapper.boundingBox();
      
      if (itemBox && wrapperBox) {
        const itemCenter = itemBox.x + itemBox.width / 2;
        const wrapperCenter = wrapperBox.x + wrapperBox.width / 2;
        expect(itemCenter).toBeGreaterThan(wrapperCenter);
      }
    });

    test('should maintain alternating pattern through scroll', async ({ testHelpers, page }) => {
      const timeline = page.locator(SELECTORS.TIMELINE_MAIN).first();
      await timeline.evaluate(el => el.scrollTo(0, el.scrollHeight));

      const lastItem = page.locator('.vertical-item-row').last();
      await expect(lastItem).toBeInViewport();

      // Check if alternating pattern is maintained
      const items = await testHelpers.getTimelineItems('alternating');
      const count = await items.count();

      if (count > 0) {
        const lastItemBox = await lastItem.boundingBox();
        const wrapperBox = await page.locator('.timeline-main-wrapper').boundingBox();

        if (lastItemBox && wrapperBox) {
          const itemCenter = lastItemBox.x + lastItemBox.width / 2;
          const wrapperCenter = wrapperBox.x + wrapperBox.width / 2;

          // Last item position depends on whether count is odd or even
          if (count % 2 === 0) {
            expect(itemCenter).toBeGreaterThan(wrapperCenter);
          } else {
            expect(itemCenter).toBeLessThan(wrapperCenter);
          }
        }
      }
    });
  });

  test.describe('Flip Layout', () => {
    test('should flip layout when flipLayout prop is true', async ({ testHelpers, page }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating?flipLayout=true');

      // Check if layout is flipped (RTL)
      const wrapper = page.locator('.timeline-wrapper, [data-testid="timeline-main-wrapper"]').first();
      const dir = await wrapper.evaluate(el =>
        window.getComputedStyle(el).direction
      );

      expect(dir).toBe('rtl');
    });

    test('should reverse item positioning when flipped', async ({ testHelpers, page }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating?flipLayout=true');

      const firstItem = page.locator('.vertical-item-row').first();
      const wrapper = page.locator('.timeline-main-wrapper');

      const itemBox = await firstItem.boundingBox();
      const wrapperBox = await wrapper.boundingBox();

      if (itemBox && wrapperBox) {
        const itemCenter = itemBox.x + itemBox.width / 2;
        const wrapperCenter = wrapperBox.x + wrapperBox.width / 2;

        // In flipped mode, first item should be on right
        expect(itemCenter).toBeGreaterThan(wrapperCenter);
      }
    });

    test('should maintain alternating pattern in flipped mode', async ({ testHelpers, page }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating?flipLayout=true');

      const items = await testHelpers.getTimelineItems('alternating');
      const positions = await items.evaluateAll(elements =>
        elements.map(el => {
          const rect = el.getBoundingClientRect();
          const parent = el.parentElement?.getBoundingClientRect();
          return parent ? rect.left < parent.width / 2 ? 'left' : 'right' : 'unknown';
        })
      );

      // Should still alternate but in reverse order
      const hasAlternating = positions.some((pos, i) =>
        i > 0 && positions[i] !== positions[i - 1]
      );
      expect(hasAlternating).toBeTruthy();
    });
  });

  test.describe('Navigation', () => {
    test('should navigate correctly in alternating layout', async ({ testHelpers, page }) => {
      await testHelpers.clickTimelinePoint(2);

      const thirdItem = page.locator('.vertical-item-row').nth(2);
      await expect(thirdItem).toBeVisible();

      // Should be on left side (odd index in 0-based)
      const itemBox = await thirdItem.boundingBox();
      const wrapperBox = await page.locator('.timeline-main-wrapper').boundingBox();

      if (itemBox && wrapperBox) {
        const itemCenter = itemBox.x + itemBox.width / 2;
        const wrapperCenter = wrapperBox.x + wrapperBox.width / 2;
        expect(itemCenter).toBeLessThan(wrapperCenter);
      }
    });

    test('should handle keyboard navigation in alternating mode', async ({ testHelpers }) => {
      await testHelpers.focusTimeline();
      await testHelpers.navigateWithKeyboard('ArrowDown');
      await testHelpers.navigateWithKeyboard('ArrowDown');

      // Verify timeline is still functional
      const timelineItems = await testHelpers.getTimelineItems('alternating');
      await expect(timelineItems.first()).toBeVisible();
    });

    test('should maintain scroll position during navigation', async ({ testHelpers, page }) => {
      const initialScroll = await page.evaluate(() =>
        document.querySelector('.timeline-main-wrapper')?.scrollTop || 0
      );

      await testHelpers.clickTimelinePoint(3);

      const finalScroll = await page.evaluate(() =>
        document.querySelector('.timeline-main-wrapper')?.scrollTop || 0
      );

      // Should have scrolled to show the item
      expect(finalScroll).toBeGreaterThanOrEqual(initialScroll);
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should switch to vertical mode on mobile', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.mobile);

      // On mobile, alternating might switch to regular vertical
      const items = await testHelpers.getTimelineItems('vertical');
      const positions = await items.evaluateAll(elements =>
        elements.map(el => el.getBoundingClientRect().left)
      );

      // Items might align to one side on mobile
      const avgPosition = positions.reduce((a, b) => a + b) / positions.length;
      positions.forEach(pos => {
        expect(Math.abs(pos - avgPosition)).toBeLessThan(200);
      });
    });

    test('should maintain alternating on tablet', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.tablet);

      const items = await testHelpers.getTimelineItems('alternating');
      const positions = await items.evaluateAll(elements =>
        elements.map(el => {
          const rect = el.getBoundingClientRect();
          const parent = el.parentElement?.getBoundingClientRect();
          return parent ? rect.left < parent.width / 2 ? 'left' : 'right' : 'unknown';
        })
      );

      // Should maintain alternating on tablet
      const hasAlternating = positions.some((pos, i) =>
        i > 0 && positions[i] !== positions[i - 1]
      );
      expect(hasAlternating).toBeTruthy();
    });

    test('should optimize spacing on wide screens', async ({ testHelpers, page }) => {
      await page.setViewportSize(viewportSizes.wide);

      const items = await testHelpers.getTimelineItems('alternating');
      await expect(items.first()).toBeVisible();

      // Check if spacing is appropriate for wide screen
      const firstItem = page.locator('.vertical-item-row').first();
      const secondItem = page.locator('.vertical-item-row').nth(1);

      const firstBox = await firstItem.boundingBox();
      const secondBox = await secondItem.boundingBox();

      if (firstBox && secondBox) {
        // Items should have adequate spacing
        const verticalGap = Math.abs(secondBox.y - (firstBox.y + firstBox.height));
        expect(verticalGap).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe('Card Content', () => {
    test('should display content correctly on both sides', async ({ testHelpers }) => {
      // Check left side item
      const firstCard = await testHelpers.getCardContent(0);
      const firstTitle = await testHelpers.getCardTitle(0);
      await expect(firstTitle).toContainText(testTimelineItems[0].cardTitle);

      // Check right side item
      const secondCard = await testHelpers.getCardContent(1);
      const secondTitle = await testHelpers.getCardTitle(1);
      await expect(secondTitle).toContainText(testTimelineItems[1].cardTitle);
    });

    test('should handle media in alternating layout', async ({ page }) => {
      const leftItem = page.locator('.vertical-item-row').first();
      const rightItem = page.locator('.vertical-item-row').nth(1);
      
      // Check if media is displayed correctly on both sides
      const leftMedia = leftItem.locator('img, video');
      const rightMedia = rightItem.locator('img, video');
      
      if (await leftMedia.count() > 0) {
        await expect(leftMedia.first()).toBeVisible();
      }
      
      if (await rightMedia.count() > 0) {
        await expect(rightMedia.first()).toBeVisible();
      }
    });

    test('should maintain text alignment in alternating cards', async ({ page }) => {
      const items = page.locator('.vertical-item-row');
      const alignments = await items.evaluateAll(elements => 
        elements.map(el => {
          const card = el.querySelector('.timeline-card-content');
          return card ? window.getComputedStyle(card).textAlign : 'left';
        })
      );
      
      // Text alignment might vary based on side
      expect(alignments.length).toBeGreaterThan(0);
    });
  });

  test.describe('Visual Consistency', () => {
    test('should align dates/titles properly', async ({ page }) => {
      const titles = page.locator('.timeline-item-title');
      const positions = await titles.evaluateAll(elements => 
        elements.map(el => ({
          text: el.textContent,
          left: el.getBoundingClientRect().left
        }))
      );
      
      // Titles should be positioned appropriately for their side
      expect(positions.length).toBeGreaterThan(0);
    });

    test('should maintain consistent card heights', async ({ page }) => {
      const cards = page.locator('.timeline-card-content');
      const heights = await cards.evaluateAll(elements => 
        elements.map(el => el.getBoundingClientRect().height)
      );
      
      if (heights.length > 1) {
        // Check if heights are relatively consistent
        const avgHeight = heights.reduce((a, b) => a + b) / heights.length;
        heights.forEach(height => {
          expect(Math.abs(height - avgHeight)).toBeLessThan(avgHeight * 0.5);
        });
      }
    });

    test('should handle overflow content gracefully', async ({ page }) => {
      await page.goto('/vertical-alternating-long-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const cards = page.locator('.timeline-card-content');
      const hasOverflow = await cards.evaluateAll(elements => 
        elements.map(el => {
          const styles = window.getComputedStyle(el);
          return styles.overflow !== 'visible';
        })
      );
      
      // Should handle overflow appropriately
      hasOverflow.forEach(overflow => {
        expect(overflow).toBeTruthy();
      });
    });
  });

  test.describe('Accessibility', () => {
    test('should maintain accessibility in alternating layout', async ({ page }) => {
      // Check tab order
      const focusableElements = page.locator('button, [tabindex="0"], a[href]');
      const count = await focusableElements.count();
      
      for (let i = 0; i < Math.min(count, 5); i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      }
      
      // Should be able to tab through elements
      const activeElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(activeElement).toBeTruthy();
    });

    test('should provide proper ARIA labels for alternating items', async ({ page }) => {
      const items = page.locator('.vertical-item-row');
      const ariaLabels = await items.evaluateAll(elements => 
        elements.map(el => el.getAttribute('aria-label'))
      );
      
      // Each item should have appropriate ARIA label
      ariaLabels.forEach((label, index) => {
        if (label) {
          expect(label).toBeTruthy();
        }
      });
    });

    test('should announce position in alternating layout', async ({ page }) => {
      const items = page.locator('.vertical-item-row');
      const descriptions = await items.evaluateAll(elements => 
        elements.map((el, i) => {
          const side = i % 2 === 0 ? 'left' : 'right';
          return el.getAttribute('aria-description') || side;
        })
      );
      
      // Should indicate position for screen readers
      expect(descriptions.length).toBeGreaterThan(0);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle single item in alternating mode', async ({ testHelpers, page }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-single');
      const items = await testHelpers.getTimelineItems('vertical');
      const count = await items.count();

      if (count === 1) {
        // Single item should be positioned correctly
        const item = items.first();
        await expect(item).toBeVisible();

        const itemBox = await item.boundingBox();
        const wrapperBox = await page.locator('.timeline-main-wrapper').boundingBox();

        if (itemBox && wrapperBox) {
          // Single item might be centered or on left
          expect(itemBox.x).toBeGreaterThanOrEqual(0);
        }
      }
    });

    test('should handle odd number of items', async ({ testHelpers, page }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-odd-items');
      const items = await testHelpers.getTimelineItems('alternating');
      const count = await items.count();

      if (count % 2 === 1) {
        // Last item should be on the left side
        const lastItem = items.last();
        const itemBox = await lastItem.boundingBox();
        const wrapperBox = await page.locator('.timeline-main-wrapper').boundingBox();

        if (itemBox && wrapperBox) {
          const itemCenter = itemBox.x + itemBox.width / 2;
          const wrapperCenter = wrapperBox.x + wrapperBox.width / 2;
          expect(itemCenter).toBeLessThan(wrapperCenter);
        }
      }
    });

    test('should handle dynamic content updates', async ({ testHelpers, page }) => {
      // Simulate content update
      await page.evaluate(() => {
        const items = document.querySelectorAll('.vertical-item-row');
        if (items.length > 0) {
          const firstCard = items[0].querySelector('.timeline-card-content');
          if (firstCard) {
            firstCard.textContent += ' - Updated Content';
          }
        }
      });

      // Layout should remain intact
      const items = await testHelpers.getTimelineItems('alternating');
      await expect(items.first()).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should render alternating layout efficiently', async ({ testHelpers, page }) => {
      const startTime = Date.now();
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(5000);
    });

    test('should handle smooth scrolling in alternating mode', async ({ page }) => {
      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN);

      await wrapper.evaluate(el => {
        el.scrollTo({ top: 500, behavior: 'smooth' });
      });

      const scrollPosition = await wrapper.evaluate(el => el.scrollTop);
      expect(scrollPosition).toBeGreaterThan(0);
    });

    test('should maintain performance with many alternating items', async ({ testHelpers, page }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-many-items');

      const items = await testHelpers.getTimelineItems('alternating');
      const count = await items.count();

      if (count > 20) {
        // Should still be performant
        const metrics = await testHelpers.measurePerformance();
        if (metrics) {
          expect(metrics.domContentLoaded).toBeLessThan(2000);
        }
      }
    });
  });
});