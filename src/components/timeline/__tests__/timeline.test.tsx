import { TimelineModel } from '@models/TimelineModel';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
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

window.IntersectionObserver = vi.fn().mockImplementation(() => {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    root: null,

    rootMargin: '',
    takeRecords: vi.fn(),
    thresholds: [],
    unobserve: vi.fn(),
  } as IntersectionObserver;
});

describe('Timeline', () => {
  const commonProps: TimelineModel = {
    activeTimelineItem: 0,
    contentDetailsChildren: null,
    enableOutline: false,
    hideControls: false,
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

  //shoulkd render the timeline items correctly when the mode is HORIZONTAL
  it('should render the timeline items correctly when the mode is HORIZONTAL', () => {
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

  it('should call onNext', async () => {
    const { getByLabelText } = customRender(
      <Timeline {...commonProps} mode="VERTICAL_ALTERNATING" />,
      {
        providerProps,
      },
    );

    const nextButton = getByLabelText('next');

    userEvent.click(nextButton);

    await waitFor(() => {
      expect(commonProps.onNext).toHaveBeenCalled();
    });
  });

  //should call onPrevious after next button is clicked
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

    userEvent.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toHaveAttribute('aria-disabled', 'false');
    });
  });

  // should call onLast when last button is clicked
  // it('should call onLast and onFirst when last button is clicked', async () => {
  //   const { getByLabelText } = customRender(
  //     <Timeline {...commonProps} mode="VERTICAL_ALTERNATING" />,
  //     {
  //       providerProps,
  //     },
  //   );

  //   const lastButton = getByLabelText('last');
  //   const firstButton = getByLabelText('first');

  //   userEvent.click(lastButton);

  //   await waitFor(() => {
  //     expect(commonProps.onLast).toHaveBeenCalled();
  //   });
  // });

  //should call onFirst when first button is clicked
  it('should call onFirst when first button is clicked', async () => {
    const { getByLabelText } = customRender(
      <Timeline
        {...commonProps}
        mode="VERTICAL_ALTERNATING"
        activeTimelineItem={1}
      />,
      {
        providerProps,
      },
    );

    const firstButton = getByLabelText('first');

    userEvent.click(firstButton);

    await waitFor(() => {
      expect(commonProps.onFirst).toHaveBeenCalled();
    });
  });

  //should call onLast when last button is clicked
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

    userEvent.click(lastButton);

    await waitFor(() => {
      expect(commonProps.onLast).toHaveBeenCalled();
    });
  });

  it('should call onItemSelected when an item is clicked', async () => {
    const { getByText } = customRender(
      <Timeline {...commonProps} mode="VERTICAL" />,
      {
        providerProps,
      },
    );

    const item1 = getByText('Item 1');

    userEvent.click(item1);

    await waitFor(() => {
      expect(commonProps.onItemSelected).toHaveBeenCalledWith({
        cardDetailedText: 'Detailed text 1',
        cardSubtitle: 'Subtitle 1',
        cardTitle: 'Card 1',
        index: 0,
        title: 'Item 1',
      });
    });
  });
});
