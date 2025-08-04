import { test, expect } from '@playwright/experimental-ct-react';
import { Timeline } from '../../src/components/timeline/timeline';
import { TimelineCardContent } from '../../src/components/timeline-elements/timeline-card-content/timeline-card-content';

// Example component test with all Playwright CT features
test.describe('Timeline Component Tests', () => {
  test('should render timeline with items', async ({ mount, page }) => {
    // Arrange
    const items = [
      { title: 'Item 1', cardTitle: 'First Event', cardSubtitle: '2024-01-01' },
      { title: 'Item 2', cardTitle: 'Second Event', cardSubtitle: '2024-01-02' },
    ];

    // Act - Mount component
    const component = await mount(
      <Timeline 
        items={items}
        mode="HORIZONTAL"
        theme={{
          primary: '#3b82f6',
          secondary: '#f3f4f6',
          cardBgColor: '#ffffff',
          cardForeColor: '#1f2937',
        }}
      />
    );

    // Assert
    await expect(component).toBeVisible();
    await expect(component.locator('.timeline-item-container')).toHaveCount(2);
    
    // Test interactions
    await component.locator('[aria-label="Next"]').click();
    await expect(page).toHaveURL(/#.*item-2/);
  });

  test('should handle keyboard navigation', async ({ mount }) => {
    const items = [
      { title: 'Item 1', cardTitle: 'First Event' },
      { title: 'Item 2', cardTitle: 'Second Event' },
      { title: 'Item 3', cardTitle: 'Third Event' },
    ];

    const component = await mount(
      <Timeline 
        items={items}
        mode="VERTICAL"
        enableKeyboardNavigation
      />
    );

    // Focus on timeline
    await component.focus();
    
    // Press arrow keys
    await component.press('ArrowDown');
    await expect(component.locator('.active')).toContainText('Item 2');
    
    await component.press('ArrowUp');
    await expect(component.locator('.active')).toContainText('Item 1');
  });

  test('should render with custom content', async ({ mount }) => {
    const CustomContent = () => (
      <div className="custom-content">
        <h3>Custom Title</h3>
        <p>Custom description</p>
      </div>
    );

    const component = await mount(
      <TimelineCardContent>
        <CustomContent />
      </TimelineCardContent>
    );

    await expect(component.locator('.custom-content')).toBeVisible();
    await expect(component).toContainText('Custom Title');
  });

  test('should take component screenshot', async ({ mount }) => {
    const component = await mount(
      <Timeline 
        items={[{ title: 'Screenshot Test' }]}
        mode="HORIZONTAL"
      />
    );

    // Visual regression testing
    await expect(component).toHaveScreenshot('timeline-horizontal.png');
  });

  test('should handle media loading', async ({ mount, page }) => {
    const items = [{
      title: 'Media Item',
      media: {
        source: { url: '/test-image.jpg' },
        type: 'IMAGE',
      },
    }];

    // Mock image loading
    await page.route('**/test-image.jpg', route => 
      route.fulfill({ path: './tests/fixtures/test-image.jpg' })
    );

    const component = await mount(<Timeline items={items} />);
    
    const image = component.locator('img');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', '/test-image.jpg');
  });
});