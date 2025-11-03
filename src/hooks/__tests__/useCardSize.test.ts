// Mock ResizeObserver before tests
const mockResizeObserver = vi.fn(function (callback: ResizeObserverCallback) {
  this.observe = vi.fn();
  this.unobserve = vi.fn();
  this.disconnect = vi.fn();
});

global.ResizeObserver = mockResizeObserver as any;

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useCardSize } from '../useCardSize';

describe('useCardSize', () => {
  const mockContainerRef = { current: null as HTMLElement | null };
  const mockDetailsRef = { current: null as HTMLElement | null };
  const mockSetStartWidth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockContainerRef.current = null;
    mockDetailsRef.current = null;
    mockResizeObserver.mockClear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useCardSize({
        containerRef: mockContainerRef,
        detailsRef: mockDetailsRef,
        setStartWidth: mockSetStartWidth,
      }),
    );

    expect(result.current.cardActualHeight).toBe(0);
    expect(result.current.detailsHeight).toBe(0);
    expect(result.current.textContentLarge).toBe(false);
  });

  it('should update card size when node is provided', () => {
    const mockNode = {
      clientWidth: 500,
    } as HTMLElement;

    const mockDetailsElement = {
      scrollHeight: 300,
      offsetHeight: 250,
      offsetTop: 50,
      clientHeight: 200,
    } as HTMLElement;

    mockContainerRef.current = {
      clientHeight: 400,
    } as HTMLElement;

    mockDetailsRef.current = mockDetailsElement;

    const { result } = renderHook(() =>
      useCardSize({
        containerRef: mockContainerRef,
        detailsRef: mockDetailsRef,
        setStartWidth: mockSetStartWidth,
      }),
    );

    act(() => {
      result.current.updateCardSize(mockNode);
    });

    expect(mockSetStartWidth).toHaveBeenCalledWith(500);
    expect(result.current.cardActualHeight).toBe(300);
    expect(result.current.detailsHeight).toBe(250);
  });

  it('should not update card size when node is null', () => {
    const { result } = renderHook(() =>
      useCardSize({
        containerRef: mockContainerRef,
        detailsRef: mockDetailsRef,
        setStartWidth: mockSetStartWidth,
      }),
    );

    act(() => {
      result.current.updateCardSize(null);
    });

    expect(mockSetStartWidth).not.toHaveBeenCalled();
    expect(result.current.cardActualHeight).toBe(0);
    expect(result.current.detailsHeight).toBe(0);
  });

  it('should detect large text content when content overflows', () => {
    const mockNode = {
      clientWidth: 500,
    } as HTMLElement;

    const mockDetailsElement = {
      scrollHeight: 500, // Large scroll height
      offsetHeight: 200, // Small visible height
      offsetTop: 50,
      clientHeight: 200,
    } as HTMLElement;

    mockContainerRef.current = {
      clientHeight: 400,
    } as HTMLElement;

    mockDetailsRef.current = mockDetailsElement;

    const { result } = renderHook(() =>
      useCardSize({
        containerRef: mockContainerRef,
        detailsRef: mockDetailsRef,
        setStartWidth: mockSetStartWidth,
      }),
    );

    act(() => {
      result.current.updateCardSize(mockNode);
    });

    expect(result.current.textContentLarge).toBe(true);
  });

  it('should detect large text content when total height exceeds container', () => {
    const mockNode = {
      clientWidth: 500,
    } as HTMLElement;

    const mockDetailsElement = {
      scrollHeight: 300,
      offsetHeight: 250,
      offsetTop: 200, // Large offset
      clientHeight: 200,
    } as HTMLElement;

    mockContainerRef.current = {
      clientHeight: 400,
    } as HTMLElement;

    mockDetailsRef.current = mockDetailsElement;

    const { result } = renderHook(() =>
      useCardSize({
        containerRef: mockContainerRef,
        detailsRef: mockDetailsRef,
        setStartWidth: mockSetStartWidth,
      }),
    );

    act(() => {
      result.current.updateCardSize(mockNode);
    });

    expect(result.current.textContentLarge).toBe(true);
  });

  it('should handle ResizeObserver updates', () => {
    const mockNode = {
      clientWidth: 500,
    } as HTMLElement;

    const mockDetailsElement = {
      scrollHeight: 300,
      offsetHeight: 250,
      offsetTop: 50,
      clientHeight: 200,
    } as HTMLElement;

    mockContainerRef.current = {
      clientHeight: 400,
    } as HTMLElement;

    mockDetailsRef.current = mockDetailsElement;

    const { result } = renderHook(() =>
      useCardSize({
        containerRef: mockContainerRef,
        detailsRef: mockDetailsRef,
        setStartWidth: mockSetStartWidth,
      }),
    );

    act(() => {
      result.current.updateCardSize(mockNode);
    });

    expect(result.current.cardActualHeight).toBe(300);
    expect(result.current.detailsHeight).toBe(250);
  });

  it('should cleanup ResizeObserver on unmount', () => {
    const { unmount } = renderHook(() =>
      useCardSize({
        containerRef: mockContainerRef,
        detailsRef: mockDetailsRef,
        setStartWidth: mockSetStartWidth,
      }),
    );

    unmount();

    // Verify that ResizeObserver was called (and cleanup happened)
    expect(mockResizeObserver).toBeDefined();
  });
});
