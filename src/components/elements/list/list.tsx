import { getUniqueID } from '@utils/index';
import { FunctionComponent, startTransition, useCallback, useMemo } from 'react';
import { ListItem } from './list-item';
import { ListModel } from './list.model';
import { ListStyle } from './list.styles';

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
    () => items.map((item) => ({ id: getUniqueID(), ...item })),
    [items]
  );

  /**
   * Handles item selection and triggers appropriate callbacks
   * @param {string} id - Item identifier
   * @param {EnhancedListItem} item - Selected list item
   */
  const handleItemSelection = useCallback(
    (id: string, item: EnhancedListItem) => {
      if (multiSelectable && item.onSelect) {
        startTransition(() => {
          item.onSelect();
        });
      } else {
        onClick?.(id);
      }
    },
    [multiSelectable, onClick]
  );

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
        [item, handleItemSelection]
      );

      return <ListItem
        key={item.id}
        {...item}
        theme={theme}
        onClick={handleClick}
        selectable={multiSelectable}
        active={activeItemIndex === index}
      />
    },
    [theme, handleItemSelection, multiSelectable, activeItemIndex]
  );

  return (
    <ListStyle>
      {listItems.map(renderListItem)}
    </ListStyle>
  );
};

export { List };
