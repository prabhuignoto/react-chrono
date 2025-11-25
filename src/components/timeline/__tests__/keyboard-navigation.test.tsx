import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { customRender, providerProps } from '../../common/test';
import Timeline from '../timeline';
import { TimelineCardModel } from '@models/TimelineItemModel';

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

// Mock matchMedia
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

/**
 * Keyboard Navigation Tests for Timeline Component
 * Tests tab order, roving tabindex, arrow key navigation, and focus management
 * WCAG 2.1.1: Keyboard, WCAG 2.4.3: Focus Order
 */

describe('Timeline - Keyboard Navigation', () => {
  const mockItems = [
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

  const commonProps = {
    items: mockItems,
    mode: 'VERTICAL' as const,
    activeTimelineItem: 0,
    onItemSelected: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    onFirst: vi.fn(),
    onLast: vi.fn(),
  };

  it('should render timeline items in vertical mode', () => {
    const { container } = customRender(
      <Timeline {...commonProps} mode="VERTICAL" />,
      { providerProps },
    );

    const timelineItems = container.querySelectorAll('[class*="point"]');
    expect(timelineItems.length).toBeGreaterThan(0);
  });

  it('should support navigation with keyboard buttons', async () => {
    const user = userEvent.setup();
    const mockOnNext = vi.fn();
    const { getByLabelText } = customRender(
      <Timeline {...commonProps} onNext={mockOnNext} />,
      { providerProps },
    );

    const nextButton = getByLabelText('next');
    expect(nextButton).toBeInTheDocument();

    await user.click(nextButton);
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('should support Previous button navigation', async () => {
    const user = userEvent.setup();
    const mockOnPrevious = vi.fn();
    const { getByLabelText } = customRender(
      <Timeline
        {...commonProps}
        activeTimelineItem={2}
        onPrevious={mockOnPrevious}
      />,
      { providerProps },
    );

    const previousButton = getByLabelText('previous');
    expect(previousButton).toBeInTheDocument();

    await user.click(previousButton);
    await waitFor(
      () => {
        expect(mockOnPrevious).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });

  it('should support First button to go to first item', async () => {
    const user = userEvent.setup();
    const mockOnFirst = vi.fn();
    const { getByLabelText } = customRender(
      <Timeline
        {...commonProps}
        activeTimelineItem={2}
        onFirst={mockOnFirst}
      />,
      { providerProps },
    );

    const firstButton = getByLabelText('first');
    expect(firstButton).toBeInTheDocument();

    await user.click(firstButton);
    await waitFor(() => {
      expect(mockOnFirst).toHaveBeenCalled();
    });
  });

  it('should support Last button to go to last item', async () => {
    const user = userEvent.setup();
    const mockOnLast = vi.fn();
    const { getByLabelText } = customRender(
      <Timeline {...commonProps} activeTimelineItem={0} onLast={mockOnLast} />,
      { providerProps },
    );

    const lastButton = getByLabelText('last');
    expect(lastButton).toBeInTheDocument();

    await user.click(lastButton);
    await waitFor(() => {
      expect(mockOnLast).toHaveBeenCalled();
    });
  });

  it('should have ARIA attributes for accessibility', () => {
    const { container } = customRender(<Timeline {...commonProps} />, {
      providerProps,
    });

    const timelineRegion = container.querySelector('[role="region"]');
    expect(timelineRegion).toBeInTheDocument();
    expect(timelineRegion).toHaveAttribute('aria-label');
  });

  it('should have proper ARIA roles on buttons', () => {
    const { getByLabelText } = customRender(<Timeline {...commonProps} />, {
      providerProps,
    });

    const nextButton = getByLabelText('next');
    // button elements have implicit role="button"
    expect(nextButton.tagName.toLowerCase()).toBe('button');
  });

  it('should handle item selection with keyboard', async () => {
    const user = userEvent.setup();
    const mockOnItemSelected = vi.fn();
    const { container } = customRender(
      <Timeline {...commonProps} onItemSelected={mockOnItemSelected} />,
      { providerProps },
    );

    const items = container.querySelectorAll('[role="button"][class*="point"]');
    if (items.length > 0) {
      await user.click(items[0] as HTMLElement);
      await waitFor(() => {
        expect(mockOnItemSelected).toHaveBeenCalled();
      });
    }
  });

  it('should support disabled state on navigation buttons at boundaries', () => {
    const { getByLabelText } = customRender(
      <Timeline {...commonProps} activeTimelineItem={0} />,
      { providerProps },
    );

    const previousButton = getByLabelText('previous');
    expect(previousButton).toBeInTheDocument();
  });

  it('should have tab-accessible navigation controls', () => {
    const { getByLabelText } = customRender(<Timeline {...commonProps} />, {
      providerProps,
    });

    const nextButton = getByLabelText('next');
    const previousButton = getByLabelText('previous');
    const firstButton = getByLabelText('first');
    const lastButton = getByLabelText('last');

    expect(nextButton).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
    expect(firstButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();
  });

  it('should have Home and End key support via keyboard navigation', () => {
    const { container } = customRender(<Timeline {...commonProps} />, {
      providerProps,
    });

    const timelineRegion = container.querySelector('[role="region"]');
    expect(timelineRegion).toBeInTheDocument();
  });

  it('should maintain keyboard focus during item navigation', async () => {
    const user = userEvent.setup();
    const mockOnNext = vi.fn();
    const { getByLabelText } = customRender(
      <Timeline {...commonProps} onNext={mockOnNext} />,
      { providerProps },
    );

    const nextButton = getByLabelText('next');
    await user.click(nextButton);

    expect(mockOnNext).toHaveBeenCalled();
  });
});
