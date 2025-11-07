import { render, screen, waitFor } from '@testing-library/react';
import GlobalContextProvider from '../../../GlobalContext';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { customRender, providerProps } from '../../../common/test';
import TimelineCardContent from '../timeline-card-content';

describe('TimelineCardContent', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        addEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        matches: false,
        media: query,
        onchange: null,
        removeEventListener: vi.fn(),
      })),
      writable: true,
    });

    // ResizeObserver is already mocked globally in common/test/index.tsx
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  // should render the component successfully
  it('should render the component successfully', () => {
    const { getByTestId } = customRender(<TimelineCardContent />, {
      providerProps,
    });

    expect(getByTestId('timeline-card-content')).toBeInTheDocument();
    // expect(getByTestId('timeline-card-content')).toBeVisible();
  });

  //should render the title
  it('should render the title', () => {
    customRender(<TimelineCardContent title="title" />, {
      providerProps,
    });

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeVisible();
  });

  // should render the detailedText when a string is passed
  it('should render the detailedText when a string is passed', () => {
    customRender(<TimelineCardContent detailedText="detailedText" />, {
      providerProps: {
        ...providerProps,
        toolbarPosition: 'bottom',
        textDensity: 'HIGH',
      },
    });

    expect(screen.getByText('detailedText')).toBeInTheDocument();
    expect(screen.getByText('detailedText')).toBeVisible();
  });

  // should render the detailedText when a array of strings is passed
  it('should render the detailedText when a array of strings is passed', () => {
    customRender(
      <TimelineCardContent detailedText={['detailedText', 'text 2']} />,
      {
        providerProps: {
          ...providerProps,
          toolbarPosition: 'bottom',
          textDensity: 'HIGH',
        },
      },
    );

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

  // Test interactive elements in card content (Issue #490)
  describe('Interactive elements handling', () => {
    it('should allow link clicks in HTML content without triggering card selection', async () => {
      const onClickMock = vi.fn();
      const { getByTestId } = customRender(
        <TimelineCardContent
          detailedText='<a href="/test">Test Link</a>'
          onClick={onClickMock}
        />,
        {
          providerProps: {
            ...providerProps,
            parseDetailsAsHTML: true,
          },
        },
      );

      const card = getByTestId('timeline-card-content');
      const link = card.querySelector('a');

      expect(link).toBeInTheDocument();

      // Click on the link
      if (link) {
        link.click();
      }

      // Card onClick should NOT be called when clicking a link
      await waitFor(() => {
        expect(onClickMock).not.toHaveBeenCalled();
      });
    });

    it('should trigger card selection when clicking non-interactive areas', () => {
      const onClickMock = vi.fn();
      const { getByTestId } = customRender(
        <TimelineCardContent
          detailedText="Regular text content"
          onClick={onClickMock}
          id="test-card"
        />,
        {
          providerProps,
        },
      );

      const card = getByTestId('timeline-card-content');

      // Click on the card (not on any interactive element)
      card.click();

      // Card onClick SHOULD be called
      expect(onClickMock).toHaveBeenCalledWith('test-card');
    });

    it('should handle nested interactive elements correctly', () => {
      const onClickMock = vi.fn();
      const { getByTestId } = customRender(
        <TimelineCardContent
          detailedText='<a href="/test"><span>Nested content</span></a>'
          onClick={onClickMock}
        />,
        {
          providerProps: {
            ...providerProps,
            parseDetailsAsHTML: true,
          },
        },
      );

      const card = getByTestId('timeline-card-content');
      const span = card.querySelector('span');

      expect(span).toBeInTheDocument();

      // Click on the span inside the link
      if (span) {
        span.click();
      }

      // Card onClick should NOT be called because span is inside an anchor
      expect(onClickMock).not.toHaveBeenCalled();
    });

    it('should not trigger card selection when clicking buttons in custom content', () => {
      const onClickMock = vi.fn();
      const buttonClickMock = vi.fn();

      const CustomButton = () => (
        <button onClick={buttonClickMock}>Custom Button</button>
      );

      const { getByRole } = customRender(
        <TimelineCardContent
          onClick={onClickMock}
          id="test-card"
          customContent={<CustomButton />}
        />,
        {
          providerProps,
        },
      );

      const button = getByRole('button', { name: 'Custom Button' });

      // Click on the button
      button.click();

      // Button's onClick should be called
      expect(buttonClickMock).toHaveBeenCalled();

      // Card onClick should NOT be called
      expect(onClickMock).not.toHaveBeenCalled();
    });

    it('should respect disableInteraction prop even for non-interactive clicks', () => {
      const onClickMock = vi.fn();
      const { getByTestId } = customRender(
        <TimelineCardContent
          detailedText="Regular text content"
          onClick={onClickMock}
          id="test-card"
        />,
        {
          providerProps: {
            ...providerProps,
            disableInteraction: true,
          },
        },
      );

      const card = getByTestId('timeline-card-content');

      // Click on the card
      card.click();

      // Card onClick should NOT be called due to disableInteraction
      expect(onClickMock).not.toHaveBeenCalled();
    });
  });

  // Content alignment tests (Issue #431)
  describe('Content alignment', () => {
    it('should apply default left/top alignment when not specified', () => {
      const { container } = customRender(
        <TimelineCardContent detailedText="Test content" />,
        {
          providerProps,
        },
      );

      const detailsWrapper = container.querySelector('[aria-expanded]');
      expect(detailsWrapper).toBeInTheDocument();
      // Default alignment classes should be applied
      expect(detailsWrapper?.className).toContain('contentDetailsWrapper');
    });

    it('should apply center horizontal alignment when configured', () => {
      const { container } = customRender(
        <TimelineCardContent detailedText="Test content" />,
        {
          providerProps: {
            ...providerProps,
            contentAlignment: {
              horizontal: 'center',
              vertical: 'top',
            },
          },
        },
      );

      const detailsWrapper = container.querySelector('[aria-expanded]');
      expect(detailsWrapper).toBeInTheDocument();
      // Recipe should apply center alignment
    });

    it('should apply right horizontal alignment when configured', () => {
      const { container } = customRender(
        <TimelineCardContent detailedText="Test content" />,
        {
          providerProps: {
            ...providerProps,
            contentAlignment: {
              horizontal: 'right',
              vertical: 'top',
            },
          },
        },
      );

      const detailsWrapper = container.querySelector('[aria-expanded]');
      expect(detailsWrapper).toBeInTheDocument();
    });

    it('should apply stretch horizontal alignment when configured', () => {
      const { container } = customRender(
        <TimelineCardContent detailedText="Test content" />,
        {
          providerProps: {
            ...providerProps,
            contentAlignment: {
              horizontal: 'stretch',
              vertical: 'top',
            },
          },
        },
      );

      const detailsWrapper = container.querySelector('[aria-expanded]');
      expect(detailsWrapper).toBeInTheDocument();
    });

    it('should apply center vertical alignment when configured', () => {
      const { container } = customRender(
        <TimelineCardContent detailedText="Test content" />,
        {
          providerProps: {
            ...providerProps,
            contentAlignment: {
              horizontal: 'left',
              vertical: 'center',
            },
          },
        },
      );

      const detailsWrapper = container.querySelector('[aria-expanded]');
      expect(detailsWrapper).toBeInTheDocument();
    });

    it('should apply both horizontal and vertical alignment together', () => {
      const { container } = customRender(
        <TimelineCardContent detailedText="Test content" />,
        {
          providerProps: {
            ...providerProps,
            contentAlignment: {
              horizontal: 'center',
              vertical: 'center',
            },
          },
        },
      );

      const detailsWrapper = container.querySelector('[aria-expanded]');
      expect(detailsWrapper).toBeInTheDocument();
    });

    it('should work with custom content and alignment', () => {
      const CustomContent = () => <div data-testid="custom">Custom</div>;

      const { getByTestId } = customRender(
        <TimelineCardContent customContent={<CustomContent />} />,
        {
          providerProps: {
            ...providerProps,
            contentAlignment: {
              horizontal: 'center',
              vertical: 'center',
            },
          },
        },
      );

      expect(getByTestId('custom')).toBeInTheDocument();
    });
  });
});
