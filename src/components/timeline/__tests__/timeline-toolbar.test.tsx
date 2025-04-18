import React, { ReactNode } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  RenderOptions,
  waitFor,
} from '@testing-library/react';
import { TimelineToolbar } from '../timeline-toolbar';
import { GlobalContext } from '../../GlobalContext';
import { TextDensity } from '@models/TimelineModel';

// Define mock context values
const mockContextValue = {
  theme: {},
  cardLess: false,
  enableQuickJump: true,
  darkMode: false,
  toolbarPosition: 'top' as const,
  textDensity: 'normal' as TextDensity,
  isMobile: false,
  enableLayoutSwitch: true,
  buttonTexts: { jumpTo: 'Jump To', first: 'First', last: 'Last' },
  search: true,
};

// Create a wrapper component that provides the mock context
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <GlobalContext.Provider value={mockContextValue}>
    {children}
  </GlobalContext.Provider>
);

// Override the render method to include our context provider
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: TestWrapper, ...options });

describe('TimelineToolbar Search Functionality', () => {
  const mockItems = [
    {
      id: '1',
      title: 'First Event',
      cardTitle: 'First Event Title',
      cardSubtitle: 'First Event Subtitle',
      cardDetailedText: 'First Event Detailed Text',
    },
    {
      id: '2',
      title: 'Second Event',
      cardTitle: 'Second Event Title',
      cardSubtitle: 'Second Event Subtitle',
      cardDetailedText: [
        'Second Event Detailed Text 1',
        'Second Event Detailed Text 2',
      ],
    },
    {
      id: '3',
      title: 'Third Event',
      cardTitle: 'Third Event Title',
      cardSubtitle: 'Third Event Subtitle',
      cardDetailedText: 'Third Event Detailed Text',
    },
  ];

  const defaultProps = {
    activeTimelineItem: 0,
    slideShowEnabled: false,
    slideShowRunning: false,
    flipLayout: false,
    toggleDarkMode: vi.fn(),
    onPaused: vi.fn(),
    onFirst: vi.fn(),
    onLast: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    onRestartSlideshow: vi.fn(),
    totalItems: mockItems.length,
    items: mockItems,
    id: 'test-timeline',
    onActivateTimelineItem: vi.fn(),
    onUpdateTimelineMode: vi.fn(),
    onUpdateTextContentDensity: vi.fn(),
    mode: 'VERTICAL' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input with correct placeholder', () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );
    expect(searchInput).toBeInTheDocument();
  });

  it('should find items by title', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, { target: { value: 'First Event' } });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('1');
    });
  });

  it('should find items by subtitle', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, {
      target: { value: 'First Event Subtitle' },
    });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('1');
    });
  });

  it('should find items by detailed text', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, {
      target: { value: 'First Event Detailed' },
    });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('1');
    });
  });

  it('should find items by detailed text in array', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, {
      target: { value: 'Second Event Detailed Text 2' },
    });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('2');
    });
  });

  it('should handle case-insensitive search', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, { target: { value: 'first event' } });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('1');
    });
  });

  it('should handle partial matches', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, { target: { value: 'First' } });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('1');
    });
  });

  it('should reset to first item when search is cleared', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    // First search for something
    fireEvent.change(searchInput, { target: { value: 'Third Event' } });
    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('3');
    });

    vi.clearAllMocks();

    // Find and click the clear button
    const clearButton = screen.getByTestId('search-clear-button');
    fireEvent.click(clearButton);

    await waitFor(() => {
      // Should be called synchronously by handleClearSearch
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('1');
    });
  });

  it('should handle no matches', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, { target: { value: 'Non-existent Event' } });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).not.toHaveBeenCalled();
    });
  });

  it('should handle special characters in search', async () => {
    customRender(<TimelineToolbar {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, { target: { value: 'First Event @#$%' } });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).not.toHaveBeenCalled();
    });
  });

  it('should handle empty items array', async () => {
    const propsWithNoItems = { ...defaultProps, items: [] };
    customRender(<TimelineToolbar {...propsWithNoItems} />);
    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(searchInput, { target: { value: 'First Event' } });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).not.toHaveBeenCalled();
    });
  });
});

