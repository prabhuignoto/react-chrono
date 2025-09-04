// test utils
import { customRender, providerProps } from '../../../common/test';
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
      const { getByText } = customRender(<DetailsText {...props} />, {
        providerProps: {
          ...providerProps,
        },
      });
      expect(getByText('Hello world')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    test('passes showMore prop to TextContent', async () => {
      const { getByText } = customRender(<DetailsText {...props} showMore />, {
        providerProps: {
          ...providerProps,
        },
      });

      expect(getByText('Hello world').parentElement).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    });

    test('passes theme prop to TimelineContentDetailsWrapper', () => {
      const { getByText } = customRender(<DetailsText {...props} />, {
        providerProps: {
          ...providerProps,
        },
      });

      // Check that theme styles are applied through computeCssVarsFromTheme
      const element = getByText('Hello world').parentElement;

      // Verify that the element has the computed theme styles applied
      const styles = window.getComputedStyle(element!);
      expect(styles.getPropertyValue('overflow-y')).toBe('hidden');

      // Check that background is set using CSS variables (the exact variable name may have hash suffix)
      const backgroundStyle = element!.style.background;
      expect(backgroundStyle).toContain('var(--');
    });
  });

  describe('context', () => {
    test('uses context values', () => {
      // mock GlobalContext
      const { getByText } = customRender(<DetailsText {...props} />, {
        providerProps: {
          ...providerProps,
          borderLessCards: true,
        },
      });

      expect(getByText('Hello world').parentElement).toHaveStyle({
        width: 'calc(100% - 0.5rem)',
      });
    });
  });

  describe('accessibility', () => {
    test('content has aria-expanded attribute reflecting state', () => {
      const { getByText } = customRender(<DetailsText {...props} showMore />, {
        providerProps: {
          ...providerProps,
        },
      });
      expect(getByText('Hello world').parentElement).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    });
  });
});
