import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useStableCallback,
  useLatestRef,
  useUnmount,
  useRAFThrottle,
  detectColorFormat,
  adjustRGBOpacity,
  adjustHSLOpacity,
} from '../utils';

describe('Hook Utilities', () => {
  describe('useStableCallback', () => {
    it('should maintain stable reference', () => {
      let callbackCallCount = 0;
      const { result, rerender } = renderHook(
        ({ callback }) => useStableCallback(callback),
        {
          initialProps: {
            callback: () => {
              callbackCallCount++;
            },
          },
        },
      );

      const stableRef = result.current;

      // Update callback
      rerender({
        callback: () => {
          callbackCallCount += 2;
        },
      });

      // Reference should remain stable
      expect(result.current).toBe(stableRef);

      // But should call the new callback
      act(() => {
        result.current();
      });

      expect(callbackCallCount).toBe(2);
    });
  });

  describe('useLatestRef', () => {
    it('should keep ref updated without re-renders', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useLatestRef(value),
        { initialProps: { value: 'initial' } },
      );

      expect(result.current.current).toBe('initial');

      rerender({ value: 'updated' });
      expect(result.current.current).toBe('updated');
    });
  });

  describe('useUnmount', () => {
    it('should call cleanup on unmount', () => {
      const cleanup = vi.fn();
      const { unmount } = renderHook(() => useUnmount(cleanup));

      expect(cleanup).not.toHaveBeenCalled();

      unmount();
      expect(cleanup).toHaveBeenCalledTimes(1);
    });
  });

  describe('useRAFThrottle', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should throttle callback with RAF', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useRAFThrottle(callback));

      // Call multiple times rapidly
      act(() => {
        result.current('arg1');
        result.current('arg2');
        result.current('arg3');
      });

      expect(callback).not.toHaveBeenCalled();

      // Advance timers to trigger RAF
      act(() => {
        vi.runAllTimers();
      });

      // Should only be called once with latest args
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('arg3');
    });
  });
});

describe('Color Utilities', () => {
  describe('detectColorFormat', () => {
    it('should detect hex colors', () => {
      expect(detectColorFormat('#ffffff')).toBe('hex');
      expect(detectColorFormat('#fff')).toBe('hex');
      expect(detectColorFormat('#FF0000')).toBe('hex');
    });

    it('should detect RGB colors', () => {
      expect(detectColorFormat('rgb(255, 0, 0)')).toBe('rgb');
      expect(detectColorFormat('rgb(255,0,0)')).toBe('rgb');
    });

    it('should detect RGBA colors', () => {
      expect(detectColorFormat('rgba(255, 0, 0, 0.5)')).toBe('rgba');
      expect(detectColorFormat('rgba(255,0,0,0.5)')).toBe('rgba');
    });

    it('should detect HSL colors', () => {
      expect(detectColorFormat('hsl(0, 100%, 50%)')).toBe('hsl');
      expect(detectColorFormat('hsl(0,100%,50%)')).toBe('hsl');
    });

    it('should detect HSLA colors', () => {
      expect(detectColorFormat('hsla(0, 100%, 50%, 0.5)')).toBe('hsla');
      expect(detectColorFormat('hsla(0,100%,50%,0.5)')).toBe('hsla');
    });

    it('should return unknown for invalid colors', () => {
      expect(detectColorFormat('invalid')).toBe('unknown');
      expect(detectColorFormat('blue')).toBe('unknown');
    });
  });

  describe('adjustRGBOpacity', () => {
    it('should adjust RGB opacity', () => {
      expect(adjustRGBOpacity('rgb(255, 0, 0)', 0.5)).toBe(
        'rgba(255, 0, 0, 0.5)',
      );
      expect(adjustRGBOpacity('rgb(255,0,0)', 0.8)).toBe(
        'rgba(255, 0, 0, 0.8)',
      );
    });

    it('should adjust RGBA opacity', () => {
      expect(adjustRGBOpacity('rgba(255, 0, 0, 1)', 0.5)).toBe(
        'rgba(255, 0, 0, 0.5)',
      );
    });

    it('should return empty string for invalid input', () => {
      expect(adjustRGBOpacity('invalid', 0.5)).toBe('');
    });
  });

  describe('adjustHSLOpacity', () => {
    it('should adjust HSL opacity', () => {
      expect(adjustHSLOpacity('hsl(0, 100%, 50%)', 0.5)).toBe(
        'hsla(0, 100%, 50%, 0.5)',
      );
      expect(adjustHSLOpacity('hsl(0,100%,50%)', 0.8)).toBe(
        'hsla(0, 100%, 50%, 0.8)',
      );
    });

    it('should adjust HSLA opacity', () => {
      expect(adjustHSLOpacity('hsla(0, 100%, 50%, 1)', 0.5)).toBe(
        'hsla(0, 100%, 50%, 0.5)',
      );
    });

    it('should return empty string for invalid input', () => {
      expect(adjustHSLOpacity('invalid', 0.5)).toBe('');
    });
  });
});
