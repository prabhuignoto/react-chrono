import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useCloseClickOutside from '../useCloseClickOutside';

describe('useCloseClickOutside', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls the callback when clicking outside', () => {
    const callback = vi.fn();
    const div = document.createElement('div');
    renderHook(() => useCloseClickOutside({ current: div }, callback));

    document.body.click();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback when clicking inside', () => {
    const callback = vi.fn();
    const div = document.createElement('div');
    renderHook(() => useCloseClickOutside({ current: div }, callback));

    div.click();

    expect(callback).not.toHaveBeenCalled();
  });

  it('handles missing ref', () => {
    const callback = vi.fn();
    renderHook(() => useCloseClickOutside({ current: null }, callback));

    document.body.click();

    expect(callback).not.toHaveBeenCalled();
  });

  it('calls callback when escape key is pressed', () => {
    const callback = vi.fn();
    const div = document.createElement('div');
    renderHook(() => useCloseClickOutside({ current: div }, callback));

    div.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback for non-escape keys', () => {
    const callback = vi.fn();
    const div = document.createElement('div');
    renderHook(() => useCloseClickOutside({ current: div }, callback));

    div.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

    expect(callback).not.toHaveBeenCalled();
  });

  it('properly cleans up all event listeners on unmount', () => {
    const callback = vi.fn();
    const div = document.createElement('div');
    const { unmount } = renderHook(() =>
      useCloseClickOutside({ current: div }, callback),
    );

    unmount();
    document.body.click();
    div.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));

    expect(callback).not.toHaveBeenCalled();
  });

  it('handles callback updates correctly', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const div = document.createElement('div');
    const { rerender } = renderHook(
      ({ cb }) => useCloseClickOutside({ current: div }, cb),
      { initialProps: { cb: callback1 } }
    );

    rerender({ cb: callback2 });
    document.body.click();

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
