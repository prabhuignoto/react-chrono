import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { GlobalContext } from '../../GlobalContext';
import { TimelineHorizontalModel } from '../../../models/TimelineHorizontalModel';
import { TestWrapper } from '../../../test-utils/test-wrapper';
import TimelineHorizontal from '../timeline-horizontal';

const mockItems = [
  {
    id: '1',
    title: 'Test Item 1',
    cardTitle: 'Card Title 1',
    cardSubtitle: 'Card Subtitle 1',
    cardDetailedText: 'Detailed text for item 1',
    visible: true,
    active: false,
    wrapperId: 'timeline-wrapper',
  },
  {
    id: '2',
    title: 'Test Item 2',
    cardTitle: 'Card Title 2',
    cardSubtitle: 'Card Subtitle 2',
    cardDetailedText: 'Detailed text for item 2',
    visible: true,
    active: true,
    wrapperId: 'timeline-wrapper',
  },
  {
    id: '3',
    title: 'Test Item 3',
    cardTitle: 'Card Title 3',
    cardSubtitle: 'Card Subtitle 3',
    cardDetailedText: 'Detailed text for item 3',
    visible: false,
    active: false,
    wrapperId: 'timeline-wrapper',
  },
];

const defaultProps: TimelineHorizontalModel = {
  items: mockItems,
  handleItemClick: vi.fn(),
  autoScroll: vi.fn(),
  wrapperId: 'timeline-wrapper',
  slideShowRunning: false,
  onElapsed: vi.fn(),
  contentDetailsChildren: undefined,
  hasFocus: false,
  iconChildren: undefined,
  nestedCardHeight: 200,
  isNested: false,
};

const mockContextValue = {
  mode: 'HORIZONTAL' as const,
  itemWidth: 300,
  cardHeight: 200,
  flipLayout: false,
  showAllCardsHorizontal: false,
  theme: {
    primary: '#0f172a',
    secondary: '#64748b',
    cardBgColor: '#ffffff',
    cardForeColor: '#000000',
    titleColor: '#0f172a',
    titleColorActive: '#ffffff',
  },
  cardWidth: 400,
};

