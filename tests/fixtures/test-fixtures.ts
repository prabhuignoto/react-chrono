import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

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