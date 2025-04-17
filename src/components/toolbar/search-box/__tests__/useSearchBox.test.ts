import { renderHook, act, waitFor } from '@testing-library/react';
import { useSearchBox } from '../useSearchBox';
import { TimelineItemModel } from '@models/TimelineItemModel';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useSearch } from 'src/components/common/SearchContext';

// Mock the useSearch hook
vi.mock('src/components/common/SearchContext', () => ({
  useSearch: vi.fn(() => ({
    setSearchTerm: vi.fn(),
  })),
}));

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

describe('useSearchBox', () => {
  const mockOnActivateItem = vi.fn();
  const mockSetSearchTerm = vi.fn();

  beforeEach(() => {
    mockOnActivateItem.mockClear();
    mockSetSearchTerm.mockClear();
    (useSearch as any).mockImplementation(() => ({
      setSearchTerm: mockSetSearchTerm,
    }));
  });

  it('initializes with empty search state', () => {
    const { result } = renderHook(() =>
      useSearchBox({ items: mockItems, onActivateItem: mockOnActivateItem }),
    );

    expect(result.current.searchText).toBe('');
    expect(result.current.searchMatches).toEqual([]);
    expect(result.current.currentMatchIndex).toBe(0);
  });

  it('updates search text and calls setSearchTerm on input change', async () => {
    const { result } = renderHook(() =>
      useSearchBox({ items: mockItems, onActivateItem: mockOnActivateItem }),
    );

    act(() => {
      result.current.handleChange({
        target: { value: 'First' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      expect(result.current.searchText).toBe('First');
      expect(mockSetSearchTerm).toHaveBeenCalledWith('first');
    });
  });

  it('finds matches in item titles', async () => {
    const { result } = renderHook(() =>
      useSearchBox({ items: mockItems, onActivateItem: mockOnActivateItem }),
    );

    act(() => {
      result.current.handleChange({
        target: { value: 'First' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      expect(result.current.searchMatches).toEqual(['1']);
    });
  });

  it('finds matches in card titles', async () => {
    const { result } = renderHook(() =>
      useSearchBox({ items: mockItems, onActivateItem: mockOnActivateItem }),
    );

    act(() => {
      result.current.handleChange({
        target: { value: 'Card Title' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      expect(result.current.searchMatches).toEqual(['1', '2']);
    });
  });

  it('navigates to next match', async () => {
    const { result } = renderHook(() =>
      useSearchBox({ items: mockItems, onActivateItem: mockOnActivateItem }),
    );

    act(() => {
      result.current.handleChange({
        target: { value: 'Item' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      expect(result.current.searchMatches.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.handleNextMatch();
    });

    await waitFor(() => {
      expect(result.current.currentMatchIndex).toBe(1);
      expect(mockOnActivateItem).toHaveBeenCalledWith('2');
    });
  });

  it('navigates to previous match', async () => {
    const { result } = renderHook(() =>
      useSearchBox({ items: mockItems, onActivateItem: mockOnActivateItem }),
    );

    act(() => {
      result.current.handleChange({
        target: { value: 'Item' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      expect(result.current.searchMatches.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.handleNextMatch();
    });

    await waitFor(() => {
      expect(result.current.currentMatchIndex).toBe(1);
    });

    act(() => {
      result.current.handlePrevMatch();
    });

    await waitFor(() => {
      expect(result.current.currentMatchIndex).toBe(0);
      expect(mockOnActivateItem).toHaveBeenCalledWith('1');
    });
  });

  it('clears search state and resets search term', async () => {
    const { result } = renderHook(() =>
      useSearchBox({ items: mockItems, onActivateItem: mockOnActivateItem }),
    );

    act(() => {
      result.current.handleChange({
        target: { value: 'Item' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await waitFor(() => {
      expect(result.current.searchMatches.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.handleClearSearch();
    });

    await waitFor(() => {
      expect(result.current.searchText).toBe('');
      expect(result.current.searchMatches).toEqual([]);
      expect(result.current.currentMatchIndex).toBe(0);
      expect(mockSetSearchTerm).toHaveBeenCalledWith('');
    });
  });
});
