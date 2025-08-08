import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMeasure, useMeasureHeight } from '../useMeasureHeight';

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  cb(0);
  return 0;
});

describe('useMeasure', () => {
  let mockElement: HTMLElement;
  let mockCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockElement = {
      clientHeight: 100,
      clientWidth: 200,
      scrollHeight: 150,
      scrollWidth: 250,
      offsetHeight: 110,
      offsetWidth: 210,
    } as any;
    mockCallback = vi.fn();
    vi.clearAllMocks();
  });

  it('should measure element height by default', () => {
    const { result } = renderHook(() => useMeasure(mockCallback));

    act(() => {
      result.current(mockElement);
    });

    expect(mockCallback).toHaveBeenCalledWith({
      value: 100,
      element: mockElement,
    });
  });

  it('should measure different properties', () => {
    const { result } = renderHook(() =>
      useMeasure(mockCallback, { property: 'clientWidth' }),
    );

    act(() => {
      result.current(mockElement);
    });

    expect(mockCallback).toHaveBeenCalledWith({
      value: 200,
      element: mockElement,
    });
  });

  it('should handle scroll dimensions', () => {
    const { result } = renderHook(() =>
      useMeasure(mockCallback, { property: 'scrollHeight' }),
    );

    act(() => {
      result.current(mockElement);
    });

    expect(mockCallback).toHaveBeenCalledWith({
      value: 150,
      element: mockElement,
    });
  });

  it('should handle offset dimensions', () => {
    const { result } = renderHook(() =>
      useMeasure(mockCallback, { property: 'offsetWidth' }),
    );

    act(() => {
      result.current(mockElement);
    });

    expect(mockCallback).toHaveBeenCalledWith({
      value: 210,
      element: mockElement,
    });
  });

  it('should handle null element gracefully', () => {
    const { result } = renderHook(() => useMeasure(mockCallback));

    act(() => {
      result.current(null);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should handle missing callback gracefully', () => {
    const { result } = renderHook(() => useMeasure());

    act(() => {
      result.current(mockElement);
    });

    // Should not throw an error
    expect(true).toBe(true);
  });

  it('should handle measurement with delay', async () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useMeasure(mockCallback, { delay: 10 }),
    );

    act(() => {
      result.current(mockElement);
    });

    // Should not be called immediately
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time to trigger the delayed measurement
    act(() => {
      vi.advanceTimersByTime(20);
    });

    expect(mockCallback).toHaveBeenCalledWith({
      value: 100,
      element: mockElement,
    });

    vi.useRealTimers();
  });

  it('should handle measurement errors', () => {
    const errorCallback = vi.fn();
    const brokenElement = {
      get clientHeight() {
        throw new Error('Property access failed');
      },
    } as HTMLElement;

    const { result } = renderHook(() =>
      useMeasure(mockCallback, { onError: errorCallback }),
    );

    act(() => {
      result.current(brokenElement);
    });

    expect(errorCallback).toHaveBeenCalledWith(expect.any(Error));
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should log errors in development when no error callback', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const brokenElement = {
      get clientHeight() {
        throw new Error('Property access failed');
      },
    } as HTMLElement;
    const { result } = renderHook(() => useMeasure(mockCallback));

    act(() => {
      result.current(brokenElement);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to measure clientHeight:',
      expect.any(Error),
    );

    process.env.NODE_ENV = originalEnv;
    consoleSpy.mockRestore();
  });
});

describe('useMeasureHeight (legacy)', () => {
  let mockElement: HTMLDivElement;
  let mockCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockElement = {
      clientHeight: 150,
    } as any;
    mockCallback = vi.fn();
    vi.clearAllMocks();
  });

  it('should measure height and call callback with just the value', () => {
    const { result } = renderHook(() => useMeasureHeight(mockCallback));

    act(() => {
      result.current(mockElement);
    });

    expect(mockCallback).toHaveBeenCalledWith(150);
  });

  it('should handle null element gracefully', () => {
    const { result } = renderHook(() => useMeasureHeight(mockCallback));

    act(() => {
      result.current(null);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should handle missing callback gracefully', () => {
    const { result } = renderHook(() => useMeasureHeight());

    act(() => {
      result.current(mockElement);
    });

    // Should not throw an error
    expect(true).toBe(true);
  });
});
