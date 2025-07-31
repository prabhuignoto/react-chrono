import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimelineKeyboardNavigation } from '../useTimelineKeyboardNavigation';

describe('useTimelineKeyboardNavigation', () => {
  const mockHandlers = {
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    onFirst: vi.fn(),
    onLast: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle arrow keys in vertical mode', () => {
    const { result } = renderHook(() =>
      useTimelineKeyboardNavigation({
        mode: 'VERTICAL',
        hasFocus: true,
        flipLayout: false,
        ...mockHandlers,
      })
    );

    const mockEvent = {
      key: 'ArrowDown',
      preventDefault: vi.fn(),
    } as any;

    act(() => {
      result.current.handleKeySelection(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockHandlers.onNext).toHaveBeenCalled();
  });

  it('should handle arrow keys in horizontal mode', () => {
    const { result } = renderHook(() =>
      useTimelineKeyboardNavigation({
        mode: 'HORIZONTAL',
        hasFocus: true,
        flipLayout: false,
        ...mockHandlers,
      })
    );

    const mockEvent = {
      key: 'ArrowRight',
      preventDefault: vi.fn(),
    } as any;

    act(() => {
      result.current.handleKeySelection(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockHandlers.onNext).toHaveBeenCalled();
  });

  it('should handle flip layout in horizontal mode', () => {
    const { result } = renderHook(() =>
      useTimelineKeyboardNavigation({
        mode: 'HORIZONTAL',
        hasFocus: true,
        flipLayout: true,
        ...mockHandlers,
      })
    );

    const mockEvent = {
      key: 'ArrowRight',
      preventDefault: vi.fn(),
    } as any;

    act(() => {
      result.current.handleKeySelection(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockHandlers.onPrevious).toHaveBeenCalled();
  });

  it('should handle Home and End keys', () => {
    const { result } = renderHook(() =>
      useTimelineKeyboardNavigation({
        mode: 'VERTICAL',
        hasFocus: true,
        flipLayout: false,
        ...mockHandlers,
      })
    );

    // Test Home key
    const homeEvent = {
      key: 'Home',
      preventDefault: vi.fn(),
    } as any;

    act(() => {
      result.current.handleKeySelection(homeEvent);
    });

    expect(homeEvent.preventDefault).toHaveBeenCalled();
    expect(mockHandlers.onFirst).toHaveBeenCalled();

    // Test End key
    const endEvent = {
      key: 'End',
      preventDefault: vi.fn(),
    } as any;

    act(() => {
      result.current.handleKeySelection(endEvent);
    });

    expect(endEvent.preventDefault).toHaveBeenCalled();
    expect(mockHandlers.onLast).toHaveBeenCalled();
  });

  it('should not handle keys when not focused', () => {
    const { result } = renderHook(() =>
      useTimelineKeyboardNavigation({
        mode: 'VERTICAL',
        hasFocus: false,
        flipLayout: false,
        ...mockHandlers,
      })
    );

    const mockEvent = {
      key: 'ArrowDown',
      preventDefault: vi.fn(),
    } as any;

    act(() => {
      result.current.handleKeySelection(mockEvent);
    });

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    expect(mockHandlers.onNext).not.toHaveBeenCalled();
  });
});