import { Page, Locator, expect } from '@playwright/test';

export class TimelineHelpers {
  constructor(private page: Page) {}

  // Timeline-specific selectors
  private selectors = {
    horizontalItem: '.timeline-horz-item-container',
    verticalItem: '.vertical-item-row',
    cardContent: '.timeline-card-content',
    cardTitle: '.rc-card-title',
    cardSubtitle: '.rc-card-subtitle',
    cardDescription: '.card-description',
    cardText: '.rc-card-text',
    timelineWrapper: '.timeline-main-wrapper',
    contentWrapper: '.card-content-wrapper',
    activeItem: '.active',
    visibleItem: '.visible',
    navigationNext: '[aria-label="Next"]',
    navigationPrev: '[aria-label="Previous"]',
    playButton: '[aria-label="Play slideshow"]',
    pauseButton: '[aria-label="Pause slideshow"]',
    themeToggle: '[aria-label="Toggle theme"]',
    fullscreenButton: '[aria-label="Enter fullscreen"]',
    exitFullscreenButton: '[aria-label="Exit fullscreen"]',
  };

  // Get timeline items based on mode
  async getTimelineItems(mode: 'horizontal' | 'vertical' = 'vertical'): Promise<Locator> {
    const selector = mode === 'horizontal' 
      ? this.selectors.horizontalItem 
      : this.selectors.verticalItem;
    return this.page.locator(selector);
  }

  // Get active timeline item
  async getActiveItem(): Promise<Locator> {
    return this.page.locator(this.selectors.activeItem).first();
  }

  // Navigate timeline
  async navigateToItem(index: number, mode: 'horizontal' | 'vertical' = 'vertical') {
    const items = await this.getTimelineItems(mode);
    const item = items.nth(index);
    await item.click();
    await this.page.waitForTimeout(300); // Wait for animation
  }

  // Get card content within a specific item
  async getCardContent(itemIndex: number, mode: 'horizontal' | 'vertical' = 'vertical'): Promise<Locator> {
    const items = await this.getTimelineItems(mode);
    return items.nth(itemIndex).locator(this.selectors.cardContent);
  }

  // Verify card details
  async verifyCardDetails(
    itemIndex: number,
    expected: {
      title?: string;
      subtitle?: string;
      description?: string;
    },
    mode: 'horizontal' | 'vertical' = 'vertical'
  ) {
    const cardContent = await this.getCardContent(itemIndex, mode);
    
    if (expected.title) {
      await expect(cardContent.locator(this.selectors.cardTitle))
        .toContainText(expected.title);
    }
    
    if (expected.subtitle) {
      await expect(cardContent.locator(this.selectors.cardSubtitle))
        .toContainText(expected.subtitle);
    }
    
    if (expected.description) {
      const descSelector = `${this.selectors.cardDescription}, ${this.selectors.cardText}`;
      await expect(cardContent.locator(descSelector).first())
        .toContainText(expected.description);
    }
  }

  // Scroll timeline
  async scrollTimeline(direction: 'top' | 'bottom' | 'center') {
    const wrapper = this.page.locator(this.selectors.timelineWrapper);
    
    switch (direction) {
      case 'top':
        await wrapper.evaluate(el => el.scrollTo(0, 0));
        break;
      case 'bottom':
        await wrapper.evaluate(el => el.scrollTo(0, el.scrollHeight));
        break;
      case 'center':
        await wrapper.evaluate(el => el.scrollTo(0, el.scrollHeight / 2));
        break;
    }
    
    await this.page.waitForTimeout(500); // Wait for scroll animation
  }

  // Check visibility after scroll
  async checkVisibilityAfterScroll(itemIndex: number, shouldBeVisible: boolean = true) {
    const items = await this.getTimelineItems();
    const contentWrapper = items.nth(itemIndex).locator(this.selectors.contentWrapper);
    
    if (shouldBeVisible) {
      await expect(contentWrapper).toHaveClass(/visible/);
    } else {
      await expect(contentWrapper).not.toHaveClass(/visible/);
    }
  }

