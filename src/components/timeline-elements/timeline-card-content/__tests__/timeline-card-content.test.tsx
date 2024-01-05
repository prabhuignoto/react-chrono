import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { customRender, providerProps } from '../../../common/test';
import TimelineCardContent from '../timeline-card-content';

describe('TimelineCardContent', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  // should render the component successfully
  it('should render the component successfully', () => {
    render(<TimelineCardContent />);

    expect(screen.getByTestId('timeline-card-content')).toBeInTheDocument();
    expect(screen.getByTestId('timeline-card-content')).toBeVisible();
  });

  //should render the title
  it('should render the title', () => {
    render(<TimelineCardContent title="title" />);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeVisible();
  });

  // should render the detailedText when a string is passed
  it('should render the detailedText when a string is passed', () => {
    render(<TimelineCardContent detailedText="detailedText" />);

    expect(screen.getByText('detailedText')).toBeInTheDocument();
    expect(screen.getByText('detailedText')).toBeVisible();
  });

  // should render the detailedText when a array of strings is passed
  it('should render the detailedText when a array of strings is passed', () => {
    render(<TimelineCardContent detailedText={['detailedText', 'text 2']} />);

    expect(screen.getByText('detailedText')).toBeInTheDocument();
    expect(screen.getByText('text 2')).toBeInTheDocument();
    expect(screen.getByText('detailedText')).toBeVisible();
    expect(screen.getByText('text 2')).toBeVisible();
  });

  // should render media as expected. check if a image is rendered as expected
  it('should render media as expected. check if a image is rendered as expected', async () => {
    const { getByTestId } = customRender(
      <TimelineCardContent
        media={{
          source: {
            type: 'IMAGE',
            url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
          },
          type: 'IMAGE',
        }}
      />,
      {
        providerProps,
      },
    );

    await waitFor(
      () => {
        expect(getByTestId('timeline-card-content-image')).toBeInTheDocument();
        expect(getByTestId('timeline-card-content-image')).toHaveAttribute(
          'src',
          'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        );
      },
      {
        timeout: 2000,
      },
    );
  });

  // should render the media as expected. check if a video is rendered as expected
  it('should render the media as expected. check if a video is rendered as expected', async () => {
    const { getByTestId } = customRender(
      <TimelineCardContent
        media={{
          source: {
            type: 'VIDEO',
            url: 'https://www.youtube.com/embed/2G3x2-m9OOI',
          },
          type: 'VIDEO',
        }}
      />,
      {
        providerProps,
      },
    );

    await waitFor(
      () => {
        expect(getByTestId('timeline-card-content-video')).toBeInTheDocument();
        expect(getByTestId('timeline-card-content-video')).toHaveAttribute(
          'src',
          'https://www.youtube.com/embed/2G3x2-m9OOI?enablejsapi=1',
        );
      },
      {
        timeout: 2000,
      },
    );
  });
});
