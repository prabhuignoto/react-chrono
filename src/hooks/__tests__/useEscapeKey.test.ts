import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useEscapeKey from '../useEscapeKey';

describe('useEscapeKey', () => {
  let mockCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCallback = vi.fn();
  });

  it('should call callback when Escape key is pressed', () => {
    renderHook(() => useEscapeKey(mockCallback));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Escape', keyCode: 27 });
      document.dispatchEvent(event);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when a different key is pressed', () => {
    renderHook(() => useEscapeKey(mockCallback));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13 });
      document.dispatchEvent(event);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should work with custom key option', () => {
    renderHook(() => useEscapeKey(mockCallback, { key: 'Enter' }));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13 });
      document.dispatchEvent(event);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should work with custom keyCode option', () => {
    renderHook(() => useEscapeKey(mockCallback, { keyCode: 13 }));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13 });
      document.dispatchEvent(event);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should work with keydown event type', () => {
    renderHook(() => useEscapeKey(mockCallback, { eventType: 'keydown' }));

    act(() => {
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
      });
      document.dispatchEvent(event);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when disabled', () => {
    renderHook(() => useEscapeKey(mockCallback, { enabled: false }));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Escape', keyCode: 27 });
      document.dispatchEvent(event);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should update callback when it changes', () => {
    const { rerender } = renderHook(({ callback }) => useEscapeKey(callback), {
      initialProps: { callback: mockCallback },
    });

    const newCallback = vi.fn();
    rerender({ callback: newCallback });

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Escape', keyCode: 27 });
      document.dispatchEvent(event);
    });

    expect(mockCallback).not.toHaveBeenCalled();
    expect(newCallback).toHaveBeenCalledTimes(1);
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useEscapeKey(mockCallback));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });
});
