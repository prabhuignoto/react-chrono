import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRovingTabIndex } from '../useRovingTabIndex';

describe('useRovingTabIndex', () => {
  const defaultItems = [
    { id: 'first', disabled: false },
    { id: 'second', disabled: false },
    { id: 'third', disabled: false },
  ];

  it('should initialize with first non-disabled item as active', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({ items: defaultItems }),
    );

    expect(result.current.activeId).toBe('first');
  });

  it('should initialize with provided initialActiveId', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({
        items: defaultItems,
        initialActiveId: 'second',
      }),
    );

    expect(result.current.activeId).toBe('second');
  });

  it('should skip disabled items when initializing', () => {
    const items = [
      { id: 'first', disabled: true },
      { id: 'second', disabled: false },
      { id: 'third', disabled: false },
    ];

    const { result } = renderHook(() => useRovingTabIndex({ items }));

    expect(result.current.activeId).toBe('second');
  });

  describe('getItemProps', () => {
    it('should return tabIndex 0 for active item', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({ items: defaultItems }),
      );

      const firstItemProps = result.current.getItemProps('first');
      expect(firstItemProps.tabIndex).toBe(0);
    });

    it('should return tabIndex -1 for non-active items', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({ items: defaultItems }),
      );

      const secondItemProps = result.current.getItemProps('second');
      expect(secondItemProps.tabIndex).toBe(-1);
    });

    it('should return onKeyDown handler', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({ items: defaultItems }),
      );

      const props = result.current.getItemProps('first');
      expect(typeof props.onKeyDown).toBe('function');
    });

    it('should return onFocus handler', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({ items: defaultItems }),
      );

      const props = result.current.getItemProps('first');
      expect(typeof props.onFocus).toBe('function');
    });

    it('should return ref object', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({ items: defaultItems }),
      );

      const props = result.current.getItemProps('first');
      expect(props.ref).toHaveProperty('current');
    });
  });

  describe('keyboard navigation', () => {
    it('should navigate to next item with ArrowRight in horizontal mode', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
          orientation: 'horizontal',
        }),
      );

      const firstProps = result.current.getItemProps('first');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      act(() => {
        firstProps.onKeyDown(event as any);
      });

      expect(result.current.activeId).toBe('second');
    });

    it('should navigate to previous item with ArrowLeft in horizontal mode', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
          orientation: 'horizontal',
          initialActiveId: 'second',
        }),
      );

      const secondProps = result.current.getItemProps('second');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      act(() => {
        secondProps.onKeyDown(event as any);
      });

      expect(result.current.activeId).toBe('first');
    });

    it('should navigate to next item with ArrowDown in vertical mode', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
          orientation: 'vertical',
        }),
      );

      const firstProps = result.current.getItemProps('first');
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

      act(() => {
        firstProps.onKeyDown(event as any);
      });

      expect(result.current.activeId).toBe('second');
    });

    it('should navigate to first item with Home key', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
          initialActiveId: 'third',
        }),
      );

      const thirdProps = result.current.getItemProps('third');
      const event = new KeyboardEvent('keydown', { key: 'Home' });

      act(() => {
        thirdProps.onKeyDown(event as any);
      });

      expect(result.current.activeId).toBe('first');
    });

    it('should navigate to last item with End key', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
        }),
      );

      const firstProps = result.current.getItemProps('first');
      const event = new KeyboardEvent('keydown', { key: 'End' });

      act(() => {
        firstProps.onKeyDown(event as any);
      });

      expect(result.current.activeId).toBe('third');
    });

    it('should wrap to first item from last when loop=true', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
          orientation: 'horizontal',
          loop: true,
          initialActiveId: 'third',
        }),
      );

      const thirdProps = result.current.getItemProps('third');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      act(() => {
        thirdProps.onKeyDown(event as any);
      });

      expect(result.current.activeId).toBe('first');
    });

    it('should not wrap when loop=false', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
          orientation: 'horizontal',
          loop: false,
          initialActiveId: 'third',
        }),
      );

      const thirdProps = result.current.getItemProps('third');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      act(() => {
        thirdProps.onKeyDown(event as any);
      });

      expect(result.current.activeId).toBe('third');
    });

    it('should skip disabled items when navigating', () => {
      const items = [
        { id: 'first', disabled: false },
        { id: 'second', disabled: true },
        { id: 'third', disabled: false },
      ];

      const { result } = renderHook(() =>
        useRovingTabIndex({
          items,
          orientation: 'horizontal',
        }),
      );

      const firstProps = result.current.getItemProps('first');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      act(() => {
        firstProps.onKeyDown(event as any);
      });

      expect(result.current.activeId).toBe('third');
    });

    it('should call onActiveChange callback when active item changes', () => {
      const onActiveChange = vi.fn();

      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
          onActiveChange,
        }),
      );

      act(() => {
        result.current.setActiveId('second');
      });

      expect(onActiveChange).toHaveBeenCalledWith('second');
    });
  });

  describe('focus management', () => {
    it('should handle focus event on item', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({
          items: defaultItems,
        }),
      );

      const secondProps = result.current.getItemProps('second');

      act(() => {
        secondProps.onFocus();
      });

      expect(result.current.activeId).toBe('second');
    });

    it('should not set focus to disabled items', () => {
      const items = [
        { id: 'first', disabled: false },
        { id: 'second', disabled: true },
      ];

      const { result } = renderHook(() => useRovingTabIndex({ items }));

      act(() => {
        result.current.setActiveId('second');
      });

      // Should remain on first item since second is disabled
      expect(result.current.activeId).toBe('first');
    });
  });

  describe('setActiveId', () => {
    it('should set active item programmatically', () => {
      const { result } = renderHook(() =>
        useRovingTabIndex({ items: defaultItems }),
      );

      act(() => {
        result.current.setActiveId('third');
      });

      expect(result.current.activeId).toBe('third');
    });

    it('should not set disabled item as active', () => {
      const items = [
        { id: 'first', disabled: false },
        { id: 'second', disabled: true },
      ];

      const { result } = renderHook(() => useRovingTabIndex({ items }));

      act(() => {
        result.current.setActiveId('second');
      });

      expect(result.current.activeId).toBe('first');
    });
  });

  describe('item updates', () => {
    it('should handle items being added', () => {
      const { result, rerender } = renderHook(
        ({ items }) => useRovingTabIndex({ items }),
        { initialProps: { items: defaultItems } },
      );

      const newItems = [...defaultItems, { id: 'fourth', disabled: false }];

      rerender({ items: newItems });

      expect(result.current.activeId).toBe('first');
    });

    it('should handle items being removed', () => {
      const { result, rerender } = renderHook(
        ({ items }) => useRovingTabIndex({ items, initialActiveId: 'third' }),
        { initialProps: { items: defaultItems } },
      );

      const newItems = [defaultItems[0], defaultItems[1]];

      rerender({ items: newItems });

      // Should reset to first item since third no longer exists
      expect(result.current.activeId).toBe('first');
    });

    it('should handle disabled state changes', () => {
      const { result, rerender } = renderHook(
        ({ items }) => useRovingTabIndex({ items }),
        {
          initialProps: {
            items: [
              { id: 'first', disabled: false },
              { id: 'second', disabled: false },
            ],
          },
        },
      );

      // Initially active item should be 'first'
      expect(result.current.activeId).toBe('first');

      // Change the items list so 'first' is disabled
      const updatedItems = [
        { id: 'first', disabled: true },
        { id: 'second', disabled: false },
      ];

      act(() => {
        rerender({ items: updatedItems });
      });

      // The hook keeps the activeId as 'first' even if disabled
      // because the item still exists in the list
      // The validation only resets if the item is completely removed
      expect(result.current.activeId).toBe('first');

      // However, you cannot set focus to a disabled item
      const secondProps = result.current.getItemProps('second');
      expect(secondProps.tabIndex).toBe(-1);
    });
  });
});
