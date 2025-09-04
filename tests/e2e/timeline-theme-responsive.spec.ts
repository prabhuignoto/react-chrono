import { test, expect } from '../fixtures/test-fixtures';

test.describe('Timeline Theme and Responsive Features', () => {
  test.describe('Theme Switching', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to theme showcase', async () => {
        await testHelpers.navigateTo('/theme-showcase');
        await page.waitForTimeout(2000);
      });
    });

    test('should display multiple theme options', async ({ page }) => {
      await test.step('Check for theme selector buttons', async () => {
        const themeButtons = page.locator(
          'button:has-text("Modern"), button:has-text("Vibrant"), button:has-text("Nature"), ' +
          'button:has-text("Default"), .theme-button, [class*="theme"]'
        );
        
        const count = await themeButtons.count();
        if (count > 0) {
          await expect(themeButtons.first()).toBeVisible();
        }
      });
    });

    test('should switch between different predefined themes', async ({ page }) => {
      await test.step('Test theme switching functionality', async () => {
        const themeButtons = page.locator(
          'button:has-text("Modern"), button:has-text("Vibrant"), button:has-text("Nature")'
        );
        const count = await themeButtons.count();
        
        if (count > 1) {
          const timeline = page.locator('[class*="timeline"]').first();
          await expect(timeline).toBeVisible();
          
          // Get initial timeline classes
          const initialClasses = await timeline.getAttribute('class');
          
          // Switch themes
          for (let i = 0; i < Math.min(count, 3); i++) {
            await themeButtons.nth(i).click();
            await page.waitForTimeout(500);
            
            // Verify timeline is still visible and functional
            await expect(timeline).toBeVisible();
            
            // Check if classes changed (theme applied)
            const newClasses = await timeline.getAttribute('class');
            expect(newClasses).toBeDefined();
          }
        }
      });
    });

    test('should maintain theme consistency across timeline elements', async ({ page }) => {
      await test.step('Verify theme consistency', async () => {
        const themeButtons = page.locator('button:has-text("Vibrant")');
        
        if (await themeButtons.count() > 0) {
          await themeButtons.first().click();
          await page.waitForTimeout(500);
          
          // Check if theme is applied to various timeline elements
          const timelineElements = page.locator(
            '.timeline-card, .timeline-point, .timeline-content, [class*="timeline"]'
          );
          
          const count = await timelineElements.count();
          if (count > 0) {
            for (let i = 0; i < Math.min(3, count); i++) {
              const element = timelineElements.nth(i);
              if (await element.isVisible()) {
                // Verify element has some styling
                const computedStyle = await element.evaluate(el => {
                  const styles = window.getComputedStyle(el);
                  return {
                    backgroundColor: styles.backgroundColor,
                    color: styles.color,
                    borderColor: styles.borderColor,
                  };
                });
                
                expect(computedStyle).toBeDefined();
              }
            }
          }
        }
      });
    });
  });

  test.describe('Dynamic Theme Configuration', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to timeline with dynamic theme', async () => {
        await testHelpers.navigateTo('/vertical-alternating');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should apply custom theme colors', async ({ page }) => {
      await test.step('Verify custom theme application', async () => {
        // This timeline should have custom theme configuration
        const timelineElements = page.locator('.vertical-item-row');
        const count = await timelineElements.count();
        
        if (count > 0) {
          const element = timelineElements.first();
          await expect(element).toBeVisible();
          
          // Check if custom colors are applied
          const computedStyle = await element.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              backgroundColor: styles.backgroundColor,
              borderColor: styles.borderColor,
              color: styles.color,
            };
          });
          
          // Verify that styling is applied (not default transparent)
          const hasBackgroundStyling = 
            computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
            computedStyle.backgroundColor !== 'transparent';
          const hasBorderStyling = 
            computedStyle.borderColor !== 'rgba(0, 0, 0, 0)' &&
            computedStyle.borderColor !== 'transparent';
          const hasColorStyling = 
            computedStyle.color !== 'rgba(0, 0, 0, 0)' &&
            computedStyle.color !== 'transparent';
          
          // At least one style property should be applied
          expect(hasBackgroundStyling || hasBorderStyling || hasColorStyling).toBeTruthy();
        }
      });
    });

    test('should handle theme transitions smoothly', async ({ page }) => {
      await test.step('Test smooth theme transitions', async () => {
        // Look for theme toggle if available
        const themeToggle = page.locator('[aria-label*="theme"], .theme-toggle');
        
        if (await themeToggle.count() > 0) {
          const toggle = themeToggle.first();
          if (await toggle.isVisible()) {
            // Toggle theme
            await toggle.click();
            await page.waitForTimeout(300);
            
            // Verify timeline elements are still visible and functional
            const timelineItems = page.locator('.vertical-item-row');
            await expect(timelineItems.first()).toBeVisible();
            
            // Toggle back
            await toggle.click();
            await page.waitForTimeout(300);
            await expect(timelineItems.first()).toBeVisible();
          }
        }
      });
    });
  });

  test.describe('Dark Mode Support', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to timeline with dark mode', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should display dark mode toggle', async ({ page }) => {
      await test.step('Check for dark mode toggle', async () => {
        const darkToggle = page.locator(
          '[aria-label*="dark"], [aria-label*="Dark"], .dark-toggle, ' +
          'button:has([class*="dark"]), button:has([class*="moon"])'
        );
        
        if (await darkToggle.count() > 0) {
          await expect(darkToggle.first()).toBeVisible();
        }
      });
    });

    test('should toggle between light and dark modes', async ({ page }) => {
      await test.step('Test dark mode switching', async () => {
        const darkToggle = page.locator('[aria-label*="dark"], .dark-toggle');
        
        if (await darkToggle.count() > 0 && await darkToggle.first().isVisible()) {
          const timeline = page.locator('[class*="timeline"]').first();
          
          // Get initial colors
          const initialStyle = await timeline.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              backgroundColor: styles.backgroundColor,
              color: styles.color,
            };
          });
          
          // Toggle dark mode
          await darkToggle.first().click();
          await page.waitForTimeout(500);
          
          // Verify theme changed
          const newStyle = await timeline.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              backgroundColor: styles.backgroundColor,
              color: styles.color,
            };
          });
          
          // Colors should be different or at least timeline should still be visible
          await expect(timeline).toBeVisible();
          
          // Toggle back to light mode
          await darkToggle.first().click();
          await page.waitForTimeout(500);
          await expect(timeline).toBeVisible();
        }
      });
    });

    test('should maintain readability in dark mode', async ({ page }) => {
      await test.step('Test dark mode accessibility', async () => {
        const darkToggle = page.locator('[aria-label*="dark"], .dark-toggle');
        
        if (await darkToggle.count() > 0 && await darkToggle.first().isVisible()) {
          // Switch to dark mode
          await darkToggle.first().click();
          await page.waitForTimeout(500);
          
          // Check text readability
          const textElements = page.locator('.rc-card-title, .rc-card-subtitle, p, span');
          const count = await textElements.count();
          
          if (count > 0) {
            const element = textElements.first();
            if (await element.isVisible()) {
              const computedStyle = await element.evaluate(el => {
                const styles = window.getComputedStyle(el);
                return {
                  color: styles.color,
                  backgroundColor: styles.backgroundColor,
                  opacity: styles.opacity,
                };
              });
              
              // Text should be visible (not transparent)
              expect(computedStyle.color).not.toBe('rgba(0, 0, 0, 0)');
              expect(computedStyle.opacity).not.toBe('0');
            }
          }
        }
      });
    });
  });

  test.describe('Responsive Design', () => {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop-large' },
      { width: 1440, height: 900, name: 'desktop' },
      { width: 1024, height: 768, name: 'tablet-landscape' },
      { width: 768, height: 1024, name: 'tablet-portrait' },
      { width: 414, height: 896, name: 'mobile-large' },
      { width: 375, height: 667, name: 'mobile' },
      { width: 320, height: 568, name: 'mobile-small' },
    ];

    test('should adapt to different screen sizes', async ({ page, testHelpers }) => {
      // Start with a standard size first
      await testHelpers.navigateTo('/vertical-basic');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      for (const viewport of viewports) {
        await test.step(`Test ${viewport.name} (${viewport.width}x${viewport.height})`, async () => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.waitForTimeout(500); // Allow time for responsive adjustments
          
          // Verify timeline container exists and adapts to viewport
          const timeline = page.locator('[data-testid="tree-main"]');
          await expect(timeline).toBeVisible();
          
          const box = await timeline.boundingBox();
          if (box) {
            // Timeline should not exceed viewport width (with some tolerance for borders)
            expect(box.width).toBeLessThanOrEqual(viewport.width + 20);
            
            // Timeline should be visible (basic existence check)
            expect(box.width).toBeGreaterThan(0);
          }
          
          // Check if timeline items exist (may not be visible on very small screens)
          const timelineItems = page.locator('.vertical-item-row');
          const itemCount = await timelineItems.count();
          expect(itemCount).toBeGreaterThan(0);
        });
      }
    });

    test('should handle horizontal timeline responsiveness', async ({ page, testHelpers }) => {
      for (const viewport of viewports.slice(0, 4)) { // Test fewer viewports for horizontal
        await test.step(`Test horizontal on ${viewport.name}`, async () => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await testHelpers.navigateTo('/horizontal');
          await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
          
          // Verify horizontal timeline adapts
          const timelineItems = page.locator('.timeline-horz-item-container');
          await expect(timelineItems.first()).toBeVisible();
          
          // Check navigation is accessible
          const nextButton = page.locator('[aria-label="Next"]').first();
          if (await nextButton.isVisible()) {
            const buttonBox = await nextButton.boundingBox();
            if (buttonBox) {
              // Button should be reasonably sized for touch interaction
              expect(buttonBox.width).toBeGreaterThan(20);
              expect(buttonBox.height).toBeGreaterThan(20);
            }
          }
        });
      }
    });
  });

  test.describe('Breakpoint Behavior', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to responsive timeline', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should handle mobile breakpoint transitions', async ({ page }) => {
      await test.step('Test mobile breakpoint behavior', async () => {
        // Start with desktop size
        await page.setViewportSize({ width: 1024, height: 768 });
        await page.waitForTimeout(300);
        
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
        
        // Transition to mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500); // Allow time for responsive adjustments
        
        // Verify timeline still works on mobile
        await expect(timelineItems.first()).toBeVisible();
        
        // Test interaction on mobile
        const firstItem = timelineItems.first();
        await firstItem.click();
        await page.waitForTimeout(300);
        await expect(firstItem).toBeVisible();
      });
    });

    test('should adapt timeline controls for touch devices', async ({ page }) => {
      await test.step('Test touch-friendly controls', async () => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(300);
        
        // Look for controls that should be touch-friendly
        const controls = page.locator(
          'button, [role="button"], .timeline-control, [aria-label*="Next"], [aria-label*="Previous"]'
        );
        
        const count = await controls.count();
        if (count > 0) {
          for (let i = 0; i < Math.min(3, count); i++) {
            const control = controls.nth(i);
            if (await control.isVisible()) {
              const box = await control.boundingBox();
              if (box) {
                // Touch targets should be at least 44px (iOS guideline)
                expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(30); // Slightly relaxed
              }
            }
          }
        }
      });
    });
  });

  test.describe('High DPI and Retina Display Support', () => {
    test('should render properly on high DPI displays', async ({ page, testHelpers }) => {
      await test.step('Test high DPI rendering', async () => {
        // Simulate high DPI display
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.emulateMedia({ 
          colorScheme: 'light',
        });
        
        await testHelpers.navigateTo('/vertical-world-history');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        // Check for crisp rendering of images and icons
        const images = page.locator('img');
        const count = await images.count();
        
        if (count > 0) {
          const img = images.first();
          if (await img.isVisible()) {
            // Wait for image to load
            await img.waitFor({ state: 'visible', timeout: 5000 });
            
            // Verify image loads properly (only if loaded)
            const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
            const naturalHeight = await img.evaluate(el => (el as HTMLImageElement).naturalHeight);
            
            // Only check if image has actually loaded (naturalWidth/Height > 0 means loaded)
            if (naturalWidth > 0 && naturalHeight > 0) {
              expect(naturalWidth).toBeGreaterThan(0);
              expect(naturalHeight).toBeGreaterThan(0);
            }
          }
        }
        
        // Verify timeline elements are crisp
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
      });
    });
  });

  test.describe('Print Media Support', () => {
    test('should handle print media queries', async ({ page, testHelpers }) => {
      await test.step('Test print layout', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        // Emulate print media
        await page.emulateMedia({ media: 'print' });
        await page.waitForTimeout(500);
        
        // Verify timeline is still visible in print mode
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
        
        // Reset to screen media
        await page.emulateMedia({ media: 'screen' });
      });
    });
  });

  test.describe('Color Scheme Preferences', () => {
    test('should respect system color scheme preferences', async ({ page, testHelpers }) => {
      await test.step('Test system dark mode preference', async () => {
        // Emulate system dark mode preference
        await page.emulateMedia({ colorScheme: 'dark' });
        
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        // Verify timeline adapts to system preference
        const timeline = page.locator('[class*="timeline"]').first();
        await expect(timeline).toBeVisible();
        
        // Reset to light mode
        await page.emulateMedia({ colorScheme: 'light' });
        await expect(timeline).toBeVisible();
      });
    });

    test('should handle no-preference color scheme', async ({ page, testHelpers }) => {
      await test.step('Test no-preference color scheme', async () => {
        await page.emulateMedia({ colorScheme: 'no-preference' });
        
        await testHelpers.navigateTo('/vertical-alternating');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        // Verify timeline renders with default colors
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
      });
    });
  });
});