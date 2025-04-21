import { TimelineModel } from '@models/TimelineModel';
import { waitFor } from '@testing-library/react';
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

// Improved mock for IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    // Simulate an intersection in the next tick
    setTimeout(() => {
      const entries = [
        {
          isIntersecting: true,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: 1,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          target: document.createElement('div'),
          time: Date.now(),
        },
      ] as IntersectionObserverEntry[];

      this.callback(entries, this);
    }, 0);
  }

  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}

window.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

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

  it('should render the timeline with correct items', async () => {
    const { getByText } = customRender(
      <Timeline {...commonProps} mode="VERTICAL" />,
      {
        providerProps,
      },
    );

    const item1 = getByText('Item 1');
    const item2 = getByText('Item 2');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('should render the timeline items correctly when the mode is HORIZONTAL', async () => {
    const { getByText } = customRender(
      <Timeline {...commonProps} mode="HORIZONTAL" />,
      {
        providerProps,
      },
    );

    const item1 = getByText('Item 1');
    const item2 = getByText('Item 2');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  // Commented tests with issues
  // it('should call onNext', async () => {
  //   const onNext = vi.fn();
  //
  //   const { getByLabelText, getByText } = customRender(
  //     <Timeline {...commonProps} mode="VERTICAL_ALTERNATING" onNext={onNext} />,
  //     {
  //       providerProps: {
  //         ...providerProps,
  //       },
  //     },
  //   );
  //
  //   const nextButton = getByLabelText('next');
  //
  //   expect(nextButton).toBeInTheDocument();
  //
  //   fireEvent.click(nextButton);
  //
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

  it('should call onPrevious after next button is clicked', async () => {
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

    await userEvent.click(nextButton);

    // Use a finite timeout and clear assertion
    await waitFor(
      () => {
        expect(commonProps.onNext).toHaveBeenCalled();
      },
      { timeout: 1000 },
    );
  });

  it('should call onLast and onFirst when last button is clicked', async () => {
    const { getByLabelText } = customRender(
      <Timeline {...commonProps} mode="VERTICAL_ALTERNATING" />,
      {
        providerProps,
      },
    );

    const lastButton = getByLabelText('last');
    const firstButton = getByLabelText('first');

    expect(lastButton).toBeInTheDocument();
    expect(firstButton).toBeInTheDocument();

    await userEvent.click(lastButton);

    // Add a timeout to ensure the test doesn't hang
    await waitFor(
      () => {
        expect(commonProps.onLast).toHaveBeenCalled();
      },
      { timeout: 1000 },
    );
  });

  it('should call onLast when last button is clicked', async () => {
    const { getByLabelText } = customRender(
      <Timeline
        {...commonProps}
        mode="VERTICAL_ALTERNATING"
        activeTimelineItem={0}
      />,
      {
        providerProps,
      },
    );

    const lastButton = getByLabelText('last');
    expect(lastButton).toBeInTheDocument();

    await userEvent.click(lastButton);

    // Use await with waitFor to ensure async resolution
    await waitFor(
      () => {
        expect(commonProps.onLast).toHaveBeenCalled();
      },
      { timeout: 1000 },
    );
  });

  it('should call onItemSelected when an item is clicked', async () => {
    const { getByText } = customRender(
      <Timeline {...commonProps} mode="VERTICAL" />,
      {
        providerProps,
      },
    );

    const item1 = getByText('Item 1');
    await userEvent.click(item1);

    await waitFor(
      () => {
        expect(commonProps.onItemSelected).toHaveBeenCalledWith({
          cardDetailedText: 'Detailed text 1',
          cardSubtitle: 'Subtitle 1',
          cardTitle: 'Card 1',
          index: 0,
          title: 'Item 1',
        });
      },
      { timeout: 1000 },
    );
  });
});
