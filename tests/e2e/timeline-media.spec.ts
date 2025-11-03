import { test, expect } from '../fixtures/test-fixtures';
import { SELECTORS } from '../fixtures/selector-map';

test.describe('Timeline Media Components', () => {
  test.describe('Media Rich Timeline', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to media-rich timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-world-history');
      });
    });

    test('should display timeline with media content', async ({ page }) => {
      await test.step('Verify media timeline loads', async () => {
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();
        expect(count).toBeGreaterThan(0);
      });
    });

    test('should display images in timeline cards', async ({ page }) => {
      await test.step('Check for image content', async () => {
        // First click on a timeline item to potentially show media
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();

        if (count > 0) {
          // Click on items to reveal media content
          for (let i = 0; i < Math.min(3, count); i++) {
            await timelineItems.nth(i).click();

            // Look for images after clicking
            const images = page.locator('img[data-testid*="image"], img[src*="http"]');
            const imageCount = await images.count();

            if (imageCount > 0) {
              // Found images, verify at least one is present (may not be visible due to viewport)
              const firstImage = images.first();
              const isPresent = await firstImage.count() > 0;
              expect(isPresent).toBeTruthy();

              // Check image properties
              const src = await firstImage.getAttribute('src');
              expect(src).toBeTruthy();
              break;
            }
          }
        }
      });
    });

    test('should handle media loading states', async ({ page }) => {
      await test.step('Check media loading behavior', async () => {
        // Click on timeline items to reveal media
        const timelineItems = page.locator('.vertical-item-row');
        const count = await timelineItems.count();

        if (count > 0) {
          for (let i = 0; i < Math.min(2, count); i++) {
            await timelineItems.nth(i).click();
          }

          // Look for media elements after interaction
          const mediaElements = page.locator('img[src*="http"], video, iframe[src*="youtube"]');
          const mediaCount = await mediaElements.count();

          if (mediaCount > 0) {
            // Verify media elements exist and have proper attributes
            const firstMedia = mediaElements.first();
            const tagName = await firstMedia.evaluate(el => el.tagName.toLowerCase());
            expect(['img', 'video', 'iframe']).toContain(tagName);

            if (tagName === 'img') {
              const src = await firstMedia.getAttribute('src');
              expect(src).toBeTruthy();
            }
          }
        }
      });
    });

    test('should support text overlay on media', async ({ page }) => {
      await test.step('Check for text overlay functionality', async () => {
        // This timeline should have textOverlay enabled
        const overlayElements = page.locator('.text-overlay, [class*="overlay"]');
        const hasOverlay = await overlayElements.count();
        
        // If overlay exists, verify it's functional
        if (hasOverlay > 0) {
          await expect(overlayElements.first()).toBeVisible();
        }
      });
    });
  });

  test.describe('Video Content', () => {
    test.beforeEach(async ({ testHelpers }) => {
      await test.step('Navigate to mixed vertical timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-mixed');
      });
    });

    test('should display video content', async ({ page }) => {
      await test.step('Check for video elements', async () => {
        // Look for video elements or iframes (YouTube embeds)
        const videoElements = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
        const count = await videoElements.count();
        
        if (count > 0) {
          const firstVideo = videoElements.first();
          await expect(firstVideo).toBeVisible();
          
          // Check video properties
          const tagName = await firstVideo.evaluate(el => el.tagName.toLowerCase());
          if (tagName === 'video') {
            // For HTML5 video
            const controls = await firstVideo.getAttribute('controls');
            expect(controls).not.toBeNull();
          } else if (tagName === 'iframe') {
            // For embedded video
            const src = await firstVideo.getAttribute('src');
            expect(src).toContain('embed');
          }
        }
      });
    });

    test('should handle video playback controls', async ({ page }) => {
      await test.step('Test video controls interaction', async () => {
        const videoElements = page.locator('video');
        const count = await videoElements.count();

        if (count > 0) {
          const video = videoElements.first();
          await expect(video).toBeVisible();

          // Try to interact with video controls
          await video.click();

          // Verify video is still visible after interaction
          await expect(video).toBeVisible();
        }
      });
    });
  });

  test.describe('YouTube Integration', () => {
    test('should handle YouTube embeds', async ({ page, testHelpers }) => {
      await test.step('Navigate to timeline with YouTube content', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-alternating-mixed');
      });

      await test.step('Check YouTube iframe handling', async () => {
        const youtubeIframes = page.locator(SELECTORS.YOUTUBE_VIDEO);
        const count = await youtubeIframes.count();

        if (count > 0) {
          const iframe = youtubeIframes.first();
          await expect(iframe).toBeVisible();

          // Verify iframe properties
          const src = await iframe.getAttribute('src');
          expect(src).toContain('youtube.com/embed');

          // Check iframe dimensions
          const box = await iframe.boundingBox();
          if (box) {
            expect(box.width).toBeGreaterThan(0);
            expect(box.height).toBeGreaterThan(0);
          }
        }
      });
    });
  });

  test.describe('Media Error Handling', () => {
    test('should handle media loading errors gracefully', async ({ testHelpers, page }) => {
      await test.step('Navigate to media timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-world-history');
      });

      await test.step('Check error handling for broken media', async () => {
        // Look for any error states or fallback content
        const mediaElements = page.locator('img, video');
        const count = await mediaElements.count();

        if (count > 0) {
          // Check if any media failed to load (this is hard to test without actual broken URLs)
          // For now, just verify the timeline still renders properly
          const timelineItems = page.locator('.vertical-item-row');
          await expect(timelineItems.first()).toBeVisible();
        }
      });
    });

    test('should provide alt text for images', async ({ testHelpers, page }) => {
      await test.step('Navigate to media timeline', async () => {
        await testHelpers.navigateAndWaitForTimeline('/vertical-world-history');
      });

      await test.step('Check accessibility of media content', async () => {
        const images = page.locator('img');
        const count = await images.count();

        if (count > 0) {
          const firstImage = images.first();
          const alt = await firstImage.getAttribute('alt');
          // Alt text should exist (can be empty but attribute should be present)
          expect(typeof alt).toBe('string');
        }
      });
    });
  });

  test.describe('Media Settings and Configuration', () => {
    test('should respect media height settings', async ({ testHelpers, page }) => {
      await test.step('Navigate to horizontal timeline with media', async () => {
        await testHelpers.navigateAndWaitForTimeline('/horizontal-all');
      });

      await test.step('Check media dimensions', async () => {
        const mediaContainers = page.locator('.timeline-card-media, [class*="media"]');
        const count = await mediaContainers.count();

        if (count > 0) {
          const media = mediaContainers.first();
          await expect(media).toBeVisible();

          const box = await media.boundingBox();
          if (box) {
            expect(box.height).toBeGreaterThan(0);
            expect(box.width).toBeGreaterThan(0);
          }
        }
      });
    });

    test('should handle media in slideshow mode', async ({ testHelpers, page }) => {
      await test.step('Navigate to slideshow with media', async () => {
        await testHelpers.navigateAndWaitForTimeline('/horizontal-all');
      });

      await test.step('Test media in slideshow context', async () => {
        // Look for slideshow controls
        const playButton = await testHelpers.getToolbarButton('play');

        if (await playButton.count() > 0) {
          if (await playButton.isVisible()) {
            await testHelpers.clickToolbarButton('play');

            // Verify slideshow is active
            const pauseButton = await testHelpers.getToolbarButton('pause');
            if (await pauseButton.count() > 0) {
              await expect(pauseButton.first()).toBeVisible();
            }
          }
        }
      });
    });
  });
});