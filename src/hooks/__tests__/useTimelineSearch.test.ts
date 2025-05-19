import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useTimelineSearch } from '../useTimelineSearch';

describe('useTimelineSearch', () => {
  const mockItems = [
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
    {
      id: '3',
      title: 'Third Item',
      cardTitle: 'Card Title 3',
      cardSubtitle: 'Subtitle 3',
      cardDetailedText: 'Detailed text 3',
    },
  ];

  const mockOnTimelineUpdated = vi.fn();
  const mockHandleTimelineItemClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('should initialize with empty search state', () => {
    const { result } = renderHook(() =>
      useTimelineSearch({
        items: mockItems,
        onTimelineUpdated: mockOnTimelineUpdated,
        handleTimelineItemClick: mockHandleTimelineItemClick,
      }),
    );

    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.currentMatchIndex).toBe(-1);
  });

  it('should find matches in searchable text', () => {
    const { result } = renderHook(() =>
      useTimelineSearch({
        items: mockItems,
        onTimelineUpdated: mockOnTimelineUpdated,
        handleTimelineItemClick: mockHandleTimelineItemClick,
      }),
    );

    act(() => {
      result.current.handleSearchChange('Title 1');
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.searchResults).toEqual([0]);
    expect(result.current.currentMatchIndex).toBe(0);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(0);
    expect(mockHandleTimelineItemClick).toHaveBeenCalledWith('1');
  });

  it('should handle case-insensitive search', () => {
    const { result } = renderHook(() =>
      useTimelineSearch({
        items: mockItems,
        onTimelineUpdated: mockOnTimelineUpdated,
        handleTimelineItemClick: mockHandleTimelineItemClick,
      }),
    );

    act(() => {
      result.current.handleSearchChange('title 1');
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.searchResults).toEqual([0]);
    expect(result.current.currentMatchIndex).toBe(0);
  });

  it('should navigate between matches', () => {
    const { result } = renderHook(() =>
      useTimelineSearch({
        items: mockItems,
        onTimelineUpdated: mockOnTimelineUpdated,
        handleTimelineItemClick: mockHandleTimelineItemClick,
      }),
    );

    // Search for "Title" which appears in all items
    act(() => {
      result.current.handleSearchChange('Title');
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.searchResults).toEqual([0, 1, 2]);
    expect(result.current.currentMatchIndex).toBe(0);

    // Navigate to next match
    act(() => {
      result.current.handleNextMatch();
    });

    expect(result.current.currentMatchIndex).toBe(1);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(1);
    expect(mockHandleTimelineItemClick).toHaveBeenCalledWith('2');

    // Navigate to previous match
    act(() => {
      result.current.handlePreviousMatch();
    });

    expect(result.current.currentMatchIndex).toBe(0);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(0);
    expect(mockHandleTimelineItemClick).toHaveBeenCalledWith('1');
  });

  it('should clear search results', () => {
    const { result } = renderHook(() =>
      useTimelineSearch({
        items: mockItems,
        onTimelineUpdated: mockOnTimelineUpdated,
        handleTimelineItemClick: mockHandleTimelineItemClick,
      }),
    );

    // First perform a search
    act(() => {
      result.current.handleSearchChange('Title');
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Then clear the search
    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchQuery).toBe('');
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.currentMatchIndex).toBe(-1);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(0);
    expect(mockHandleTimelineItemClick).toHaveBeenCalledWith('1');
  });

  it('should handle empty search query', () => {
    const { result } = renderHook(() =>
      useTimelineSearch({
        items: mockItems,
        onTimelineUpdated: mockOnTimelineUpdated,
        handleTimelineItemClick: mockHandleTimelineItemClick,
      }),
    );

    act(() => {
      result.current.handleSearchChange('');
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.searchResults).toEqual([]);
    expect(result.current.currentMatchIndex).toBe(-1);
  });

  it('should handle search in array of detailed text', () => {
    const itemsWithArrayText = [
      {
        ...mockItems[0],
        cardDetailedText: ['First line', 'Second line'],
      },
    ];

    const { result } = renderHook(() =>
      useTimelineSearch({
        items: itemsWithArrayText,
        onTimelineUpdated: mockOnTimelineUpdated,
        handleTimelineItemClick: mockHandleTimelineItemClick,
      }),
    );

    act(() => {
      result.current.handleSearchChange('Second line');
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.searchResults).toEqual([0]);
    expect(result.current.currentMatchIndex).toBe(0);
  });

  it('should handle keyboard navigation', () => {
    const { result } = renderHook(() =>
      useTimelineSearch({
        items: mockItems,
        onTimelineUpdated: mockOnTimelineUpdated,
        handleTimelineItemClick: mockHandleTimelineItemClick,
      }),
    );

    // First perform a search
    act(() => {
      result.current.handleSearchChange('Title');
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Simulate Enter key press
    act(() => {
      result.current.handleSearchKeyDown({
        key: 'Enter',
        preventDefault: vi.fn(),
        altKey: false,
        charCode: 0,
        ctrlKey: false,
        code: 'Enter',
        keyCode: 13,
        metaKey: false,
        shiftKey: false,
        getModifierState: vi.fn(),
        nativeEvent: new KeyboardEvent('keydown'),
        currentTarget: document.createElement('input'),
        target: document.createElement('input'),
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        timeStamp: Date.now(),
        type: 'keydown',
        isDefaultPrevented: vi.fn(),
        isPropagationStopped: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.currentMatchIndex).toBe(1);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(1);
    expect(mockHandleTimelineItemClick).toHaveBeenCalledWith('2');
  });
});
