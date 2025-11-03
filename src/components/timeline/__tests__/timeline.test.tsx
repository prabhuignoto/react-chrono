import { TimelineModel } from '@models/TimelineModel';
import { waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { customRender, providerProps } from '../../common/test';
import Timeline from '../timeline';

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

window.IntersectionObserver = vi.fn(function (callback) {
  this.disconnect = vi.fn();
  this.observe = vi.fn();
  this.root = null;
  this.rootMargin = '';
  this.takeRecords = vi.fn();
  this.thresholds = [];
  this.unobserve = vi.fn();
} as any);

describe('Timeline', () => {
  const commonProps: TimelineModel = {
    activeTimelineItem: 0,
    contentDetailsChildren: null,
    iconChildren: null,
    isChild: false,
    items: [
      {
        cardDetailedText: 'Detailed text 1',
        cardSubtitle: 'Subtitle 1',
        cardTitle: 'Card 1',
        id: '1',
        title: 'Item 1',
      },
      {
        cardDetailedText: 'Detailed text 2',
        cardSubtitle: 'Subtitle 2',
        cardTitle: 'Card 2',
        id: '2',
        title: 'Item 2',
      },
      {
        cardDetailedText: 'Detailed text 3',
        cardSubtitle: 'Subtitle 3',
        cardTitle: 'Card 3',
        id: '3',
        title: 'Item 3',
      },
      {
        cardDetailedText: 'Detailed text 4',
        cardSubtitle: 'Subtitle 4',
        cardTitle: 'Card 4',
        id: '4',
        title: 'Item 4',
      },
    ],
    mode: 'HORIZONTAL',
    nestedCardHeight: 200,
    noUniqueId: false,
    onFirst: vi.fn(),
    onItemSelected: vi.fn(),
    onLast: vi.fn(),
    onNext: vi.fn(),
    onOutlineSelection: vi.fn(),
    onPaused: vi.fn(),
    onPrevious: vi.fn(),
    onRestartSlideshow: vi.fn(),
    onTimelineUpdated: vi.fn(),
    slideShowEnabled: true,
    slideShowRunning: false,
    uniqueId: 'timeline-1',
  };

  it('should render the timeline with correct items', () => {
    const { container } = customRender(
      <Timeline {...commonProps} mode="VERTICAL" />,
      {
        providerProps,
      },
    );

    const items = container.querySelectorAll('[class*="title"]');
    expect(items.length).toBeGreaterThan(0);
  });

  //shoulkd render the timeline items correctly when the mode is HORIZONTAL
  it('should render the timeline items correctly when the mode is HORIZONTAL', () => {
    const { container } = customRender(
      <Timeline {...commonProps} mode="HORIZONTAL" />,
      {
        providerProps,
      },
    );

    const items = container.querySelectorAll('[class*="point"]');
    expect(items.length).toBeGreaterThan(0);
  });

  // it('should call onNext', async () => {
  //   const onNext = vi.fn();

  //   const { getByLabelText, getByText } = customRender(
  //     <Timeline {...commonProps} mode="VERTICAL_ALTERNATING" onNext={onNext} />,
  //     {
  //       providerProps: {
  //         ...providerProps,
  //       },
  //     },
  //   );

  //   const nextButton = getByLabelText('next');

  //   expect(nextButton).toBeInTheDocument();

  //   fireEvent.click(nextButton);

  //   await waitFor(
  //     () => {
  //       expect(onNext).toHaveBeenCalled();
  //       // expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  //     },
  //     {
  //       timeout: 2000,
  //     },
  //   );
  // });

  //should render navigation buttons
  it('should render navigation buttons', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = customRender(
      <Timeline {...commonProps} mode="VERTICAL_ALTERNATING" />,
      {
        providerProps,
      },
    );

    const nextButton = getByLabelText('next');
    const previousButton = getByLabelText('previous');

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    await user.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toHaveAttribute('aria-disabled', 'false');
    });
  });

  // should call onLast when last button is clicked
  it('should call onLast when last button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnLast = vi.fn();
    const { getByLabelText } = customRender(
      <Timeline {...commonProps} mode="VERTICAL_ALTERNATING" onLast={mockOnLast} />,
      {
        providerProps,
      },
    );

    const lastButton = getByLabelText('last');

    await user.click(lastButton);

    await waitFor(() => {
      expect(mockOnLast).toHaveBeenCalled();
    });
  });

  //should call onFirst when first button is clicked
  // it('should call onFirst when first button is clicked', async () => {
  //   const { getByLabelText } = customRender(
  //     <Timeline
  //       {...commonProps}
  //       mode="VERTICAL_ALTERNATING"
  //       activeTimelineItem={1}
  //     />,
  //     {
  //       providerProps,
  //     },
  //   );

  //   const firstButton = getByLabelText('first');

  //   userEvent.click(firstButton);

  //   await waitFor(() => {
  //     expect(commonProps.onFirst).toHaveBeenCalled();
  //   });
  // });

  // //should call onLast when last button is clicked
  it('should navigate to last item when last button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnLast = vi.fn();
    const { getByLabelText } = customRender(
      <Timeline
        {...commonProps}
        mode="VERTICAL_ALTERNATING"
        activeTimelineItem={0}
        onLast={mockOnLast}
      />,
      {
        providerProps,
      },
    );

    const lastButton = getByLabelText('last');

    expect(lastButton).toBeInTheDocument();

    await user.click(lastButton);

    await waitFor(() => {
      expect(mockOnLast).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onItemSelected when an item is clicked', async () => {
    const user = userEvent.setup();
    const mockOnItemSelected = vi.fn();
    const { container } = customRender(
      <Timeline {...commonProps} mode="VERTICAL" onItemSelected={mockOnItemSelected} />,
      {
        providerProps,
      },
    );

    // Get the first timeline card/item
    const items = container.querySelectorAll('[role="button"]');
    const firstItem = items[0] as HTMLElement;

    await user.click(firstItem);

    await waitFor(() => {
      expect(mockOnItemSelected).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 0,
          title: 'Item 1',
        }),
      );
    });
  });
});
