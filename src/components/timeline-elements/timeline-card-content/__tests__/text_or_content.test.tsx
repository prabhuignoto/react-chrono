// Imports
import { getDefaultClassNames } from '@utils/index';
import { customRender, providerProps } from 'src/components/common/test';
import { getTextOrContent } from '../text-or-content';
import { SearchProvider, useSearch } from 'src/components/common/SearchContext';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
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

// Cast the mocked hook
const mockedUseSearch = useSearch as ReturnType<typeof vi.fn>;

describe('getTextOrContent', () => {
  const classNames = getDefaultClassNames();

  beforeEach(() => {
    // Reset mock before each test
    mockedUseSearch.mockReturnValue({ searchTerm: '', setSearchTerm: vi.fn() });
  });

  it('renders TimelineContentDetails when detailedText is string', () => {
    const TextContent = getTextOrContent({
      detailedText: 'Hello World',
    });

    const { getByText } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
      },
    });
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('renders TimelineContentDetails with xss when parseDetailsAsHTML is true', () => {
    const TextContent = getTextOrContent({
      detailedText: '<b>Hello</b>',
    });

    const { container } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
        parseDetailsAsHTML: true,
      },
    });

    expect(container.firstChild).toHaveTextContent('Hello'); // xss sanitized
  });

  it('renders TimelineSubContent when detailedText is array', () => {
    const TextContent = getTextOrContent({
      detailedText: ['Line 1', 'Line 2'],
    });

    const { getAllByText } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
      },
    });
    expect(getAllByText('Line 1')[0]).toBeInTheDocument();
    expect(getAllByText('Line 2')[0]).toBeInTheDocument();
  });

  it('passes showMore prop to TimelineContentDetails', () => {
    const TextContent = getTextOrContent({
      detailedText: 'Text',
      showMore: true,
    });

    const { getByText } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
      },
    });
    expect(getByText('Text')).toHaveClass('active');
  });

  it('highlights text when searchTerm matches content', async () => {
    const TestComponent = () => {
      const TextContent = getTextOrContent({
        detailedText: 'Hello World',
        theme: { primary: '#0066CC' },
      });

      return (
        <div data-testid="test-container">
          <TextContent />
        </div>
      );
    };

    // Set the mock return value for this test
    mockedUseSearch.mockReturnValueOnce({
      searchTerm: 'World',
      setSearchTerm: vi.fn(),
    });

    // Render the component
    const { container } = customRender(<TestComponent />, {
      providerProps: {
        ...providerProps,
      },
    });

    // Use waitFor to wait for the highlight to appear
    await waitFor(() => {
      expect(container.innerHTML).toContain('mark');
      expect(container.innerHTML).toContain('World');
      expect(container.querySelector('mark')?.textContent).toBe('World');
    });
  });

  it('adds correct CSS classes when search is active', () => {
    const TextContent = getTextOrContent({
      detailedText: 'Hello World with searchable content',
      theme: { primary: '#0066CC' },
    });

    // Set the mock return value for this test
    mockedUseSearch.mockReturnValueOnce({
      searchTerm: 'searchable',
      setSearchTerm: vi.fn(),
    });

    const { container } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
      },
    });

    const contentDetailsElem = container.querySelector(
      '.timeline-content-details',
    );
    expect(contentDetailsElem).toHaveClass('has-search');
  });

  it('properly highlights text in array of detailed text', async () => {
    const TextContent = getTextOrContent({
      detailedText: [
        'First paragraph',
        'Second paragraph with search term',
        'Third paragraph',
      ],
      theme: { primary: '#0066CC' },
    });

    // Set the mock return value for this test
    mockedUseSearch.mockReturnValueOnce({
      searchTerm: 'search term',
      setSearchTerm: vi.fn(),
    });

    const { container } = customRender(<TextContent />, {
      providerProps: {
        ...providerProps,
      },
    });

    // Check that the content has the highlighted HTML using waitFor
    await waitFor(() => {
      expect(container.innerHTML).toContain('mark');
      expect(container.innerHTML).toContain('search term');

      // The second paragraph should have a highlight
      const paragraphs = container.querySelectorAll('.highlight-container');
      // The highlighted text is inside the second paragraph (index 1)
      expect(paragraphs[1]).toBeInTheDocument();
      expect(paragraphs[1].innerHTML).toContain('mark');
      expect(paragraphs[1].querySelector('mark')?.textContent).toBe(
        'search term',
      );
    });
  });
});
