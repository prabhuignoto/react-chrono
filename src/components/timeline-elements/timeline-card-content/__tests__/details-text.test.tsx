// test utils
import { customRender, providerProps } from 'src/components/common/test';
import { DetailsText } from '../details-text';

describe('DetailsText', () => {
  let props;

  beforeEach(() => {
    props = {
      detailedText: 'Hello world',
    };
  });

  describe('rendering', () => {
    test('renders without crashing', () => {
      customRender(<DetailsText {...props} />, {
        providerProps: {
          ...providerProps,
        },
      });
    });

    test('renders the TextContent component', () => {
      const { container } = customRender(
        <DetailsText {...props} data-testid="details-text-1" />,
        {
          providerProps: {
            ...providerProps,
          },
        },
      );
      const detailsTextWrapper = container.querySelector(
        '.timeline-content-details',
      );
      expect(detailsTextWrapper).toBeInTheDocument();
      expect(detailsTextWrapper?.textContent).toBe('Hello world');
    });
  });

  describe('props', () => {
    test('passes showMore prop to TextContent', async () => {
      const { container } = customRender(
        <DetailsText {...props} showMore data-testid="details-text-2" />,
        {
          providerProps: {
            ...providerProps,
          },
        },
      );

      const detailsWrapper = container.querySelector(
        '.timeline-content-details',
      );
      expect(detailsWrapper).toHaveAttribute('aria-expanded', 'true');
    });

    test('passes theme prop to TimelineContentDetailsWrapper', () => {
      const { container } = customRender(
        <DetailsText {...props} data-testid="details-text-3" />,
        {
          providerProps: {
            ...providerProps,
          },
        },
      );

      const detailsWrapper = container.querySelector(
        '.timeline-content-details',
      );
      expect(detailsWrapper).toHaveStyle({
        'scrollbar-color': `${providerProps.theme.primary} default`,
      });
    });
  });

  describe('context', () => {
    test('uses context values', () => {
      const { container } = customRender(
        <DetailsText {...props} data-testid="details-text-4" />,
        {
          providerProps: {
            ...providerProps,
            borderLessCards: true,
          },
        },
      );

      const detailsWrapper = container.querySelector(
        '.timeline-content-details',
      );
      expect(detailsWrapper).toHaveStyle({
        width: 'calc(100% - 0.5rem)',
      });
    });
  });

  describe('accessibility', () => {
    test('content has aria-expanded attribute reflecting state', () => {
      const { container } = customRender(
        <DetailsText {...props} showMore data-testid="details-text-5" />,
        {
          providerProps: {
            ...providerProps,
          },
        },
      );

      const detailsWrapper = container.querySelector(
        '.timeline-content-details',
      );
      expect(detailsWrapper).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
