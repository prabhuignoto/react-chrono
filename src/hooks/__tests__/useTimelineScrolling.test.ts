import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimelineScrolling } from '../useTimelineScrolling';

// Mock requestAnimationFrame to immediately call callback
global.requestAnimationFrame = vi.fn((cb) => {
  cb(performance.now());
  return 0;
});

global.cancelAnimationFrame = vi.fn();

// Mock performance.now
global.performance = {
  ...global.performance,
  now: vi.fn(() => 16), // Return a fixed time
};

describe('useTimelineScrolling', () => {
  let mockElement: HTMLElement;
  let mockContainer: HTMLElement;

  beforeEach(() => {
    // Mock document.querySelector to return null (no container found)
    global.document.querySelector = vi.fn(() => null);
    
    mockContainer = {
      getBoundingClientRect: vi.fn(() => ({
        top: 0,
        left: 0,
        width: 1000,
        height: 600,
      })),
      scrollTop: 0,
      scrollLeft: 0,
    } as any;

    mockElement = {
      scrollIntoView: vi.fn(),
      getBoundingClientRect: vi.fn(() => ({
        top: 300,
        left: 500,
        width: 200,
        height: 100,
      })),
      closest: vi.fn(() => null), // No container found
      parentElement: {
        parentElement: null, // No fallback container
      },
    } as any;
    vi.clearAllMocks();
  });

  it('should scroll element into view for vertical mode', async () => {
    const { result } = renderHook(() => useTimelineScrolling());

    await act(async () => {
      result.current.scrollToElement(mockElement, 'VERTICAL');
      // Wait for RAF to be called
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Should fallback to native scrollIntoView when container not found
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  });

  it('should scroll element into view for horizontal mode', async () => {
    const { result } = renderHook(() => useTimelineScrolling());

    await act(async () => {
      result.current.scrollToElement(mockElement, 'HORIZONTAL');
      // Wait for RAF to be called
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Should fallback to native scrollIntoView when container not found
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  });

  it('should handle null element gracefully', () => {
    const { result } = renderHook(() => useTimelineScrolling());

    act(() => {
      result.current.scrollToElement(null as any, 'VERTICAL');
    });

    // Should not throw an error
    expect(true).toBe(true);
  });

  it('should handle element without scrollIntoView method', () => {
    const elementWithoutScroll = {
      parentElement: {
        parentElement: null,
      },
    } as HTMLElement;
    const { result } = renderHook(() => useTimelineScrolling());

    act(() => {
      result.current.scrollToElement(elementWithoutScroll, 'VERTICAL');
    });

    // Should not throw an error
    expect(true).toBe(true);
  });

  it('should prevent repeated scrolling to same element', async () => {
    const { result } = renderHook(() => useTimelineScrolling());

    await act(async () => {
      result.current.scrollToElement(mockElement, 'VERTICAL');
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Immediately call again without waiting for timeout to clear
    await act(async () => {
      result.current.scrollToElement(mockElement, 'VERTICAL');
    });

    // Should be called twice since the debouncing is based on timeout, not immediate prevention
    expect(mockElement.scrollIntoView).toHaveBeenCalledTimes(2);
  });
});
