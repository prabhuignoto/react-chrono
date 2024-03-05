// useCloseClickOutside.test.ts

import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useCloseClickOutside from '../useCloseClickOutside';

describe('useCloseClickOutside', () => {
  it('calls the callback when clicking outside', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useCloseClickOutside(
        { current: document.createElement('div') },
        callback,
      ),
    );

    document.body.click();

    expect(callback).toHaveBeenCalled();
  });

  it('does not call the callback when clicking inside', () => {
    const callback = vi.fn();
    const div = document.createElement('div');
    const { result } = renderHook(() =>
      useCloseClickOutside({ current: div }, callback),
    );

    div.click();

    expect(callback).not.toHaveBeenCalled();
  });

  // Additional test cases

  it('handles missing ref', () => {
    const callback = vi.fn();

    renderHook(() => useCloseClickOutside({ current: null }, callback));

    document.body.click();

    expect(callback).not.toHaveBeenCalled();
  });

  it('cleans up event listener on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() =>
      useCloseClickOutside(
        { current: document.createElement('div') },
        callback,
      ),
    );

    unmount();

    document.body.click();

    expect(callback).not.toHaveBeenCalled();
  });
});
