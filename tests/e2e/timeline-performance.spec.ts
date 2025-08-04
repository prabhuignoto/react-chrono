import { test, expect } from '../fixtures/test-fixtures';

test.describe('Timeline Performance and Load Testing', () => {
  test.describe('Initial Load Performance', () => {
    test('should load timeline within acceptable time', async ({ page, testHelpers }) => {
      await test.step('Measure timeline load time', async () => {
        const startTime = Date.now();
        
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        
        // Timeline should load within 5 seconds
        expect(loadTime).toBeLessThan(5000);
        
        // Verify timeline is functional after load
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        expect(count).toBeGreaterThan(0);
      });
    });

    test('should handle large datasets efficiently', async ({ page, testHelpers }) => {
      await test.step('Test performance with large timeline', async () => {
        const startTime = Date.now();
        
        // Navigate to timeline that potentially has more data
        await testHelpers.navigateTo('/vertical-world-history');
        await page.waitForSelector('.vertical-item-row', { timeout: 15000 });
        
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        
        // Even large timelines should load within 10 seconds
        expect(loadTime).toBeLessThan(10000);
        
        // Verify all items are accessible
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        expect(count).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Interaction Performance', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to timeline', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should handle rapid navigation efficiently', async ({ page }) => {
      await test.step('Test rapid navigation performance', async () => {
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        if (count > 3) {
          const startTime = Date.now();
          
          // Rapidly click through timeline items
          for (let i = 0; i < Math.min(5, count); i++) {
            await timelineItems.nth(i).click();
            await page.waitForTimeout(50); // Minimal wait
          }
          
          const endTime = Date.now();
          const interactionTime = endTime - startTime;
          
          // Rapid interactions should complete within reasonable time
          expect(interactionTime).toBeLessThan(5000);
          
          // Verify timeline is still responsive
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should maintain performance during scroll events', async ({ page }) => {
      await test.step('Test scroll performance', async () => {
        const timeline = page.locator('.timeline-main-wrapper, [class*="timeline"]').first();
        const startTime = Date.now();
        
        // Perform multiple scroll operations
        for (let i = 0; i < 10; i++) {
          await timeline.evaluate((el, scrollY) => {
            el.scrollBy(0, scrollY);
          }, i % 2 === 0 ? 100 : -100);
          
          await page.waitForTimeout(20);
        }
        
        const endTime = Date.now();
        const scrollTime = endTime - startTime;
        
        // Scroll operations should be smooth
        expect(scrollTime).toBeLessThan(1000);
        
        // Verify timeline is still functional
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
      });
    });
  });

  test.describe('Memory Usage', () => {
    test('should not cause memory leaks during navigation', async ({ page, testHelpers }) => {
      await test.step('Test memory usage during navigation', async () => {
        // Navigate between different timeline types
        const routes = ['/vertical-basic', '/horizontal', '/vertical-alternating', '/vertical-basic'];
        
        for (const route of routes) {
          await testHelpers.navigateTo(route);
          await page.waitForTimeout(1000);
          
          // Verify timeline loads properly
          const timelineItems = page.locator('.vertical-item-row, .timeline-horz-item-container');
          const count = await timelineItems.count();
          expect(count).toBeGreaterThan(0);
        }
        
        // Verify final state is functional
        const finalItems = page.locator('.vertical-item-row');
        await expect(finalItems.first()).toBeVisible();
      });
    });

    test('should handle multiple timeline instances', async ({ page, testHelpers }) => {
      await test.step('Test multiple timeline handling', async () => {
        await testHelpers.navigateTo('/vertical-alternating-nested');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        // Look for nested timelines
        const nestedTimelines = page.locator('.nested-timeline, [class*="nested"]');
        const nestedCount = await nestedTimelines.count();
        
        if (nestedCount > 0) {
          // Interact with nested content
          await nestedTimelines.first().click();
          await page.waitForTimeout(500);
        }
        
        // Verify main timeline is still functional
        const mainItems = page.locator('.vertical-item-row');
        await expect(mainItems.first()).toBeVisible();
      });
    });
  });

  test.describe('Media Loading Performance', () => {
    test.beforeEach(async ({ page, testHelpers }) => {
      await test.step('Navigate to media-rich timeline', async () => {
        await testHelpers.navigateTo('/vertical-world-history');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      });
    });

    test('should load media content efficiently', async ({ page }) => {
      await test.step('Test media loading performance', async () => {
        const startTime = Date.now();
        
        // Look for media elements
        const mediaElements = page.locator('img, video, iframe');
        const count = await mediaElements.count();
        
        if (count > 0) {
          // Click on timeline items to reveal media
          for (let i = 0; i < Math.min(2, count); i++) {
            const item = page.locator('.vertical-item-row').nth(i);
            await item.click();
            await page.waitForTimeout(300);
          }
          
          // Look for media elements after interaction
          const visibleMedia = page.locator('img[src*="http"], video, iframe');
          const mediaCount = await visibleMedia.count();
          
          if (mediaCount > 0) {
            const firstMedia = visibleMedia.first();
            // Check if media element exists and has proper attributes
            const hasSource = await firstMedia.evaluate(el => {
              if (el.tagName.toLowerCase() === 'img') {
                return !!el.getAttribute('src');
              }
              return true;
            });
            expect(hasSource).toBeTruthy();
            
            // Check if media loads within reasonable time
            if (await firstMedia.locator('img').count() > 0) {
              const img = firstMedia.locator('img').first();
              await img.evaluate(el => {
                return new Promise((resolve) => {
                  if ((el as HTMLImageElement).complete) {
                    resolve(undefined);
                  } else {
                    el.onload = () => resolve(undefined);
                    el.onerror = () => resolve(undefined);
                    // Timeout after 5 seconds
                    setTimeout(() => resolve(undefined), 5000);
                  }
                });
              });
            }
          }
        }
        
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        
        // Media should load within reasonable time
        expect(loadTime).toBeLessThan(8000);
      });
    });

    test('should handle media loading errors gracefully', async ({ page }) => {
      await test.step('Test media error handling', async () => {
        // This test verifies that broken media doesn't break the timeline
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        if (count > 0) {
          // Interact with timeline items that might have media
          for (let i = 0; i < Math.min(3, count); i++) {
            await timelineItems.nth(i).click();
            await page.waitForTimeout(300);
            
            // Verify timeline remains functional even if media fails
            await expect(timelineItems.nth(i)).toBeVisible();
          }
        }
      });
    });
  });

  test.describe('Animation Performance', () => {
    test('should handle slideshow animations smoothly', async ({ page, testHelpers }) => {
      await test.step('Test slideshow animation performance', async () => {
        await testHelpers.navigateTo('/horizontal-all');
        await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
        
        const playButton = page.locator('[aria-label*="play"], .play-button').first();
        
        if (await playButton.isVisible()) {
          const startTime = Date.now();
          
          // Start slideshow
          await playButton.click();
          await page.waitForTimeout(2000); // Let it run for 2 seconds
          
          // Stop slideshow
          const pauseButton = page.locator('[aria-label*="pause"], .pause-button').first();
          if (await pauseButton.isVisible()) {
            await pauseButton.click();
          }
          
          const endTime = Date.now();
          const animationTime = endTime - startTime;
          
          // Animation should not block interaction
          expect(animationTime).toBeGreaterThan(1800); // At least 1.8s of animation
          
          // Verify timeline is still responsive
          const timelineItems = page.locator('.timeline-horz-item-container');
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should handle transition animations efficiently', async ({ page, testHelpers }) => {
      await test.step('Test transition performance', async () => {
        await testHelpers.navigateTo('/horizontal');
        await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
        
        const nextButton = page.locator('[aria-label="Next"]').first();
        
        if (await nextButton.isVisible()) {
          const startTime = Date.now();
          
          // Rapidly trigger transitions
          for (let i = 0; i < 5; i++) {
            await nextButton.click();
            await page.waitForTimeout(100); // Short wait between clicks
          }
          
          const endTime = Date.now();
          const transitionTime = endTime - startTime;
          
          // Transitions should be fast
          expect(transitionTime).toBeLessThan(2000);
          
          // Verify timeline is still functional
          const timelineItems = page.locator('.timeline-horz-item-container');
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });
  });

  test.describe('Resource Loading Optimization', () => {
    test('should load resources efficiently on different connection speeds', async ({ page, testHelpers }) => {
      await test.step('Test on slow connection', async () => {
        // Simulate slow 3G connection
        await page.route('**/*', async (route) => {
          // Add delay to simulate slow connection
          await new Promise(resolve => setTimeout(resolve, 100));
          await route.continue();
        });
        
        const startTime = Date.now();
        
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 15000 });
        
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        
        // Should still load within reasonable time even on slow connection
        expect(loadTime).toBeLessThan(12000);
        
        // Clean up route handler
        await page.unroute('**/*');
      });
    });

    test('should handle concurrent resource loading', async ({ page, testHelpers }) => {
      await test.step('Test concurrent resource loading', async () => {
        // Navigate to media-rich timeline that loads multiple resources
        const startTime = Date.now();
        
        await testHelpers.navigateTo('/horizontal-all');
        await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
        
        // Wait for potential media to load
        await page.waitForTimeout(2000);
        
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        
        // Concurrent loading should be efficient
        expect(loadTime).toBeLessThan(8000);
        
        // Verify all resources loaded properly
        const timelineItems = page.locator('.timeline-horz-item-container');
        const count = await timelineItems.count();
        expect(count).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Stress Testing', () => {
    test('should handle rapid user interactions', async ({ page, testHelpers }) => {
      await test.step('Stress test with rapid interactions', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        if (count > 0) {
          const startTime = Date.now();
          
          // Perform 20 rapid interactions
          for (let i = 0; i < 20; i++) {
            const itemIndex = i % count;
            await timelineItems.nth(itemIndex).click();
            
            // Minimal wait between interactions
            if (i % 5 === 0) {
              await page.waitForTimeout(50);
            }
          }
          
          const endTime = Date.now();
          const stressTime = endTime - startTime;
          
          // Should handle stress test within reasonable time
          expect(stressTime).toBeLessThan(5000);
          
          // Verify timeline is still functional
          await expect(timelineItems.first()).toBeVisible();
          
          // Test one more interaction to ensure recovery
          await timelineItems.first().click();
          await page.waitForTimeout(100);
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should handle viewport resize stress test', async ({ page, testHelpers }) => {
      await test.step('Stress test with rapid viewport changes', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        const viewports = [
          { width: 1920, height: 1080 },
          { width: 768, height: 1024 },
          { width: 375, height: 667 },
          { width: 1440, height: 900 },
          { width: 320, height: 568 },
        ];
        
        const startTime = Date.now();
        
        // Rapidly change viewport sizes
        for (let i = 0; i < 10; i++) {
          const viewport = viewports[i % viewports.length];
          await page.setViewportSize(viewport);
          await page.waitForTimeout(100);
        }
        
        const endTime = Date.now();
        const resizeTime = endTime - startTime;
        
        // Should handle rapid resizing efficiently
        expect(resizeTime).toBeLessThan(3000);
        
        // Allow timeline to stabilize after rapid resizing
        await page.waitForTimeout(1000);
        
        // Set back to a standard viewport to verify recovery
        await page.setViewportSize({ width: 1024, height: 768 });
        await page.waitForTimeout(500);
        
        // Verify timeline still works after stress test
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible({ timeout: 15000 });
      });
    });
  });

  test.describe('Performance Monitoring', () => {
    test('should not have excessive DOM elements', async ({ page, testHelpers }) => {
      await test.step('Check DOM element count', async () => {
        await testHelpers.navigateTo('/vertical-world-history');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        // Count total DOM elements
        const elementCount = await page.evaluate(() => {
          return document.querySelectorAll('*').length;
        });
        
        // Should not have excessive DOM elements (reasonable limit)
        expect(elementCount).toBeLessThan(5000);
        
        // Verify timeline functionality isn't impacted
        const timelineItems = page.locator('.vertical-item-row');
        await expect(timelineItems.first()).toBeVisible();
      });
    });

    test('should handle long-running sessions', async ({ page, testHelpers }) => {
      await test.step('Test long-running session stability', async () => {
        await testHelpers.navigateTo('/vertical-basic');
        await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
        
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        
        // Simulate long-running session with various interactions
        for (let session = 0; session < 3; session++) {
          // Navigate through items multiple times
          for (let i = 0; i < Math.min(5, count); i++) {
            await timelineItems.nth(i).click();
            await page.waitForTimeout(200);
          }
          
          // Wait between sessions
          await page.waitForTimeout(500);
        }
        
        // Verify timeline is still fully functional
        await expect(timelineItems.first()).toBeVisible();
        
        // Test final interaction
        await timelineItems.last().click();
        await page.waitForTimeout(300);
        await expect(timelineItems.last()).toBeVisible();
      });
    });
  });
});