import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useCloseClickOutside from '../useCloseClickOutside';
import useOutsideClick from '../../../hooks/useOutsideClick';
import useEscapeKey from '../../../hooks/useEscapeKey';

// Mock the imported hooks
vi.mock('../../../hooks/useOutsideClick');
vi.mock('../../../hooks/useEscapeKey');

describe('useCloseClickOutside', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useOutsideClick).mockImplementation(() => {});
    vi.mocked(useEscapeKey).mockImplementation(() => {});
  });

  it('initializes both hooks with correct parameters', () => {
    const callback = vi.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useCloseClickOutside(ref, callback));

    expect(useOutsideClick).toHaveBeenCalledWith(ref, callback);
    expect(useEscapeKey).toHaveBeenCalledWith(callback);
  });

  it('passes updated callback to both hooks when callback changes', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const ref = { current: document.createElement('div') };

    const { rerender } = renderHook(({ cb }) => useCloseClickOutside(ref, cb), {
      initialProps: { cb: callback1 },
    });

    expect(useOutsideClick).toHaveBeenLastCalledWith(ref, callback1);
    expect(useEscapeKey).toHaveBeenLastCalledWith(callback1);

    rerender({ cb: callback2 });

    expect(useOutsideClick).toHaveBeenLastCalledWith(ref, callback2);
    expect(useEscapeKey).toHaveBeenLastCalledWith(callback2);
  });

  it('passes updated ref to useOutsideClick when ref changes', () => {
    const callback = vi.fn();
    const ref1 = { current: document.createElement('div') };
    const ref2 = { current: document.createElement('div') };

    const { rerender } = renderHook(
      ({ r }) => useCloseClickOutside(r, callback),
      { initialProps: { r: ref1 } },
    );

    expect(useOutsideClick).toHaveBeenLastCalledWith(ref1, callback);

    rerender({ r: ref2 });

    expect(useOutsideClick).toHaveBeenLastCalledWith(ref2, callback);
  });

  it('handles null ref correctly', () => {
    const callback = vi.fn();
    const nullRef = { current: null };

    renderHook(() => useCloseClickOutside(nullRef, callback));

    expect(useOutsideClick).toHaveBeenCalledWith(nullRef, callback);
    expect(useEscapeKey).toHaveBeenCalledWith(callback);
  });

  it('handles undefined ref correctly', () => {
    const callback = vi.fn();
    const undefinedRef = { current: undefined };

    renderHook(() => useCloseClickOutside(undefinedRef, callback));

    expect(useOutsideClick).toHaveBeenCalledWith(undefinedRef, callback);
    expect(useEscapeKey).toHaveBeenCalledWith(callback);
  });
});
