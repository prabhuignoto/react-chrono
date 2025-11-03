import { useCallback, useRef, useState, useEffect } from 'react';

/**
 * Configuration for roving tabindex pattern
 */
export interface UseRovingTabIndexOptions {
  /** Array of items with IDs and optional disabled state */
  items: { id: string; disabled?: boolean }[];
  /** Direction of navigation: horizontal (arrow left/right), vertical (arrow up/down), or both */
  orientation?: 'horizontal' | 'vertical' | 'both';
  /** Whether to wrap focus from last item to first (and vice versa) */
  loop?: boolean;
  /** Initial active item ID */
  initialActiveId?: string;
  /** Callback when active item changes */
  onActiveChange?: (id: string) => void;
}

/**
 * Return value from useRovingTabIndex
 */
export interface UseRovingTabIndexReturn {
  /** Current active item ID */
  activeId: string;
  /** Get props for an item (tabIndex, onKeyDown, onFocus, ref) */
  getItemProps: (id: string) => {
    ref: React.RefObject<HTMLElement | null>;
    tabIndex: 0 | -1;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    onFocus: () => void;
  };
  /** Manually set active item */
  setActiveId: (id: string) => void;
}

/**
 * useRovingTabIndex - Implements ARIA roving tabindex pattern
 *
 * This hook manages keyboard navigation for composite widgets like toolbars,
 * menu bars, and list boxes. Only one item has tabIndex={0}, and arrow keys
 * move focus between items. Other items have tabIndex={-1}.
 *
 * WCAG References:
 * - 2.1.1 Keyboard (Level A)
 * - 2.4.3 Focus Order (Level A)
 * - ARIA APG Roving Tabindex Pattern
 *
 * @example
 * ```typescript
 * const { getItemProps, activeId } = useRovingTabIndex({
 *   items: [
 *     { id: 'first', disabled: false },
 *     { id: 'prev', disabled: disableLeft },
 *     { id: 'next', disabled: disableRight },
 *     { id: 'last', disabled: false },
 *   ],
 *   orientation: 'horizontal',
 *   loop: false,
 * });
 *
 * return (
 *   <div role="toolbar">
 *     <button {...getItemProps('first')}>First</button>
 *     <button {...getItemProps('prev')}>Previous</button>
 *     <button {...getItemProps('next')}>Next</button>
 *     <button {...getItemProps('last')}>Last</button>
 *   </div>
 * );
 * ```
 */
