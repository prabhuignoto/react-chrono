import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimelineScrolling } from '../useTimelineScrolling';

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  cb(0);
  return 0;
});

describe('useTimelineScrolling', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = {
      scrollIntoView: vi.fn(),
    } as any;
    vi.clearAllMocks();
  });

  it('should scroll element into view for vertical mode', () => {
    const { result } = renderHook(() => useTimelineScrolling());

    act(() => {
      result.current.scrollToElement(mockElement, 'VERTICAL');
    });

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  });

  it('should scroll element into view for horizontal mode', () => {
    const { result } = renderHook(() => useTimelineScrolling());

    act(() => {
      result.current.scrollToElement(mockElement, 'HORIZONTAL');
    });

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
    const elementWithoutScroll = {} as HTMLElement;
    const { result } = renderHook(() => useTimelineScrolling());

    act(() => {
      result.current.scrollToElement(elementWithoutScroll, 'VERTICAL');
    });

    // Should not throw an error
    expect(true).toBe(true);
  });

  it('should add double scroll for vertical mode', (done) => {
    const { result } = renderHook(() => useTimelineScrolling());

    act(() => {
      result.current.scrollToElement(mockElement, 'VERTICAL');
    });

    // First call should happen immediately
    expect(mockElement.scrollIntoView).toHaveBeenCalledTimes(1);

    // Second call should happen after timeout
    setTimeout(() => {
      expect(mockElement.scrollIntoView).toHaveBeenCalledTimes(2);
      done();
    }, 60);
  });
});
