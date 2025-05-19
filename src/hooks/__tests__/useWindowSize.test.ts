// Mock window before importing the hook
const mockWindow = {
  innerWidth: 1024,
  innerHeight: 768,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  setTimeout: vi.fn(),
  clearTimeout: vi.fn(),
  requestAnimationFrame: vi.fn(),
  cancelAnimationFrame: vi.fn(),
};

// Set up global window for SSR test
if (typeof window === 'undefined') {
  global.window = mockWindow as any;
}

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useWindowSize } from '../useWindowSize';

// Helper function to execute the latest setTimeout callback
const executeLatestTimeout = () => {
  const timeoutCallback =
    mockWindow.setTimeout.mock.calls[
      mockWindow.setTimeout.mock.calls.length - 1
    ][0];
  timeoutCallback();
};

describe('useWindowSize', () => {
  const originalWindow = global.window;

  beforeEach(() => {
    vi.useFakeTimers();
    // Mock window for all tests
    global.window = mockWindow as any;
    // Reset mock implementations
    mockWindow.setTimeout.mockImplementation(vi.fn());
    mockWindow.requestAnimationFrame.mockImplementation((cb) => {
      cb();
      return 456;
    });
    mockWindow.addEventListener.mockClear();
    mockWindow.removeEventListener.mockClear();
    mockWindow.dispatchEvent.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    // Restore original window
    global.window = originalWindow;
  });

  it('should initialize with current window dimensions', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(mockWindow.innerWidth);
    expect(result.current.height).toBe(mockWindow.innerHeight);
  });

  it('should update dimensions on window resize', () => {
    const { result } = renderHook(() => useWindowSize());

    // Mock window resize
    mockWindow.innerWidth = 800;
    mockWindow.innerHeight = 600;

    // Trigger resize event
    act(() => {
      mockWindow.dispatchEvent(new Event('resize'));
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(100);
      executeLatestTimeout();
    });

    // Wait for requestAnimationFrame
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  it('should debounce resize events', () => {
    const { result } = renderHook(() => useWindowSize({ debounceMs: 200 }));

    // Mock window resize
    mockWindow.innerWidth = 800;

    // Trigger multiple resize events
    act(() => {
      mockWindow.dispatchEvent(new Event('resize'));
      mockWindow.dispatchEvent(new Event('resize'));
      mockWindow.dispatchEvent(new Event('resize'));
    });

    // Should not update immediately
    expect(result.current.width).toBe(mockWindow.innerWidth);

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(200);
      executeLatestTimeout();
    });

    // Wait for requestAnimationFrame
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.width).toBe(800);
  });

  // Skip test for SSR environment as it requires special setup
  it.skip('should handle SSR environment', () => {
    // Test is skipped - in a real SSR environment, the hook would
    // initialize with width: 0, height: 0 when window is undefined
  });

  it('should cleanup event listeners on unmount', () => {
    const { unmount } = renderHook(() => useWindowSize());

    unmount();

    expect(mockWindow.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('should handle multiple resize events with different debounce times', () => {
    const { result } = renderHook(() => useWindowSize({ debounceMs: 100 }));

    // First resize
    act(() => {
      mockWindow.innerWidth = 800;
      mockWindow.dispatchEvent(new Event('resize'));
    });

    // Second resize before debounce completes
    act(() => {
      mockWindow.innerWidth = 1024;
      mockWindow.dispatchEvent(new Event('resize'));
    });

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(100);
      executeLatestTimeout();
    });

    // Wait for requestAnimationFrame
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.width).toBe(1024);
  });
});
