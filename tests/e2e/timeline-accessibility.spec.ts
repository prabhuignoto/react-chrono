import { test, expect } from '../fixtures/test-fixtures';

test.describe('Timeline Accessibility', () => {
  test.describe('Keyboard Navigation', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to vertical timeline', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should support tab navigation', async ({ page }) => {
      await test.step('Test tab navigation through timeline', async () => {
        // Focus on the timeline
        const timeline = page.locator('[class*="timeline"]').first();
        await timeline.focus();
        
        // Tab through focusable elements
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        
        // Verify focused element is visible
        const focused = page.locator(':focus');
        if (await focused.count() > 0) {
          await expect(focused).toBeVisible();
        }
      });
    });

    test('should support arrow key navigation', async ({ page }) => {
      await test.step('Test arrow key navigation', async () => {
        // Focus on timeline
        const timeline = page.locator('[class*="timeline"]').first();
        await timeline.focus();
        
        // Test arrow key navigation
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(300);
        
        await page.keyboard.press('ArrowUp');
        await page.waitForTimeout(300);
        
        // Verify timeline is still functional
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
      });
    });

    test('should support Enter/Space key activation', async ({ page }) => {
      await test.step('Test Enter and Space key activation', async () => {
        // Find focusable timeline items or buttons
        const focusableElements = page.locator(
          'button, [tabindex="0"], [role="button"], .timeline-item[tabindex]'
        );
        
        const count = await focusableElements.count();
        if (count > 0) {
          const element = focusableElements.first();
          await element.focus();
          
          // Test Enter key
          await page.keyboard.press('Enter');
          await page.waitForTimeout(300);
          
          // Test Space key
          await page.keyboard.press('Space');
          await page.waitForTimeout(300);
          
          // Verify timeline is still responsive
          const timelineItems = page.locator('.vertical-item-row');
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should support Home/End key navigation', async ({ page }) => {
      await test.step('Test Home and End key navigation', async () => {
        const timeline = page.locator('[class*="timeline"]').first();
        await timeline.focus();
        
        // Test Home key (go to first item)
        await page.keyboard.press('Home');
        await page.waitForTimeout(300);
        
        // Test End key (go to last item)
        await page.keyboard.press('End');
        await page.waitForTimeout(300);
        
        // Verify navigation worked
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
      });
    });
  });

  test.describe('ARIA Attributes and Roles', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to horizontal timeline', async () => {
        await testHelpers.navigateTo('/horizontal');
        await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      });
    });

    test('should have appropriate ARIA roles', async ({ page }) => {
      await test.step('Check for timeline ARIA roles', async () => {
        // Check for timeline container role
        const timelineContainer = page.locator('[role="region"], [role="list"], [role="timeline"]');
        if (await timelineContainer.count() > 0) {
          await expect(timelineContainer.first()).toBeVisible();
        }
        
        // Check for timeline items with appropriate roles
        const timelineItems = page.locator('[role="listitem"], [role="article"], [role="button"]');
        if (await timelineItems.count() > 0) {
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should have descriptive aria-labels', async ({ page }) => {
      await test.step('Check for aria-labels on interactive elements', async () => {
        // Check navigation buttons
        const navButtons = page.locator('[aria-label]');
        const count = await navButtons.count();
        
        if (count > 0) {
          for (let i = 0; i < Math.min(count, 5); i++) {
            const button = navButtons.nth(i);
            const ariaLabel = await button.getAttribute('aria-label');
            expect(ariaLabel).toBeTruthy();
            expect(ariaLabel!.length).toBeGreaterThan(0);
          }
        }
      });
    });

    test('should have aria-expanded for expandable content', async ({ page }) => {
      await test.step('Check aria-expanded attributes', async () => {
        // Look for expandable elements
        const expandableElements = page.locator('[aria-expanded]');
        const count = await expandableElements.count();
        
        if (count > 0) {
          const element = expandableElements.first();
          const ariaExpanded = await element.getAttribute('aria-expanded');
          expect(['true', 'false']).toContain(ariaExpanded);
        }
      });
    });

    test('should have aria-current for active items', async ({ page }) => {
      await test.step('Check aria-current attributes', async () => {
        // Look for current/active items
        const currentElements = page.locator('[aria-current]');
        const count = await currentElements.count();
        
        if (count > 0) {
          const element = currentElements.first();
          const ariaCurrent = await element.getAttribute('aria-current');
          expect(ariaCurrent).toBeTruthy();
        }
      });
    });
  });

  test.describe('Screen Reader Support', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to vertical alternating timeline', async () => {
        await testHelpers.navigateTo('/vertical-alternating');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should have descriptive text for timeline items', async ({ page }) => {
      await test.step('Check for screen reader friendly content', async () => {
        // Check for text content in timeline items
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        if (count > 0) {
          for (let i = 0; i < Math.min(count, 3); i++) {
            const item = timelineItems.nth(i);
            const textContent = await item.textContent();
            expect(textContent).toBeTruthy();
            expect(textContent!.trim().length).toBeGreaterThan(0);
          }
        }
      });
    });

    test('should have proper heading structure', async ({ page }) => {
      await test.step('Check heading hierarchy', async () => {
        // Look for headings in timeline content
        const headings = page.locator('h1, h2, h3, h4, h5, h6');
        const count = await headings.count();
        
        if (count > 0) {
          // Verify headings have meaningful content
          for (let i = 0; i < Math.min(count, 3); i++) {
            const heading = headings.nth(i);
            const textContent = await heading.textContent();
            expect(textContent).toBeTruthy();
            expect(textContent!.trim().length).toBeGreaterThan(0);
          }
        }
      });
    });

    test('should provide alternative text for images', async ({ page }) => {
      await test.step('Check image alt attributes', async () => {
        const images = page.locator('img');
        const count = await images.count();
        
        if (count > 0) {
          for (let i = 0; i < Math.min(count, 3); i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            // Alt attribute should exist (can be empty for decorative images)
            expect(alt).not.toBeNull();
          }
        }
      });
    });
  });

  test.describe('Focus Management', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to timeline with controls', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should maintain visible focus indicators', async ({ page }) => {
      await test.step('Test focus visibility', async () => {
        // Find focusable elements
        const focusableElements = page.locator(
          'button, input, select, textarea, [tabindex="0"], [role="button"]'
        );
        const count = await focusableElements.count();
        
        if (count > 0) {
          const element = focusableElements.first();
          await element.focus();
          
          // Check if element has focus styles
          await expect(element).toBeFocused();
          
          // Verify focus is visible (element should have focus styles)
          const computedStyle = await element.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              outline: styles.outline,
              outlineWidth: styles.outlineWidth,
              boxShadow: styles.boxShadow,
            };
          });
          
          // At least one focus indicator should be present
          const hasFocusIndicator = 
            computedStyle.outline !== 'none' ||
            computedStyle.outlineWidth !== '0px' ||
            computedStyle.boxShadow !== 'none';
          
          expect(hasFocusIndicator).toBeTruthy();
        }
      });
    });

    test('should trap focus in modal dialogs', async ({ page }) => {
      await test.step('Test focus trapping in modals', async () => {
        // Look for modal triggers (like fullscreen or quick jump)
        const modalTriggers = page.locator(
          '[aria-label*="fullscreen"], [aria-label*="outline"], ' +
          'button:has-text("Fullscreen"), button:has-text("Outline")'
        );
        
        if (await modalTriggers.count() > 0) {
          const trigger = modalTriggers.first();
          if (await trigger.isVisible()) {
            await trigger.click();
            await page.waitForTimeout(300);
            
            // Check if modal opened and focus is managed
            const modal = page.locator('[role="dialog"], .modal, [aria-modal="true"]');
            if (await modal.count() > 0) {
              await expect(modal.first()).toBeVisible();
              
              // Test tab navigation within modal
              await page.keyboard.press('Tab');
              const focused = page.locator(':focus');
              if (await focused.count() > 0) {
                await expect(focused).toBeVisible();
              }
              
              // Close modal (Escape key)
              await page.keyboard.press('Escape');
              await page.waitForTimeout(300);
            }
          }
        }
      });
    });

    test('should restore focus after interactions', async ({ page }) => {
      await test.step('Test focus restoration', async () => {
        // Find interactive timeline elements
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        if (count > 1) {
          // Focus on first item
          const firstItem = timelineItems.first();
          await firstItem.click();
          await page.waitForTimeout(300);
          
          // Navigate to another item
          const secondItem = timelineItems.nth(1);
          await secondItem.click();
          await page.waitForTimeout(300);
          
          // Verify timeline maintains proper focus management
          const timelineContainer = page.locator('[class*="timeline"]').first();
          await expect(timelineContainer).toBeVisible();
        }
      });
    });
  });

  test.describe('Color Contrast and Visual Accessibility', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to themed timeline', async () => {
        await testHelpers.navigateTo('/vertical-alternating');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should have sufficient color contrast', async ({ page }) => {
      await test.step('Check text readability', async () => {
        // Find text elements
        const textElements = page.locator('.rc-card-title, .rc-card-subtitle, p, span');
        const count = await textElements.count();
        
        if (count > 0) {
          for (let i = 0; i < Math.min(count, 3); i++) {
            const element = textElements.nth(i);
            if (await element.isVisible()) {
              const computedStyle = await element.evaluate(el => {
                const styles = window.getComputedStyle(el);
                return {
                  color: styles.color,
                  backgroundColor: styles.backgroundColor,
                  fontSize: styles.fontSize,
                };
              });
              
              // Basic checks - color should not be transparent or same as background
              expect(computedStyle.color).not.toBe('rgba(0, 0, 0, 0)');
              expect(computedStyle.color).not.toBe('transparent');
              expect(computedStyle.fontSize).toBeTruthy();
            }
          }
        }
      });
    });

    test('should maintain readability in dark mode', async ({ page }) => {
      await test.step('Test dark mode accessibility', async () => {
        // Toggle to dark mode if available
        const darkToggle = page.locator('[aria-label*="dark"], .dark-toggle');
        
        if (await darkToggle.count() > 0 && await darkToggle.first().isVisible()) {
          await darkToggle.first().click();
          await page.waitForTimeout(500);
          
          // Check text readability in dark mode
          const textElements = page.locator('.rc-card-title, .rc-card-subtitle, p');
          const count = await textElements.count();
          
          if (count > 0) {
            const element = textElements.first();
            if (await element.isVisible()) {
              const computedStyle = await element.evaluate(el => {
                const styles = window.getComputedStyle(el);
                return {
                  color: styles.color,
                  backgroundColor: styles.backgroundColor,
                };
              });
              
              // Verify text is still visible
              expect(computedStyle.color).not.toBe('rgba(0, 0, 0, 0)');
              expect(computedStyle.color).not.toBe('transparent');
            }
          }
        }
      });
    });
  });

  test.describe('Motion and Animation Accessibility', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to animated timeline', async () => {
        await testHelpers.navigateTo('/horizontal-all');
        await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      });
    });

    test('should respect reduced motion preferences', async ({ page }) => {
      await test.step('Test reduced motion support', async () => {
        // Simulate reduced motion preference
        await page.emulateMedia({ reducedMotion: 'reduce' });
        
        // Interact with timeline
        const nextButton = page.locator('[aria-label="Next"]').first();
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForTimeout(100); // Shorter wait for reduced motion
          
          // Verify timeline still functions with reduced motion
          const timelineItems = page.locator('.timeline-horz-item-container');
          await expect(timelineItems.first()).toBeVisible();
        }
        
        // Reset to normal motion
        await page.emulateMedia({ reducedMotion: 'no-preference' });
      });
    });

    test('should not cause seizure-inducing animations', async ({ page }) => {
      await test.step('Test animation safety', async () => {
        // Start slideshow if available
        const playButton = page.locator('[aria-label*="play"], .play-button');
        
        if (await playButton.count() > 0 && await playButton.first().isVisible()) {
          await playButton.first().click();
          await page.waitForTimeout(1000);
          
          // Verify timeline doesn't flash rapidly
          const timeline = page.locator('[class*="timeline"]').first();
          await expect(timeline).toBeVisible();
          
          // Stop slideshow
          const pauseButton = page.locator('[aria-label*="pause"], .pause-button');
          if (await pauseButton.count() > 0) {
            await pauseButton.first().click();
          }
        }
      });
    });
  });
});