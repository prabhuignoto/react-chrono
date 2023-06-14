import { VerticalItemModel } from '@models/TimelineVerticalModel';
import { describe, it } from 'vitest';
import { customRender } from '../../common/test';
import { providerProps } from '../../common/test/index';
import TimelineVerticalItem from '../timeline-vertical-item';

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
  id: '',
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
      <TimelineVerticalItem {...commonProps} />,
      { providerProps },
    );

    expect(container).toMatchSnapshot();
  });

  //should render the title

  it('Should render the title', () => {
    const { getByText } = customRender(
      <TimelineVerticalItem {...commonProps} />,
      { providerProps },
    );

    expect(getByText('vertical item title')).toBeInTheDocument();
  });
});
