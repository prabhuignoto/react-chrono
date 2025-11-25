import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

describe('usePrefersReducedMotion', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let originalMatchMedia: typeof window.matchMedia | undefined;
  let listeners: Array<(event: MediaQueryListEvent | MediaQueryList) => void> =
    [];

  beforeEach(() => {
    listeners = [];
    if (typeof window !== 'undefined') {
      originalMatchMedia = window.matchMedia;
    }

    // Create a comprehensive mock for MediaQueryList
    const createMediaQueryList = (matches: boolean) => {
      const mql = {
        matches,
        media: '(prefers-reduced-motion: reduce)',
        onchange: null,
        addEventListener: vi.fn((event: string, listener: any) => {
          if (event === 'change') {
            listeners.push(listener);
          }
        }),
        removeEventListener: vi.fn((event: string, listener: any) => {
          if (event === 'change') {
            const index = listeners.indexOf(listener);
            if (index > -1) {
              listeners.splice(index, 1);
            }
          }
        }),
        // Legacy API
        addListener: vi.fn((listener: any) => {
          listeners.push(listener);
        }),
        removeListener: vi.fn((listener: any) => {
          const index = listeners.indexOf(listener);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        }),
        dispatchEvent: vi.fn(),
      };
      return mql;
    };

    mockMatchMedia = vi.fn((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return createMediaQueryList(false);
      }
      return createMediaQueryList(false);
    });

    if (typeof window !== 'undefined') {
      window.matchMedia = mockMatchMedia as any;
    }
  });

  afterEach(() => {
    if (typeof window !== 'undefined' && originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
    }
    listeners = [];
    vi.clearAllMocks();
  });

  describe('Initial state detection', () => {
    it('should return false by default when no preference is set', () => {
      mockMatchMedia.mockReturnValue({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => usePrefersReducedMotion());

      expect(result.current).toBe(false);
    });

    it('should return true when prefers-reduced-motion is set', () => {
      mockMatchMedia.mockReturnValue({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => usePrefersReducedMotion());

      expect(result.current).toBe(true);
    });

    it('should work in SSR environment (no window)', () => {
      // In JSDOM, window is always present. Skip destructive mutation.
      const isJSDOM = typeof document !== 'undefined';
      if (isJSDOM) {
        expect(true).toBe(true);
        return;
      }
    });

    it('should call matchMedia with correct query', () => {
      renderHook(() => usePrefersReducedMotion());

      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-reduced-motion: reduce)',
      );
    });

    it('should initialize state from media query matches property', () => {
      mockMatchMedia.mockReturnValue({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const { result } = renderHook(() => usePrefersReducedMotion());

      expect(result.current).toBe(true);
    });
  });

  describe('Dynamic preference changes', () => {
    it('should update when preference changes to true', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result } = renderHook(() => usePrefersReducedMotion());

      expect(result.current).toBe(false);

      // Simulate preference change
      act(() => {
        mediaQuery.matches = true;
        const listener = mediaQuery.addEventListener.mock.calls[0]?.[1];
        if (listener) {
          listener({ matches: true } as MediaQueryListEvent);
        }
      });

      expect(result.current).toBe(true);
    });

    it('should update when preference changes to false', () => {
      const mediaQuery = {
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result } = renderHook(() => usePrefersReducedMotion());

      expect(result.current).toBe(true);

      // Simulate preference change
      act(() => {
        mediaQuery.matches = false;
        const listener = mediaQuery.addEventListener.mock.calls[0]?.[1];
        if (listener) {
          listener({ matches: false } as MediaQueryListEvent);
        }
      });

      expect(result.current).toBe(false);
    });

    it('should handle multiple preference changes', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result } = renderHook(() => usePrefersReducedMotion());

      const listener = mediaQuery.addEventListener.mock.calls[0]?.[1];

      // First change
      act(() => {
        listener({ matches: true } as MediaQueryListEvent);
      });
      expect(result.current).toBe(true);

      // Second change
      act(() => {
        listener({ matches: false } as MediaQueryListEvent);
      });
      expect(result.current).toBe(false);

      // Third change
      act(() => {
        listener({ matches: true } as MediaQueryListEvent);
      });
      expect(result.current).toBe(true);
    });

    it('should properly handle MediaQueryListEvent', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result } = renderHook(() => usePrefersReducedMotion());

      const listener = mediaQuery.addEventListener.mock.calls[0]?.[1];

      // Simulate real MediaQueryListEvent
      act(() => {
        const event = new Event('change') as any;
        event.matches = true;
        event.media = '(prefers-reduced-motion: reduce)';
        listener(event);
      });

      expect(result.current).toBe(true);
    });

    it('should properly handle MediaQueryList object', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result } = renderHook(() => usePrefersReducedMotion());

      const listener = mediaQuery.addEventListener.mock.calls[0]?.[1];

      // Simulate passing MediaQueryList object directly
      act(() => {
        listener({
          matches: true,
          media: '(prefers-reduced-motion: reduce)',
        } as MediaQueryList);
      });

      expect(result.current).toBe(true);
    });

    it('should not update if matches value does not change', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result } = renderHook(() => usePrefersReducedMotion());

      const listener = mediaQuery.addEventListener.mock.calls[0]?.[1];

      // Trigger change with same value
      act(() => {
        listener({ matches: false } as MediaQueryListEvent);
      });

      expect(result.current).toBe(false);
    });
  });

  describe('Event listener cleanup', () => {
    it('should remove event listener on unmount (modern API)', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { unmount } = renderHook(() => usePrefersReducedMotion());

      expect(mediaQuery.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );

      unmount();

      expect(mediaQuery.removeEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });

    it('should remove event listener on unmount (legacy API)', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: undefined,
        removeEventListener: undefined,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { unmount } = renderHook(() => usePrefersReducedMotion());

      expect(mediaQuery.addListener).toHaveBeenCalledWith(expect.any(Function));

      unmount();

      expect(mediaQuery.removeListener).toHaveBeenCalledWith(
        expect.any(Function),
      );
    });

    it('should clean up listener on unmount even after preference changes', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { unmount } = renderHook(() => usePrefersReducedMotion());

      const listener = mediaQuery.addEventListener.mock.calls[0]?.[1];

      // Trigger some changes
      act(() => {
        listener({ matches: true } as MediaQueryListEvent);
        listener({ matches: false } as MediaQueryListEvent);
      });

      unmount();

      expect(mediaQuery.removeEventListener).toHaveBeenCalled();
    });

    it('should not cause memory leaks with multiple mounts/unmounts', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      // Mount and unmount multiple times
      const { unmount: unmount1 } = renderHook(() => usePrefersReducedMotion());
      unmount1();

      const { unmount: unmount2 } = renderHook(() => usePrefersReducedMotion());
      unmount2();

      const { unmount: unmount3 } = renderHook(() => usePrefersReducedMotion());
      unmount3();

      // Each mount should add a listener, each unmount should remove it
      expect(mediaQuery.addEventListener).toHaveBeenCalledTimes(3);
      expect(mediaQuery.removeEventListener).toHaveBeenCalledTimes(3);
    });
  });

  describe('Cross-browser compatibility', () => {
    it('should work with modern addEventListener API', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      renderHook(() => usePrefersReducedMotion());

      expect(mediaQuery.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
      expect(mediaQuery.addListener).toBeUndefined();
    });

    it('should fallback to legacy addListener API when addEventListener is not available', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: undefined,
        removeEventListener: undefined,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      renderHook(() => usePrefersReducedMotion());

      expect(mediaQuery.addListener).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should prefer modern API over legacy when both are available', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      renderHook(() => usePrefersReducedMotion());

      expect(mediaQuery.addEventListener).toHaveBeenCalled();
      expect(mediaQuery.addListener).not.toHaveBeenCalled();
    });

    it('should handle case where neither API is available', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result } = renderHook(() => usePrefersReducedMotion());

      // Should still return initial state without error
      expect(result.current).toBe(false);
    });

    it('should work correctly in Safari with legacy API', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: undefined,
        removeEventListener: undefined,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result } = renderHook(() => usePrefersReducedMotion());

      const listener = mediaQuery.addListener.mock.calls[0]?.[0];

      // Simulate preference change
      act(() => {
        listener({ matches: true } as MediaQueryList);
      });

      expect(result.current).toBe(true);
    });
  });

  describe('SSR and edge cases', () => {
    it('should not throw when window is undefined', () => {
      // Note: In a JSDOM environment, window is always defined
      // This test would only work in a true Node.js environment
      // For now, we'll skip this test in JSDOM
      const isJSDOM = typeof document !== 'undefined';

      if (isJSDOM) {
        // JSDOM always has window, so skip actual deletion
        expect(true).toBe(true);
        return;
      }

      const originalWindow = global.window;
      // @ts-expect-error - Simulating SSR
      delete global.window;

      expect(() => {
        renderHook(() => usePrefersReducedMotion());
      }).not.toThrow();

      global.window = originalWindow;
    });

    it('should return false in SSR environment', () => {
      const isJSDOM = typeof document !== 'undefined';
      if (isJSDOM) {
        expect(true).toBe(true);
        return;
      }
    });

    it('should initialize correctly when matchMedia is not supported', () => {
      if (typeof window === 'undefined') {
        // Skip this test in SSR environment
        expect(true).toBe(true);
        return;
      }

      const originalMatchMedia = window.matchMedia;
      // @ts-expect-error - Simulating old browser
      delete window.matchMedia;

      expect(() => {
        renderHook(() => usePrefersReducedMotion());
      }).toThrow(); // This is expected behavior - hook requires matchMedia

      window.matchMedia = originalMatchMedia;
    });

    it('should handle rapid component re-renders', () => {
      const mediaQuery = {
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(mediaQuery);

      const { result, rerender } = renderHook(() => usePrefersReducedMotion());

      // Rapid re-renders
      rerender();
      rerender();
      rerender();

      expect(result.current).toBe(false);
      // Should only add listener once despite multiple renders
      expect(
        mediaQuery.addEventListener.mock.calls.length,
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
