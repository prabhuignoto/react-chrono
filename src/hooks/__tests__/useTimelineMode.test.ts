import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useTimelineMode } from '../useTimelineMode';

describe('useTimelineMode', () => {
  const mockUpdateHorizontalAllCards = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with the provided mode', () => {
    const { result } = renderHook(() =>
      useTimelineMode({
        initialMode: 'VERTICAL',
      }),
    );

    expect(result.current.timelineMode).toBe('VERTICAL');
  });

  it('should initialize with HORIZONTAL_ALL when showAllCardsHorizontal is true', () => {
    const { result } = renderHook(() =>
      useTimelineMode({
        initialMode: 'HORIZONTAL',
        showAllCardsHorizontal: true,
      }),
    );

    expect(result.current.timelineMode).toBe('HORIZONTAL_ALL');
  });

  it('should handle mode updates', () => {
    const { result } = renderHook(() =>
      useTimelineMode({
        initialMode: 'VERTICAL',
        updateHorizontalAllCards: mockUpdateHorizontalAllCards,
      }),
    );

    act(() => {
      result.current.handleTimelineUpdate('HORIZONTAL');
    });

    expect(result.current.timelineMode).toBe('HORIZONTAL');
    expect(mockUpdateHorizontalAllCards).toHaveBeenCalledWith(false);

    act(() => {
      result.current.handleTimelineUpdate('VERTICAL_ALTERNATING');
    });

    expect(result.current.timelineMode).toBe('VERTICAL_ALTERNATING');
  });

  it('should handle HORIZONTAL_ALL mode update', () => {
    const { result } = renderHook(() =>
      useTimelineMode({
        initialMode: 'HORIZONTAL',
        updateHorizontalAllCards: mockUpdateHorizontalAllCards,
      }),
    );

    act(() => {
      result.current.handleTimelineUpdate('HORIZONTAL_ALL');
    });

    expect(result.current.timelineMode).toBe('HORIZONTAL_ALL');
    expect(mockUpdateHorizontalAllCards).toHaveBeenCalledWith(true);
  });

  it('should maintain state between renders', () => {
    const { result, rerender } = renderHook(() =>
      useTimelineMode({
        initialMode: 'VERTICAL',
      }),
    );

    act(() => {
      result.current.handleTimelineUpdate('HORIZONTAL');
    });

    expect(result.current.timelineMode).toBe('HORIZONTAL');

    rerender();

    expect(result.current.timelineMode).toBe('HORIZONTAL');
  });

  it('should not call updateHorizontalAllCards when not provided', () => {
    const { result } = renderHook(() =>
      useTimelineMode({
        initialMode: 'HORIZONTAL',
      }),
    );

    act(() => {
      result.current.handleTimelineUpdate('HORIZONTAL_ALL');
    });

    expect(result.current.timelineMode).toBe('HORIZONTAL_ALL');
    expect(mockUpdateHorizontalAllCards).not.toHaveBeenCalled();
  });

  it('should handle all valid mode transitions', () => {
    const { result } = renderHook(() =>
      useTimelineMode({
        initialMode: 'VERTICAL',
        updateHorizontalAllCards: mockUpdateHorizontalAllCards,
      }),
    );

    const modes = [
      'VERTICAL',
      'HORIZONTAL',
      'VERTICAL_ALTERNATING',
      'HORIZONTAL_ALL',
    ];

    modes.forEach((mode) => {
      act(() => {
        result.current.handleTimelineUpdate(mode);
      });

      expect(result.current.timelineMode).toBe(mode);
    });
  });
});
