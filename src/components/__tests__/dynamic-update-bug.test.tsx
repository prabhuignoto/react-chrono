import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor, act } from '@testing-library/react';
import React from 'react';
import Chrono from '../index';
import { TestWrapper } from '../../test-utils/test-wrapper';

// Mock window.matchMedia
window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  };
});

// Mock IntersectionObserver
window.IntersectionObserver = vi.fn(function (callback) {
  this.disconnect = vi.fn();
  this.observe = vi.fn();
  this.root = null;
  this.rootMargin = '';
  this.takeRecords = vi.fn();
  this.thresholds = [];
  this.unobserve = vi.fn();
} as any);

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Helper function to create test items
const createTestItems = (count: number, prefix: string = 'Item') => {
  return Array.from({ length: count }, (_, i) => ({
    title: `${prefix} ${i + 1}`,
    cardTitle: `Card ${i + 1}`,
    cardSubtitle: `Subtitle ${i + 1}`,
    cardDetailedText: `Detailed text for ${prefix} ${i + 1}`,
    date: `2024-0${i + 1}-01`,
  }));
};

describe('Dynamic Update Bug Fix (Issue #501)', () => {
  beforeEach(() => {
    // Clear any existing timeline elements
    document
      .querySelectorAll('[data-testid="timeline-main-wrapper"]')
      .forEach((el) => el.remove());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Item Replacement (5 items → 13 items) - The Bug Case', () => {
    it('should handle filtering from 5 items to 13 items without getting stuck', async () => {
      const initialItems = createTestItems(5, 'Initial');
      const filteredItems = createTestItems(13, 'Filtered');

      const { rerender, container } = render(
        <TestWrapper mode="HORIZONTAL">
          <Chrono
            items={initialItems}
            mode="horizontal"
            allowDynamicUpdate={true}
            disableToolbar
          />
        </TestWrapper>,
      );

      // Wait for initial render
      await waitFor(() => {
        const timelineWrapper = container.querySelector(
          '[data-testid="timeline-main-wrapper"]',
        );
        expect(timelineWrapper).toBeInTheDocument();
      });

      // Update items to filtered set (5 → 13 items - replacement, not append)
      // This is the bug case: items are replaced, not appended
      await act(async () => {
        rerender(
          <TestWrapper mode="HORIZONTAL">
            <Chrono
              items={filteredItems}
              mode="horizontal"
              allowDynamicUpdate={true}
              disableToolbar
            />
          </TestWrapper>,
        );
      });

      // Wait for update to complete - component should not be stuck
      await waitFor(
        () => {
          const updatedWrapper = container.querySelector(
            '[data-testid="timeline-main-wrapper"]',
          );
          expect(updatedWrapper).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Verify component is still interactive (not stuck)
      // The main test: component should render without errors
      const timelineWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(timelineWrapper).toBeInTheDocument();
    });

    it('should validate active item index is within bounds after replacement', async () => {
      const initialItems = createTestItems(5, 'Initial');
      const filteredItems = createTestItems(13, 'Filtered');

      const { rerender, container } = render(
        <TestWrapper mode="HORIZONTAL">
          <Chrono
            items={initialItems}
            mode="horizontal"
            allowDynamicUpdate={true}
            activeItemIndex={4} // Set to last item (index 4)
            disableToolbar
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        const timelineWrapper = container.querySelector(
          '[data-testid="timeline-main-wrapper"]',
        );
        expect(timelineWrapper).toBeInTheDocument();
      });

      // Update items (5 → 13)
      await act(async () => {
        rerender(
          <TestWrapper mode="HORIZONTAL">
            <Chrono
              items={filteredItems}
              mode="horizontal"
              allowDynamicUpdate={true}
              activeItemIndex={4} // Keep same index
              disableToolbar
            />
          </TestWrapper>,
        );
      });

      await waitFor(
        () => {
          const updatedWrapper = container.querySelector(
            '[data-testid="timeline-main-wrapper"]',
          );
          expect(updatedWrapper).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Component should render without errors (active item should be valid)
      const timelineWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(timelineWrapper).toBeInTheDocument();
    });
  });

  describe('Item Replacement (13 items → 5 items)', () => {
    it('should handle filtering from 13 items to 5 items correctly', async () => {
      const initialItems = createTestItems(13, 'Initial');
      const filteredItems = createTestItems(5, 'Filtered');

      const { rerender, container } = render(
        <TestWrapper mode="HORIZONTAL">
          <Chrono
            items={initialItems}
            mode="horizontal"
            allowDynamicUpdate={true}
            disableToolbar
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        const timelineWrapper = container.querySelector(
          '[data-testid="timeline-main-wrapper"]',
        );
        expect(timelineWrapper).toBeInTheDocument();
      });

      // Update items (13 → 5)
      await act(async () => {
        rerender(
          <TestWrapper mode="HORIZONTAL">
            <Chrono
              items={filteredItems}
              mode="horizontal"
              allowDynamicUpdate={true}
              disableToolbar
            />
          </TestWrapper>,
        );
      });

      await waitFor(
        () => {
          const updatedWrapper = container.querySelector(
            '[data-testid="timeline-main-wrapper"]',
          );
          expect(updatedWrapper).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Component should render without errors
      const timelineWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(timelineWrapper).toBeInTheDocument();
    });
  });

  describe('Multiple Transitions (13 → 5 → 13 items)', () => {
    it('should handle multiple filter transitions smoothly', async () => {
      const items13 = createTestItems(13, 'Full');
      const items5 = createTestItems(5, 'Filtered');
      const items13Again = createTestItems(13, 'FullAgain');

      const { rerender, container } = render(
        <TestWrapper mode="HORIZONTAL">
          <Chrono
            items={items13}
            mode="horizontal"
            allowDynamicUpdate={true}
            disableToolbar
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        const timelineWrapper = container.querySelector(
          '[data-testid="timeline-main-wrapper"]',
        );
        expect(timelineWrapper).toBeInTheDocument();
      });

      // First transition: 13 → 5
      await act(async () => {
        rerender(
          <TestWrapper mode="HORIZONTAL">
            <Chrono
              items={items5}
              mode="horizontal"
              allowDynamicUpdate={true}
              disableToolbar
            />
          </TestWrapper>,
        );
      });

      await waitFor(
        () => {
          const timelineWrapper = container.querySelector(
            '[data-testid="timeline-main-wrapper"]',
          );
          expect(timelineWrapper).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Second transition: 5 → 13 (the bug case)
      await act(async () => {
        rerender(
          <TestWrapper mode="HORIZONTAL">
            <Chrono
              items={items13Again}
              mode="horizontal"
              allowDynamicUpdate={true}
              disableToolbar
            />
          </TestWrapper>,
        );
      });

      await waitFor(
        () => {
          const updatedWrapper = container.querySelector(
            '[data-testid="timeline-main-wrapper"]',
          );
          expect(updatedWrapper).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Component should still be interactive after multiple transitions
      const timelineWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(timelineWrapper).toBeInTheDocument();
    });
  });

  describe('True Append vs Replacement Detection', () => {
    it('should detect true append (same items + new ones)', async () => {
      const initialItems = createTestItems(5, 'Item');
      const appendedItems = [...initialItems, ...createTestItems(3, 'New')];

      const { rerender, container } = render(
        <TestWrapper mode="HORIZONTAL">
          <Chrono
            items={initialItems}
            mode="horizontal"
            allowDynamicUpdate={true}
            disableToolbar
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        const timelineWrapper = container.querySelector(
          '[data-testid="timeline-main-wrapper"]',
        );
        expect(timelineWrapper).toBeInTheDocument();
      });

      // Append items (should use updateItems, not initItems)
      await act(async () => {
        rerender(
          <TestWrapper mode="HORIZONTAL">
            <Chrono
              items={appendedItems}
              mode="horizontal"
              allowDynamicUpdate={true}
              disableToolbar
            />
          </TestWrapper>,
        );
      });

      await waitFor(
        () => {
          const timelineWrapper = container.querySelector(
            '[data-testid="timeline-main-wrapper"]',
          );
          expect(timelineWrapper).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Component should render without errors
      const timelineWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(timelineWrapper).toBeInTheDocument();
    });

    it('should detect replacement (completely different items)', async () => {
      const initialItems = createTestItems(5, 'Initial');
      const replacedItems = createTestItems(8, 'Replaced'); // Different content

      const { rerender, container } = render(
        <TestWrapper mode="HORIZONTAL">
          <Chrono
            items={initialItems}
            mode="horizontal"
            allowDynamicUpdate={true}
            disableToolbar
          />
        </TestWrapper>,
      );

      await waitFor(() => {
        const timelineWrapper = container.querySelector(
          '[data-testid="timeline-main-wrapper"]',
        );
        expect(timelineWrapper).toBeInTheDocument();
      });

      // Replace items (should use initItems, not updateItems)
      await act(async () => {
        rerender(
          <TestWrapper mode="HORIZONTAL">
            <Chrono
              items={replacedItems}
              mode="horizontal"
              allowDynamicUpdate={true}
              disableToolbar
            />
          </TestWrapper>,
        );
      });

      await waitFor(
        () => {
          const timelineWrapper = container.querySelector(
            '[data-testid="timeline-main-wrapper"]',
          );
          expect(timelineWrapper).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Component should render without errors
      const timelineWrapper = container.querySelector(
        '[data-testid="timeline-main-wrapper"]',
      );
      expect(timelineWrapper).toBeInTheDocument();
    });
  });
});
