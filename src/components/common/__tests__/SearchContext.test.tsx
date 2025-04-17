import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchContext, { SearchProvider, useSearch } from '../SearchContext';

// A simple component to consume the context for testing
const TestConsumerComponent = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div>
      <span data-testid="searchTerm">{searchTerm}</span>
      <button onClick={() => setSearchTerm('new term')}>Update Term</button>
    </div>
  );
};

describe('SearchContext', () => {
  it('provides default searchTerm and setSearchTerm function', () => {
    render(
      <SearchProvider>
        <TestConsumerComponent />
      </SearchProvider>,
    );

    // Check initial state
    expect(screen.getByTestId('searchTerm')).toHaveTextContent('');

    // Check if setSearchTerm function works
    const button = screen.getByRole('button', { name: /update term/i });
    act(() => {
      button.click();
    });

    // Check updated state
    expect(screen.getByTestId('searchTerm')).toHaveTextContent('new term');
  });

  it('useSearch hook provides context values', () => {
    let contextValue;

    const HookTester = () => {
      contextValue = useSearch();
      return null;
    };

    render(
      <SearchProvider>
        <HookTester />
      </SearchProvider>,
    );

    expect(contextValue).toHaveProperty('searchTerm', '');
    expect(contextValue).toHaveProperty('setSearchTerm');
    expect(typeof contextValue.setSearchTerm).toBe('function');
  });

  it('exports SearchContext directly', () => {
    // Basic check to ensure the context object itself is exported
    expect(SearchContext).toBeDefined();
    expect(SearchContext.Provider).toBeDefined();
    expect(SearchContext.Consumer).toBeDefined();
  });
});
