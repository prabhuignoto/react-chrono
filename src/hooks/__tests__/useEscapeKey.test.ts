import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useEscapeKey, { useKeyHandler } from '../useEscapeKey';

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
    renderHook(() => useEscapeKey(mockCallback, { keys: 'Enter' }));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13 });
      document.dispatchEvent(event);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should work with custom keyCode option', () => {
    renderHook(() => useEscapeKey(mockCallback, { keyCodes: 13 }));

    act(() => {
      // Create event with keyCode for fallback testing
      const event = new KeyboardEvent('keyup', {
        key: 'Enter',
      });
      // Manually set keyCode for testing fallback behavior
      Object.defineProperty(event, 'keyCode', { value: 13 });
      Object.defineProperty(event, 'key', { value: undefined });
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

describe('useKeyHandler', () => {
  let mockCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCallback = vi.fn();
  });

  it('should handle multiple keys', () => {
    renderHook(() => useKeyHandler(mockCallback, { keys: ['Escape', 'Enter'] }));

    act(() => {
      const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
    });

    act(() => {
      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      document.dispatchEvent(enterEvent);
    });

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('should handle modifier keys', () => {
    renderHook(() => 
      useKeyHandler(mockCallback, { 
        keys: 'Enter', 
        ctrlKey: true 
      })
    );

    // Without ctrl key - should not trigger
    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      document.dispatchEvent(event);
    });

    expect(mockCallback).not.toHaveBeenCalled();

    // With ctrl key - should trigger
    act(() => {
      const event = new KeyboardEvent('keyup', { 
        key: 'Enter', 
        ctrlKey: true 
      });
      document.dispatchEvent(event);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(expect.any(KeyboardEvent));
  });

  it('should handle preventDefault and stopPropagation options', () => {
    renderHook(() => 
      useKeyHandler(mockCallback, { 
        keys: 'Escape',
        preventDefault: true,
        stopPropagation: true
      })
    );

    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    act(() => {
      document.dispatchEvent(event);
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledWith(event);
  });

  it('should work with keyCodes fallback', () => {
    renderHook(() => 
      useKeyHandler(mockCallback, { 
        keys: 'Enter', 
        keyCodes: 13 
      })
    );

    act(() => {
      // Create event with keyCode for fallback testing
      const event = new KeyboardEvent('keyup', {
        key: 'Enter',
      });
      // Manually set keyCode for testing fallback behavior
      Object.defineProperty(event, 'keyCode', { value: 13 });
      Object.defineProperty(event, 'key', { value: undefined });
      document.dispatchEvent(event);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should handle disabled state', () => {
    renderHook(() => 
      useKeyHandler(mockCallback, { 
        keys: 'Escape',
        enabled: false
      })
    );

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Escape' });
      document.dispatchEvent(event);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
