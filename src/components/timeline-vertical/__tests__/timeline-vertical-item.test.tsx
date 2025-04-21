import { VerticalItemModel } from '@models/TimelineVerticalModel';
import { describe, expect, it } from 'vitest';
import { customRender } from '../../common/test';
import { providerProps } from '../../common/test/index';
import TimelineVerticalItem from '../timeline-vertical-item';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const commonProps: VerticalItemModel = {
  // complete the rest of the properties
  active: false,
  alternateCards: false,
  cardDetailedText: '',
  cardSubtitle: '',
  cardTitle: '',
  className: '',
  contentDetailsChildren: null,
  hasFocus: false,
  iconChild: null,
  id: 'test-vertical-item',
  index: 1,
  media: {
    source: {
      type: 'IMAGE',
      url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
    type: 'IMAGE',
  },
  onActive: () => {},
  onClick: () => {},
  onElapsed: () => {},
  slideShowRunning: false,
  timelineContent: null,
  title: 'vertical item title',
  url: '',
  visible: false,
};

describe('Timeline vertical item', () => {
  it('Should match snapshot', () => {
    const { container } = customRender(
      <TimelineVerticalItem
        {...commonProps}
        data-testid="vertical-item-test-1"
      />,
      { providerProps },
    );

    expect(container).toMatchSnapshot();
  });

  //should render the title

  it('Should render the title', () => {
    const { container } = customRender(
      <TimelineVerticalItem
        {...commonProps}
        id="unique-test-id"
        data-testid="vertical-item-test-2"
      />,
      { providerProps },
    );

    // Find the title element by a more specific approach
    const titleElement = container.querySelector(
      '[data-testid="vertical-item-test-2"] .timeline-item-title',
    );
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('vertical item title');
  });
});
