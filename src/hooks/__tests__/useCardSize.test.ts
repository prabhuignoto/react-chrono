// Mock ResizeObserver before tests
const mockResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.ResizeObserver = mockResizeObserver;

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

    // Mock ResizeObserver callback
    const resizeObserverCallback = vi.fn();
    const mockResizeObserver = vi.fn().mockImplementation((callback) => {
      resizeObserverCallback.mockImplementation(callback);
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    // Replace ResizeObserver with mock
    const originalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = mockResizeObserver;

    act(() => {
      result.current.updateCardSize(mockNode);
    });

    // Simulate resize
    act(() => {
      resizeObserverCallback([
        {
          target: mockNode,
          contentRect: { width: 600 },
        },
      ]);
    });

    // Restore ResizeObserver
    window.ResizeObserver = originalResizeObserver;

    expect(result.current.cardActualHeight).toBe(300);
    expect(result.current.detailsHeight).toBe(250);
  });

  it('should cleanup ResizeObserver on unmount', () => {
    const mockDisconnect = vi.fn();
    const mockResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: mockDisconnect,
    }));

    // Replace ResizeObserver with mock
    const originalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = mockResizeObserver;

    const { unmount } = renderHook(() =>
      useCardSize({
        containerRef: mockContainerRef,
        detailsRef: mockDetailsRef,
        setStartWidth: mockSetStartWidth,
      }),
    );

    unmount();

    // Restore ResizeObserver
    window.ResizeObserver = originalResizeObserver;

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
