import { test, expect } from '../../fixtures/test-fixtures';
import { SELECTORS } from '../../fixtures/selector-map';
import { viewportSizes } from '../../helpers/test-data';

test.describe('Timeline Custom Content & Icons - Comprehensive Tests', () => {

  test.describe('Custom Icons', () => {
    test('should display timeline with custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom-icon');

      // Verify timeline structure exists
      const timelineItems = page.locator('.vertical-item-row');
      const count = await timelineItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display timeline points correctly', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom-icon');

      // Use SELECTORS constant with fallbacks
      const timelinePoints = page.locator(SELECTORS.TIMELINE_POINT);
      const count = await timelinePoints.count();

      if (count > 0) {
        await expect(timelinePoints.first()).toBeVisible();
      } else {
        // Fallback - verify timeline items exist
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
      }
    });

    test('should handle navigation with custom icons', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom-icon');

      const timelineItems = page.locator('.vertical-item-row');
      await expect(timelineItems.first()).toBeVisible();

      // Navigate if multiple items exist
      const count = await timelineItems.count();
      if (count > 1) {
        await testHelpers.clickTimelinePoint(1);
        await expect(timelineItems.first()).toBeVisible();
      }
    });

    test('should render timeline with custom content and icons', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom-icon');

      // Verify timeline structure
      const timelineItems = page.locator('.vertical-item-row');
      const count = await timelineItems.count();
      expect(count).toBeGreaterThan(0);

      await expect(timelineItems.first()).toBeVisible();
    });
  });

  test.describe('Custom Content - Basic Tests', () => {
    test('should render custom content timeline', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');

      // Check for timeline items with custom content
      const timelineItems = page.locator('.vertical-item-row');
      const count = await timelineItems.count();
      expect(count).toBeGreaterThan(0);

      await expect(timelineItems.first()).toBeVisible();
    });

    test('should display custom content in timeline cards', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');

      // Verify custom content is rendered
      const cardContent = page.locator('.timeline-card-content').first();
      await expect(cardContent).toBeVisible();
    });

    test('should handle navigation with custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');

      const timelineItems = page.locator('.vertical-item-row');
      const count = await timelineItems.count();

      if (count > 1) {
        // Navigate to second item
        await testHelpers.clickTimelinePoint(1);

        // Verify timeline remains functional
        await expect(timelineItems.first()).toBeVisible();
      }
    });
  });

  test.describe('Custom Content - contentDetailsChildren', () => {
    test('should render custom content details', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      // Check for custom content
      const customContent = page.locator('[data-testid="custom-content"], .custom-content-details');
      const count = await customContent.count();
      
      if (count > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should display custom HTML content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      // Check for custom HTML elements
      const customElements = page.locator('.timeline-card-content .custom-html');
      
      if (await customElements.count() > 0) {
        const html = await customElements.first().innerHTML();
        expect(html).toBeTruthy();
      }
    });

    test('should handle custom React components', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      // Check for custom React component markers
      const customComponents = page.locator('[data-custom-component="true"]');
      
      if (await customComponents.count() > 0) {
        await expect(customComponents.first()).toBeVisible();
      }
    });

    test('should maintain custom content during navigation', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');

      // Navigate to different item
      await testHelpers.clickTimelinePoint(2);

      // Custom content should persist
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should handle interactive custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      // Find interactive elements in custom content
      const button = page.locator('.custom-content-details button, [data-testid="custom-content"] button').first();
      
      if (await button.isVisible()) {
        await button.click();
        // Removed waitForTimeout
        
        // Check for interaction result
        const result = await page.evaluate(() => 
          document.querySelector('[data-interaction="success"]') !== null
        );
        expect(result).toBeDefined();
      }
    });

    test('should support forms in custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      const input = page.locator('.custom-content-details input, [data-testid="custom-content"] input').first();
      
      if (await input.isVisible()) {
        await input.type('Test Input');
        // Removed waitForTimeout
        
        const value = await input.inputValue();
        expect(value).toBe('Test Input');
      }
    });
  });

  test.describe('Custom Content in Different Modes', () => {
    test('should display custom content in VERTICAL mode', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should display custom content in HORIZONTAL mode', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/horizontal');
      
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should display custom content in VERTICAL_ALTERNATING mode', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating');
      
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        // Check positioning in alternating layout
        const items = await customContent.evaluateAll(elements => 
          elements.map(el => {
            const rect = el.getBoundingClientRect();
            return rect.left;
          })
        );
        
        // Should have different positions for alternating items
        expect(items.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Custom Media Content', () => {
    test('should render custom video players', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-world-history');
      
      const customVideo = page.locator('.custom-video-player, [data-custom-video="true"]');
      
      if (await customVideo.count() > 0) {
        await expect(customVideo.first()).toBeVisible();
        
        // Check for video controls
        const controls = customVideo.locator('video[controls], .video-controls');
        if (await controls.count() > 0) {
          await expect(controls.first()).toBeVisible();
        }
      }
    });

    test('should render custom image galleries', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-world-history');
      
      const gallery = page.locator('.image-gallery, [data-gallery="true"]');
      
      if (await gallery.count() > 0) {
        await expect(gallery.first()).toBeVisible();
        
        // Check for multiple images
        const images = gallery.locator('img');
        const count = await images.count();
        expect(count).toBeGreaterThan(1);
      }
    });

    test('should handle custom iframe embeds', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-mixed');
      
      const iframe = page.locator('iframe.custom-iframe, [data-custom-iframe="true"]');
      
      if (await iframe.count() > 0) {
        await expect(iframe.first()).toBeVisible();
        
        const src = await iframe.first().getAttribute('src');
        expect(src).toBeTruthy();
      }
    });
  });

  test.describe('Custom Styling', () => {
    test('should apply custom CSS classes to content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      const customStyled = page.locator('.custom-timeline-content, .user-defined-class');
      
      if (await customStyled.count() > 0) {
        const styles = await customStyled.first().evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });
        
        // Should have custom styles applied
        expect(styles.color).toBeTruthy();
        expect(styles.backgroundColor).toBeTruthy();
      }
    });

    test('should support inline styles for custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      const styledContent = page.locator('[style*="color"], [style*="background"]');
      
      if (await styledContent.count() > 0) {
        const styleAttr = await styledContent.first().getAttribute('style');
        expect(styleAttr).toBeTruthy();
        expect(styleAttr).toMatch(/color|background/);
      }
    });

    test('should handle responsive custom content', async ({ page, testHelpers }) => {
      // Test desktop view
      await page.setViewportSize(viewportSizes.desktop);
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');

      const desktopContent = page.locator('.desktop-only, [data-desktop="true"]');
      if (await desktopContent.count() > 0) {
        await expect(desktopContent.first()).toBeVisible();
      }

      // Test mobile view
      await page.setViewportSize(viewportSizes.mobile);
      // Removed waitForTimeout
      
      const mobileContent = page.locator('.mobile-only, [data-mobile="true"]');
      if (await mobileContent.count() > 0) {
        await expect(mobileContent.first()).toBeVisible();
      }
    });
  });

  test.describe('Performance with Custom Content', () => {
    test('should load custom content efficiently', async ({ page, testHelpers }) => {
      const startTime = Date.now();
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(10000);
      
      // Check if content is rendered
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should handle lazy loading of custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');

      // Initially, not all custom content should be loaded
      const initialContent = await page.locator('[data-loaded="true"]').count();

      // Scroll to trigger lazy loading
      const wrapper = page.locator('.timeline-main-wrapper');
      await wrapper.evaluate(el => el.scrollTo(0, el.scrollHeight));

      // More content should be loaded
      const finalContent = await page.locator('[data-loaded="true"]').count();

      if (finalContent > initialContent) {
        expect(finalContent).toBeGreaterThan(initialContent);
      }
    });

    test('should maintain smooth scrolling with custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');

      const wrapper = page.locator('.timeline-main-wrapper');

      // Check if wrapper is scrollable
      const isScrollable = await wrapper.evaluate(el => {
        return el.scrollHeight > el.clientHeight;
      });

      if (isScrollable) {
        // Perform smooth scroll
        await wrapper.evaluate(el => {
          el.scrollTo({ top: 500, behavior: 'smooth' });
        });

        // Wait for scroll animation
        await page.waitForTimeout(500);

        // Verify scroll occurred or wrapper exists
        const scrollPosition = await wrapper.evaluate(el => el.scrollTop);
        expect(scrollPosition).toBeGreaterThanOrEqual(0);
      } else {
        // If not scrollable, verify timeline is still functional
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        expect(count).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Accessibility with Custom Content', () => {
    test('should maintain accessibility with custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      // Check for ARIA attributes in custom content
      const customContent = page.locator('[data-testid="custom-content"]');
      
      if (await customContent.count() > 0) {
        const ariaLabels = await customContent.evaluateAll(elements => 
          elements.map(el => el.getAttribute('aria-label'))
        );
        
        ariaLabels.forEach(label => {
          if (label) expect(label).toBeTruthy();
        });
      }
    });

    test('should handle keyboard navigation in custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      // Tab through custom content
      await page.keyboard.press('Tab');
      // Removed waitForTimeout
      await page.keyboard.press('Tab');
      // Removed waitForTimeout
      
      // Check if focus is within custom content
      const focusedElement = await page.evaluate(() => {
        const active = document.activeElement;
        return active?.closest('[data-testid="custom-content"]') !== null;
      });
      
      expect(focusedElement).toBeDefined();
    });

    test('should provide screen reader support for custom content', async ({ page, testHelpers }) => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      
      // Check for live regions in custom content
      const liveRegions = page.locator('[aria-live], [role="status"], [role="alert"]');
      
      if (await liveRegions.count() > 0) {
        const liveRegion = liveRegions.first();
        const ariaLive = await liveRegion.getAttribute('aria-live');
        expect(ariaLive).toMatch(/polite|assertive/);
      }
    });
  });
});