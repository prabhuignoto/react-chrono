import { afterEach, beforeEach, describe, vi } from 'vitest';
import { customRender } from '../../../common/test';
import { providerProps } from '../../../common/test/index';
import { TimelineCardModel } from '../../../../models/TimelineItemModel';
import TimelineCard from '../timeline-horizontal-card';

const defaultProps: TimelineCardModel = {
  active: true,
  cardDetailedText: 'card detailed text',
  cardSubtitle: 'card subtitle',
  cardTitle: 'card title',
  iconChild: 'icon child',
  id: 'id-12345',
  media: {
    name: 'image_new',
    source: {
      type: 'IMAGE',
      url: 'https://picsum.photos/200/300',
    },
    type: 'IMAGE',
  },
  onClick: vi.fn(),
  onElapsed: vi.fn(),
  wrapperId: 'wrapper-id-12345',
};

describe('TimelineHorizontalCard', () => {
  beforeEach(() => {
    // create a div with id 'wrapper-id-12345' to render the component
    const root = document.createElement('div');
    root.setAttribute('id', 'wrapper-id-12345');
    document.body.appendChild(root);
  });

  afterEach(() => {
    // remove the div with id 'wrapper-id-12345' after the tests
    const root = document.getElementById('wrapper-id-12345');
    if (root) {
      document.body.removeChild(root);
    }
  });

  // should render timeline card
  it('should render timeline card', () => {
    const { container } = customRender(<TimelineCard {...defaultProps} />, {
      providerProps: { ...providerProps, cardLess: false },
    });

    expect(container).toBeInTheDocument();
  });

  // should match the snapshot
  it('should match the snapshot', () => {
    const { container } = customRender(<TimelineCard {...defaultProps} />, {
      providerProps: { ...providerProps, cardLess: false },
    });

    expect(container).toMatchSnapshot();
  });

  // should render cardDetailedText, cardSubtitle, cardTitle, iconChild
  it('should render cardDetailedText, cardSubtitle, cardTitle', () => {
    const { getByText } = customRender(<TimelineCard {...defaultProps} />, {
      providerProps,
    });

    expect(getByText('card detailed text')).toBeInTheDocument();
    expect(getByText('card subtitle')).toBeInTheDocument();
    expect(getByText('card title')).toBeInTheDocument();
  });

  // should support rendering a custom icon
  it('should render a custom icon', () => {
    const { getByText } = customRender(
      <TimelineCard
        {...defaultProps}
        iconChild={<span role="img">icon</span>}
      ></TimelineCard>,
      {
        providerProps,
      },
    );

    expect(getByText('icon')).toBeInTheDocument();
  });

  // should render media (image) if provided
  it('should render media (image) if provided', () => {
    const { getByAltText } = customRender(<TimelineCard {...defaultProps} />, {
      providerProps,
    });

    expect(getByAltText('image_new')).toBeInTheDocument();
  });

  // should render media (video) if provided
  it('should render media (video) if provided', () => {
    const { getByText, getByRole } = customRender(
      <TimelineCard {...defaultProps} url="http://www.google.com" />,
      {
        providerProps,
      },
    );

    expect(getByText('card title')).toBeInTheDocument();
    expect(getByText('card subtitle')).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'http://www.google.com');
  });
});
