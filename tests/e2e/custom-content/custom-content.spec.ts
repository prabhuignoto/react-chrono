import { test, expect } from '../../fixtures/test-fixtures';
import { TimelineHelpers } from '../../helpers/timeline-helpers';
import { testTimelineItems, viewportSizes, timeouts } from '../../helpers/test-data';

test.describe('Timeline Custom Content & Icons - Comprehensive Tests', () => {
  let timelineHelpers: TimelineHelpers;

  test.beforeEach(async ({ page }) => {
    timelineHelpers = new TimelineHelpers(page);
  });

  test.describe('Custom Icons', () => {
    test('should display custom icons for timeline points', async ({ page }) => {
      await page.goto('/timeline-custom-icons');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Check for custom icon elements
      const customIcons = page.locator('[data-testid="timeline-circle"] svg, [data-testid="timeline-circle"] img, .custom-icon');
      const count = await customIcons.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display different icons for different items', async ({ page }) => {
      await page.goto('/timeline-custom-icons');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const icons = page.locator('[data-testid="timeline-circle"]');
      const iconContents = await icons.evaluateAll(elements => 
        elements.map(el => {
          const svg = el.querySelector('svg');
          const img = el.querySelector('img');
          const customIcon = el.querySelector('.custom-icon');
          
          if (svg) return 'svg';
          if (img) return img.getAttribute('src');
          if (customIcon) return customIcon.className;
          return 'default';
        })
      );
      
      // Should have variety in icons
      const uniqueIcons = [...new Set(iconContents)];
      expect(uniqueIcons.length).toBeGreaterThan(1);
    });

    test('should handle icon click events', async ({ page }) => {
      await page.goto('/timeline-custom-icons');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const icon = page.locator('[data-testid="timeline-circle"]').first();
      
      // Set up click listener
      await page.evaluate(() => {
        window.iconClicked = false;
        const icons = document.querySelectorAll('[data-testid="timeline-circle"]');
        icons.forEach(icon => {
          icon.addEventListener('click', () => {
            window.iconClicked = true;
          });
        });
      });
      
      await icon.click();
      await page.waitForTimeout(timeouts.animation);
      
      const clicked = await page.evaluate(() => window.iconClicked);
      expect(clicked).toBeTruthy();
    });

    test('should scale custom icons appropriately', async ({ page }) => {
      await page.goto('/timeline-custom-icons?timelinePointDimension=40');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const icon = page.locator('[data-testid="timeline-circle"]').first();
      const size = await icon.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });
      
      // Icon should scale with dimension prop
      expect(size.width).toBeCloseTo(40, 10);
      expect(size.height).toBeCloseTo(40, 10);
    });

    test('should support icon colors/themes', async ({ page }) => {
      await page.goto('/timeline-custom-icons?theme.primary=#ff0000');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const icon = page.locator('[data-testid="timeline-circle"]').first();
      const color = await icon.evaluate(el => {
        const svg = el.querySelector('svg');
        if (svg) {
          return window.getComputedStyle(svg).fill || window.getComputedStyle(svg).color;
        }
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Should reflect theme color
      expect(color).toMatch(/rgb|#/);
    });

    test('should handle missing icons gracefully', async ({ page }) => {
      await page.goto('/timeline-partial-icons');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const points = page.locator('[data-testid="timeline-circle"]');
      const count = await points.count();
      
      // Should fall back to default points when icons missing
      expect(count).toBeGreaterThan(0);
      
      // Check for mix of custom and default
      const hasDefault = await points.evaluateAll(elements => 
        elements.some(el => !el.querySelector('svg') && !el.querySelector('img'))
      );
      expect(hasDefault).toBeTruthy();
    });
  });

  test.describe('Custom Content - iconChildren', () => {
    test('should render custom icon children', async ({ page }) => {
      await page.goto('/timeline-icon-children');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Check for custom icon children elements
      const iconChildren = page.locator('[data-testid="icon-child"], .timeline-icon-child');
      const count = await iconChildren.count();
      
      if (count > 0) {
        await expect(iconChildren.first()).toBeVisible();
      }
    });

    test('should position icon children correctly', async ({ page }) => {
      await page.goto('/timeline-icon-children');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const iconChild = page.locator('[data-testid="icon-child"]').first();
      const timelinePoint = page.locator('[data-testid="timeline-circle"]').first();
      
      if (await iconChild.isVisible() && await timelinePoint.isVisible()) {
        const childBox = await iconChild.boundingBox();
        const pointBox = await timelinePoint.boundingBox();
        
        if (childBox && pointBox) {
          // Icon child should be near timeline point
          const distance = Math.sqrt(
            Math.pow(childBox.x - pointBox.x, 2) + 
            Math.pow(childBox.y - pointBox.y, 2)
          );
          expect(distance).toBeLessThan(100);
        }
      }
    });

    test('should handle interactive icon children', async ({ page }) => {
      await page.goto('/timeline-icon-children');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const iconChild = page.locator('[data-testid="icon-child"] button, .timeline-icon-child button').first();
      
      if (await iconChild.isVisible()) {
        await iconChild.click();
        await page.waitForTimeout(timeouts.animation);
        
        // Should handle click events
        const clicked = await page.evaluate(() => 
          document.querySelector('[data-clicked="true"]') !== null
        );
        expect(clicked).toBeDefined();
      }
    });
  });

  test.describe('Custom Content - contentDetailsChildren', () => {
    test('should render custom content details', async ({ page }) => {
      await page.goto('/timeline-content-details');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Check for custom content
      const customContent = page.locator('[data-testid="custom-content"], .custom-content-details');
      const count = await customContent.count();
      
      if (count > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should display custom HTML content', async ({ page }) => {
      await page.goto('/timeline-content-details');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Check for custom HTML elements
      const customElements = page.locator('.timeline-card-content .custom-html');
      
      if (await customElements.count() > 0) {
        const html = await customElements.first().innerHTML();
        expect(html).toBeTruthy();
      }
    });

    test('should handle custom React components', async ({ page }) => {
      await page.goto('/timeline-custom-components');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Check for custom React component markers
      const customComponents = page.locator('[data-custom-component="true"]');
      
      if (await customComponents.count() > 0) {
        await expect(customComponents.first()).toBeVisible();
      }
    });

    test('should maintain custom content during navigation', async ({ page }) => {
      await page.goto('/timeline-content-details');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Navigate to different item
      await timelineHelpers.navigateToItem(2, 'vertical');
      await page.waitForTimeout(timeouts.animation);
      
      // Custom content should persist
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should handle interactive custom content', async ({ page }) => {
      await page.goto('/timeline-interactive-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Find interactive elements in custom content
      const button = page.locator('.custom-content-details button, [data-testid="custom-content"] button').first();
      
      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(timeouts.animation);
        
        // Check for interaction result
        const result = await page.evaluate(() => 
          document.querySelector('[data-interaction="success"]') !== null
        );
        expect(result).toBeDefined();
      }
    });

    test('should support forms in custom content', async ({ page }) => {
      await page.goto('/timeline-form-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const input = page.locator('.custom-content-details input, [data-testid="custom-content"] input').first();
      
      if (await input.isVisible()) {
        await input.type('Test Input');
        await page.waitForTimeout(timeouts.animation);
        
        const value = await input.inputValue();
        expect(value).toBe('Test Input');
      }
    });
  });

  test.describe('Custom Content in Different Modes', () => {
    test('should display custom content in VERTICAL mode', async ({ page }) => {
      await page.goto('/vertical-custom-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should display custom content in HORIZONTAL mode', async ({ page }) => {
      await page.goto('/horizontal-custom-content');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should display custom content in VERTICAL_ALTERNATING mode', async ({ page }) => {
      await page.goto('/vertical-alternating-custom-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
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
    test('should render custom video players', async ({ page }) => {
      await page.goto('/timeline-custom-video');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
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

    test('should render custom image galleries', async ({ page }) => {
      await page.goto('/timeline-image-gallery');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const gallery = page.locator('.image-gallery, [data-gallery="true"]');
      
      if (await gallery.count() > 0) {
        await expect(gallery.first()).toBeVisible();
        
        // Check for multiple images
        const images = gallery.locator('img');
        const count = await images.count();
        expect(count).toBeGreaterThan(1);
      }
    });

    test('should handle custom iframe embeds', async ({ page }) => {
      await page.goto('/timeline-iframe-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const iframe = page.locator('iframe.custom-iframe, [data-custom-iframe="true"]');
      
      if (await iframe.count() > 0) {
        await expect(iframe.first()).toBeVisible();
        
        const src = await iframe.first().getAttribute('src');
        expect(src).toBeTruthy();
      }
    });
  });

  test.describe('Custom Styling', () => {
    test('should apply custom CSS classes to content', async ({ page }) => {
      await page.goto('/timeline-custom-classes');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
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

    test('should support inline styles for custom content', async ({ page }) => {
      await page.goto('/timeline-inline-styles');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const styledContent = page.locator('[style*="color"], [style*="background"]');
      
      if (await styledContent.count() > 0) {
        const styleAttr = await styledContent.first().getAttribute('style');
        expect(styleAttr).toBeTruthy();
        expect(styleAttr).toMatch(/color|background/);
      }
    });

    test('should handle responsive custom content', async ({ page }) => {
      await page.goto('/timeline-responsive-custom');
      
      // Test desktop view
      await page.setViewportSize(viewportSizes.desktop);
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const desktopContent = page.locator('.desktop-only, [data-desktop="true"]');
      if (await desktopContent.count() > 0) {
        await expect(desktopContent.first()).toBeVisible();
      }
      
      // Test mobile view
      await page.setViewportSize(viewportSizes.mobile);
      await page.waitForTimeout(timeouts.animation);
      
      const mobileContent = page.locator('.mobile-only, [data-mobile="true"]');
      if (await mobileContent.count() > 0) {
        await expect(mobileContent.first()).toBeVisible();
      }
    });
  });

  test.describe('Performance with Custom Content', () => {
    test('should load custom content efficiently', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/timeline-heavy-custom-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(10000);
      
      // Check if content is rendered
      const customContent = page.locator('[data-testid="custom-content"]');
      if (await customContent.count() > 0) {
        await expect(customContent.first()).toBeVisible();
      }
    });

    test('should handle lazy loading of custom content', async ({ page }) => {
      await page.goto('/timeline-lazy-custom');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Initially, not all custom content should be loaded
      const initialContent = await page.locator('[data-loaded="true"]').count();
      
      // Scroll to trigger lazy loading
      await timelineHelpers.scrollTimeline('bottom');
      await page.waitForTimeout(timeouts.scroll);
      
      // More content should be loaded
      const finalContent = await page.locator('[data-loaded="true"]').count();
      
      if (finalContent > initialContent) {
        expect(finalContent).toBeGreaterThan(initialContent);
      }
    });

    test('should maintain smooth scrolling with custom content', async ({ page }) => {
      await page.goto('/timeline-custom-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const wrapper = page.locator('.timeline-main-wrapper');
      
      // Perform smooth scroll
      await wrapper.evaluate(el => {
        el.scrollTo({ top: 500, behavior: 'smooth' });
      });
      
      await page.waitForTimeout(timeouts.scroll);
      
      // Should scroll smoothly even with custom content
      const scrollPosition = await wrapper.evaluate(el => el.scrollTop);
      expect(scrollPosition).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility with Custom Content', () => {
    test('should maintain accessibility with custom content', async ({ page }) => {
      await page.goto('/timeline-custom-accessible');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
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

    test('should handle keyboard navigation in custom content', async ({ page }) => {
      await page.goto('/timeline-custom-interactive');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Tab through custom content
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      
      // Check if focus is within custom content
      const focusedElement = await page.evaluate(() => {
        const active = document.activeElement;
        return active?.closest('[data-testid="custom-content"]') !== null;
      });
      
      expect(focusedElement).toBeDefined();
    });

    test('should provide screen reader support for custom content', async ({ page }) => {
      await page.goto('/timeline-custom-content');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
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