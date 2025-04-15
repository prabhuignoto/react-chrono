import { describe, it, expect, vi } from 'vitest';
import { customRender, providerProps } from '../../../common/test';
import TimelineCardMedia from '../timeline-card-media';
import { forwardRef } from 'react';
import { TextOrContentModel } from '../../timeline-card-content/text-or-content';
import { fireEvent } from '@testing-library/react';
import { CardMediaModel } from '@models/TimelineMediaModel';

describe('Timeline Card media', () => {
  // should render the component with all the props
  const refComponent = forwardRef<HTMLDivElement, TextOrContentModel>(
    (props, ref) => <div ref={ref}>ref component</div>,
  );

  refComponent.displayName = 'ref component';

  const defaultProps: CardMediaModel = {
    media: {
      name: 'Image',
      source: {
        type: 'URL',
        url: 'https://picsum.photos/200/300',
      },
      type: 'IMAGE',
    },
    detailsText: refComponent,
    id: '1',
    hideMedia: false,
    onMediaStateChange: vi.fn(),
    title: 'Image title',
    content: 'This is another test',
    cardHeight: 300,
    active: true,
  };

  it('should render the component with all the props', async () => {
    const { getByText, getByAltText, getByRole } = customRender(
      <TimelineCardMedia {...defaultProps} />,
      { providerProps },
    );

    expect(getByText('Image title')).toBeInTheDocument();
    expect(getByText('This is another test')).toBeInTheDocument();
    expect(getByAltText('Image')).toBeInTheDocument();
    expect(getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  // should match the snapshot
  it('should match the snapshot ( IMAGE )', () => {
    const { container } = customRender(
      <TimelineCardMedia {...defaultProps} />,
      { providerProps },
    );
    expect(container).toMatchSnapshot();
  });

  // should match the snapshot
  it('should match the snapshot ( VIDEO )', () => {
    const { container } = customRender(
      <TimelineCardMedia
        {...defaultProps}
        media={{
          name: 'Video',
          source: {
            type: 'URL',
            url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          },
          type: 'VIDEO',
        }}
      />,
      { providerProps },
    );
    expect(container).toMatchSnapshot();
  });

  // should render video media when type is VIDEO
  it('should render video media when type is VIDEO', () => {
    const { getByTitle } = customRender(
      <TimelineCardMedia
        {...defaultProps}
        media={{
          name: 'Video',
          source: {
            type: 'URL',
            url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          },
          type: 'VIDEO',
        }}
      />,
      { providerProps },
    );
    expect(getByTitle('Video')).toBeInTheDocument();
  });

  //should render the card media in text overlay mode
  it('should render the card media in text overlay mode', () => {
    const customProviderProps = {
      ...providerProps,
      textOverlay: true,
    };

    const { getByRole, getByText, getByAltText } = customRender(
      <TimelineCardMedia {...defaultProps} />,
      { providerProps: customProviderProps },
    );

    expect(getByText('Image title')).toBeInTheDocument();
    expect(getByText('This is another test')).toBeInTheDocument();
    expect(getByAltText('Image')).toBeInTheDocument();
    expect(getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  // should render custom content in the card media
  it('should render custom content in the card media', () => {
    const { getByText } = customRender(
      <TimelineCardMedia
        {...defaultProps}
        content={<div>Custom content</div>}
      />,
      { providerProps },
    );

    expect(getByText('Custom content')).toBeInTheDocument();
  });

  // generate large chunks of random text

  // should render detailsText as expected IN HORIZONTAL MODE
  it('should render detailsText as expected', () => {
    const { getByText, getByRole } = customRender(
      <TimelineCardMedia {...defaultProps} />,
      { providerProps: { ...providerProps, mode: 'HORIZONTAL' } },
    );

    expect(getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(getByText('Image title')).toBeInTheDocument();
  });

  // should render the arrow (triangleDir) as expected
  it('should render the arrow (triangleDir) as expected', () => {
    const { getByTestId } = customRender(
      <TimelineCardMedia {...defaultProps} />,
      { providerProps: { ...providerProps, textOverlay: true } },
    );
    expect(getByTestId('arrow-icon')).toBeInTheDocument();
  });

  it('should handle media state changes correctly', () => {
    const onMediaStateChange = vi.fn();
    const { getByTestId } = customRender(
      <TimelineCardMedia
        {...defaultProps}
        media={{
          name: 'Video',
          source: {
            type: 'URL',
            url: 'https://example.com/video.mp4',
          },
          type: 'VIDEO',
        }}
        onMediaStateChange={onMediaStateChange}
      />,
      { providerProps },
    );

    const video = getByTestId('rc-video');
    fireEvent.play(video);
    expect(onMediaStateChange).toHaveBeenCalledWith({
      id: '1',
      paused: false,
      playing: true,
    });

    fireEvent.pause(video);
    expect(onMediaStateChange).toHaveBeenCalledWith({
      id: '1',
      paused: true,
      playing: false,
    });

    fireEvent.ended(video);
    expect(onMediaStateChange).toHaveBeenCalledWith({
      id: '1',
      paused: false,
      playing: false,
    });
  });

  it('should handle media loading errors gracefully', () => {
    const { getByTestId } = customRender(
      <TimelineCardMedia
        {...defaultProps}
        media={{
          name: 'Image',
          source: {
            type: 'URL',
            url: 'invalid-url',
          },
          type: 'IMAGE',
        }}
      />,
      { providerProps },
    );

    expect(getByTestId('timeline-card-content-image')).toBeInTheDocument();
  });

  it('should handle YouTube video URLs correctly', () => {
    const { getByTestId } = customRender(
      <TimelineCardMedia
        {...defaultProps}
        media={{
          name: 'Video',
          source: {
            type: 'URL',
            url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          },
          type: 'VIDEO',
        }}
      />,
      { providerProps },
    );

    expect(getByTestId('timeline-card-content-video')).toBeInTheDocument();
  });
});
