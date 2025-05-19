import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useTimelineScroll } from '../useTimelineScroll';

describe('useTimelineScroll', () => {
  const mockSetNewOffset = vi.fn();
  const mockOnScrollEnd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct refs', () => {
    const { result } = renderHook(() =>
      useTimelineScroll({
        mode: 'VERTICAL',
        setNewOffset: mockSetNewOffset,
      }),
    );

    expect(result.current.timelineMainRef.current).toBeNull();
    expect(result.current.horizontalContentRef.current).toBeNull();
  });

  it('should handle scroll in vertical mode', () => {
    const { result } = renderHook(() =>
      useTimelineScroll({
        mode: 'VERTICAL',
        setNewOffset: mockSetNewOffset,
        onScrollEnd: mockOnScrollEnd,
      }),
    );

    // Test scroll offset update
    const mockElement = document.createElement('div');

    // Set necessary properties for scroll calculations
    Object.defineProperties(mockElement, {
      scrollTop: { value: 100, configurable: true, writable: true },
      clientHeight: { value: 500, configurable: true, writable: true },
      scrollHeight: { value: 1000, configurable: true, writable: true },
    });

    // Set the ref
    result.current.timelineMainRef.current = mockElement;

    // Test handleScroll
    act(() => {
      result.current.handleScroll({ scrollTop: 200 });
    });

    // Verify setNewOffset was called
    expect(mockSetNewOffset).toHaveBeenCalledWith(mockElement, {
      scrollTop: 200,
    });

    // IMPORTANT: Reset mocks before testing onScrollEnd
    vi.clearAllMocks();

    // Change scroll position to exactly trigger the end condition
    // For onScrollEnd to trigger: scrollTop + clientHeight must be very close to scrollHeight
    mockElement.scrollTop = 499.5; // With clientHeight 500, this gives 999.5, which is within 1 of scrollHeight 1000

    // Trigger scroll event that should call onScrollEnd
    act(() => {
      result.current.handleMainScroll({
        target: mockElement,
        currentTarget: mockElement,
        type: 'scroll',
      } as unknown as React.UIEvent<HTMLDivElement>);
    });

    // Verify onScrollEnd was called
    expect(mockOnScrollEnd).toHaveBeenCalledTimes(1);
  });

  it('should handle scroll in horizontal mode', () => {
    const { result } = renderHook(() =>
      useTimelineScroll({
        mode: 'HORIZONTAL',
        setNewOffset: mockSetNewOffset,
        onScrollEnd: mockOnScrollEnd,
      }),
    );

    // Mock the ref element
    const mockElement = {
      scrollLeft: 100,
      offsetWidth: 500,
      scrollWidth: 1000,
    } as HTMLDivElement;

    result.current.timelineMainRef.current = mockElement;

    act(() => {
      result.current.handleMainScroll({
        target: mockElement,
        currentTarget: mockElement,
        nativeEvent: new Event('scroll'),
        detail: 0,
        view: window,
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        timeStamp: Date.now(),
        type: 'scroll',
        isDefaultPrevented: vi.fn(),
        isPropagationStopped: vi.fn(),
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        persist: vi.fn(),
      } as unknown as React.UIEvent<HTMLDivElement>);
    });

    // Should not trigger onScrollEnd as we haven't reached the end
    expect(mockOnScrollEnd).not.toHaveBeenCalled();

    // Mock reaching the end of scroll
    Object.defineProperty(mockElement, 'scrollLeft', { value: 500 });
    Object.defineProperty(mockElement, 'offsetWidth', { value: 500 });
    Object.defineProperty(mockElement, 'scrollWidth', { value: 1000 });

    act(() => {
      result.current.handleMainScroll({
        target: mockElement,
        currentTarget: mockElement,
        nativeEvent: new Event('scroll'),
        detail: 0,
        view: window,
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        timeStamp: Date.now(),
        type: 'scroll',
        isDefaultPrevented: vi.fn(),
        isPropagationStopped: vi.fn(),
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
        persist: vi.fn(),
      } as unknown as React.UIEvent<HTMLDivElement>);
    });

    // Should trigger onScrollEnd when reaching the end
    expect(mockOnScrollEnd).toHaveBeenCalled();
  });

  it('should handle scroll with setNewOffset', () => {
    const { result } = renderHook(() =>
      useTimelineScroll({
        mode: 'VERTICAL',
        setNewOffset: mockSetNewOffset,
      }),
    );

    // Mock the ref element
    const mockElement = {
      scrollTop: 100,
      clientHeight: 500,
      scrollHeight: 1000,
    } as HTMLDivElement;

    result.current.timelineMainRef.current = mockElement;

    act(() => {
      result.current.handleScroll({ scrollTop: 200 });
    });

    expect(mockSetNewOffset).toHaveBeenCalledWith(mockElement, {
      scrollTop: 200,
    });
  });

  it('should not call setNewOffset when element is null', () => {
    const { result } = renderHook(() =>
      useTimelineScroll({
        mode: 'VERTICAL',
        setNewOffset: mockSetNewOffset,
      }),
    );

    act(() => {
      result.current.handleScroll({ scrollTop: 200 });
    });

    expect(mockSetNewOffset).not.toHaveBeenCalled();
  });
});
