import { describe } from 'vitest';
import { customRender, providerProps } from '../../../common/test';
import TimelineCardMedia from '../timeline-card-media';
import { forwardRef } from 'react';
import { TextOrContentModel } from '../../timeline-card-content/text-or-content';

describe('Timeline Card media', () => {
  // should render the component with all the props
  const refComponent = forwardRef<HTMLDivElement, TextOrContentModel>(
    (props, ref) => <div ref={ref}>ref component</div>,
  );

  refComponent.displayName = 'ref component';
  it('should render the component with all the props', async () => {
    const { getByText, getByAltText, getByRole } = customRender(
      <TimelineCardMedia
        media={{
          name: 'Image',
          source: {
            type: 'URL',
            url: 'https://picsum.photos/200/300',
          },
          type: 'IMAGE',
        }}
        detailsText={refComponent}
        id="1"
        hideMedia={false}
        onMediaStateChange={() => {}}
        title="Image title"
        content="This is another test"
        cardHeight={300}
        active
      />,
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
      <TimelineCardMedia
        media={{
          name: 'Image',
          source: {
            type: 'URL',
            url: 'https://picsum.photos/200/300',
          },
          type: 'IMAGE',
        }}
        detailsText={refComponent}
        content="This is another test"
        id="1"
        hideMedia={false}
        onMediaStateChange={() => {}}
      />,
      { providerProps },
    );
    expect(container).toMatchSnapshot();
  });

  // should match the snapshot
  it('should match the snapshot ( VIDEO )', () => {
    const { container } = customRender(
      <TimelineCardMedia
        media={{
          name: 'Video',
          source: {
            type: 'URL',
            url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          },
          type: 'VIDEO',
        }}
        detailsText={refComponent}
        content="This is another test"
        id="1"
        hideMedia={false}
        onMediaStateChange={() => {}}
      />,
      { providerProps },
    );
    expect(container).toMatchSnapshot();
  });

  // should render video media when type is VIDEO
  it('should render video media when type is VIDEO', () => {
    const { getByTitle } = customRender(
      <TimelineCardMedia
        media={{
          name: 'Video',
          source: {
            type: 'URL',
            url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          },
          type: 'VIDEO',
        }}
        detailsText={refComponent}
        id="1"
        hideMedia={false}
        onMediaStateChange={() => {}}
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
      <TimelineCardMedia
        media={{
          name: 'Image',
          source: {
            type: 'URL',
            url: 'https://picsum.photos/200/300',
          },
          type: 'IMAGE',
        }}
        detailsText={refComponent}
        id="1"
        content="This is another test"
        title="Image title"
        hideMedia={false}
        onMediaStateChange={() => {}}
      />,
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
        media={{
          name: 'Image',
          source: {
            type: 'URL',
            url: 'https://picsum.photos/200/300',
          },
          type: 'IMAGE',
        }}
        detailsText={refComponent}
        id="1"
        hideMedia={false}
        onMediaStateChange={() => {}}
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
      <TimelineCardMedia
        media={{
          name: 'Image',
          source: {
            type: 'URL',
            url: 'https://picsum.photos/200/300',
          },
          type: 'IMAGE',
        }}
        detailsText={refComponent}
        id="1"
        hideMedia={false}
        onMediaStateChange={() => {}}
        title="Image title"
        content="This is another test"
      />,
      { providerProps: { ...providerProps, mode: 'HORIZONTAL' } },
    );

    expect(getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(getByText('Image title')).toBeInTheDocument();
  });

  // should render the arrow (triangleDir) as expected
  it('should render the arrow (triangleDir) as expected', () => {
    const { getByTestId } = customRender(
      <TimelineCardMedia
        media={{
          name: 'Image',
          source: {
            type: 'URL',
            url: 'https://picsum.photos/200/300',
          },
          type: 'IMAGE',
        }}
        detailsText={refComponent}
        id="1"
        hideMedia={false}
        onMediaStateChange={() => {}}
      />,
      { providerProps: { ...providerProps, textOverlay: true } },
    );
    expect(getByTestId('arrow-icon')).toBeInTheDocument();
  });
});
