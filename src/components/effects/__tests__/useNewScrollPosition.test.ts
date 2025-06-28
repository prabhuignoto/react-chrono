import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useNewScrollPosition from '../useNewScrollPosition';
import { TimelineMode } from '../../../models/TimelineModel';
import { Scroll } from '../../../models/TimelineHorizontalModel';

// Mock HTML element methods
const createMockElement = (overrides = {}) =>
  ({
    clientWidth: 800,
    clientHeight: 600,
    scrollLeft: 0,
    scrollTop: 0,
    ...overrides,
  }) as HTMLElement;

describe('useNewScrollPosition', () => {
  describe('Horizontal Mode', () => {
    it('should initialize with offset 0', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('HORIZONTAL', 200),
      );

      expect(result.current[0]).toBe(0);
      expect(typeof result.current[1]).toBe('function');
    });

    it('should compute horizontal offset when point is not visible', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('HORIZONTAL', 200),
      );

      const [newOffset, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollLeft: 100,
        clientWidth: 800,
      });

      const scroll: Partial<Scroll> = {
        pointOffset: 1000, // Far to the right, not visible
        pointWidth: 50,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      // Should set new offset to point offset - item width
      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(800); // 1000 - 200
    });

    it('should compute horizontal offset when point is partially visible on the left', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('HORIZONTAL', 200),
      );

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollLeft: 300,
        clientWidth: 800,
      });

      const scroll: Partial<Scroll> = {
        pointOffset: 250, // Partially visible on the left
        pointWidth: 100,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(0); // No offset since leftGap is negative
    });

    it('should compute horizontal offset when point is partially visible on the right', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('HORIZONTAL', 200),
      );

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollLeft: 100,
        clientWidth: 800,
      });

      const scroll: Partial<Scroll> = {
        pointOffset: 850, // Partially visible on the right
        pointWidth: 100,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(650); // 850 - 200
    });

    it('should not update offset when point is fully visible', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('HORIZONTAL', 200),
      );

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollLeft: 100,
        clientWidth: 800,
      });

      const scroll: Partial<Scroll> = {
        pointOffset: 400, // Fully visible
        pointWidth: 50,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(0); // Should remain 0, no update needed
    });

    it('should handle edge case when left gap is within item width', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('HORIZONTAL', 200),
      );

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollLeft: 300,
        clientWidth: 800,
      });

      const scroll: Partial<Scroll> = {
        pointOffset: 450, // Left gap = 150, which is < itemWidth (200)
        pointWidth: 50,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(250); // 450 - 200
    });

    it('should handle edge case when right gap is within item width', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('HORIZONTAL', 200),
      );

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollLeft: 100,
        clientWidth: 800,
      });

      const scroll: Partial<Scroll> = {
        pointOffset: 750, // Right gap = 150, which is < itemWidth (200)
        pointWidth: 50,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(550); // 750 - 200
    });
  });

  describe('Vertical Mode', () => {
    it('should compute vertical offset when content is not visible', () => {
      const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollTop: 100,
        clientHeight: 600,
      });

      const scroll: Partial<Scroll> = {
        contentOffset: 1000, // Far down, not visible
        contentHeight: 200,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(800); // 1000 - 200 (nOffset)
    });

    it('should compute vertical offset when content is partially visible', () => {
      const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollTop: 300,
        clientHeight: 600,
      });

      const scroll: Partial<Scroll> = {
        contentOffset: 850, // Partially visible
        contentHeight: 200,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(750); // 850 - 200 + 100 (half height)
    });

    it('should handle vertical content that extends beyond visible area', () => {
      const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollTop: 100,
        clientHeight: 600,
      });

      const scroll: Partial<Scroll> = {
        contentOffset: 800,
        contentHeight: 300,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(500); // 800 - 300 (since nOffset + contentHeight >= contrBottom)
    });

    it('should not update offset when content is fully visible', () => {
      const { result } = renderHook(() => useNewScrollPosition('VERTICAL'));

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollTop: 200,
        clientHeight: 600,
      });

      const scroll: Partial<Scroll> = {
        contentOffset: 400, // Fully visible
        contentHeight: 150,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(0); // Should remain 0, no update needed
    });
  });

  describe('Vertical Alternating Mode', () => {
    it('should work the same as vertical mode', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('VERTICAL_ALTERNATING'),
      );

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement({
        scrollTop: 100,
        clientHeight: 600,
      });

      const scroll: Partial<Scroll> = {
        contentOffset: 1000,
        contentHeight: 200,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(800); // Same calculation as vertical mode
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing itemWidth for horizontal mode', () => {
      const { result } = renderHook(
        () => useNewScrollPosition('HORIZONTAL'), // No itemWidth provided
      );

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement();

      const scroll: Partial<Scroll> = {
        pointOffset: 1000,
        pointWidth: 50,
      };

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(0); // Should not update without itemWidth
    });

    it('should handle undefined scroll values', () => {
      const { result } = renderHook(() =>
        useNewScrollPosition('HORIZONTAL', 200),
      );

      const [, computeNewOffset] = result.current;
      const mockElement = createMockElement();

      const scroll: Partial<Scroll> = {}; // Empty scroll object

      act(() => {
        computeNewOffset(mockElement, scroll);
      });

      const [updatedOffset] = result.current;
      expect(updatedOffset).toBe(-200); // pointOffset = 0, so 0 - 200
    });

    it('should memoize computeNewOffset function based on dependencies', () => {
      const { result, rerender } = renderHook(
        ({ mode, itemWidth }: { mode: TimelineMode; itemWidth?: number }) =>
          useNewScrollPosition(mode, itemWidth),
        {
          initialProps: { mode: 'HORIZONTAL' as TimelineMode, itemWidth: 200 },
        },
      );

      const firstComputeFunction = result.current[1];

      // Re-render with same props
      rerender({ mode: 'HORIZONTAL', itemWidth: 200 });
      const secondComputeFunction = result.current[1];

      // Functions should be the same (memoized)
      expect(firstComputeFunction).toBe(secondComputeFunction);

      // Re-render with different itemWidth
      rerender({ mode: 'HORIZONTAL', itemWidth: 300 });
      const thirdComputeFunction = result.current[1];

      // Function should be different now
      expect(firstComputeFunction).not.toBe(thirdComputeFunction);
    });

    it('should handle mode changes properly', () => {
      const { result, rerender } = renderHook(
        ({ mode }: { mode: TimelineMode }) => useNewScrollPosition(mode, 200),
        {
          initialProps: { mode: 'HORIZONTAL' as TimelineMode },
        },
      );

      const firstComputeFunction = result.current[1];

      // Change mode
      rerender({ mode: 'VERTICAL' });
      const secondComputeFunction = result.current[1];

      // Function should be different due to mode change
      expect(firstComputeFunction).not.toBe(secondComputeFunction);
    });
  });
});