describe('TimelineToolbar Search Configuration', () => {
  const mockItems = [
    {
      id: '1',
      title: 'First Event',
      cardTitle: 'First Event Title',
      cardSubtitle: 'First Event Subtitle',
      cardDetailedText: 'First Event Detailed Text',
    },
    {
      id: '2',
      title: 'Second Event',
      cardTitle: 'Second Event Title',
      cardSubtitle: 'Second Event Subtitle',
      cardDetailedText: [
        'Second Event Detailed Text 1',
        'Second Event Detailed Text 2',
      ],
    },
  ];

  const defaultProps = {
    activeTimelineItem: 0,
    slideShowEnabled: false,
    slideShowRunning: false,
    flipLayout: false,
    toggleDarkMode: vi.fn(),
    onPaused: vi.fn(),
    onFirst: vi.fn(),
    onLast: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    onRestartSlideshow: vi.fn(),
    totalItems: mockItems.length,
    items: mockItems,
    id: 'test-timeline',
    onActivateTimelineItem: vi.fn(),
    onUpdateTimelineMode: vi.fn(),
    onUpdateTextContentDensity: vi.fn(),
    mode: 'VERTICAL' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render search when search is disabled in context', () => {
    const contextWithSearchDisabled = {
      ...mockContextValue,
      search: false,
    };

    render(
      <GlobalContext.Provider value={contextWithSearchDisabled}>
        <TimelineToolbar {...defaultProps} />
      </GlobalContext.Provider>,
    );

    // Search input should not be in the document
    expect(
      screen.queryByPlaceholderText('Search by title, subtitle...'),
    ).not.toBeInTheDocument();
  });

  it('should not render search when search.enabled is false in context', () => {
    const contextWithSearchDisabled = {
      ...mockContextValue,
      search: { enabled: false },
    };

    render(
      <GlobalContext.Provider value={contextWithSearchDisabled}>
        <TimelineToolbar {...defaultProps} />
      </GlobalContext.Provider>,
    );

    // Search input should not be in the document
    expect(
      screen.queryByPlaceholderText('Search by title, subtitle...'),
    ).not.toBeInTheDocument();
  });

  it('should use custom placeholder from search configuration', () => {
    const contextWithCustomSearch = {
      ...mockContextValue,
      search: {
        enabled: true,
        placeholder: 'Custom search placeholder...',
      },
    };

    render(
      <GlobalContext.Provider value={contextWithCustomSearch}>
        <TimelineToolbar {...defaultProps} />
      </GlobalContext.Provider>,
    );

    // Search input should have custom placeholder
    expect(
      screen.getByPlaceholderText('Custom search placeholder...'),
    ).toBeInTheDocument();
  });

  it('should respect minimumSearchLength from search configuration', async () => {
    const contextWithCustomSearch = {
      ...mockContextValue,
      search: {
        enabled: true,
        minimumSearchLength: 8, // Require 8 characters minimum
      },
    };

    render(
      <GlobalContext.Provider value={contextWithCustomSearch}>
        <TimelineToolbar {...defaultProps} />
      </GlobalContext.Provider>,
    );

    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    // Type a short search term (7 chars)
    fireEvent.change(searchInput, { target: { value: 'Second' } });

    // Wait a bit to ensure any potential async behavior completes
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Should not activate item due to minimum length requirement
    expect(defaultProps.onActivateTimelineItem).not.toHaveBeenCalled();

    // Type a long enough search term (8+ chars)
    fireEvent.change(searchInput, { target: { value: 'First Event' } });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalledWith('1');
    });
  });

  it('should respect searchKeys from search configuration', async () => {
    const contextWithCustomSearch = {
      ...mockContextValue,
      search: {
        enabled: true,
        searchKeys: ['cardTitle'] as (
          | 'title'
          | 'cardTitle'
          | 'cardSubtitle'
          | 'cardDetailedText'
        )[],
      },
    };

    render(
      <GlobalContext.Provider value={contextWithCustomSearch}>
        <TimelineToolbar {...defaultProps} />
      </GlobalContext.Provider>,
    );

    const searchInput = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    // Search for term that's only in cardSubtitle
    fireEvent.change(searchInput, { target: { value: 'Subtitle' } });

    // Wait a bit to ensure any potential async behavior completes
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Should not activate item since we're only searching cardTitle
    expect(defaultProps.onActivateTimelineItem).not.toHaveBeenCalled();

    // Search for term in cardTitle
    fireEvent.change(searchInput, { target: { value: 'Title' } });

    await waitFor(() => {
      expect(defaultProps.onActivateTimelineItem).toHaveBeenCalled();
    });
  });
});
