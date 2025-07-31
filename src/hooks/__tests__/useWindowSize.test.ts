// Mock window before importing the hook - use vi.stubGlobal for proper mocking
vi.stubGlobal('window', {
  innerWidth: 1024,
  innerHeight: 768,
  outerWidth: 1040,
  outerHeight: 800,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  setTimeout: vi.fn((cb) => setTimeout(cb, 0)),
  clearTimeout: vi.fn(),
  requestAnimationFrame: vi.fn((cb) => {
    cb(performance.now());
    return 1;
  }),
  cancelAnimationFrame: vi.fn(),
});

// Mock document for clientWidth/clientHeight
vi.stubGlobal('document', {
  documentElement: {
    clientWidth: 1024,
    clientHeight: 768,
  },
  body: document.body, // Use real body for testing library
  createElement: document.createElement.bind(document),
  createTextNode: document.createTextNode.bind(document),
  querySelector: document.querySelector.bind(document),
  querySelectorAll: document.querySelectorAll.bind(document),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
});

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useWindowSize } from '../useWindowSize';

describe('useWindowSize', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Reset mock values to defaults
    window.innerWidth = 1024;
    window.innerHeight = 768;
    window.outerWidth = 1040;
    window.outerHeight = 800;
    document.documentElement.clientWidth = 1024;
    document.documentElement.clientHeight = 768;
    
    // Reset mock implementations
    vi.mocked(window.addEventListener).mockClear();
    vi.mocked(window.removeEventListener).mockClear();
    vi.mocked(window.dispatchEvent).mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with current window dimensions', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
    expect(result.current.innerWidth).toBe(1024);
    expect(result.current.innerHeight).toBe(768);
    expect(result.current.outerWidth).toBe(1040);
    expect(result.current.outerHeight).toBe(800);
    expect(result.current.scrollBarWidth).toBe(0);
    expect(result.current.scrollBarHeight).toBe(0);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.orientation).toBe('landscape');
  });

  it('should update dimensions on window resize', () => {
    const { result } = renderHook(() => useWindowSize());

    // Mock window resize
    window.innerWidth = 800;
    window.innerHeight = 600;
    document.documentElement.clientWidth = 800;
    document.documentElement.clientHeight = 600;

    // Trigger resize event
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    // Wait for debounce and animation frame
    act(() => {
      vi.advanceTimersByTime(200); // Advance past debounce time
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  it('should debounce resize events', () => {
    const { result } = renderHook(() => useWindowSize({ debounceMs: 200 }));

    // Should not update immediately
    expect(result.current.width).toBe(1024); // Initial value

    // Mock window resize
    act(() => {
      window.innerWidth = 800;
      document.documentElement.clientWidth = 800;
      
      // Trigger multiple resize events
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
    });

    // Should not update immediately due to debounce
    expect(result.current.width).toBe(1024); // Initial value

    // Wait for debounce and animation frame
    act(() => {
      vi.advanceTimersByTime(250); // Advance past debounce time
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

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('should handle multiple resize events with different debounce times', () => {
    const { result } = renderHook(() => useWindowSize({ debounceMs: 100 }));

    // First resize
    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event('resize'));
    });

    // Second resize before debounce completes
    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
    });

    // Wait for debounce and animation frame
    act(() => {
      vi.advanceTimersByTime(250); // Advance past debounce time
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.isDesktop).toBe(true);
  });

  it('should detect mobile viewport', () => {
    window.innerWidth = 600;
    document.documentElement.clientWidth = 600;
    
    const { result } = renderHook(() => useWindowSize());
    
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it('should detect tablet viewport', () => {
    window.innerWidth = 900;
    document.documentElement.clientWidth = 900;
    
    const { result } = renderHook(() => useWindowSize());
    
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it('should detect portrait orientation', () => {
    window.innerWidth = 600;
    window.innerHeight = 800;
    document.documentElement.clientWidth = 600;
    document.documentElement.clientHeight = 800;
    
    const { result } = renderHook(() => useWindowSize());
    
    expect(result.current.orientation).toBe('portrait');
  });

  it('should calculate scroll bar dimensions', () => {
    window.innerWidth = 1040;
    window.innerHeight = 800;
    document.documentElement.clientWidth = 1024;
    document.documentElement.clientHeight = 768;
    
    const { result } = renderHook(() => useWindowSize());
    
    expect(result.current.scrollBarWidth).toBe(16);
    expect(result.current.scrollBarHeight).toBe(32);
  });

  it('should respect custom breakpoints', () => {
    window.innerWidth = 500;
    document.documentElement.clientWidth = 500;
    
    const { result } = renderHook(() => 
      useWindowSize({ 
        breakpoints: { mobile: 600, tablet: 1200 } 
      })
    );
    
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it('should include scroll bar in dimensions when requested', () => {
    const { result } = renderHook(() => 
      useWindowSize({ includeScrollBar: true })
    );
    
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it('should disable throttling when requested', () => {
    const { result } = renderHook(() => 
      useWindowSize({ enableThrottling: false })
    );

    // Trigger resize event with new dimensions
    act(() => {
      window.innerWidth = 800;
      document.documentElement.clientWidth = 800;
      window.dispatchEvent(new Event('resize'));
    });

    // Need to wait for RAF to complete even without throttling
    act(() => {
      vi.runAllTimers();
    });

    // Should update immediately without debounce
    expect(result.current.width).toBe(800);
  });
});