export const useRovingTabIndex = (
  options: UseRovingTabIndexOptions,
): UseRovingTabIndexReturn => {
  const {
    items,
    orientation = 'horizontal',
    loop = false,
    initialActiveId,
    onActiveChange,
  } = options;

  // Initialize active ID from first non-disabled item or provided initial ID
  const getInitialActiveId = useCallback(() => {
    if (initialActiveId && items.some((item) => item.id === initialActiveId)) {
      return initialActiveId;
    }
    const firstNonDisabled = items.find((item) => !item.disabled);
    return firstNonDisabled?.id ?? items[0]?.id ?? '';
  }, [initialActiveId, items]);

  const [activeId, setActiveIdState] = useState<string>(getInitialActiveId());
  const itemRefsMap = useRef<Map<string, React.RefObject<HTMLElement | null>>>(
    new Map(),
  );

  // Initialize refs for all items
  useEffect(() => {
    items.forEach((item) => {
      if (!itemRefsMap.current.has(item.id)) {
        itemRefsMap.current.set(item.id, { current: null });
      }
    });
    // Clean up refs for removed items
    itemRefsMap.current.forEach((_, id) => {
      if (!items.some((item) => item.id === id)) {
        itemRefsMap.current.delete(id);
      }
    });
  }, [items]);

  // Ensure activeId is valid
  useEffect(() => {
    if (!items.some((item) => item.id === activeId)) {
      const newActiveId = getInitialActiveId();
      if (newActiveId) {
        setActiveIdState(newActiveId);
      }
    }
  }, [items, activeId, getInitialActiveId]);

  /**
   * Set active item and call callback
   */
  const setActiveId = useCallback(
    (id: string) => {
      const item = items.find((item) => item.id === id);
      if (item && !item.disabled) {
        setActiveIdState(id);
        onActiveChange?.(id);
      }
    },
    [items, onActiveChange],
  );

  /**
   * Find next focusable item based on direction
   */
  const findNextItem = useCallback(
    (
      currentId: string,
      direction: 'next' | 'prev' | 'first' | 'last',
    ): string => {
      const currentIndex = items.findIndex((item) => item.id === currentId);
      if (currentIndex === -1) return currentId;

      let nextIndex = currentIndex;

      switch (direction) {
        case 'next': {
          nextIndex = currentIndex + 1;
          if (nextIndex >= items.length) {
            nextIndex = loop ? 0 : items.length - 1;
          }
          break;
        }
        case 'prev': {
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = loop ? items.length - 1 : 0;
          }
          break;
        }
        case 'first': {
          nextIndex = 0;
          break;
        }
        case 'last': {
          nextIndex = items.length - 1;
          break;
        }
      }

      // Skip disabled items
      let attempts = 0;
      const maxAttempts = items.length;
      while (
        attempts < maxAttempts &&
        items[nextIndex]?.disabled &&
        nextIndex !== currentIndex
      ) {
        if (direction === 'next' || direction === 'first') {
          nextIndex = (nextIndex + 1) % items.length;
        } else {
          nextIndex = (nextIndex - 1 + items.length) % items.length;
        }
        attempts++;
      }

      return items[nextIndex]?.id ?? currentId;
    },
    [items, loop],
  );

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const isHorizontal =
        orientation === 'horizontal' || orientation === 'both';
      const isVertical = orientation === 'vertical' || orientation === 'both';

      let direction: 'next' | 'prev' | 'first' | 'last' | null = null;

      if (isHorizontal) {
        if (e.key === 'ArrowRight') {
          direction = 'next';
          e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
          direction = 'prev';
          e.preventDefault();
        }
      }

      if (isVertical) {
        if (e.key === 'ArrowDown') {
          direction = 'next';
          e.preventDefault();
        } else if (e.key === 'ArrowUp') {
          direction = 'prev';
          e.preventDefault();
        }
      }

      if (e.key === 'Home') {
        direction = 'first';
        e.preventDefault();
      } else if (e.key === 'End') {
        direction = 'last';
        e.preventDefault();
      }

      if (direction) {
        const nextId = findNextItem(activeId, direction);
        setActiveId(nextId);

        // Focus the next item
        setTimeout(() => {
          const nextRef = itemRefsMap.current.get(nextId);
          nextRef?.current?.focus();
        }, 0);
      }
    },
    [orientation, activeId, findNextItem, setActiveId],
  );

  /**
   * Handle focus change via mouse/click
   */
  const handleFocus = useCallback(
    (id: string) => {
      setActiveId(id);
    },
    [setActiveId],
  );

  /**
   * Get props for an item
   */
  const getItemProps = useCallback(
    (id: string) => {
      // Ensure ref exists
      if (!itemRefsMap.current.has(id)) {
        itemRefsMap.current.set(id, { current: null });
      }

      const ref = itemRefsMap.current.get(id)!;
      const isActive = activeId === id;
      const item = items.find((item) => item.id === id);
      const isDisabled = item?.disabled ?? false;

      return {
        ref,
        tabIndex: isActive && !isDisabled ? (0 as const) : (-1 as const),
        onKeyDown: handleKeyDown,
        onFocus: () => handleFocus(id),
      };
    },
    [activeId, items, handleKeyDown, handleFocus],
  );

  return {
    activeId,
    getItemProps,
    setActiveId,
  };
};
