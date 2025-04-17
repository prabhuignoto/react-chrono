import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from '../index';
import { SearchBoxProps } from '../search-box.model';
import SearchContext from '../../../common/SearchContext';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Theme } from '@models/Theme';
import { ThemeProvider } from 'styled-components';
import { getDefaultThemeOrDark } from '@utils/index';
import { TimelineItemModel } from '@models/TimelineItemModel';

// Mock the SearchContext
const mockSetSearchTerm = vi.fn();

// Define mock function outside describe
const mockOnActivateItem = vi.fn();

// Mock Theme
const theme = getDefaultThemeOrDark();

const mockItems: TimelineItemModel[] = [
  {
    id: '1',
    title: 'First Item',
    cardTitle: 'Card Title 1',
    cardSubtitle: 'Subtitle 1',
    cardDetailedText: 'Detailed text 1',
  },
  {
    id: '2',
    title: 'Second Item',
    cardTitle: 'Card Title 2',
    cardSubtitle: 'Subtitle 2',
    cardDetailedText: 'Detailed text 2',
  },
];

// Helper function to render SearchBox with providers
const renderSearchBox = (props: Partial<SearchBoxProps> = {}) => {
  const defaultProps: SearchBoxProps = {
    theme,
    items: mockItems,
    onActivateItem: mockOnActivateItem,
    ...props,
  };

  return render(
    <SearchContext.Provider
      value={{ searchTerm: '', setSearchTerm: mockSetSearchTerm }}
    >
      <ThemeProvider theme={theme}>
        <SearchBox {...defaultProps} />
      </ThemeProvider>
    </SearchContext.Provider>,
  );
};

describe('SearchBox', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockSetSearchTerm.mockClear();
    mockOnActivateItem.mockClear();
  });

  it('renders the search input with placeholder', () => {
    renderSearchBox({ placeholder: 'Search items...' });
    const inputElement = screen.getByPlaceholderText('Search items...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute(
      'data-testid',
      'timeline-search-input',
    );
  });

  it('calls setSearchTerm on input change', async () => {
    renderSearchBox();
    const inputElement = screen.getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'First' } });

    // Wait for debounce and assertion
    await waitFor(() => {
      // Corrected assertion: useSearchBox calls setSearchTerm with lowercase
      expect(mockSetSearchTerm).toHaveBeenCalledWith('first');
    });
  });

  it('shows clear button when there is text', async () => {
    renderSearchBox();

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'First' } });

    // Need to wait for potential state updates if button appearance is async
    await waitFor(() => {
      expect(screen.getByTestId('search-clear-button')).toBeInTheDocument();
    });
  });

  it('clears search when clear button is clicked', async () => {
    renderSearchBox();

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'First' } });

    // Wait for clear button to appear
    await waitFor(() => {
      expect(screen.getByTestId('search-clear-button')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('search-clear-button'));

    await waitFor(() => {
      expect(input).toHaveValue('');
      // Also check if setSearchTerm was called with empty string
      expect(mockSetSearchTerm).toHaveBeenCalledWith('');
    });
  });

  it('shows navigation buttons when there are matches', async () => {
    renderSearchBox();

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Item' } });

    await waitFor(() => {
      expect(screen.getByTitle('Previous match')).toBeInTheDocument();
      expect(screen.getByTitle('Next match')).toBeInTheDocument();
    });
  });

  it('navigates between matches', async () => {
    renderSearchBox();

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Item' } });

    // Wait for buttons to appear
    await waitFor(() => {
      expect(screen.getByTitle('Next match')).toBeInTheDocument();
    });

    // Click next match
    fireEvent.click(screen.getByTitle('Next match'));
    await waitFor(() => {
      expect(mockOnActivateItem).toHaveBeenCalledWith('2');
    });

    // Wait for buttons to appear (though they should still be there)
    await waitFor(() => {
      expect(screen.getByTitle('Previous match')).toBeInTheDocument();
    });

    // Click previous match
    fireEvent.click(screen.getByTitle('Previous match'));
    await waitFor(() => {
      expect(mockOnActivateItem).toHaveBeenCalledWith('1');
    });
  });

  it('shows match count when there are matches', async () => {
    renderSearchBox();

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Item' } });

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('of')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });
});
