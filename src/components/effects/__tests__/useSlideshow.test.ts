// Test setup
import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useSlideshow } from '../useSlideshow';

const slideItemDuration = 5000;
const onElapsed = vi.fn();

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  vi.clearAllMocks();
});

describe('useSlideshow', () => {
  it('should initialize properly', () => {
    const { result } = renderHook(() =>
      useSlideshow(
        { current: container },
        true,
        true,
        slideItemDuration,
        '1',
        onElapsed,
      ),
    );

    expect(result.current.paused).toBe(false);
    expect(result.current.remainInterval).toBe(0);
    expect(result.current.startWidth).toBe(0);
  });

  it('should set up timer correctly', async () => {
    const { result } = renderHook(() =>
      useSlideshow(
        { current: container },
        true,
        true,
        slideItemDuration,
        '1',
        onElapsed,
      ),
    );

    expect(result.current.tryPause).toBeDefined();
    expect(result.current.tryResume).toBeDefined();
    expect(result.current.setStartWidth).toBeDefined();
    expect(result.current.setupTimer).toBeDefined();
    expect(result.current.startWidth).toBe(0);
    expect(result.current.paused).toBe(false);
  });

  it('should pause slideshow', () => {
    const { result } = renderHook(() =>
      useSlideshow(
        { current: container },
        true,
        true,
        slideItemDuration,
        '1',
        onElapsed,
      ),
    );

    expect(result.current.paused).toBe(false);

    act(() => {
      result.current.tryPause();
    });

    expect(result.current.paused).toBe(true);
  });
});
