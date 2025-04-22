// test utils
import { customRender, providerProps } from 'src/components/common/test';
import { DetailsText } from '../details-text';
import { render, screen } from '@testing-library/react';
import { SearchProvider, useSearch } from 'src/components/common/SearchContext';
import { vi } from 'vitest';

// Mock the entire SearchContext module
vi.mock('src/components/common/SearchContext', async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import('src/components/common/SearchContext')
    >();
  return {
    ...actual,
    // Default mock implementation
    useSearch: vi.fn(() => ({
      searchTerm: '',
      setSearchTerm: vi.fn(),
    })),
  };
});

// Cast the mocked hook to allow manipulation in tests
const mockedUseSearch = useSearch as ReturnType<typeof vi.fn>;

describe('DetailsText', () => {
  let props;

  beforeEach(() => {
    // Reset mocks before each test
    mockedUseSearch.mockReturnValue({ searchTerm: '', setSearchTerm: vi.fn() });
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

  describe('search highlighting', () => {
    test('adds search highlighting class when search term is present', () => {
      // Set the mock return value for this specific test
      mockedUseSearch.mockReturnValueOnce({
        searchTerm: 'world',
        setSearchTerm: vi.fn(),
      });

      const { container } = customRender(
        <DetailsText {...props} data-testid="details-text-search-1" />,
        {
          providerProps: {
            ...providerProps,
          },
        },
      );

      const detailsWrapper = container.querySelector(
        '.timeline-content-details',
      );

      expect(detailsWrapper).toHaveClass('has-search-highlighting');
      expect(detailsWrapper).toHaveAttribute('data-has-search', 'true');
    });

    test('properly handles array of detailed text with search term', () => {
      const arrayTextProps = {
        detailedText: [
          'First paragraph',
          'Second paragraph with world',
          'Third',
        ],
      };

      // Set the mock return value for this specific test
      mockedUseSearch.mockReturnValueOnce({
        searchTerm: 'world',
        setSearchTerm: vi.fn(),
      });

      const { container } = customRender(
        <DetailsText {...arrayTextProps} data-testid="details-text-search-2" />,
        {
          providerProps: {
            ...providerProps,
          },
        },
      );

      const detailsWrapper = container.querySelector(
        '.timeline-content-details',
      );

      expect(detailsWrapper).toHaveClass('has-search-highlighting');
      expect(detailsWrapper).toHaveAttribute('data-has-search', 'true');
    });
  });
});
