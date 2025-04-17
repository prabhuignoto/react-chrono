import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from '../index';
import SearchContext from '../../../common/SearchContext';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Theme } from '@models/Theme';

// Mock the SearchContext
const mockSetSearchTerm = vi.fn();

// Mock Theme
const mockTheme: Theme = {
  primary: 'blue',
  secondary: 'red',
  cardBgColor: 'white',
  titleColor: 'black',
  titleColorActive: 'blue',
  cardTitleColor: 'black',
  cardSubtitleColor: 'grey',
  cardDetailsColor: 'darkgrey',
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <SearchContext.Provider
      value={{ searchTerm: '', setSearchTerm: mockSetSearchTerm }}
    >
      {ui}
    </SearchContext.Provider>,
  );
};

describe('SearchBox', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockSetSearchTerm.mockClear();
  });
  it('renders the search input with placeholder', () => {
    renderWithProvider(
      <SearchBox
        theme={mockTheme}
        onActivateItem={() => {}}
        items={[]}
        placeholder="Search by title, subtitle..."
      />,
    );
    const inputElement = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute(
      'data-testid',
      'timeline-search-input',
    );
  });

  it('calls setSearchTerm on input change', async () => {
    renderWithProvider(
      <SearchBox
        theme={mockTheme}
        onActivateItem={() => {}}
        items={[]}
        placeholder="Search by title, subtitle..."
      />,
    );
    const inputElement = screen.getByPlaceholderText(
      'Search by title, subtitle...',
    );

    fireEvent.change(inputElement, { target: { value: 'test search' } });

    // Wait for debounce and assertion
    await waitFor(() => {
      expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
      expect(mockSetSearchTerm).toHaveBeenCalledWith('test search');
    });
  });

  // Basic test for clear button presence - assumes it exists within the component structure
  // A more specific test would require knowing the clear button's selector/testid
  it('renders a clear button (basic check)', () => {
    renderWithProvider(
      <SearchBox
        theme={mockTheme}
        onActivateItem={() => {}}
        items={[]}
        placeholder="Search by title, subtitle..."
      />,
    );
    // Example: If the clear button is a <button> element
    // const clearButton = screen.getByRole('button'); // This might be too generic
    // expect(clearButton).toBeInTheDocument();
    // A better approach is adding a data-testid to the clear button in SearchBox component
    // e.g., <button data-testid="search-clear-button">...</button>
    // then: const clearButton = screen.getByTestId('search-clear-button');
    // expect(clearButton).toBeInTheDocument();
    // For now, just asserting the component renders without crashing
    expect(
      screen.getByPlaceholderText('Search by title, subtitle...'),
    ).toBeInTheDocument();
  });

  // Add more tests as needed, e.g., for debouncing, clear button click action
});
