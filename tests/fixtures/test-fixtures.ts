import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { SELECTORS, getTimelineItemSelector, getNavigationButtonSelector } from './selector-map';

// Define custom fixture types
export type TestFixtures = {
  authenticatedPage: Page;
  testHelpers: TestHelpers;
  apiMocker: ApiMocker;
};

// Test helper functions (replacing Cypress custom commands)
export class TestHelpers {
  constructor(private page: Page) {}

  // Navigate with wait for network idle
  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await this.page.waitForTimeout(1000); // Give some time for React to render
  }

  // Wait for element and click with retry
  async clickElement(selector: string, options?: { timeout?: number; force?: boolean }) {
    const element = await this.page.locator(selector).first();
    await element.waitFor({ state: 'visible', timeout: options?.timeout });
    
    if (options?.force) {
      await element.click({ force: true });
    } else {
      await element.click();
    }
  }

  // Type with clear and delay
  async typeInField(selector: string, text: string, options?: { delay?: number; clear?: boolean }) {
    const element = await this.page.locator(selector).first();
    await element.waitFor({ state: 'visible' });
    
    if (options?.clear !== false) {
      await element.clear();
    }
    
    await element.type(text, { delay: options?.delay || 50 });
  }

  // Wait for and assert text
  async assertText(selector: string, expectedText: string | RegExp) {
    const element = await this.page.locator(selector).first();
    await expect(element).toContainText(expectedText);
  }

  // Wait for element to be visible/hidden
  async waitForElement(selector: string, state: 'visible' | 'hidden' = 'visible', timeout = 30000) {
    await this.page.locator(selector).first().waitFor({ state, timeout });
  }

  // Scroll to element
  async scrollToElement(selector: string) {
    await this.page.locator(selector).first().scrollIntoViewIfNeeded();
  }

  // Take screenshot with name
  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  // Check element count
  async assertElementCount(selector: string, expectedCount: number) {
    await expect(this.page.locator(selector)).toHaveCount(expectedCount);
  }

  // Wait for network idle
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  // Get timeline items
  async getTimelineItems() {
    return this.page.locator('.timeline-horz-item-container, .timeline-item-container');
  }

  // Navigate timeline
  async navigateTimeline(direction: 'next' | 'prev') {
    const selector = direction === 'next' ? '[aria-label="Next"]' : '[aria-label="Previous"]';
    await this.clickElement(selector);
  }

  // Modern Helper Methods for Timeline Testing

  // Wait for timeline to be ready (replaces hardcoded waits)
  async waitForTimelineReady() {
    // Wait for timeline wrapper
    await this.page.locator('[class*="timeline"], .timeline-main-wrapper').first().waitFor({ state: 'visible' });
    // Wait for at least one timeline item
    await this.page.locator('.vertical-item-row, .timeline-horz-item-container').first().waitFor({ state: 'visible' });
    // Wait for network idle
    await this.page.waitForLoadState('networkidle');
  }

  // Get currently active timeline item
  async getActiveTimelineItem() {
    return this.page.locator('[class*="active"], [aria-current], [data-active="true"]').first();
  }

  // Navigate timeline with keyboard
  async navigateWithKeyboard(key: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Home' | 'End') {
    await this.page.keyboard.press(key);
    // Use web-first assertion instead of timeout
    await this.page.locator('.vertical-item-row, .timeline-horz-item-container').first().waitFor({ state: 'visible' });
  }

  // Check for console errors (improved error detection)
  async assertNoConsoleErrors(excludePatterns: string[] = []) {
    const consoleErrors: string[] = [];

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        const shouldExclude = excludePatterns.some(pattern => text.includes(pattern));
        if (!shouldExclude) {
          consoleErrors.push(text);
        }
      }
    });

    return consoleErrors;
  }

  // Measure performance metrics
  async measurePerformance() {
    return this.page.evaluate(() => {
      const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (perfEntries.length > 0) {
        const navEntry = perfEntries[0];
        return {
          domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
          loadComplete: navEntry.loadEventEnd - navEntry.fetchStart,
          timeToInteractive: navEntry.domInteractive - navEntry.fetchStart,
        };
      }
      return null;
    });
  }

  // Basic accessibility checks
  async checkAccessibility() {
    const issues: string[] = [];

    // Check for images without alt text
    const imagesWithoutAlt = await this.page.locator('img:not([alt])').count();
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images without alt text`);
    }

    // Check for buttons without labels
    const buttonsWithoutLabel = await this.page.locator('button:not([aria-label]):not(:has-text(" "))').count();
    if (buttonsWithoutLabel > 0) {
      issues.push(`${buttonsWithoutLabel} buttons without labels`);
    }

    // Check for proper heading hierarchy
    const headings = await this.page.locator('h1, h2, h3, h4, h5, h6').evaluateAll(elements => {
      return elements.map(el => parseInt(el.tagName.substring(1)));
    });

    // Check if headings skip levels
    for (let i = 1; i < headings.length; i++) {
      if (headings[i] - headings[i - 1] > 1) {
        issues.push('Heading hierarchy skips levels');
        break;
      }
    }

    return issues;
  }

  // Wait for element with custom retry logic (replaces hardcoded waits)
  async waitForElementWithRetry(selector: string, maxRetries = 3, retryDelay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.page.locator(selector).first().waitFor({ state: 'visible', timeout: retryDelay });
        return true;
      } catch (e) {
        if (i === maxRetries - 1) throw e;
      }
    }
    return false;
  }

  // Smart wait that combines multiple wait strategies
  async smartWait(condition: () => Promise<boolean>, timeout = 5000, pollInterval = 100) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return true;
      }
      await this.page.waitForTimeout(pollInterval);
    }
    return false;
  }

  // ============================================================================
  // NEW HELPER METHODS FOR REDESIGNED APP (2025-10-27)
  // ============================================================================

  /**
   * Get timeline items based on mode (uses centralized selectors)
   * @param mode - Timeline mode: 'vertical', 'horizontal', or 'alternating'
   * @returns Locator for all timeline items
   */
  async getTimelineItems(mode: 'vertical' | 'horizontal' | 'alternating' = 'vertical') {
    const selector = getTimelineItemSelector(mode);
    return this.page.locator(selector);
  }

  /**
   * Get a specific timeline item by index
   * @param index - Zero-based index of the item
   * @param mode - Timeline mode
   */
  async getTimelineItemByIndex(index: number, mode: 'vertical' | 'horizontal' | 'alternating' = 'vertical') {
    const items = await this.getTimelineItems(mode);
    return items.nth(index);
  }

  /**
   * Get toolbar button by type (uses ARIA labels)
   * @param type - Button type
   * @returns Locator for the button
   */
  async getToolbarButton(type: 'next' | 'previous' | 'first' | 'last' | 'play' | 'pause') {
    const selector = getNavigationButtonSelector(type);
    return this.page.locator(selector).first();
  }

  /**
   * Click a toolbar button and wait for navigation to complete
   * @param type - Button type
   */
  async clickToolbarButton(type: 'next' | 'previous' | 'first' | 'last' | 'play' | 'pause') {
    const button = await this.getToolbarButton(type);
    await button.waitFor({ state: 'visible' });
    await button.click();
    // Wait for any active item transition
    await this.page.locator(SELECTORS.ACTIVE_ITEM).first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }

  /**
   * Get currently active timeline item using multiple strategies
   */
  async getActiveItem() {
    return this.page.locator(SELECTORS.ACTIVE_ITEM).first();
  }

  /**
   * Get timeline card content by index
   * @param index - Zero-based index
   */
  async getCardContent(index: number) {
    return this.page.locator(SELECTORS.CARD_CONTENT).nth(index);
  }

  /**
   * Get timeline card title
   * @param cardIndex - Zero-based card index
   */
  async getCardTitle(cardIndex: number) {
    const card = await this.getCardContent(cardIndex);
    return card.locator(SELECTORS.CARD_TITLE).first();
  }

  /**
   * Get timeline card media (image/video)
   * @param cardIndex - Zero-based card index
   */
  async getCardMedia(cardIndex: number) {
    const card = await this.getCardContent(cardIndex);
    return card.locator(SELECTORS.CARD_MEDIA).first();
  }

  /**
   * Wait for timeline to be fully loaded and interactive
   * Updated to work with redesigned demo app structure
   */
  async waitForTimelineFullyLoaded() {
    // Wait for timeline wrapper
    await this.page.locator(SELECTORS.TIMELINE_WRAPPER).first().waitFor({ state: 'visible', timeout: 10000 });

    // Wait for at least one timeline item
    await this.page.locator(`${SELECTORS.VERTICAL_ITEM}, ${SELECTORS.HORIZONTAL_ITEM}`).first().waitFor({ state: 'visible', timeout: 10000 });

    // Wait for network idle
    await this.page.waitForLoadState('networkidle');

    // Small delay for any animations to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Get timeline toolbar
   */
  async getToolbar() {
    return this.page.locator(SELECTORS.TOOLBAR).first();
  }

  /**
   * Check if toolbar button is enabled
   * @param type - Button type
   */
  async isToolbarButtonEnabled(type: 'next' | 'previous' | 'first' | 'last' | 'play' | 'pause') {
    const button = await this.getToolbarButton(type);
    return !(await button.isDisabled());
  }

  /**
   * Get nested timeline items (if any)
   */
  async getNestedItems() {
    return this.page.locator(SELECTORS.NESTED_ITEM);
  }

  /**
   * Focus on timeline wrapper for keyboard navigation
   */
  async focusTimeline() {
    const timeline = this.page.locator(SELECTORS.TIMELINE_WRAPPER).first();
    await timeline.focus();
  }

  /**
   * Assert that an element has focus
   * @param selector - Element selector
   */
  async assertHasFocus(selector: string) {
    const focusedElement = await this.page.evaluate(() => document.activeElement?.className || '');
    const targetElement = await this.page.locator(selector).first();
    const targetClass = await targetElement.getAttribute('class');
    expect(focusedElement).toContain(targetClass || '');
  }

  /**
   * Get all timeline points/circles
   */
  async getTimelinePoints() {
    return this.page.locator(SELECTORS.TIMELINE_POINT);
  }

  /**
   * Click a timeline point by index
   * @param index - Zero-based index
   */
  async clickTimelinePoint(index: number) {
    const points = await this.getTimelinePoints();
    const point = points.nth(index);
    await point.waitFor({ state: 'visible' });
    await point.click();
    // Wait for transition
    await this.page.waitForTimeout(300);
  }

  /**
   * Assert timeline item count
   * @param expectedCount - Expected number of items
   * @param mode - Timeline mode
   */
  async assertTimelineItemCount(expectedCount: number, mode: 'vertical' | 'horizontal' | 'alternating' = 'vertical') {
    const items = await this.getTimelineItems(mode);
    await expect(items).toHaveCount(expectedCount);
  }

  /**
   * Get demo page layout wrapper (new in redesigned app)
   */
  async getDemoPageLayout() {
    return this.page.locator(SELECTORS.DEMO_PAGE_LAYOUT).first();
  }

  /**
   * Check if element is visible in viewport
   * @param selector - Element selector
   */
  async isVisibleInViewport(selector: string) {
    const element = this.page.locator(selector).first();
    return await element.isVisible();
  }

  /**
   * Navigate and wait for timeline to be ready (combined helper)
   * @param url - URL to navigate to
   */
  async navigateAndWaitForTimeline(url: string) {
    await this.navigateTo(url);
    await this.waitForTimelineFullyLoaded();
  }
}

// API Mocking helper (replacing cy.intercept)
export class ApiMocker {
  constructor(private page: Page) {}

  async mockRoute(url: string | RegExp, response: any, options?: { status?: number; delay?: number }) {
    await this.page.route(url, async (route) => {
      if (options?.delay) {
        await new Promise(resolve => setTimeout(resolve, options.delay));
      }
      
      await route.fulfill({
        status: options?.status || 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      });
    });
  }

  async mockRouteFromFile(url: string | RegExp, filePath: string, options?: { status?: number }) {
    const absolutePath = path.join(process.cwd(), filePath);
    const data = await fs.readFile(absolutePath, 'utf-8');
    
    await this.page.route(url, async (route) => {
      await route.fulfill({
        status: options?.status || 200,
        contentType: 'application/json',
        body: data,
      });
    });
  }

  async waitForRequest(url: string | RegExp, timeout = 30000): Promise<any> {
    const request = await this.page.waitForRequest(url, { timeout });
    return request.postDataJSON();
  }

  async waitForResponse(url: string | RegExp, timeout = 30000): Promise<any> {
    const response = await this.page.waitForResponse(url, { timeout });
    return response.json();
  }
}

// Custom test fixture with helpers
export const test = base.extend<TestFixtures>({
  // Authenticated page fixture (for auto-login)
  authenticatedPage: async ({ page, context }, use) => {
    // Check if we have saved auth state
    const authFile = 'tests/fixtures/auth.json';
    
    try {
      // Try to load existing auth state
      const authState = await fs.readFile(authFile, 'utf-8');
      await context.addCookies(JSON.parse(authState).cookies);
      await context.addInitScript(() => {
        // Add any localStorage/sessionStorage items here
      });
    } catch {
      // If no auth state, perform login
      await page.goto('/login');
      await page.fill('#username', process.env.TEST_USERNAME || 'testuser');
      await page.fill('#password', process.env.TEST_PASSWORD || 'testpass');
      await page.click('button[type="submit"]');
      await page.waitForURL('/dashboard');
      
      // Save auth state
      const storageState = await context.storageState();
      await fs.mkdir(path.dirname(authFile), { recursive: true });
      await fs.writeFile(authFile, JSON.stringify(storageState));
    }
    
    await use(page);
  },

  // Test helpers fixture
  testHelpers: async ({ page }, use) => {
    const helpers = new TestHelpers(page);
    await use(helpers);
  },

  // API mocker fixture
  apiMocker: async ({ page }, use) => {
    const mocker = new ApiMocker(page);
    await use(mocker);
  },
});

// Re-export expect for convenience
export { expect } from '@playwright/test';