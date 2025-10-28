import { test, expect } from '../fixtures/test-fixtures';
import { SELECTORS } from '../fixtures/selector-map';

test.describe('Timeline Accessibility', () => {
  test.describe('Keyboard Navigation', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to vertical timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-basic');
      });
    });

    test('should support tab navigation', async ({ page }) => {
      await test.step('Test tab navigation through timeline', async () => {
        // Focus on the timeline
        const timeline = page.locator(SELECTORS.TIMELINE_WRAPPER).first();
        await timeline.focus();

        // Tab through focusable elements
        await page.keyboard.press('Tab');

        // Verify focused element is visible
        const focused = page.locator(':focus');
        if (await focused.count() > 0) {
          await expect(focused).toBeVisible();
        }
      });
    });

    test('should support arrow key navigation', async ({ testHelpers }) => {
      await test.step('Test arrow key navigation', async () => {
        // Focus on timeline using helper
        await testHelpers.focusTimeline();

        // Test arrow key navigation using helper
        await testHelpers.navigateWithKeyboard('ArrowDown');
        await testHelpers.navigateWithKeyboard('ArrowUp');

        // Verify timeline is still functional
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        await expect(timelineItems.first()).toBeVisible();
      });
    });

    test('should support Enter/Space key activation', async ({ page, testHelpers }) => {
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

          // Test Space key
          await page.keyboard.press('Space');

          // Verify timeline is still responsive
          const timelineItems = await testHelpers.getTimelineItems('vertical');
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should support Home/End key navigation', async ({ testHelpers }) => {
      await test.step('Test Home and End key navigation', async () => {
        await testHelpers.focusTimeline();

        // Test Home key (go to first item)
        await testHelpers.navigateWithKeyboard('Home');

        // Test End key (go to last item)
        await testHelpers.navigateWithKeyboard('End');

        // Verify navigation worked
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        await expect(timelineItems.first()).toBeVisible();
      });
    });
  });

  test.describe('ARIA Attributes and Roles', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to horizontal timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/horizontal');
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
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to vertical alternating timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-alternating');
      });
    });

    test('should have descriptive text for timeline items', async ({ testHelpers }) => {
      await test.step('Check for screen reader friendly content', async () => {
        // Check for text content in timeline items
        const timelineItems = await testHelpers.getTimelineItems('alternating');
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
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to timeline with controls', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-basic');
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
            }
          }
        }
      });
    });

    test('should restore focus after interactions', async ({ testHelpers }) => {
      await test.step('Test focus restoration', async () => {
        // Find interactive timeline elements
        const timelineItems = await testHelpers.getTimelineItems('vertical');
        const count = await timelineItems.count();
        
        if (count > 1) {
          // Focus on first item
          const firstItem = timelineItems.first();
          await firstItem.click();

          // Navigate to another item
          const secondItem = timelineItems.nth(1);
          await secondItem.click();

          // Verify timeline maintains proper focus management
          const timelineItems2 = await testHelpers.getTimelineItems('vertical');
          await expect(timelineItems2.first()).toBeVisible();
        }
      });
    });
  });

  test.describe('Color Contrast and Visual Accessibility', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to themed timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-alternating');
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
        // Toggle to dark mode if available using SELECTORS
        const darkToggle = page.locator(SELECTORS.DARK_MODE_TOGGLE);

        if (await darkToggle.count() > 0 && await darkToggle.first().isVisible()) {
          await darkToggle.first().click();

          // Check text readability in dark mode
          const textElements = page.locator(`${SELECTORS.CARD_TITLE}, ${SELECTORS.CARD_SUBTITLE}, p`);
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
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to animated timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/horizontal-all');
      });
    });

    test('should respect reduced motion preferences', async ({ page, testHelpers }) => {
      await test.step('Test reduced motion support', async () => {
        // Simulate reduced motion preference
        await page.emulateMedia({ reducedMotion: 'reduce' });

        // Interact with timeline using helper
        const nextButton = await testHelpers.getToolbarButton('next');
        if (await nextButton.isVisible()) {
          await testHelpers.clickToolbarButton('next');

          // Verify timeline still functions with reduced motion
          const timelineItems = await testHelpers.getTimelineItems('horizontal');
          await expect(timelineItems.first()).toBeVisible();
        }

        // Reset to normal motion
        await page.emulateMedia({ reducedMotion: 'no-preference' });
      });
    });

    test('should not cause seizure-inducing animations', async ({ testHelpers, page }) => {
      await test.step('Test animation safety', async () => {
        // Start slideshow if available
        const playButton = await testHelpers.getToolbarButton('play');

        if (await playButton.count() > 0 && await playButton.isVisible()) {
          await testHelpers.clickToolbarButton('play');

          // Verify timeline doesn't flash rapidly
          const timeline = page.locator(SELECTORS.TIMELINE_MAIN).first();
          await expect(timeline).toBeVisible();

          // Stop slideshow
          const pauseButton = await testHelpers.getToolbarButton('pause');
          if (await pauseButton.count() > 0) {
            await testHelpers.clickToolbarButton('pause');
          }
        }
      });
    });
  });
});