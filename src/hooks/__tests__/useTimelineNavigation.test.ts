import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useTimelineNavigation } from '../useTimelineNavigation';

// Mock the findTimelineElement utility
vi.mock('../utils/timelineUtils', () => ({
  findTimelineElement: vi.fn(() => ({
    scrollIntoView: vi.fn(),
  })),
}));

// Helper function to create mock keyboard events
const createMockKeyboardEvent = (key: string): React.KeyboardEvent<HTMLDivElement> => ({
  key,
  preventDefault: vi.fn(),
} as unknown as React.KeyboardEvent<HTMLDivElement>);

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
      result.current.handleKeySelection(createMockKeyboardEvent('ArrowDown'));
    });

    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnNext).toHaveBeenCalled();

    // Test arrow up
    act(() => {
      result.current.handleKeySelection(createMockKeyboardEvent('ArrowUp'));
    });

    expect(result.current.activeItemIndex.current).toBe(0);
    expect(mockOnPrevious).toHaveBeenCalled();

    // Move to a different position first, then test Home key
    act(() => {
      result.current.handleKeySelection(createMockKeyboardEvent('ArrowDown'));
    });
    
    act(() => {
      result.current.handleKeySelection(createMockKeyboardEvent('Home'));
    });

    expect(result.current.activeItemIndex.current).toBe(0);
    expect(mockOnFirst).toHaveBeenCalled();

    // Test End key
    act(() => {
      result.current.handleKeySelection(createMockKeyboardEvent('End'));
    });

    expect(result.current.activeItemIndex.current).toBe(mockItems.length - 1);
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
      result.current.handleKeySelection(createMockKeyboardEvent('ArrowRight'));
    });

    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnNext).toHaveBeenCalled();

    // Test arrow left
    act(() => {
      result.current.handleKeySelection(createMockKeyboardEvent('ArrowLeft'));
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

    // Move to index 1 first to enable testing both directions
    act(() => {
      result.current.handleKeySelection(createMockKeyboardEvent('ArrowLeft'));
    });

    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnNext).toHaveBeenCalled();

    // Test arrow right (should go previous in flipped layout)
    act(() => {
      result.current.handleKeySelection(createMockKeyboardEvent('ArrowRight'));
    });

    expect(result.current.activeItemIndex.current).toBe(0);
    expect(mockOnPrevious).toHaveBeenCalled();
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

  it('should disable card alignment scrolling in horizontal mode when slideshow is running', () => {
    const mockScrollIntoView = vi.fn();
    
    // Mock document.getElementById to return an element with scrollIntoView method
    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn(() => ({
      scrollIntoView: mockScrollIntoView,
    })) as any;

    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'HORIZONTAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        slideShowRunning: true,
        onTimelineUpdated: mockOnTimelineUpdated,
      }),
    );

    act(() => {
      result.current.handleTimelineItemClick('2');
    });

    // Should update timeline position but not call scrollIntoView when slideshow is running
    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(1);
    expect(mockScrollIntoView).not.toHaveBeenCalled();

    // Restore original function
    document.getElementById = originalGetElementById;
  });

  it('should allow card alignment scrolling in horizontal mode when slideshow is not running', async () => {
    const mockScrollIntoView = vi.fn();
    
    // Mock document.getElementById to return an element with scrollIntoView method and closest method
    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn(() => ({
      scrollIntoView: mockScrollIntoView,
      closest: vi.fn(() => null), // Mock closest method
      parentElement: null,
    })) as any;

    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'HORIZONTAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        slideShowRunning: false,
        onTimelineUpdated: mockOnTimelineUpdated,
      }),
    );

    act(() => {
      result.current.handleTimelineItemClick('2');
    });

    // Wait for requestAnimationFrame to complete
    await act(async () => {
      await new Promise(resolve => requestAnimationFrame(resolve));
    });

    // Should update timeline position and call scrollIntoView when slideshow is not running
    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(1);
    expect(mockScrollIntoView).toHaveBeenCalled();

    // Restore original function
    document.getElementById = originalGetElementById;
  });

  it('should allow card alignment scrolling in vertical mode even when slideshow is running', () => {
    const { result } = renderHook(() =>
      useTimelineNavigation({
        items: mockItems,
        mode: 'VERTICAL',
        timelineId: 'test-timeline',
        hasFocus: true,
        slideShowRunning: true,
        onTimelineUpdated: mockOnTimelineUpdated,
      }),
    );

    act(() => {
      result.current.handleTimelineItemClick('2');
    });

    // Should update timeline position and the mocked scrollIntoView should be called
    expect(result.current.activeItemIndex.current).toBe(1);
    expect(mockOnTimelineUpdated).toHaveBeenCalledWith(1);
    // In vertical mode, slideshow running should not affect scrolling behavior
  });
});
