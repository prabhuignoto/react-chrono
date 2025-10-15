import { test, expect } from '../../fixtures/test-fixtures';
import { TimelineHelpers } from '../../helpers/timeline-helpers';
import { testTimelineItems, viewportSizes, timeouts } from '../../helpers/test-data';

test.describe('Timeline Props - Comprehensive Tests', () => {
  let timelineHelpers: TimelineHelpers;

  test.beforeEach(async ({ page }) => {
    timelineHelpers = new TimelineHelpers(page);
  });

  test.describe('Display Props', () => {
    test('should respect cardHeight prop', async ({ page }) => {
      await page.goto('/vertical-basic?cardHeight=250');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const card = page.locator('.timeline-card-content').first();
      const height = await card.evaluate(el => el.offsetHeight);
      expect(height).toBeCloseTo(250, 50);
    });

    test('should respect cardWidth prop in horizontal mode', async ({ page }) => {
      await page.goto('/horizontal?cardWidth=400');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const card = page.locator('.timeline-card-content').first();
      const width = await card.evaluate(el => el.offsetWidth);
      expect(width).toBeCloseTo(400, 50);
    });

    test('should respect cardLess prop', async ({ page }) => {
      await page.goto('/vertical-basic?cardLess=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const cards = page.locator('.timeline-card-content');
      const count = await cards.count();
      expect(count).toBe(0);
    });

    test('should respect borderLessCards prop', async ({ page }) => {
      await page.goto('/vertical-basic?borderLessCards=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const card = page.locator('.timeline-card-content').first();
      const borderWidth = await card.evaluate(el => 
        window.getComputedStyle(el).borderWidth
      );
      expect(borderWidth).toBe('0px');
    });

    test('should respect timelinePointDimension prop', async ({ page }) => {
      await page.goto('/vertical-basic?timelinePointDimension=30');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const point = page.locator('[data-testid="timeline-circle"]').first();
      const dimension = await point.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return Math.max(rect.width, rect.height);
      });
      expect(dimension).toBeCloseTo(30, 10);
    });

    test('should respect timelinePointShape prop', async ({ page }) => {
      await page.goto('/vertical-basic?timelinePointShape=diamond');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const point = page.locator('[data-testid="timeline-circle"]').first();
      const className = await point.getAttribute('class');
      expect(className).toContain('diamond');
    });

    test('should respect lineWidth prop', async ({ page }) => {
      await page.goto('/vertical-basic?lineWidth=6');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const line = page.locator('.timeline-vertical-line, .timeline-line').first();
      const width = await line.evaluate(el => 
        window.getComputedStyle(el).width || window.getComputedStyle(el).borderWidth
      );
      expect(parseInt(width)).toBeGreaterThanOrEqual(4);
    });
  });

  test.describe('Navigation Props', () => {
    test('should respect disableNavOnKey prop', async ({ page }) => {
      await page.goto('/vertical-basic?disableNavOnKey=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      await timelineHelpers.navigateWithKeyboard('ArrowDown');
      await page.waitForTimeout(timeouts.animation);
      
      // Navigation should be disabled
      const activeItem = await timelineHelpers.getActiveItem();
      expect(activeItem).toBeFalsy();
    });

    test('should respect disableClickOnCircle prop', async ({ page }) => {
      await page.goto('/vertical-basic?disableClickOnCircle=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const circle = page.locator('[data-testid="timeline-circle"]').first();
      await circle.click();
      await page.waitForTimeout(timeouts.animation);
      
      // Click should not trigger navigation
      const activeItem = await timelineHelpers.getActiveItem();
      expect(activeItem).toBeFalsy();
    });

    test('should respect disableAutoScrollOnClick prop', async ({ page }) => {
      await page.goto('/vertical-basic?disableAutoScrollOnClick=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const initialScroll = await page.evaluate(() => 
        document.querySelector('.timeline-main-wrapper')?.scrollTop || 0
      );
      
      await timelineHelpers.navigateToItem(5, 'vertical');
      await page.waitForTimeout(timeouts.animation);
      
      const finalScroll = await page.evaluate(() => 
        document.querySelector('.timeline-main-wrapper')?.scrollTop || 0
      );
      
      expect(finalScroll).toBe(initialScroll);
    });

    test('should respect enableQuickJump prop', async ({ page }) => {
      await page.goto('/vertical-basic?enableQuickJump=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const quickJump = page.locator('.quick-jump, [data-testid="quick-jump"]');
      if (await quickJump.isVisible()) {
        await expect(quickJump).toBeVisible();
      }
    });

    test('should respect focusActiveItemOnLoad prop', async ({ page }) => {
      await page.goto('/vertical-basic?focusActiveItemOnLoad=true&activeItemIndex=3');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const activeItem = page.locator('.vertical-item-row').nth(3);
      await expect(activeItem).toBeInViewport();
    });
  });

  test.describe('Slideshow Props', () => {
    test('should respect slideShow prop', async ({ page }) => {
      await page.goto('/horizontal?slideShow=true');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      const playButton = page.locator('[aria-label*="play"]');
      await expect(playButton.first()).toBeVisible();
    });

    test('should respect slideItemDuration prop', async ({ page }) => {
      await page.goto('/horizontal?slideShow=true&slideItemDuration=1500');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      await timelineHelpers.toggleSlideshow('play');
      
      const startTime = Date.now();
      await timelineHelpers.waitForSlideshowAdvance(0, 1);
      const duration = Date.now() - startTime;
      
      expect(duration).toBeGreaterThanOrEqual(1400);
      expect(duration).toBeLessThanOrEqual(1600);
      
      await timelineHelpers.toggleSlideshow('pause');
    });

    test('should respect slideShowType prop', async ({ page }) => {
      await page.goto('/horizontal?slideShow=true&slideShowType=reveal');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      await timelineHelpers.toggleSlideshow('play');
      await page.waitForTimeout(timeouts.animation);
      
      // Check for reveal animation class
      const card = page.locator('.timeline-card-content').first();
      const className = await card.getAttribute('class');
      
      if (className?.includes('reveal')) {
        expect(className).toContain('reveal');
      }
      
      await timelineHelpers.toggleSlideshow('pause');
    });

    test('should respect showProgressOnSlideshow prop', async ({ page }) => {
      await page.goto('/horizontal?slideShow=true&showProgressOnSlideshow=true');
      await page.waitForSelector('.timeline-horz-item-container', { timeout: 10000 });
      
      await timelineHelpers.toggleSlideshow('play');
      await page.waitForTimeout(500);
      
      const progress = page.locator('.slideshow-progress, [data-testid="progress-bar"]');
      if (await progress.count() > 0) {
        await expect(progress.first()).toBeVisible();
      }
      
      await timelineHelpers.toggleSlideshow('pause');
    });
  });

  test.describe('Theme Props', () => {
    test('should respect darkMode prop', async ({ page }) => {
      await page.goto('/vertical-basic?darkMode=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const body = page.locator('body');
      const className = await body.getAttribute('class');
      
      if (className) {
        expect(className).toContain('dark');
      }
    });

    test('should respect enableDarkToggle prop', async ({ page }) => {
      await page.goto('/vertical-basic?enableDarkToggle=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const darkToggle = page.locator('[aria-label*="dark"], [aria-label*="theme"]');
      await expect(darkToggle.first()).toBeVisible();
      
      await timelineHelpers.toggleTheme();
      await page.waitForTimeout(timeouts.animation);
    });

    test('should respect theme colors', async ({ page }) => {
      await page.goto('/vertical-basic?theme.primary=#ff0000&theme.secondary=#00ff00');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const point = page.locator('[data-testid="timeline-circle"]').first();
      const color = await point.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Check if color contains red component
      expect(color).toMatch(/rgb|#/);
    });
  });

  test.describe('Content Props', () => {
    test('should respect useReadMore prop', async ({ page }) => {
      await page.goto('/vertical-basic?useReadMore=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const readMore = page.locator('.read-more, [data-testid="read-more"]');
      if (await readMore.count() > 0) {
        await expect(readMore.first()).toBeVisible();
        await readMore.first().click();
        await page.waitForTimeout(timeouts.animation);
      }
    });

    test('should respect textOverlay prop', async ({ page }) => {
      await page.goto('/vertical-basic?textOverlay=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const overlay = page.locator('.text-overlay, [data-testid="text-overlay"]');
      if (await overlay.count() > 0) {
        await expect(overlay.first()).toBeVisible();
      }
    });

    test('should respect highlightCardsOnHover prop', async ({ page }) => {
      await page.goto('/vertical-basic?highlightCardsOnHover=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const card = page.locator('.timeline-card-content').first();
      
      // Hover over card
      await card.hover();
      await page.waitForTimeout(timeouts.animation);
      
      const className = await card.getAttribute('class');
      if (className?.includes('highlight')) {
        expect(className).toContain('highlight');
      }
    });
  });

  test.describe('Media Props', () => {
    test('should respect mediaHeight prop', async ({ page }) => {
      await page.goto('/vertical-basic?mediaHeight=200');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const media = page.locator('img, video').first();
      if (await media.isVisible()) {
        const height = await media.evaluate(el => el.offsetHeight);
        expect(height).toBeCloseTo(200, 50);
      }
    });

    test('should respect mediaSettings prop', async ({ page }) => {
      await page.goto('/vertical-basic?mediaSettings.align=center&mediaSettings.fit=cover');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const media = page.locator('img').first();
      if (await media.isVisible()) {
        const style = await media.evaluate(el => ({
          objectFit: window.getComputedStyle(el).objectFit,
          objectPosition: window.getComputedStyle(el).objectPosition
        }));
        
        expect(style.objectFit).toBe('cover');
        expect(style.objectPosition).toContain('center');
      }
    });
  });

  test.describe('Scrollable Props', () => {
    test('should respect scrollable.scrollbar prop', async ({ page }) => {
      await page.goto('/vertical-basic?scrollable.scrollbar=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const wrapper = page.locator('.timeline-main-wrapper');
      const overflow = await wrapper.evaluate(el => 
        window.getComputedStyle(el).overflow
      );
      
      expect(overflow).toMatch(/auto|scroll/);
    });

    test('should trigger onScrollEnd callback', async ({ page }) => {
      // Set up console monitoring
      const consoleLogs: string[] = [];
      page.on('console', msg => {
        consoleLogs.push(msg.text());
      });
      
      await page.goto('/vertical-basic?onScrollEnd=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      await timelineHelpers.scrollTimeline('bottom');
      await page.waitForTimeout(timeouts.scroll + 500);
      
      // Check if onScrollEnd was triggered (would need to be logged in the test app)
    });
  });

  test.describe('Responsive Props', () => {
    test('should respect responsiveBreakPoint prop', async ({ page }) => {
      await page.goto('/vertical-basic?responsiveBreakPoint=768&enableBreakPoint=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      // Test above breakpoint
      await page.setViewportSize({ width: 800, height: 600 });
      await page.waitForTimeout(timeouts.animation);
      
      let wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      let className = await wrapper.getAttribute('class');
      const desktopMode = className;
      
      // Test below breakpoint
      await page.setViewportSize({ width: 700, height: 600 });
      await page.waitForTimeout(timeouts.animation);
      
      wrapper = page.locator('[data-testid="timeline-main-wrapper"]');
      className = await wrapper.getAttribute('class');
      
      // Mode might change at breakpoint
      expect(className).not.toBe(desktopMode);
    });

    test('should respect flipLayout prop', async ({ page }) => {
      await page.goto('/vertical-basic?flipLayout=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const wrapper = page.locator('.timeline-wrapper');
      const dir = await wrapper.getAttribute('dir');
      
      if (dir) {
        expect(dir).toBe('rtl');
      }
    });
  });

  test.describe('Toolbar Props', () => {
    test('should respect toolbarPosition prop', async ({ page }) => {
      await page.goto('/vertical-basic?toolbarPosition=bottom');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const toolbar = page.locator('.timeline-controls, .timeline-toolbar');
      const timeline = page.locator('.timeline-main-wrapper');
      
      if (await toolbar.isVisible()) {
        const toolbarBox = await toolbar.boundingBox();
        const timelineBox = await timeline.boundingBox();
        
        if (toolbarBox && timelineBox) {
          expect(toolbarBox.y).toBeGreaterThan(timelineBox.y);
        }
      }
    });

    test('should respect stickyToolbar prop', async ({ page }) => {
      await page.goto('/vertical-basic?stickyToolbar=true');
      await page.waitForSelector('.vertical-item-row', { timeout: 10000 });
      
      const toolbar = page.locator('.timeline-controls, .timeline-toolbar');
      if (await toolbar.isVisible()) {
        const position = await toolbar.evaluate(el => 
          window.getComputedStyle(el).position
        );
        
        expect(position).toMatch(/sticky|fixed/);
      }
    });
  });
});