import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useTimelineNavigation } from '../useTimelineNavigation';

// Mock the findTimelineElement utility
vi.mock('../utils/timelineUtils', () => ({
  findTimelineElement: vi.fn(() => ({
    scrollIntoView: vi.fn(),
  })),
}));

describe('useTimelineNavigation', () => {
  const mockItems = [
    { id: '1', title: 'First Item' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item' },
  ];

  const mockOnTimelineUpdated = vi.fn();
  const mockOnNext = vi.fn();
  const mockOnPrevious = vi.fn();
  const mockOnFirst = vi.fn();
  const mockOnLast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct state', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onTimelineUpdated: mockOnTimelineUpdated,
        onNext: mockOnNext,
        onPrevious: mockOnPrevious,
        onFirst: mockOnFirst,
        onLast: mockOnLast,
      }),
    );

    expect(result.current.activeItemIndex.current).toBe(0);
  });

  it('should handle timeline item click', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onTimelineUpdated: mockOnTimelineUpdated,
      }),
    );

    act(() => {
      result.current.handleTimelineItemClick('2');
    });

    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(1);
  });

  it('should handle timeline item elapsed', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onTimelineUpdated: mockOnTimelineUpdated,
      }),
    );

    act(() => {
      result.current.handleTimelineItemElapsed('2');
    });

    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(2); // isSlideShow is true
  });

  it('should handle next navigation', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onNext: mockOnNext,
      }),
    );

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnNext).toHaveBeenCalled();
  });

  it('should handle previous navigation', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onPrevious: mockOnPrevious,
      }),
    );

    // First move to the second item
    act(() => {
      result.current.handleNext();
    });

    // Then move back
    act(() => {
      result.current.handlePrevious();
    });

    expect(result.current.activeItemIndex.current).toBe(0);
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it('should handle first navigation', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onFirst: mockOnFirst,
      }),
    );

    // First move to the last item
    act(() => {
      result.current.handleLast();
    });

    // Then move to first
    act(() => {
      result.current.handleFirst();
    });

    expect(result.current.activeItemIndex.current).toBe(0);
    expect(mockOnFirst).toHaveBeenCalled();
  });

  it('should handle last navigation', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onLast: mockOnLast,
      }),
    );

    act(() => {
      result.current.handleLast();
    });

    expect(result.current.activeItemIndex.current).toBe(2);
    expect(mockOnLast).toHaveBeenCalled();
  });

  it('should handle keyboard navigation in vertical mode', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onNext: mockOnNext,
        onPrevious: mockOnPrevious,
        onFirst: mockOnFirst,
        onLast: mockOnLast,
      }),
    );

    // Test arrow down
    act(() => {
      result.current.handleKeySelection({
        key: 'ArrowDown',
      } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnNext).toHaveBeenCalled();

    // Test arrow up
    act(() => {
      result.current.handleKeySelection({
        key: 'ArrowUp',
      } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(result.current.activeItemIndex.current).toBe(0);
    expect(mockOnPrevious).toHaveBeenCalled();

    // Test Home key
    act(() => {
      result.current.handleKeySelection({
        key: 'Home',
      } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(mockOnFirst).toHaveBeenCalled();

    // Test End key
    act(() => {
      result.current.handleKeySelection({
        key: 'End',
      } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(mockOnLast).toHaveBeenCalled();
  });

  it('should handle keyboard navigation in horizontal mode', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'HORIZONTAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onNext: mockOnNext,
        onPrevious: mockOnPrevious,
      }),
    );

    // Test arrow right
    act(() => {
      result.current.handleKeySelection({
        key: 'ArrowRight',
      } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnNext).toHaveBeenCalled();

    // Test arrow left
    act(() => {
      result.current.handleKeySelection({
        key: 'ArrowLeft',
      } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(result.current.activeItemIndex.current).toBe(0);
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it('should handle flipped layout in horizontal mode', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'HORIZONTAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        flipLayout: true,
        onNext: mockOnNext,
        onPrevious: mockOnPrevious,
      }),
    );

    // Test arrow right (should go previous in flipped layout)
    act(() => {
      result.current.handleKeySelection({
        key: 'ArrowRight',
      } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(mockOnPrevious).toHaveBeenCalled();

    // Test arrow left (should go next in flipped layout)
    act(() => {
      result.current.handleKeySelection({
        key: 'ArrowLeft',
      } as React.KeyboardEvent<HTMLDivElement>);
    });

    expect(mockOnNext).toHaveBeenCalled();
  });

  it('should not handle navigation when hasFocus is false', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: false,
        onNext: mockOnNext,
        onPrevious: mockOnPrevious,
        onFirst: mockOnFirst,
        onLast: mockOnLast,
      }),
    );

    act(() => {
      result.current.handleNext();
      result.current.handlePrevious();
      result.current.handleFirst();
      result.current.handleLast();
    });

    expect(mockOnNext).not.toHaveBeenCalled();
    expect(mockOnPrevious).not.toHaveBeenCalled();
    expect(mockOnFirst).not.toHaveBeenCalled();
    expect(mockOnLast).not.toHaveBeenCalled();
  });

  it('should not handle invalid item clicks', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        onTimelineUpdated: mockOnTimelineUpdated,
      }),
    );

    act(() => {
      result.current.handleTimelineItemClick('invalid-id');
    });

    expect(mockOnTimelineUpdated).not.toHaveBeenCalled();
  });
});