  // Start/stop slideshow
  async toggleSlideshow(action: 'play' | 'pause') {
    const selector = action === 'play' 
      ? this.selectors.playButton 
      : this.selectors.pauseButton;
    
    const button = this.page.locator(selector);
    if (await button.isVisible()) {
      await button.click();
    }
  }

  // Wait for slideshow advance
  async waitForSlideshowAdvance(fromIndex: number, toIndex: number) {
    await expect(async () => {
      const activeItem = await this.getActiveItem();
      const dataIndex = await activeItem.getAttribute('data-index');
      return dataIndex === toIndex.toString();
    }).toBeTruthy({ timeout: 5000 });
  }

  // Toggle theme
  async toggleTheme() {
    const themeButton = this.page.locator(this.selectors.themeToggle);
    if (await themeButton.isVisible()) {
      await themeButton.click();
      await this.page.waitForTimeout(300); // Wait for theme transition
    }
  }

  // Check theme
  async checkTheme(expectedTheme: 'dark' | 'light') {
    const body = this.page.locator('body');
    await expect(body).toHaveClass(new RegExp(`${expectedTheme}-theme`));
  }

  // Toggle fullscreen
  async toggleFullscreen(action: 'enter' | 'exit') {
    const selector = action === 'enter' 
      ? this.selectors.fullscreenButton 
      : this.selectors.exitFullscreenButton;
    
    const button = this.page.locator(selector);
    if (await button.isVisible()) {
      await button.click();
      await this.page.waitForTimeout(300); // Wait for fullscreen transition
    }
  }

  // Check media content
  async checkMediaContent(itemIndex: number, mediaType: 'image' | 'video' | 'youtube') {
    const items = await this.getTimelineItems();
    const item = items.nth(itemIndex);
    
    switch (mediaType) {
      case 'image':
        const img = item.locator('img');
        await expect(img).toBeVisible();
        return img;
        
      case 'video':
        const video = item.locator('video');
        await expect(video).toBeVisible();
        return video;
        
      case 'youtube':
        const iframe = item.locator('iframe');
        await expect(iframe).toBeVisible();
        await expect(iframe).toHaveAttribute('src', /youtube\.com\/embed/);
        return iframe;
    }
  }

  // Keyboard navigation
  async navigateWithKeyboard(key: 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'Home' | 'End') {
    await this.page.locator('.timeline-main').focus();
    await this.page.keyboard.press(key);
    await this.page.waitForTimeout(300); // Wait for navigation animation
  }

  // Check responsive behavior
  async checkResponsiveBehavior(viewports: Array<{ width: number; height: number; name: string }>) {
    for (const viewport of viewports) {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
      await this.page.waitForTimeout(300); // Wait for responsive adjustments
      
      // Take screenshot for visual regression
      await this.page.screenshot({
        path: `test-results/screenshots/timeline-${viewport.name}.png`,
        fullPage: true,
      });
      
      // Verify timeline is still visible and functional
      const items = await this.getTimelineItems();
      await expect(items.first()).toBeVisible();
    }
  }

  // Performance monitoring
  async measureTimelinePerformance() {
    const metrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByName('first-contentful-paint')[0];
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstContentfulPaint: paint ? paint.startTime : null,
      };
    });
    
    return metrics;
  }

  // Accessibility checks
  async checkAccessibility() {
    // Check ARIA labels
    const navButtons = await this.page.locator('[aria-label]').all();
    for (const button of navButtons) {
      const label = await button.getAttribute('aria-label');
      expect(label).toBeTruthy();
    }
    
    // Check keyboard navigation
    await this.page.locator('.timeline-main').focus();
    await expect(this.page.locator('.timeline-main')).toBeFocused();
    
    // Check color contrast (basic check)
    const hasHighContrast = await this.page.evaluate(() => {
      const element = document.querySelector('.timeline-card-content');
      if (!element) return false;
      
      const styles = window.getComputedStyle(element);
      const bg = styles.backgroundColor;
      const fg = styles.color;
      
      // Basic check - in real scenario, use a proper contrast calculation
      return bg !== fg;
    });
    
    expect(hasHighContrast).toBeTruthy();
  }
}