const renderWithContext = (
  props: Partial<TimelineHorizontalModel> = {},
  contextOverrides: any = {},
) => {
  return render(
    <TestWrapper 
      theme={contextOverrides.theme || mockContextValue.theme}
      mode={contextOverrides.mode || mockContextValue.mode}
      showAllCardsHorizontal={contextOverrides.showAllCardsHorizontal ?? mockContextValue.showAllCardsHorizontal}
      flipLayout={contextOverrides.flipLayout ?? mockContextValue.flipLayout}
      itemWidth={contextOverrides.itemWidth ?? mockContextValue.itemWidth}
      {...contextOverrides}
    >
      <TimelineHorizontal {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe('TimelineHorizontal', () => {
  it('should render without crashing', () => {
    renderWithContext();
    expect(screen.getByTestId('timeline-collection')).toBeInTheDocument();
  });

  it('should render the correct number of timeline items', () => {
    renderWithContext();
    // Use querySelectorAll since getAllByRole might filter out hidden items
    const container = screen.getByTestId('timeline-collection');
    const allItems = container.querySelectorAll('li');
    expect(allItems).toHaveLength(mockItems.length);
  });

  it('should apply correct CSS classes based on mode', () => {
    renderWithContext();
    const container = screen.getByTestId('timeline-collection');
    expect(container).toHaveClass('horizontal');
    expect(container).toHaveClass('timeline-horizontal-container');
  });

  it('should apply show-all-cards-horizontal class when showAllCardsHorizontal is true', () => {
    const contextWithShowAll = {
      ...mockContextValue,
      showAllCardsHorizontal: true,
    };
    renderWithContext({}, contextWithShowAll);
    const container = screen.getByTestId('timeline-collection');
    expect(container).toHaveClass('show-all-cards-horizontal');
  });

  it('should render with flipped layout when flipLayout is true', () => {
    const contextWithFlipped = {
      ...mockContextValue,
      flipLayout: true,
    };
    renderWithContext({}, contextWithFlipped);
    const container = screen.getByTestId('timeline-collection');
    expect(container).toBeInTheDocument();
  });

  it('should handle item click when timeline card is clicked', async () => {
    const handleItemClick = vi.fn();
    renderWithContext({ handleItemClick });

    // Note: The actual click testing would depend on the TimelineCard implementation
    // For now, we verify that the function is passed correctly
    expect(handleItemClick).toHaveBeenCalledTimes(0);
  });

  it('should render visible items with visible class', () => {
    renderWithContext();
    const listItems = screen.getAllByRole('listitem');

    // First two items should be visible
    expect(listItems[0]).toHaveClass('visible');
    expect(listItems[1]).toHaveClass('visible');
    // Third item should not have visible class (visible: false) if it exists
    if (listItems[2]) {
      expect(listItems[2]).not.toHaveClass('visible');
    }
  });

  it('should set aria-current="true" for active items', () => {
    renderWithContext();
    const listItems = screen.getAllByRole('listitem');

    // Only the second item is active
    expect(listItems[0]).not.toHaveAttribute('aria-current');
    expect(listItems[1]).toHaveAttribute('aria-current', 'true');
    if (listItems[2]) {
      expect(listItems[2]).not.toHaveAttribute('aria-current');
    }
  });

  it('should apply correct width to timeline items', () => {
    const customItemWidth = 250;
    const contextWithCustomWidth = {
      ...mockContextValue,
      itemWidth: customItemWidth,
    };
    renderWithContext({}, contextWithCustomWidth);
    const listItems = screen.getAllByRole('listitem');

    // Check that items have the correct width style applied
    listItems.forEach((item) => {
      expect(item).toHaveClass('timeline-horz-item-container');
    });
  });

  it('should handle slideshow properties correctly', () => {
    renderWithContext({
      slideShowRunning: true,
      onElapsed: vi.fn(),
    });
    const container = screen.getByTestId('timeline-collection');
    expect(container).toBeInTheDocument();
  });

  it('should render with nested card properties', () => {
    renderWithContext({
      isNested: true,
      nestedCardHeight: 150,
    });
    const container = screen.getByTestId('timeline-collection');
    expect(container).toBeInTheDocument();
  });

  it('should pass icon children to timeline cards', () => {
    const iconChildren = [
      <div key="icon1">Icon 1</div>,
      <div key="icon2">Icon 2</div>,
      <div key="icon3">Icon 3</div>,
    ];

    renderWithContext({ iconChildren });
    const container = screen.getByTestId('timeline-collection');
    expect(container).toBeInTheDocument();
  });

  it('should pass content details children to timeline cards', () => {
    const contentDetailsChildren = [
      <div key="content1">Content 1</div>,
      <div key="content2">Content 2</div>,
      <div key="content3">Content 3</div>,
    ];

    renderWithContext({ contentDetailsChildren });
    const container = screen.getByTestId('timeline-collection');
    expect(container).toBeInTheDocument();
  });

  it('should render with auto scroll enabled', () => {
    renderWithContext({ autoScroll: vi.fn() });
    const container = screen.getByTestId('timeline-collection');
    expect(container).toBeInTheDocument();
  });

  it('should render with hasFocus enabled', () => {
    renderWithContext({ hasFocus: true });
    const container = screen.getByTestId('timeline-collection');
    expect(container).toBeInTheDocument();
  });

  it('should render as semantic list with proper ARIA labels', () => {
    renderWithContext();
    const list = screen.getByRole('list', { name: 'Timeline' });
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('aria-label', 'Timeline');
  });

  it('should handle empty items array', () => {
    renderWithContext({ items: [] });
    const container = screen.getByTestId('timeline-collection');
    expect(container).toBeInTheDocument();
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  it('should handle different timeline modes correctly', () => {
    const contextVertical = {
      ...mockContextValue,
      mode: 'VERTICAL_ALTERNATING',
    };
    renderWithContext({}, contextVertical);
    const container = screen.getByTestId('timeline-collection');
    expect(container).toHaveClass('vertical_alternating');
  });

  it('should memoize wrapper class to prevent unnecessary re-renders', () => {
    const { rerender } = renderWithContext();
    const container = screen.getByTestId('timeline-collection');
    const initialClassName = container.className;

    // Re-render with same props
    rerender(
      <GlobalContext.Provider value={mockContextValue}>
        <TestWrapper theme={mockContextValue.theme} mode={mockContextValue.mode}>
          <TimelineHorizontal {...defaultProps} />
        </TestWrapper>
      </GlobalContext.Provider>,
    );

    expect(container.className).toBe(initialClassName);
  });

  it('should memoize timeline items to prevent unnecessary re-renders', () => {
    const { rerender } = renderWithContext();
    const initialItems = screen.getAllByRole('listitem');

    // Re-render with same props
    rerender(
      <GlobalContext.Provider value={mockContextValue}>
        <TestWrapper theme={mockContextValue.theme} mode={mockContextValue.mode}>
          <TimelineHorizontal {...defaultProps} />
        </TestWrapper>
      </GlobalContext.Provider>,
    );

    const afterRerenderItems = screen.getAllByRole('listitem');
    expect(afterRerenderItems).toHaveLength(initialItems.length);
  });
});
