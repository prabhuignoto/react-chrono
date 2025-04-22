import {
  render,
  screen,
  renderHook,
  act,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach } from 'vitest';
import SearchContext, { SearchProvider, useSearch } from '../SearchContext';

describe('SearchContext', () => {
  afterEach(cleanup);

  describe('SearchContext (default export)', () => {
    it('exports a React context object', () => {
      expect(SearchContext).toBeDefined();
      expect(SearchContext.Provider).toBeDefined();
      expect(SearchContext.Consumer).toBeDefined();
    });
  });

  describe('SearchProvider', () => {
    it('renders children correctly', () => {
      render(
        <SearchProvider>
          <div data-testid="test-child">Test Child</div>
        </SearchProvider>,
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });
  });

  describe('SearchProvider and useSearch integration', () => {
    it('provides search functionality to components', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const { searchTerm, setSearchTerm } = useSearch();
        return (
          <div>
            <input
              data-testid="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div data-testid="search-term">{searchTerm}</div>
          </div>
        );
      };

      render(
        <SearchProvider>
          <TestComponent />
        </SearchProvider>,
      );

      const input = screen.getByTestId('search-input');
      await user.type(input, 'test search');

      expect(screen.getByTestId('search-term')).toHaveTextContent(
        'test search',
      );
    });
  });
});
