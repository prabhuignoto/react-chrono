import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { createRef } from 'react';
import useOutsideClick from '../useOutsideClick';

describe('useOutsideClick', () => {
  let mockCallback: ReturnType<typeof vi.fn>;
  let elementRef: ReturnType<typeof createRef>;
  let mockElement: HTMLDivElement;
  let mockOutsideElement: HTMLDivElement;

  beforeEach(() => {
    // Setup mocks
    mockCallback = vi.fn();
    elementRef = createRef();

    // Create mock elements
    mockElement = document.createElement('div');
    mockOutsideElement = document.createElement('div');

    // Setup ref
    elementRef.current = mockElement;
  });

  it('should call callback when clicking outside element', () => {
    renderHook(() => useOutsideClick(elementRef, mockCallback));

    // Simulate click outside
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: mockOutsideElement });
    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when clicking inside element', () => {
    renderHook(() => useOutsideClick(elementRef, mockCallback));

    // Simulate click inside
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: mockElement });
    document.dispatchEvent(event);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should work with mousedown event type', () => {
    renderHook(() =>
      useOutsideClick(elementRef, mockCallback, { eventType: 'mousedown' }),
    );

    // Simulate mousedown outside
    const event = new MouseEvent('mousedown');
    Object.defineProperty(event, 'target', { value: mockOutsideElement });
    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should work with touchstart event type', () => {
    renderHook(() =>
      useOutsideClick(elementRef, mockCallback, { eventType: 'touchstart' }),
    );

    // Simulate touchstart outside
    const event = new TouchEvent('touchstart');
    Object.defineProperty(event, 'target', { value: mockOutsideElement });
    document.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when disabled', () => {
    renderHook(() =>
      useOutsideClick(elementRef, mockCallback, { enabled: false }),
    );

    // Simulate click outside
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: mockOutsideElement });
    document.dispatchEvent(event);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should update callback reference when callback changes', () => {
    const { rerender } = renderHook(
      ({ cb }) => useOutsideClick(elementRef, cb),
      { initialProps: { cb: mockCallback } },
    );

    // First click
    const event1 = new MouseEvent('click');
    Object.defineProperty(event1, 'target', { value: mockOutsideElement });
    document.dispatchEvent(event1);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    // Change callback
    const newCallback = vi.fn();
    rerender({ cb: newCallback });

    // Second click should trigger new callback
    const event2 = new MouseEvent('click');
    Object.defineProperty(event2, 'target', { value: mockOutsideElement });
    document.dispatchEvent(event2);
    expect(newCallback).toHaveBeenCalledTimes(1);
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() =>
      useOutsideClick(elementRef, mockCallback),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });

  it('should handle null ref correctly', () => {
    const nullRef = createRef<HTMLElement>();
    renderHook(() => useOutsideClick(nullRef, mockCallback));

    // Simulate click
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: mockOutsideElement });
    document.dispatchEvent(event);

    // Should not throw and should NOT call callback since ref is null
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should remove and add listeners when enabled state changes', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { rerender } = renderHook(
      ({ enabled }) => useOutsideClick(elementRef, mockCallback, { enabled }),
      { initialProps: { enabled: true } },
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
    );

    // Disable
    rerender({ enabled: false });
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
    );

    // Re-enable
    rerender({ enabled: true });
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
