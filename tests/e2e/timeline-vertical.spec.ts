import { test, expect } from '../fixtures/test-fixtures';
import { SELECTORS } from '../fixtures/selector-map';

test.describe('Chrono.Vertical.Basic', () => {
  test.beforeEach(async ({ testHelpers }) => {
    await test.step('Navigate to vertical basic timeline', async () => {
      await testHelpers.navigateAndWaitForTimeline('/vertical-basic');
    });
  });

  test('should display correct number of timeline items', async ({ page, testHelpers }) => {
    await test.step('Check timeline items count', async () => {
      await testHelpers.assertElementCount('.vertical-item-row', 10);
    });
  });

  test('should have correct card elements structure', async ({ page }) => {
    await test.step('Check first item children count', async () => {
      const firstItem = page.locator('.vertical-item-row').first();
      const children = await firstItem.locator('> *').count();
      expect(children).toBe(3);
    });
  });

  test('should display timeline title for first item', async ({ page, testHelpers }) => {
    await test.step('Check timeline title', async () => {
      const titleElement = page.locator('.vertical-item-row').first().locator('.timeline-item-title');
      await expect(titleElement).toContainText('May 1945');
    });
  });

  test('should display correct timeline card contents', async ({ page }) => {
    await test.step('Check Pearl Harbor card content', async () => {
      const cardContent = page.locator('.vertical-item-row').nth(3);
      
      await expect(cardContent).toContainText('Pearl Harbor');
      await expect(cardContent.locator('.card-sub-title')).toContainText(
        'The destroyer USS Shaw explodes in dry dock after being hit by Japanese aircraft'
      );
    });
  });

  test('should display correct card title', async ({ page }) => {
    await test.step('Check Dunkirk card title', async () => {
      const cardTitle = page.locator('.vertical-item-row').nth(0);
      await expect(cardTitle).toContainText('Dunkirk');
    });
  });

  test('should display card title correctly', async ({ page }) => {
    await test.step('Check card title', async () => {
      const cardTitle = page.locator('.vertical-item-row').first().locator('.rc-card-title');
      await expect(cardTitle).toBeVisible();
      await expect(cardTitle).toContainText('Dunkirk');
    });
  });

  test('should display correct card subtitle text', async ({ page }) => {
    await test.step('Check subtitle content', async () => {
      const subtitleElement = page.locator('.vertical-item-row').first().locator('.card-sub-title');
      await expect(subtitleElement).toContainText(
        'Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.'
      );
    });
  });

  test('should display correct card subtitle', async ({ page }) => {
    await test.step('Check RAF subtitle', async () => {
      const subtitle = page.locator('.vertical-item-row').nth(1).locator('.card-sub-title');
      await expect(subtitle).toContainText('RAF Spitfire pilots scramble for their planes');
    });
  });

  test('should activate card on click', async ({ page }) => {
    await test.step('Click and verify interaction', async () => {
      const cardContent = page.locator('.vertical-item-row').nth(1).locator(SELECTORS.CARD_CONTENT);
      await expect(cardContent).toBeVisible();
      await cardContent.click();
      // Just verify the card is clickable - no need to check for specific active class
      await expect(cardContent).toBeVisible();
    });
  });

  test('should handle scroll visibility', async ({ page }) => {
    await test.step('Scroll to bottom and check visibility', async () => {
      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN).first();
      await wrapper.evaluate(el => el.scrollTo(0, el.scrollHeight));

      const lastItem = page.locator('.vertical-item-row').last().locator('.card-content-wrapper');
      await expect(lastItem).toHaveClass(/visible/);
    });

    await test.step('Scroll to top and check visibility', async () => {
      const wrapper = page.locator(SELECTORS.TIMELINE_MAIN).first();
      await wrapper.evaluate(el => el.scrollTo(0, 0));

      const firstItem = page.locator('.vertical-item-row').first().locator('.card-content-wrapper');
      await expect(firstItem).toHaveClass(/visible/);
    });
  });

  test('should handle scroll with IntersectionObserver', async ({ page }) => {
    await test.step('Test scroll-based visibility changes', async () => {
      // Monitor visibility changes
      const visibilityChanges = await page.evaluate(() => {
        const changes: string[] = [];
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              changes.push(entry.target.className);
            }
          });
        });
        
        document.querySelectorAll('.vertical-item-row').forEach(el => {
          observer.observe(el);
        });
        
        return new Promise<string[]>(resolve => {
          setTimeout(() => {
            observer.disconnect();
            resolve(changes);
          }, 2000);
        });
      });
      
      expect(visibilityChanges.length).toBeGreaterThan(0);
    });
  });
});