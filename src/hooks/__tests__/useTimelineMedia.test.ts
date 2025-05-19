import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTimelineMedia } from '../useTimelineMedia';

// Mock utility functions
vi.mock('../../utils/timelineUtils', () => ({
  toggleMediaVisibility: vi.fn(),
  pauseVideoEmbeds: vi.fn(),
}));
import {
  toggleMediaVisibility,
  pauseVideoEmbeds,
} from '../../utils/timelineUtils';

// Mock IntersectionObserver
const observeSpy = vi.fn();
const disconnectSpy = vi.fn();
let intersectionCallback: (entries: any[]) => void;

class MockIntersectionObserver {
  observe = observeSpy;
  disconnect = disconnectSpy;
  constructor(callback: (entries: any[]) => void) {
    intersectionCallback = callback;
  }
}

// Mock requestAnimationFrame
const rafSpy = vi.fn((cb) => cb());

describe('useTimelineMedia', () => {
  let originalIntersectionObserver: any;
  let originalRAF: any;
  let timelineMainRef: any;
  let verticalItem1: HTMLDivElement;
  let verticalItem2: HTMLDivElement;

  beforeEach(() => {
    // Save originals
    originalIntersectionObserver = global.IntersectionObserver;
    originalRAF = global.requestAnimationFrame;
    // Mock
    global.IntersectionObserver = MockIntersectionObserver as any;
    global.requestAnimationFrame = rafSpy;
    // Setup DOM
    timelineMainRef = { current: document.createElement('div') };
    verticalItem1 = document.createElement('div');
    verticalItem2 = document.createElement('div');
    verticalItem1.className = 'vertical-item-row';
    verticalItem2.className = 'vertical-item-row';
    timelineMainRef.current.appendChild(verticalItem1);
    timelineMainRef.current.appendChild(verticalItem2);
    // Clear mocks
    vi.clearAllMocks();
    observeSpy.mockClear();
    disconnectSpy.mockClear();
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
    global.requestAnimationFrame = originalRAF;
    vi.clearAllMocks();
  });

  it('does not create observer if mode is HORIZONTAL', () => {
    renderHook(() => useTimelineMedia({ mode: 'HORIZONTAL', timelineMainRef }));
    expect(intersectionCallback).toBeUndefined();
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it('creates observer and observes vertical-item-row children if mode is not HORIZONTAL', () => {
    renderHook(() => useTimelineMedia({ mode: 'VERTICAL', timelineMainRef }));
    expect(intersectionCallback).toBeTypeOf('function');
    expect(rafSpy).toHaveBeenCalled();
    expect(observeSpy).toHaveBeenCalledTimes(2);
    expect(observeSpy).toHaveBeenCalledWith(verticalItem1);
    expect(observeSpy).toHaveBeenCalledWith(verticalItem2);
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() =>
      useTimelineMedia({ mode: 'VERTICAL', timelineMainRef }),
    );
    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('handles intersection changes correctly', () => {
    renderHook(() => useTimelineMedia({ mode: 'VERTICAL', timelineMainRef }));

    // First simulate both items becoming visible
    intersectionCallback([
      { target: verticalItem1, isIntersecting: true },
      { target: verticalItem2, isIntersecting: true },
    ]);

    expect(toggleMediaVisibility).toHaveBeenCalledWith(verticalItem1, true);
    expect(toggleMediaVisibility).toHaveBeenCalledWith(verticalItem2, true);

    // Clear the mocks for the next test
    vi.clearAllMocks();

    // Then simulate items going out of view
    intersectionCallback([
      { target: verticalItem1, isIntersecting: false },
      { target: verticalItem2, isIntersecting: false },
    ]);

    expect(toggleMediaVisibility).toHaveBeenCalledWith(verticalItem1, false);
    expect(toggleMediaVisibility).toHaveBeenCalledWith(verticalItem2, false);
    expect(pauseVideoEmbeds).toHaveBeenCalledWith(verticalItem1);
    expect(pauseVideoEmbeds).toHaveBeenCalledWith(verticalItem2);
  });
});
