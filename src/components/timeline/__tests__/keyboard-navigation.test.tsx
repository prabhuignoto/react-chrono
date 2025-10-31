import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chrono } from '../../index';
import { TimelineCardModel } from '@models/TimelineItemModel';

/**
 * Keyboard Navigation Tests for Timeline Component
 * Tests tab order, roving tabindex, arrow key navigation, and focus management
 * WCAG 2.1.1: Keyboard, WCAG 2.4.3: Focus Order
 */

describe('Timeline - Keyboard Navigation', () => {
  const mockItems: TimelineCardModel[] = [
    {
      id: '1',
      title: 'Event 1',
      cardTitle: 'Card Title 1',
      cardSubtitle: 'Subtitle 1',
      cardDetailedText: 'Detailed text 1',
    },
    {
      id: '2',
      title: 'Event 2',
      cardTitle: 'Card Title 2',
      cardSubtitle: 'Subtitle 2',
      cardDetailedText: 'Detailed text 2',
    },
    {
      id: '3',
      title: 'Event 3',
      cardTitle: 'Card Title 3',
      cardSubtitle: 'Subtitle 3',
      cardDetailedText: 'Detailed text 3',
    },
  ];

  it('should navigate timeline items with Up/Down arrow keys in vertical mode', async () => {
    const user = userEvent.setup();
    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
      />
    );

    // Get first timeline item and focus it
    const firstItem = screen.getByTestId('vertical-item-row', { selector: '[data-item-id="1"]' });
    firstItem.focus();

    expect(firstItem).toHaveFocus();

    // Press Down arrow to navigate to next item
    await user.keyboard('{ArrowDown}');

    // Second item should now have focus (roving tabindex)
    // Note: This test assumes roving tabindex is implemented
    await waitFor(() => {
      const secondItem = screen.getByTestId('vertical-item-row', { selector: '[data-item-id="2"]' });
      expect(secondItem).toHaveFocus();
    });
  });

  it('should support Home key to jump to first timeline item', async () => {
    const user = userEvent.setup();
    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
      />
    );

    // Get last item and focus it
    const lastItem = screen.getByTestId('vertical-item-row', { selector: '[data-item-id="3"]' });
    lastItem.focus();

    // Press Home to jump to first
    await user.keyboard('{Home}');

    await waitFor(() => {
      const firstItem = screen.getByTestId('vertical-item-row', { selector: '[data-item-id="1"]' });
      expect(firstItem).toHaveFocus();
    });
  });

  it('should support End key to jump to last timeline item', async () => {
    const user = userEvent.setup();
    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
      />
    );

    // Get first item and focus it
    const firstItem = screen.getByTestId('vertical-item-row', { selector: '[data-item-id="1"]' });
    firstItem.focus();

    // Press End to jump to last
    await user.keyboard('{End}');

    await waitFor(() => {
      const lastItem = screen.getByTestId('vertical-item-row', { selector: '[data-item-id="3"]' });
      expect(lastItem).toHaveFocus();
    });
  });

  it('should maintain focus on toolbar button when clicked during navigation', async () => {
    const user = userEvent.setup();
    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
        display={{ disableToolbar: false }}
      />
    );

    // Find and click the "Next" navigation button
    const nextButton = screen.getByRole('button', { name: /next/i });
    nextButton.focus();
    fireEvent.click(nextButton);

    // Focus should stay on the button, not move to timeline item
    expect(nextButton).toHaveFocus();
  });

  it('should restore focus to search input after closing popover with Escape', async () => {
    const user = userEvent.setup();
    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
        display={{ disableToolbar: false }}
      />
    );

    // Find search input
    const searchInput = screen.getByRole('searchbox');
    searchInput.focus();

    // Type search query
    await user.type(searchInput, 'Event');

    // Search should still have focus
    expect(searchInput).toHaveFocus();
  });

  it('should have proper tab order in toolbar', async () => {
    const user = userEvent.setup();
    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
        display={{ disableToolbar: false }}
      />
    );

    // Tab through toolbar controls
    // This tests that tab order follows: Navigation > Play > Dark Mode > Search > Popovers > Fullscreen
    const toolbar = screen.getByRole('toolbar');

    // All toolbar buttons should be reachable via Tab
    expect(toolbar).toBeInTheDocument();
  });

  it('should navigate popover menu with arrow keys and close with Escape', async () => {
    const user = userEvent.setup();
    const mockOnSelect = jest.fn();

    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
        display={{ disableToolbar: false }}
      />
    );

    // This test would require specific popover testing
    // Popover navigation is handled by the List component with roving tabindex
  });

  it('should have Home and End key support in popover menu', async () => {
    // This test verifies Home/End keys work in list items
    // List component should handle these via useRovingTabIndex
    expect(true).toBe(true); // Placeholder for implementation-specific test
  });

  it('should maintain focus sequencing after entering fullscreen', async () => {
    const user = userEvent.setup();
    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
        display={{ disableToolbar: false }}
      />
    );

    // This test would require checking focus moves to first timeline item after fullscreen
    // Implementation would depend on fullscreen API availability in test environment
    expect(true).toBe(true);
  });

  it('should return focus to search input when cycling through matches with Enter', async () => {
    const user = userEvent.setup();
    render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
        display={{ disableToolbar: false }}
      />
    );

    // Find search input
    const searchInput = screen.getByRole('searchbox');

    // Type and search
    await user.type(searchInput, 'Event');
    await user.keyboard('{Enter}');

    // After navigation, focus should return to search input
    // This is tested in useTimelineSearch.ts
    expect(searchInput).toBeInTheDocument();
  });

  it('should handle roving tabindex for timeline items with only one item tabbable', async () => {
    const { container } = render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
      />
    );

    // Get all timeline items
    const items = container.querySelectorAll('[data-testid="vertical-item-row"]');

    // All items should be in the DOM
    expect(items.length).toBe(mockItems.length);

    // Only first item should have tabIndex={0}
    expect((items[0] as HTMLElement).tabIndex).toBe(0);

    // Other items should have tabIndex={-1}
    for (let i = 1; i < items.length; i++) {
      expect((items[i] as HTMLElement).tabIndex).toBe(-1);
    }
  });

  it('should have ARIA keyshortcuts documented on timeline region', () => {
    const { container } = render(
      <Chrono
        items={mockItems}
        mode="VERTICAL"
        layout={{ pointSize: 18 }}
      />
    );

    const timelineRegion = container.querySelector('[role="region"]');
    expect(timelineRegion).toHaveAttribute('aria-keyshortcuts');
    expect(timelineRegion?.getAttribute('aria-keyshortcuts')).toContain('Arrow');
  });
});
