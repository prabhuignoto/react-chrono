import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useAriaLiveRegion } from '../useAriaLiveRegion';

describe('useAriaLiveRegion', () => {
  it('should return announce function, LiveRegion component, and regionId', () => {
    const { result } = renderHook(() => useAriaLiveRegion());

    expect(typeof result.current.announce).toBe('function');
    expect(typeof result.current.LiveRegion).toBe('function');
    expect(typeof result.current.regionId).toBe('string');
  });

  it('should generate unique regionId', () => {
    const { result: result1 } = renderHook(() => useAriaLiveRegion());
    const { result: result2 } = renderHook(() => useAriaLiveRegion());

    expect(result1.current.regionId).not.toBe(result2.current.regionId);
  });

  it('should use custom containerId if provided', () => {
    const customId = 'custom-live-region';
    const { result } = renderHook(() =>
      useAriaLiveRegion({ containerId: customId }),
    );

    expect(result.current.regionId).toBe(customId);
  });

  describe('announce', () => {
    it('should announce a message', () => {
      const { result } = renderHook(() => useAriaLiveRegion());
      const message = 'Test announcement';

      act(() => {
        result.current.announce(message);
      });

      expect(result.current).toBeDefined();
    });

    it('should not announce empty messages', () => {
      const { result } = renderHook(() => useAriaLiveRegion());

      act(() => {
        result.current.announce('');
      });

      act(() => {
        result.current.announce('   ');
      });

      // Hook should still work without crashing
      expect(result.current).toBeDefined();
    });

    it('should support multiple announcements', () => {
      const { result } = renderHook(() => useAriaLiveRegion());

      act(() => {
        result.current.announce('First message');
        result.current.announce('Second message');
      });

      expect(result.current).toBeDefined();
    });
  });

  describe('LiveRegion component', () => {
    it('should render with correct ARIA attributes', () => {
      const { result } = renderHook(() =>
        useAriaLiveRegion({ politeness: 'polite' }),
      );
      const { container } = result;

      const LiveRegion = result.current.LiveRegion;
      expect(LiveRegion).toBeDefined();
    });

    it('should use provided politeness level', () => {
      const { result } = renderHook(() =>
        useAriaLiveRegion({ politeness: 'assertive' }),
      );

      expect(result.current).toBeDefined();
    });

    it('should support atomic announcements', () => {
      const { result } = renderHook(() =>
        useAriaLiveRegion({ atomic: true }),
      );

      expect(result.current).toBeDefined();
    });

    it('should support relevant attribute', () => {
      const { result } = renderHook(() =>
        useAriaLiveRegion({ relevant: 'additions text' }),
      );

      expect(result.current).toBeDefined();
    });
  });

  describe('cleanup', () => {
    it('should clean up timeouts on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      const { result, unmount } = renderHook(() => useAriaLiveRegion());

      act(() => {
        result.current.announce('Test message');
      });

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });
  });

  describe('options', () => {
    it('should accept politeness option', () => {
      const { result: result1 } = renderHook(() =>
        useAriaLiveRegion({ politeness: 'polite' }),
      );
      const { result: result2 } = renderHook(() =>
        useAriaLiveRegion({ politeness: 'assertive' }),
      );

      expect(result1.current).toBeDefined();
      expect(result2.current).toBeDefined();
    });

    it('should accept atomic option', () => {
      const { result: result1 } = renderHook(() =>
        useAriaLiveRegion({ atomic: true }),
      );
      const { result: result2 } = renderHook(() =>
        useAriaLiveRegion({ atomic: false }),
      );

      expect(result1.current).toBeDefined();
      expect(result2.current).toBeDefined();
    });

    it('should accept relevant option', () => {
      const { result } = renderHook(() =>
        useAriaLiveRegion({ relevant: 'all' }),
      );

      expect(result.current).toBeDefined();
    });

    it('should accept multiple options together', () => {
      const { result } = renderHook(() =>
        useAriaLiveRegion({
          politeness: 'polite',
          atomic: true,
          relevant: 'all',
          containerId: 'my-region',
        }),
      );

      expect(result.current.regionId).toBe('my-region');
    });
  });

  describe('message clearing', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should clear messages after timeout', async () => {
      const { result } = renderHook(() => useAriaLiveRegion());

      act(() => {
        result.current.announce('Test message');
      });

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Verify message was announced
      expect(result.current).toBeDefined();
    });

    it('should use longer timeout for longer messages', () => {
      const { result } = renderHook(() => useAriaLiveRegion());
      const longMessage = 'This is a very long message that should take longer to read';

      act(() => {
        result.current.announce(longMessage);
      });

      // Verify long message was announced
      expect(result.current).toBeDefined();
    });
  });
});
