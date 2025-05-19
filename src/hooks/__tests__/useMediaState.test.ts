import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaState } from '../useMediaState';
import { MediaState } from '../../models/TimelineMediaModel';

describe('useMediaState', () => {
  const mockOnElapsed = vi.fn();
  const defaultProps = {
    slideShowActive: true,
    paused: false,
    id: 'test-id',
    onElapsed: mockOnElapsed,
  };

  beforeEach(() => {
    mockOnElapsed.mockClear();
  });

  it('should initialize with isPlaying as false', () => {
    const { result } = renderHook(() => useMediaState(defaultProps));
    expect(result.current.isPlaying).toBe(false);
  });

  it('should update isPlaying state when handleMediaState is called with playing true', () => {
    const { result } = renderHook(() => useMediaState(defaultProps));

    act(() => {
      result.current.handleMediaState({ playing: true } as MediaState);
    });
    expect(result.current.isPlaying).toBe(true);
  });

  it('should update isPlaying state when handleMediaState is called with playing false', () => {
    const { result } = renderHook(() => useMediaState(defaultProps));

    act(() => {
      result.current.handleMediaState({ playing: true } as MediaState);
    });
    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.handleMediaState({ playing: false } as MediaState);
    });
    expect(result.current.isPlaying).toBe(false);
  });

  it('should not update state when slideShowActive is false', () => {
    const { result } = renderHook(() =>
      useMediaState({ ...defaultProps, slideShowActive: false }),
    );

    act(() => {
      result.current.handleMediaState({ playing: true } as MediaState);
    });
    expect(result.current.isPlaying).toBe(false);
  });

  it('should call onElapsed when media is paused and paused prop is true', () => {
    const { result } = renderHook(() =>
      useMediaState({ ...defaultProps, paused: true }),
    );

    act(() => {
      result.current.handleMediaState({ paused: true } as MediaState);
    });
    expect(mockOnElapsed).toHaveBeenCalledWith('test-id');
  });

  it('should not call onElapsed when media is paused but paused prop is false', () => {
    const { result } = renderHook(() => useMediaState(defaultProps));

    act(() => {
      result.current.handleMediaState({ paused: true } as MediaState);
    });
    expect(mockOnElapsed).not.toHaveBeenCalled();
  });

  it('should not call onElapsed when id is not provided', () => {
    const { result } = renderHook(() =>
      useMediaState({ ...defaultProps, id: undefined }),
    );

    act(() => {
      result.current.handleMediaState({ paused: true } as MediaState);
    });
    expect(mockOnElapsed).not.toHaveBeenCalled();
  });

  it('should not call onElapsed when onElapsed is not provided', () => {
    const { result } = renderHook(() =>
      useMediaState({ ...defaultProps, onElapsed: undefined }),
    );

    act(() => {
      result.current.handleMediaState({ paused: true } as MediaState);
    });
    expect(mockOnElapsed).not.toHaveBeenCalled();
  });

  it('should set isPlaying to false when cleanup is called', () => {
    const { result } = renderHook(() => useMediaState(defaultProps));

    act(() => {
      result.current.handleMediaState({ playing: true } as MediaState);
    });
    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.cleanup();
    });
    expect(result.current.isPlaying).toBe(false);
  });
});
