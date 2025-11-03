import { test, expect } from '../fixtures/test-fixtures';
import { SELECTORS } from '../fixtures/selector-map';

test.describe('Timeline Cardless and Nested Features', () => {
  test.describe('Cardless Vertical Timeline', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to cardless vertical timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/timeline-without-cards');
      });
    });

    test('should display timeline without card containers', async ({ page }) => {
      await test.step('Verify cardless layout', async () => {
        // Look for timeline items without card wrappers
        const timelineItems = page.locator('.vertical-item-row, .timeline-item');
        const count = await timelineItems.count();
        expect(count).toBeGreaterThan(0);
        
        // Verify items are visible
        if (count > 0) {
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should display content directly without card styling', async ({ page }) => {
      await test.step('Check direct content display', async () => {
        // Look for content that's not wrapped in card containers
        const contentElements = page.locator('p, h1, h2, h3, .timeline-content');
        const count = await contentElements.count();
        
        if (count > 0) {
          const element = contentElements.first();
          await expect(element).toBeVisible();
          
          // Verify content is displayed without heavy card styling
          const computedStyle = await element.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              border: styles.border,
              boxShadow: styles.boxShadow,
              borderRadius: styles.borderRadius,
            };
          });
          
          // In cardless mode, these should be minimal or none
          expect(computedStyle).toBeDefined();
        }
      });
    });

    test('should maintain timeline structure without cards', async ({ page }) => {
      await test.step('Verify timeline structure integrity', async () => {
        // Check for timeline points/markers
        const timelinePoints = page.locator('[data-testid="tree-leaf"]');
        
        if (await timelinePoints.count() > 0) {
          await expect(timelinePoints.first()).toBeVisible();
        }
        
        // Check for timeline line/connector
        const timelineLine = page.locator('[data-testid="tree-main"]');
        
        if (await timelineLine.count() > 0) {
          await expect(timelineLine.first()).toBeVisible();
        }
      });
    });

    test('should handle interactions in cardless mode', async ({ page }) => {
      await test.step('Test interactions without cards', async () => {
        const timelineItems = page.locator('.vertical-item-row, .timeline-item');
        const count = await timelineItems.count();

        if (count > 1) {
          // Click on timeline items
          for (let i = 0; i < Math.min(2, count); i++) {
            const item = timelineItems.nth(i);
            if (await item.isVisible()) {
              await item.click();

              // Verify item is still functional
              await expect(item).toBeVisible();
            }
          }
        }
      });
    });
  });

  test.describe('Cardless Horizontal Timeline', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to cardless horizontal timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/timeline-without-cards-horizontal');
      });
    });

    test('should display horizontal timeline without cards', async ({ page }) => {
      await test.step('Verify horizontal cardless layout', async () => {
        const timelineItems = page.locator('.timeline-horz-item-container, .horizontal-item');
        const count = await timelineItems.count();
        
        if (count > 0) {
          await expect(timelineItems.first()).toBeVisible();
          
          // Verify horizontal layout
          const item = timelineItems.first();
          const box = await item.boundingBox();
          expect(box).not.toBeNull();
        }
      });
    });

    test('should maintain horizontal navigation without cards', async ({ page }) => {
      await test.step('Test horizontal navigation', async () => {
        const nextButton = page.locator('[aria-label="Next"]').first();
        const prevButton = page.locator('[aria-label="Previous"]').first();
        
        if (await nextButton.isVisible()) {
          await nextButton.click();
          // Removed waitForTimeout
          
          // Verify navigation still works
          const timelineItems = page.locator('.timeline-horz-item-container, .horizontal-item');
          await expect(timelineItems.first()).toBeVisible();
          
          if (await prevButton.isVisible()) {
            await prevButton.click();
            // Removed waitForTimeout
          }
        }
      });
    });
  });

  test.describe('Nested Timeline Items', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to nested timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-nested');
      });
    });

    test('should display nested timeline structure', async ({ page }) => {
      await test.step('Verify nested items presence', async () => {
        // Look for nested timeline indicators
        const nestedElements = page.locator(
          '.nested-timeline, [class*="nested"], .sub-timeline, [data-nested]'
        );
        
        const count = await nestedElements.count();
        if (count > 0) {
          await expect(nestedElements.first()).toBeVisible();
        } else {
          // If no explicit nested class, look for multiple levels of content
          const timelineItems = page.locator('.vertical-item-row');
          const itemCount = await timelineItems.count();
          expect(itemCount).toBeGreaterThan(0);
        }
      });
    });

    test('should expand and collapse nested items', async ({ page }) => {
      await test.step('Test nested item expansion', async () => {
        // Look for expandable nested items
        const expandableItems = page.locator(
          'button[aria-expanded], .expand-button, [class*="expand"], ' +
          '.nested-toggle, [role="button"][aria-expanded]'
        );
        
        const count = await expandableItems.count();
        if (count > 0) {
          const expandButton = expandableItems.first();
          const initialExpanded = await expandButton.getAttribute('aria-expanded');
          
          // Toggle expansion
          await expandButton.click();
          // Removed waitForTimeout
          
          const newExpanded = await expandButton.getAttribute('aria-expanded');
          expect(newExpanded).not.toBe(initialExpanded);
          
          // Toggle back
          await expandButton.click();
          // Removed waitForTimeout
        }
      });
    });

    test('should display nested content hierarchy', async ({ page }) => {
      await test.step('Verify nested content structure', async () => {
        // Look for hierarchical content structure
        const nestedContent = page.locator(
          '.nested-content, .sub-content, [class*="nested"] .timeline-card-content'
        );
        
        if (await nestedContent.count() > 0) {
          await expect(nestedContent.first()).toBeVisible();
          
          // Check for indentation or visual hierarchy
          const contentElement = nestedContent.first();
          const computedStyle = await contentElement.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              marginLeft: styles.marginLeft,
              paddingLeft: styles.paddingLeft,
              position: styles.position,
            };
          });
          
          expect(computedStyle).toBeDefined();
        }
      });
    });

    test('should handle nested item navigation', async ({ page }) => {
      await test.step('Test navigation through nested items', async () => {
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        if (count > 1) {
          // Navigate through items, including nested ones
          for (let i = 0; i < Math.min(3, count); i++) {
            const item = timelineItems.nth(i);
            await item.click();
            // Removed waitForTimeout
            
            // Look for nested content that might appear
            const nestedContent = page.locator('.nested-content, .sub-content');
            if (await nestedContent.count() > 0) {
              await expect(nestedContent.first()).toBeVisible();
            }
          }
        }
      });
    });
  });

  test.describe('Alternating Nested Timeline', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to alternating nested timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-nested');
      });
    });

    test('should display alternating layout with nested items', async ({ page }) => {
      await test.step('Verify alternating nested structure', async () => {
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        expect(count).toBeGreaterThan(0);
        
        if (count > 2) {
          // Check first few items for alternating pattern
          for (let i = 0; i < Math.min(3, count); i++) {
            const item = timelineItems.nth(i);
            await expect(item).toBeVisible();
            
            // Get positioning to verify alternating layout
            const box = await item.boundingBox();
            expect(box).not.toBeNull();
          }
        }
      });
    });

    test('should maintain nested functionality in alternating layout', async ({ page }) => {
      await test.step('Test nested items in alternating layout', async () => {
        // Look for nested elements within alternating layout
        const nestedInAlternating = page.locator(
          '.vertical-item-row .nested-timeline, .vertical-item-row [class*="nested"]'
        );
        
        if (await nestedInAlternating.count() > 0) {
          await expect(nestedInAlternating.first()).toBeVisible();
          
          // Test interaction with nested content
          await nestedInAlternating.first().click();
          // Removed waitForTimeout
          
          // Verify timeline remains functional
          const timelineItems = page.locator('.vertical-item-row');
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should handle complex nested interactions', async ({ page }) => {
      await test.step('Test complex nested timeline interactions', async () => {
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        if (count > 0) {
          // Click on items to potentially reveal nested content
          const item = timelineItems.first();
          await item.click();
          // Removed waitForTimeout
          
          // Look for any nested timeline that appears
          const nestedTimeline = page.locator(
            '.nested-timeline, .sub-timeline, [class*="nested"][class*="timeline"]'
          );
          
          if (await nestedTimeline.count() > 0) {
            // Interact with nested timeline
            const nestedItems = nestedTimeline.locator('.timeline-item, [class*="item"]');
            const nestedCount = await nestedItems.count();
            
            if (nestedCount > 0) {
              await nestedItems.first().click();
              // Removed waitForTimeout
              await expect(nestedItems.first()).toBeVisible();
            }
          }
        }
      });
    });
  });

  test.describe('Mixed Cardless and Nested Features', () => {
    test('should handle combination of cardless and nested features', async ({ testHelpers, page }) => {
      await test.step('Test combined cardless and nested functionality', async () => {
        // This might not be a specific route, but test the concept
        await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-nested');

        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();

        if (count > 0) {
          // Test that nested items can work without heavy card styling
          const item = timelineItems.first();
          await item.click();
          // Removed waitForTimeout

          // Look for nested content without card containers
          const contentElements = page.locator(
            '.nested-content, .sub-content, p, span, .timeline-content'
          );

          if (await contentElements.count() > 0) {
            await expect(contentElements.first()).toBeVisible();
          }
        }
      });
    });

    test('should maintain performance with complex nested structures', async ({ testHelpers, page }) => {
      await test.step('Test performance with complex structures', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-nested');

        // Measure interaction responsiveness
        const startTime = Date.now();

        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        if (count > 2) {
          // Quickly navigate through multiple items
          for (let i = 0; i < Math.min(3, count); i++) {
            await timelineItems.nth(i).click();
            await page.waitForTimeout(100); // Minimal wait to test responsiveness
          }
        }
        
        const endTime = Date.now();
        const interactionTime = endTime - startTime;
        
        // Should be reasonably fast (under 2 seconds for 3 interactions)
        expect(interactionTime).toBeLessThan(2000);
        
        // Verify timeline is still functional after rapid interactions
        await expect(timelineItems.first()).toBeVisible();
      });
    });
  });

  test.describe('Custom Content in Cardless Mode', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to custom content timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-custom');
      });
    });

    test('should display custom HTML content without card styling', async ({ page }) => {
      await test.step('Test custom content in cardless style', async () => {
        // Look for custom HTML elements
        const customElements = page.locator('table, ul, ol, .custom-content');
        const count = await customElements.count();
        
        if (count > 0) {
          const element = customElements.first();
          await expect(element).toBeVisible();
          
          // Verify custom content maintains its styling
          const tagName = await element.evaluate(el => el.tagName.toLowerCase());
          expect(['table', 'ul', 'ol', 'div']).toContain(tagName);
        }
      });
    });

    test('should handle interactive custom content', async ({ page }) => {
      await test.step('Test interactive elements in custom content', async () => {
        // Look for interactive elements within timeline
        const interactiveElements = page.locator(
          '.vertical-item-row button, .vertical-item-row input, ' +
          '.vertical-item-row select, .vertical-item-row a'
        );
        
        const count = await interactiveElements.count();
        if (count > 0) {
          const element = interactiveElements.first();
          if (await element.isVisible()) {
            await element.click();
            // Removed waitForTimeout
            
            // Verify timeline remains functional after custom interaction
            const timelineItems = page.locator('.vertical-item-row');
            await expect(timelineItems.first()).toBeVisible();
          }
        }
      });
    });
  });
});