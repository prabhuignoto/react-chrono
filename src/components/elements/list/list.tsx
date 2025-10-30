import { getUniqueID } from '@utils/index';
import {
  FunctionComponent,
  startTransition,
  useCallback,
  useMemo,
} from 'react';
import { useRovingTabIndex } from '@hooks/accessibility/useRovingTabIndex';
import { ListItem } from './list-item';
import { ListModel } from './list.model';
import { list } from './list.css';
import { defaultTheme } from '../../common/themes';

/**
 * Extends the base list item with a unique identifier
 * @typedef {Object} EnhancedListItem
 * @extends {ListModel['items'][0]}
 * @property {string} id - Unique identifier for the list item
 */
type EnhancedListItem = ListModel['items'][0] & { id: string };

/**
 * List component that renders selectable items with optional multi-select capability
 * @component
 * @param {Object} props - Component props
 * @param {Array<ListModel['items'][0]>} props.items - Array of items to render in the list
 * @param {string} props.theme - Theme configuration for styling
 * @param {(id: string) => void} [props.onClick] - Callback function when an item is clicked
 * @param {number} [props.activeItemIndex] - Index of the currently active item
 * @param {boolean} [props.multiSelectable=false] - Enable multi-select functionality
 * @returns {JSX.Element} Rendered list component
 */
const List: FunctionComponent<ListModel> = ({
  items,
  theme,
  onClick,
  activeItemIndex,
  multiSelectable = false,
}) => {
  /**
   * Memoized list items with generated unique IDs
   */
  const listItems = useMemo(
    () => items.map((item) => ({ ...item, id: item.id || getUniqueID() })),
    [items],
  );

  /**
   * Initialize roving tabindex for keyboard navigation (WCAG 2.1.1: Keyboard)
   * Supports ARIA Menu pattern: Up/Down arrows navigate, Enter selects
   */
  const rovingItems = useMemo(
    () => listItems.map((item) => ({ id: item.id, disabled: false })),
    [listItems],
  );

  const { getItemProps } = useRovingTabIndex({
    items: rovingItems,
    orientation: 'vertical',
    loop: true, // Circular navigation within menu
  });

  /**
   * Handles item selection and triggers appropriate callbacks
   * @param {string} id - Item identifier
   * @param {EnhancedListItem} item - Selected list item
   */
  const handleItemSelection = useCallback(
    (id: string, item: EnhancedListItem) => {
      if (multiSelectable && item.onSelect) {
        startTransition(() => {
          item.onSelect?.();
        });
      } else {
        onClick?.(id);
      }
    },
    [multiSelectable, onClick],
  );

  /**
   * Prevent arrow key events from bubbling to parent (e.g., timeline)
   * @param {React.KeyboardEvent} e - Keyboard event
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Stop propagation for menu navigation keys to prevent timeline from capturing them
    if (['ArrowUp', 'ArrowDown', 'Enter', ' '].includes(e.key)) {
      e.stopPropagation();
    }
  }, []);

  /**
   * Renders individual list items with proper props
   * @param {EnhancedListItem} item - Item to render
   * @param {number} index - Item index in the list
   * @returns {JSX.Element} Rendered list item
   */
  const renderListItem = useCallback(
    (item: EnhancedListItem, index: number) => {
      const handleClick = useCallback(
        () => handleItemSelection(item.id, item),
        [item, handleItemSelection],
      );

      return (
        <ListItem
          key={item.id}
          {...item}
          theme={theme || defaultTheme}
          onClick={handleClick}
          selectable={multiSelectable}
          active={activeItemIndex === index}
          rovingProps={getItemProps(item.id) as any}
        />
      );
    },
    [theme, handleItemSelection, multiSelectable, activeItemIndex, getItemProps],
  );

  return (
    <ul className={list} role="menu" onKeyDown={handleKeyDown}>
      {listItems.map(renderListItem)}
    </ul>
  );
};

export { List };
