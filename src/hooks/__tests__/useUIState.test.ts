import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useUIState } from '../useUIState';

describe('useUIState', () => {
  it('should initialize with the provided state', () => {
    const { result } = renderHook(() => useUIState<boolean>(true));

    expect(result.current.state).toBe(true);
  });

  it('should toggle boolean state', () => {
    const { result } = renderHook(() => useUIState<boolean>(true));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.state).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.state).toBe(true);
  });

  it('should set state to a specific value', () => {
    const { result } = renderHook(() => useUIState<boolean>(true));

    act(() => {
      result.current.setState(false);
    });

    expect(result.current.state).toBe(false);

    act(() => {
      result.current.setState(true);
    });

    expect(result.current.state).toBe(true);
  });

  it('should work with different initial states', () => {
    const { result: resultTrue } = renderHook(() => useUIState<boolean>(true));
    const { result: resultFalse } = renderHook(() =>
      useUIState<boolean>(false),
    );

    expect(resultTrue.current.state).toBe(true);
    expect(resultFalse.current.state).toBe(false);
  });

  it('should maintain state between renders', () => {
    const { result, rerender } = renderHook(() => useUIState<boolean>(true));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.state).toBe(false);

    rerender();

    expect(result.current.state).toBe(false);
  });
});
